import {check, validationResult} from 'express-validator'
export const validateUser = [
  check('name').trim().not().isEmpty().withMessage('Name is missing').isLength({min: 3, max: 20}).withMessage('Name must be 3 to 20 characters Long!'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
  check('phone').trim().not().isEmpty().withMessage("Phone Number is Missing!").isLength({min: 10, max: 15}).withMessage('Phone Number must be 10 to 15 characters Long!'),
  check('password').trim().not().isEmpty().withMessage("Password is Missing!").isLength({min: 8, max: 20}).withMessage('Password must be 8 to 20 characters Long!'),
]

export const validate = (req, res, next) => {
  const error = validationResult(req).array()
  if(!error.length) return next()

  res.status(400).json({success: false, message: error[0].msg})
}