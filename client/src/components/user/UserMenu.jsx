import { Logout, Settings } from '@mui/icons-material'
import { ListItemButton, Menu, MenuItem } from '@mui/material'
import { useValue } from '../../context/ContextProvider'
import useCheckToken from '../../hooks/useCheckToken'

// eslint-disable-next-line react/prop-types
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  useCheckToken()
  const { dispatch } = useValue()
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={Boolean(anchorUserMenu)}
      onClose={handleCloseUserMenu}
      onClick={handleCloseUserMenu}
    >
      <MenuItem>
        <ListItemButton>
          <Settings fontSize='small' />
        </ListItemButton>
        Profile
      </MenuItem>
      <MenuItem onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}>
        <ListItemButton>
          <Logout fontSize='small' />
        </ListItemButton>
        Logout
      </MenuItem>
    </Menu>
  )
}

export default UserMenu