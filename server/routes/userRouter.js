import {Router} from 'express'
import { register, login, updateProfile, getUsers, updateStatus } from '../controllers/user.js'
import auth from '../middleware/auth.js'
// import checkAccess from '../middleware/checkAccess.js'
// import userPermissions from '../middleware/permissions/user/userPermissions.js'

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.patch('/updateProfile', auth,  updateProfile)
userRouter.get('/', getUsers)
userRouter.patch('/updateStatus/:userId', updateStatus)

export default userRouter