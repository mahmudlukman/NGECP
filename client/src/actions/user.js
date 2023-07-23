import uploadFile from "../firebase/uploadFile"
import fetchData from "./utils/fetchData"
import {v4 as uuidv4} from 'uuid'

const url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/user'

export const register = async(user, dispatch) => {
  dispatch({type: 'START_LOADING'})

  const result = await fetchData(
    {url: url + '/register', body: user},
    dispatch
  ) 
  if(result) {
    dispatch({type: 'UPDATE_USER', payload: result})
    dispatch({type: 'CLOSE_LOGIN'})
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'Your account has been created successfully'}})
  }

  dispatch({type: 'END_LOADING'})
}

export const login = async(user, dispatch) => {
  dispatch({type: 'START_LOADING'})

  const result = await fetchData(
    {url: url + '/login', body: user},
    dispatch
  ) 
  if(result) {
    dispatch({type: 'UPDATE_USER', payload: result})
    dispatch({type: 'CLOSE_LOGIN'})
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'Login successfully'}})
  }

  dispatch({type: 'END_LOADING'})
}

export const updateProfile = async(currentUser, updatedFields, dispatch) => {
  dispatch({type: 'START_LOADING'})

  const {name, phone, file} = updatedFields
  let body = {name, phone}
  try {
    if(file){
      const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop()
      const photoURL = await uploadFile(file, `profile/${currentUser?.id}/${imageName}`)
      body = {...body, photoURL}
    }
    const result = await fetchData({url:url+'/updateProfile', method: 'PATCH', body, token: currentUser.token}, dispatch)
    if(result){
      dispatch({type: 'UPDATE_USER', payload: {...currentUser, ...result}})
      dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'Your profile has been updated successfully'}})
      dispatch({type: 'UPDATE_PROFILE', payload: {open: false, file: null, photoURL: result.photoURL}})
    }
  } catch (error) {
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'error', message: error.message}})
  }

  dispatch({type: 'END_LOADING'})
}

export const getUsers = async (dispatch, currentUser) => {
  const result = await fetchData({url, method: 'GET', token:currentUser.token}, dispatch)
  if(result) {
    dispatch({type: 'UPDATE_USERS', payload: result})
  }
}

export const updateStatus = (updatedFields, userId, dispatch, currentUser) => {
  return fetchData(
    {
      url: `${url}/updateStatus/${userId}`,
      method: 'PATCH',
      token: currentUser.token,
      body: updatedFields,
    },
    dispatch
  );
};

export const logout = (dispatch) => {
  dispatch({type: 'UPDATE_USER', payload: null})
  dispatch({type: 'RESET_GENERATOR'})
  dispatch({type: 'UPDATE_USERS', payload: []})
}

export const forgotPassword = async(user, dispatch) => {
  dispatch({type: 'START_LOADING'})

  const result = await fetchData(
    {url: url + '/forgot-password', body: user},
    dispatch
  ) 
  if(result) {
    dispatch({type: 'UPDATE_USER', payload: result})
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'Password reset link has been sent to your email!'}})
  }

  dispatch({type: 'END_LOADING'})
}


export const resetPassword = async(updatedFields, token, id, dispatch) => {
  dispatch({type: 'START_LOADING'})

  const result = await fetchData(
    {
      url: `${url}/reset-password?token=${token}&id=${id}`,
      method: 'PATCH',
      body: updatedFields,
      token, 
      id
    },
    dispatch)
  if(result) {
    dispatch({type: 'UPDATE_USER', payload: result})
    dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'Your password has been updated successfully!'}})
  }

  dispatch({type: 'END_LOADING'})
}