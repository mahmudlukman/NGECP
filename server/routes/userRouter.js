import {Router} from 'express'
import { register, login, updateProfile, getUsers, updateStatus, verifyOTP, generateOTP, resetPassword } from '../controllers/user.js'
import auth from '../middleware/auth.js'
import checkAccess from '../middleware/checkAccess.js'
import userPermissions from '../middleware/permissions/user/userPermissions.js'
import localVariables from '../middleware/localVariables.js'
import {registerMail} from '../controllers/utils/mailer.js'

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.patch('/updateProfile', auth,  updateProfile)
userRouter.get('/', auth, checkAccess(userPermissions.listUsers), getUsers)
userRouter.patch('/updateStatus/:userId', auth, checkAccess(userPermissions.updateStatus), updateStatus)
userRouter.post('/registerMail', registerMail)
userRouter.get('/generateOTP', localVariables, generateOTP)
userRouter.get('/verifyOTP', verifyOTP)
userRouter.patch('/resetPassword', resetPassword)


export default userRouter