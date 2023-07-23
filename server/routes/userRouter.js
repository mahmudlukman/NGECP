import {Router} from 'express'
import { register, login, updateProfile, getUsers, updateStatus, forgotPassword, resetPassword} from '../controllers/user.js'
import auth from '../middleware/auth.js'
import {validate, validateUser} from '../middleware/validator.js'
import checkAccess from '../middleware/checkAccess.js'
import userPermissions from '../middleware/permissions/user/userPermissions.js'
import { isResetTokenValid } from '../middleware/user.js'

const userRouter = Router()

userRouter.post('/register', validateUser, validate, register)
userRouter.post('/login', login)
userRouter.post('/forgot-password', forgotPassword )
userRouter.patch('/reset-password', isResetTokenValid, resetPassword )
userRouter.get('/verify-token', isResetTokenValid, (req, res) => {
  res.json({success: true})
} )
userRouter.patch('/updateProfile', auth,  updateProfile)
userRouter.get('/', auth, checkAccess(userPermissions.listUsers), getUsers)
userRouter.patch('/updateStatus/:userId', auth, checkAccess(userPermissions.updateStatus), updateStatus)


export default userRouter