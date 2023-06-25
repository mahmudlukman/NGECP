import Generator from '../models/Generator.js'
import tryCatch from './utils/tryCatch.js'

export const createGenerator = tryCatch(async(req, res) => {
  const {id: uid, name: uName, photoURL: uPhoto, phone: uPhone} = req.user
  const newGenerator = new Generator({...req.body, uid, uName, uPhoto, uPhone})
  await newGenerator.save()
  res.status(201).json({success: true, result: newGenerator})
})