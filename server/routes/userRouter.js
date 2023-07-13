import {Router} from 'express'
import { register, login, updateProfile, getUsers, updateStatus, verifyOTP, generateOTP, verifyUser } from '../controllers/user.js'
import auth from '../middleware/auth.js'
import checkAccess from '../middleware/checkAccess.js'
import userPermissions from '../middleware/permissions/user/userPermissions.js'
import localVariables from '../middleware/localVariables.js'

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.patch('/updateProfile', auth,  updateProfile)
userRouter.get('/', auth, checkAccess(userPermissions.listUsers), getUsers)
userRouter.patch('/updateStatus/:userId', auth, checkAccess(userPermissions.updateStatus), updateStatus)
userRouter.get('/generateOTP', localVariables, generateOTP)
userRouter.get('/verifyOTP', verifyOTP)

export default userRouter