import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
import {sendError, createRandomBytes} from './utils/helper.js';
import Generator from '../models/Generator.js';
import {generatePasswordResetTemplate, plainEmailTemplate, mailTransport} from './utils/mail.js'
import ResetToken from '../models/resetToken.js';

export const register = tryCatch(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const existedUser = await User.findOne({ email});
    if (existedUser) return sendError(res, 'User already exists!')
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

export const forgotPassword = tryCatch (async (req, res) => {
  const {email} = req.body
  if(!email) return sendError(res, 'Please provide a valid email!')

  const emailLowerCase = email.toLowerCase();
  const user = await User.findOne({email: emailLowerCase})
  if(!user) return sendError(res, 'User not found, invalid request!')

  const token = await ResetToken.findOne({owner: user._id})
  if(token) return sendError(res, 'Only after one hour you can request for another token!')

  const randomBytes = await createRandomBytes()
  const resetToken = new ResetToken({owner: user._id, token: randomBytes})
  await resetToken.save()

  mailTransport().sendMail({
    from: 'security@email.com',
    to: user.email,
    subject: 'Password Reset',
    html: generatePasswordResetTemplate(`http://localhost:5173/reset-password?token=${randomBytes}&id=${user._id}`)
  })

  res.json({success: true, message: 'Password reset link has been sent to your email!'})
})


export const resetPassword = tryCatch(async (req, res) => {
  const {password} = req.body

  const user = await User.findById(req.user._id)
  if(!user) return sendError(res, 'user not found')

  const isSamePassword = await user.comparePassword(password)
  if(isSamePassword) return sendError(res, 'New password must be different from the previous one!')

  if(password.trim().length < 8 || password.trim().length > 20) return sendError(res, 'Password must be 8 to 20 characters long!')

  user.password = password.trim()
  await user.save()

  await ResetToken.findOneAndDelete({owner: user._id})

  mailTransport().sendMail({
    from: 'security@email.com',
    to: user.email,
    subject: 'Password Reset Successfully',
    html: plainEmailTemplate('Password Reset Successfully', 'Now you can login with new password'),
  })
  res.json({success: true, message: 'Password Reset Successfully'})
})



