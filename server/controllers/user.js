import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import {sendError} from './utils/helper.js';
import Generator from '../models/Generator.js';

export const register = tryCatch(async (req, res) => {
    const { name, email, phone, password } = req.body;
    // if (password.length < 6) return sendError(res, 'Password must be 6 characters or more');
    const existedUser = await User.findOne({ email});
    if (existedUser) return sendError(res, 'User already exists!')
    // const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      phone,
      password
    });
    const { _id: id, photoURL, role, active } = user;
    const token = jwt.sign({ id, name, photoURL, phone, role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    await user.save()
    res.status(201).json({
      success: true,
      result: { id, name, email: user.email, photoURL, phone, token, role, active },
    });
  })
 

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser) return sendError(res, 'User does not exist!')

  const correctPassword = await existedUser.comparePassword(password);
  if (!correctPassword) return sendError(res, 'Invalid credentials')

  const { _id: id, name, photoURL, phone, role, active } = existedUser;
  if (!active) return sendError(res, 'This account has been suspended! Try to contact the admin')
  
  const token = jwt.sign({ id, name, photoURL, phone, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, phone, token, role, active },
  });
});

export const updateProfile = tryCatch(async (req, res) => {
  const fields = req.body?.photoURL
    ? { name: req.body.name,  phone: req.body.phone, photoURL: req.body.photoURL }
    : { name: req.body.name, phone: req.body.phone };
  const updatedUser = await User.findByIdAndUpdate(req.user.id,  fields, {
    new: true,
  });
  const { _id: id, name, photoURL, phone, role } = updatedUser;

  await Generator.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign({ id, name, photoURL, phone, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ success: true, result: { name, photoURL, phone, token } });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const updateStatus = tryCatch(async (req, res) => {
  const { role, active } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { role, active });
  res.status(200).json({ success: true, result: { _id: req.params.userId } });
});


