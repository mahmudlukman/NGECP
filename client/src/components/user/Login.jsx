import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material"
import { Close, Send } from "@mui/icons-material"
import { useValue } from "../../context/ContextProvider"
import { useState, useRef, useEffect } from "react"
import PasswordField from "./PasswordField"
import EmailField from "./EmailField"
import { login, register } from "../../actions/user"
import { Link } from "react-router-dom"

const Login = () => {
  const { state: { openLogin }, dispatch } = useValue()
  const [title, setTitle] = useState('Login')
  const [isRegister, setIsRegister] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    if (!isRegister) return login({ email, password }, dispatch)
    const name = nameRef.current.value
    const phone = phoneRef.current.value
    const confirmPassword = confirmPasswordRef.current.value
    if (password !== confirmPassword) return dispatch({ type: 'UPDATE_ALERT', payload: { open: true, severity: 'error', message: 'Passwords do not match!' } })
    register({ name, email, phone, password }, dispatch)
  }

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login')
  }, [isRegister])

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister &&
            <TextField
              autoFocus
              margin='normal'
              variant='standard'
              id='name'
              label='Full Name'
              type='text'
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          }
          <EmailField {...{emailRef}}/>
          {isRegister &&
            <TextField
              margin='normal'
              variant='standard'
              id='phone'
              label='Phone Number'
              type='number'
              fullWidth
              inputRef={phoneRef}
              inputProps={{ minLength: 2 }}
              required
            />
          }
          <PasswordField {...{ passwordRef }} />
          {isRegister &&
            <PasswordField
              passwordRef={confirmPasswordRef}
              id='confirmPassword'
              label='Confirm Password' />
          }
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: '19px' }}>
          <Link to='/forgot-password'>
            <Button
              size="small"
            >
              Forgot Password?
            </Button>
          </Link>
          <Button type='submit' variant='contained' endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister ? "Do you have an account?" : "Don't you have an account?"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Login