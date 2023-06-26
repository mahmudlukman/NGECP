import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createGenerator, getGenerators } from '../controllers/generator.js'

const generatorRouter = Router()

generatorRouter.post('/', auth, createGenerator)
generatorRouter.get('/', getGenerators)

export default generatorRouter