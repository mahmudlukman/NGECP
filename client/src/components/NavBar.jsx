import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { Lock, Menu } from "@mui/icons-material"

const NavBar = () => {
  return (
    <AppBar>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit">
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
          {/* <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            NCECP
          </Typography> */}
          <Button color="inherit" startIcon={<Lock />}>
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar