import deleteImages from './utils/deleteImages'
import fetchData from './utils/fetchData'

const url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/generator'

export const createGenerator = async (generator, currentUser, dispatch) => {
  dispatch({type: 'START_LOADING'})

  const result = await fetchData({url, body: generator, token: currentUser?.token}, dispatch)
  if(result) {dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'The generator has been added successfully'}})}
  clearGenerator(dispatch, currentUser)
  dispatch({type: 'UPDATE_SECTION', payload: 0})
  dispatch({type: 'UPDATE_GENERATOR', payload: result})

  dispatch({type: 'END_LOADING'})
}

export const getGenerators = async (dispatch) => {
  const result = await fetchData({url, method: 'GET'}, dispatch)
  if(result) {
    dispatch({type: 'UPDATE_GENERATORS', payload: result})
  }
}

export const deleteGenerator = async (generator, currentUser, dispatch) => {
  const result = await fetchData(
    {url:`${url}/${generator._id}`, method: 'DELETE', token: currentUser?.token},
    dispatch
  )
  if(result) {
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'The generator has been deleted successfully'}})
    dispatch({type: 'DELETE_GENERATOR', payload: result._id})
    deleteImages(generator.images, generator.uid)
  }
  dispatch({type: 'END_LOADING'})
}

export const updateGenerator = async (generator, currentUser, dispatch, updatedGenerator, deletedImages) => {
  const result = await fetchData(
    {url:`${url}/${updatedGenerator._id}`, method: 'PATCH', body: generator, token: currentUser?.token},
    dispatch
  )
  if(result) {
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'The generator has been updated successfully'}})
    clearGenerator(dispatch, currentUser, deletedImages, updatedGenerator)
    dispatch({type: 'UPDATE_SECTION', payload: 0})
    dispatch({type: 'UPDATE_GENERATOR', payload: result})
  }
  dispatch({type: 'END_LOADING'})
}

export const clearGenerator = (dispatch, currentUser, images=[], updatedGenerator=null) => {
  dispatch({type: 'RESET_GENERATOR'})
  localStorage.removeItem(currentUser?.id)
  if(updatedGenerator) {
    deleteImages(images, updateGenerator.uid)
  }else{
    deleteImages(images, currentUser?.id)
  }
}

export const storeGenerator = (location, details, images, updatedGenerator, deletedImages, addedImages, userId) => {
  if(location.lng || location.lat || details.company || details.usageType || details.genType || details.model || details.power || details.serialNumber || images.length){
    localStorage.setItem(userId, JSON.stringify({location, details, images, updatedGenerator, deletedImages, addedImages}))
    return true
  }else{
    return false
  }
}