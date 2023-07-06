import { AddLocationAlt, LocationOn, AddHome, Handyman } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import { useRef, useEffect } from 'react'

import Hero from './hero/Hero'
import ClusterMap from './map/ClusterMap'
import Generators from './generators/Generators'
import AddGenerator from './addGenerator/AddGenerator'
import { ref } from 'firebase/storage'
import Protected from './protected/Protected'
import { useValue } from '../context/ContextProvider'


const BottomNav = () => {
  const { state: { section }, dispatch } = useValue()
  const ref = useRef()
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0
  }, [section])
  return (
    <Box ref={ref}>
      {{
        0: <Hero />,
        1: <Protected><ClusterMap /></Protected>,
        2: <Protected><Generators /></Protected>,
        3: <Protected><AddGenerator /></Protected>,
      }[section]}
      <Paper
        elevation={3}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={section}
          onChange={(e, newValue) => dispatch({ type: 'UPDATE_SECTION', payload: newValue })}
          sx={{ "&.Mui-selected": { color: '#388e3c' } }}
        >
          <BottomNavigationAction label='Home' icon={<AddHome />} sx={{ "&.Mui-selected": { color: '#388e3c' } }} />
          <BottomNavigationAction label='Map' icon={<LocationOn />} sx={{ "&.Mui-selected": { color: '#388e3c' } }} />
          <BottomNavigationAction label='Generators' icon={<Handyman />} sx={{ "&.Mui-selected": { color: '#388e3c' } }} />
          <BottomNavigationAction label='Add' icon={<AddLocationAlt sx={{ "&.Mui-selected": { color: '#388e3c' } }} />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav