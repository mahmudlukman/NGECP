import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createGenerator } from '../controllers/generator.js'

const generatorRouter = Router()

generatorRouter.post('/', auth, createGenerator)

export default generatorRouter