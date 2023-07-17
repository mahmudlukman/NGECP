import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { Lock, Menu } from "@mui/icons-material"
import { useValue } from "../context/ContextProvider"
import UserIcons from "./user/UserIcons"
import { useState } from "react"
import Sidebar from "./sidebar/Sidebar"


const NavBar = () => {
  const { state: { currentUser }, dispatch } = useValue()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <AppBar sx={{
        background:
          '#388e3c',
      }}>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton size="large" color="inherit" onClick={() => setIsOpen(true)}>
                <Menu />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, }}
            >
              NCECP
            </Typography>
            {!currentUser ? (
              <Button color="inherit" startIcon={<Lock />} onClick={() => dispatch({ type: 'OPEN_LOGIN' })}>
                Login
              </Button>
            ) : (<UserIcons />)}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <Sidebar {...{ isOpen, setIsOpen }} />
    </>
  )
}

export default NavBar