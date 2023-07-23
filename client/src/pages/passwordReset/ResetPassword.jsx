import { useEffect, useRef } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { Send } from '@mui/icons-material'
import PasswordField from '../../components/user/PasswordField'
import { useValue } from '../../context/ContextProvider'
import { resetPassword, verifyToken } from '../../actions/user'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'


const ResetPassword = () => {
  const { dispatch } = useValue()
  const theme = useTheme();

  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const location = useLocation()
  const { token, id } = queryString.parse(location.search)
  console.log(token, id)

  // useEffect(() => {
  //   resetPassword()
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = passwordRef.current.value
    const confirmPassword = confirmPasswordRef.current.value
    if (password !== confirmPassword) return dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: 'Passwords do not match!' } })
    // verifyToken({token, id}, dispatch)
    await resetPassword({password}, token, id, dispatch)
    
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 300,
            maxWidth: '100%',
            margin: '50px 40px'
          }}
        >
          <Typography variant='h6' color={theme.palette.secondary[300]}>Input Your New Password</Typography>
          <PasswordField {...{ passwordRef }} />
          <PasswordField
            passwordRef={confirmPasswordRef}
            id='confirmPassword'
            label='Confirm Password' />
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

export default ResetPassword