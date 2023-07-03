import { Box, IconButton, Tooltip } from '@mui/material'
import { Delete, Edit, Preview } from '@mui/icons-material'
import { useValue } from '../../../context/ContextProvider'
import { deleteGenerator } from '../../../actions/generator'
// import { clearRoom, deleteRoom } from '../../../actions/room'
// import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const GeneratorsActions = ({ params }) => {
  // eslint-disable-next-line react/prop-types
  // const { _id, lng, lat, price, title, description, images, uid } = params.row
  const { dispatch, state: { currentUser, updatedRoom, addedImages, images: newImages } } = useValue()

  // const navigate = useNavigate()

  // const handleEdit = () => {
  //   if (updatedRoom) {
  //     clearRoom(dispatch, currentUser, addedImages, updatedRoom)
  //   } else {
  //     clearRoom(dispatch, currentUser, newImages)
  //   }
  //   dispatch({ type: 'UPDATE_LOCATION', payload: { lng, lat } })
  //   dispatch({ type: 'UPDATE_DETAILS', payload: { price, title, description } })
  //   dispatch({ type: 'UPDATE_IMAGES', payload: images })
  //   dispatch({ type: 'UPDATE_UPDATED_ROOM', payload: { _id, uid } })
  //   dispatch({ type: 'UPDATE_SECTION', payload: 2 })
  //   navigate('/')
  // }

  return (
    <Box>
      <Tooltip title='View Generator details'>
        <IconButton onClick={() => dispatch({type: 'UPDATE_GENERATOR', payload:params.row})}>
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title='Edit this generator'>
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title='Delete this generator'>
        <IconButton onClick={() => deleteGenerator(params.row, currentUser, dispatch)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default GeneratorsActions