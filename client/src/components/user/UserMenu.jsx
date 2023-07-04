import { Menu, MenuItem } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'
import useCheckToken from '../../hooks/useCheckToken'
import Profile from './Profile'
import { storeGenerator } from '../../actions/generator'
import { useEffect } from 'react'
import { logout } from '../../actions/user'

// eslint-disable-next-line react/prop-types
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken()
  const { dispatch, state: { currentUser, location, details, images, updatedGenerator, deletedImages, addedImages } } = useValue()

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  const navigate = useNavigate()

  const handleLogout = () => {
    storeGenerator(location, details, images, updatedGenerator, deletedImages, addedImages, currentUser.id)
    logout(dispatch)
  }

  useEffect(() => {
    const storeBeforeLeave = (e) => {
      if (storeGenerator(location, details, images, updatedGenerator, deletedImages, addedImages, currentUser.id)) {
        e.preventDefault()
        e.returnValue = true
      }
    }
    window.addEventListener('beforeunload', storeBeforeLeave)
    return () => window.removeEventListener('beforeunload', storeBeforeLeave)
  }, [location, details, images])

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        <MenuItem onClick={() => dispatch({ type: 'UPDATE_PROFILE', payload: { open: true, file: null, photoURL: currentUser?.photoURL } })}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate('dashboard')}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
      <Profile />
    </>
  )
}

export default UserMenu