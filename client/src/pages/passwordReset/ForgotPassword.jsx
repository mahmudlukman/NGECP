import { useRef } from 'react'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import { forgotPassword } from '../../actions/user'

const ForgotPassword = () => {
  const { dispatch } = useValue()
  const theme = useTheme();

  const emailRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    forgotPassword({ email }, dispatch)
    
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 300,
            maxWidth: '100%',
            margin: '100px 40px'
          }}
        >
          <Typography variant='h6' color={theme.palette.secondary[300]}>Verify Your Email Address</Typography>
          <TextField
            autoFocus
            margin='normal'
            variant='standard'
            inputRef={emailRef}
            id='email'
            label='email'
            type='email'
            fullWidth
            required
          />
          <Button
            type='submit'
            variant='contained'
            endIcon={<Send />}
            fullWidth
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>

  )
}

export default ForgotPassword