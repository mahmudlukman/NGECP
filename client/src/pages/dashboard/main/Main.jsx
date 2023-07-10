import { Group, Handyman } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { getGenerators } from '../../../actions/generator';
import { getUsers } from '../../../actions/user';
import { useValue } from '../../../context/ContextProvider';
import moment from 'moment';
import AreaGeneratorsUsers from './AreaGeneratorUsers'
import BarGeneratorUsageType from './BarGeneratorUsageType'
import Header from '../../../components/Header';

const Main = ({ setSelectedLink, link }) => {
  const theme = useTheme()
  const {
    state: { generators, users, currentUser },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (generators.length === 0) getGenerators(dispatch);
    if (users.length === 0) getUsers(dispatch, currentUser);
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="welcome to your dashboard" />
      <Box
        sx={{
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: 'repeat(3,1fr)',
          gridAutoRows: 'minmax(100px, auto)',
          gap: 3,
          textAlign: 'center',
          flexDirection: 'column',
        }}
      >
        <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.alt, }} >
          <Typography variant="h4">Total Users</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">{users.length}</Typography>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.alt, }}>
          <Typography variant="h4">Total Generators</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Handyman sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
            <Typography variant="h4">{generators.length}</Typography>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4', backgroundColor: theme.palette.background.alt, }}>
          <Box>
            <Typography>Recently added Users</Typography>
            <List>
              {users.slice(0, 4).map((user, i) => (
                <Box key={user._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={user?.name} src={user?.photoURL} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.name}
                      secondary={`Time Created: ${moment(user?.createdAt).format(
                        'YYYY-MM-DD H:mm:ss'
                      )}`}
                    />
                  </ListItem>
                  {i !== 3 && <Divider variant="inset" />}
                </Box>
              ))}
            </List>
          </Box>
          <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
          <Box>
            <Typography>Recently added Generators</Typography>
            <List>
              {generators.slice(0, 4).map((generator, i) => (
                <Box key={generator._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={generator?.company}
                        src={generator?.images[0]}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={generator?.company}
                      secondary={`Added: ${moment(generator?.createdAt).fromNow()}`}
                    />
                  </ListItem>
                  {i !== 3 && <Divider variant="inset" />}
                </Box>
              ))}
            </List>
          </Box>
        </Paper>
        {/* <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <BarGeneratorUsageType />
      </Paper> */}
        <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3', backgroundColor: theme.palette.background.alt, }}>
          <AreaGeneratorsUsers />
        </Paper>
      </Box>
    </Box>
  );
};

export default Main;