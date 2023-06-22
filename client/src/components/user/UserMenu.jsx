import { Logout, Settings } from '@mui/icons-material'
import { ListItemButton, Menu, MenuItem } from '@mui/material'
import { useValue } from '../../context/ContextProvider'

// eslint-disable-next-line react/prop-types
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
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