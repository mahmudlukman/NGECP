import Generator from '../../../models/Generator.js'

const checkOwner = async (req) => {
  try {
    const generator = await Generator.findOne({_id: req.params.generatorId, uid: req.user.id})
    if(generator) return true
    return false
  } catch (error) {
    console.log(error)
    return 'error'
  }
}

export default checkOwner