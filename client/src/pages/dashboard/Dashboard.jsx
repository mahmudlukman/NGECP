import { createTheme, styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
  Button,
  useTheme
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { DarkModeOutlined, Home, LightModeOutlined, Menu } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideList from './SideList';
import Protected from '../../components/protected/Protected'
import Login from '../../components/user/Login'
import { useValue } from '../../context/ContextProvider';
import useScrollPosition from './utils/useScrollPosition';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Dashboard() {
  const scrollPosition = useScrollPosition()
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const theme = useTheme()
  const { state: { mode, currentUser }, dispatch } = useValue()
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }),
    [dark]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar elevation={0} sx={{ position: "fixed", background: 'none', bgcolor: scrollPosition > 10 ? "rgba(7,7,16,.7)" : 'transparent', backdropFilter: scrollPosition > 10 && "blur(60px)" }} open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1 }} onClick={() => navigate('/')}>
                <Home />
              </IconButton>
            </Tooltip>
            <Typography
              variant="h6"
              color={theme.palette.secondary.main}
              fontWeight="bold"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              NGECP
            </Typography>
            <Box sx={{ gap: '1rem' }}>
              <IconButton onClick={() => dispatch({ type: 'SET_MODE' })}>
                {theme.palette.mode === 'dark' ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </Box>

          </Toolbar>
        </AppBar>
        <Protected>
          <SideList {...{ open, setOpen }} />
        </Protected>
      </Box>
      <Login />
    </>
  );
}