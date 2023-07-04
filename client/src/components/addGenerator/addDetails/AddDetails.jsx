import { TextField, Grid, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useValue } from '../../../context/ContextProvider'

const initialState = {
  company: '',
  usageType: '',
  genType: '',
  power: '',
  model: '',
  serialNumber: '',
}

const AddDetails = () => {
  const {dispatch} = useValue()
  const [spacing, setSpacing] = useState(2);
  const [inputs, setInputs] = useState(initialState)

  const onInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    dispatch({type: 'UPDATE_DETAILS', payload: {[e.target.name]: e.target.value}})
  }


  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          <Grid item>
            <TextField label='Usage Type' select name='usageType' value={inputs.usageType} onChange={onInputChange} sx={{ width: 220 }}>
              <MenuItem value={'MDA'}>MDA</MenuItem>
              <MenuItem value={'Commercial'}>Commercial</MenuItem>
              <MenuItem value={'Industrial'}>Industrial</MenuItem>
              <MenuItem value={'Personal'}>Personal</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField label='Generator Type' select name='genType' value={inputs.genType} onChange={onInputChange} sx={{ width: 220 }}>
              <MenuItem value='Diesel'>Diesel</MenuItem>
              <MenuItem value='Petrol'>Petrol</MenuItem>
              <MenuItem value='Gas'>Gas</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField label='Power(kVA)' select name='power' value={inputs.power} onChange={onInputChange} sx={{ width: 220 }}>
              <MenuItem value='10-30'>10-30</MenuItem>
              <MenuItem value='31-65'>31-65</MenuItem>
              <MenuItem value='66-100'>66-100</MenuItem>
              <MenuItem value='101-200'>101-200</MenuItem>
              <MenuItem value='201-350'>201-350</MenuItem>
              <MenuItem value='351-700'>351-700</MenuItem>
              <MenuItem value='701-1000'>701-1000</MenuItem>
              <MenuItem value='1000 above'>1000 above</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container my={2} justifyContent="center" spacing={spacing}>
          <Grid item>
            <TextField
              label='Company'
              name='company'
              variant='outlined'
              value={inputs.company}
              onChange={onInputChange}
              required
            />
          </Grid>
          <Grid item>
          <TextField
              label='Serial Number'
              name='serialNumber'
              variant='outlined'
              value={inputs.serialNumber}
              onChange={onInputChange}
              required
            />
          </Grid>
          <Grid item>
          <TextField
              label='Model'
              name='model'
              variant='outlined'
              value={inputs.model}
              onChange={onInputChange}
              required
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddDetails