import fetchData from './utils/fetchData'

const url = import.meta.env.VITE_REACT_APP_SERVER_URL + '/generator'

export const createGenerator = async (generator, currentUser, dispatch, setPage) => {
  dispatch({type: 'START_LOADING'})

  const result = await fetchData({url, body: generator, token: currentUser?.token}, dispatch)
  if(result) {dispatch({type: 'UPDATE_ALERT', payload: {open: true, severity: 'success', message: 'The generator has been added successfully'}})}
  dispatch({type: 'RESET_GENERATOR'})
  setPage(0)

  dispatch({type: 'END_LOADING'})
}