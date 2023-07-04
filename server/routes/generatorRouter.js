import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createGenerator, deleteGenerator, getGenerators, updateGenerator } from '../controllers/generator.js'

const generatorRouter = Router()

generatorRouter.post('/', auth, createGenerator)
generatorRouter.get('/', getGenerators)
generatorRouter.delete('/:generatorId', deleteGenerator)
generatorRouter.patch('/:generatorId', updateGenerator)

export default generatorRouter