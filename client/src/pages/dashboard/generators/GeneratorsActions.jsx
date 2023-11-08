/* eslint-disable react/prop-types */
import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
import { useValue } from '../../../context/ContextProvider';
import { clearGenerator, deleteGenerator } from '../../../actions/generator';
import { useNavigate } from 'react-router-dom';

const GeneratorsActions = ({ params }) => {
  const { _id, lng, lat, company, usageType, genType, power, model, serialNumber, images, uid } = params.row;
  const {
    dispatch,
    state: { currentUser, updatedGenerator, addedImages, images: newImages },
  } = useValue();

  const navigate = useNavigate();
  const handleEdit = () => {
    clearGenerator(dispatch)
    if (updatedGenerator) {
      clearGenerator(dispatch, currentUser, addedImages, updatedGenerator);
    } else {
      clearGenerator(dispatch, currentUser, newImages);
    }
    dispatch({ type: 'UPDATE_LOCATION', payload: { lng, lat } });
    dispatch({
      type: 'UPDATE_DETAILS',
      payload: { company, usageType, genType, power, model, serialNumber },
    });
    dispatch({ type: 'UPDATE_IMAGES', payload: images });
    dispatch({ type: 'UPDATE_UPDATED_GENERATOR', payload: { _id, uid } });
    dispatch({ type: 'UPDATE_SECTION', payload: 1 });
    navigate('/');
  };
  return (
    <Box>
      <Tooltip title="View generator details">
        <IconButton
          onClick={() => dispatch({ type: 'UPDATE_GENERATOR', payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this generator">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this generator">
        <IconButton
          onClick={() => deleteGenerator(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default GeneratorsActions;