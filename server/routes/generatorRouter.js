import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createGenerator, deleteGenerator, getGenerators } from '../controllers/generator.js'

const generatorRouter = Router()

generatorRouter.post('/', auth, createGenerator)
generatorRouter.get('/', getGenerators)
generatorRouter.delete('/:generatorId', deleteGenerator)

export default generatorRouter