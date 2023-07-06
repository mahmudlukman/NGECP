import {Router} from 'express'
import auth from '../middleware/auth.js'
import { createGenerator, deleteGenerator, getGenerators, updateGenerator } from '../controllers/generator.js'
import checkAccess from '../middleware/checkAccess.js'
import generatorPermissions from '../middleware/permissions/generator/generatorPermissions.js'

const generatorRouter = Router()

generatorRouter.post('/', auth, createGenerator)
generatorRouter.get('/', getGenerators)
generatorRouter.delete('/:generatorId', auth, checkAccess(generatorPermissions.delete), deleteGenerator)
generatorRouter.patch('/:generatorId', auth, checkAccess(generatorPermissions.update), updateGenerator)

export default generatorRouter