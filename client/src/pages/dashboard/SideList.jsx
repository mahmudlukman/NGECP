import {
  ChevronLeft,
  Dashboard,
  Handyman,
  LocationOn,
  Logout,
  MarkChatUnread,
  NotificationsActive,
  PeopleAlt,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useValue } from '../../context/ContextProvider';
import Main from './main/Main';
import Messages from './messages/Messages';
import Generators from './generators/Generators';
import Users from './users/Users';
import { logout } from '../../actions/user';
import { storeGenerator } from '../../actions/generator';
import useCheckToken from '../../hooks/useCheckToken'
import isAdmin from './utils/isAdmin';
import ClusterMap from './map/ClusterMap';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const SideList = ({ open, setOpen }) => {
  useCheckToken()
  const {
    state: { currentUser, location, details, images, updatedGenerator, deletedImages, addedImages },
    dispatch,
  } = useValue();
  const theme = useTheme()

  const [selectedLink, setSelectedLink] = useState('');

  const list = useMemo(
    () => [
      ...isAdmin(currentUser) ? [
        {
          title: 'Main',
          icon: <Dashboard />,
          link: '',
          component: <Main {...{ setSelectedLink, link: '' }} />,
        },
        {
          title: 'Map',
          icon: <LocationOn />,
          link: 'map',
          component: <ClusterMap {...{ setSelectedLink, link: 'map' }} />,
        },
        {
          title: 'Users',
          icon: <PeopleAlt />,
          link: 'users',
          component: <Users {...{ setSelectedLink, link: 'users' }} />,
        },
      ] : [],
      {
        title: 'Generators',
        icon: <Handyman />,
        link: 'generators',
        component: <Generators {...{ setSelectedLink, link: 'generators' }} />,
      },
      {
        title: 'Messages',
        icon: <MarkChatUnread />,
        link: 'messages',
        component: <Messages {...{ setSelectedLink, link: 'messages' }} />,
      },
    ],
    []
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    storeGenerator(location, details, images, updatedGenerator, deletedImages, addedImages, currentUser.id)
    logout(dispatch)
  }

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
          }
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box>
          <List >
            {list.map((item) => (
              <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(item.link)}
                  selected={selectedLink === item.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
          <Tooltip title={currentUser?.name || ''}>
            <Avatar
              src={currentUser?.photoURL}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {open && <Typography>{currentUser?.name}</Typography>}
          <Typography variant="body2">{currentUser?.role || 'role'}</Typography>
          {open && (
            <Typography variant="body2">{currentUser?.email}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          <Route path='*' element={isAdmin(currentUser) ? (
            <Main {...{ setSelectedLink, link: '' }} />
          ) : (
            <Generators {...{ setSelectedLink, link: 'generators' }} />
          )} />
        </Routes>
      </Box>
    </>
  );
};

export default SideList;