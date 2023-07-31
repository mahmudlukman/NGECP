import { TextField } from '@mui/material'

const EmailField = ({ emailRef, defaultValue = '' }) => {
  return (
    <TextField
      autoFocus
      margin='normal'
      variant='standard'
      id='email'
      label='Email'
      type='email'
      fullWidth
      inputRef={emailRef}
      required
      defaultValue={defaultValue}
    />
  )
}

export default EmailField