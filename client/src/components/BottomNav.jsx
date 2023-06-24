import { AddLocationAlt, LocationOn, AddHome, Handyman } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import { useRef, useEffect } from 'react'
// import ClusterMap from './map/ClusterMap'
// import Rooms from './rooms/Rooms'
// import AddRoom from './addRoom/AddRoom'
// import Protected from './protected/Protected'
import { useState } from 'react'
import Hero from './hero/Hero'
import ClusterMap from './map/ClusterMap'
import Generators from './generators/Generators'
import AddGenerator from './addGenerator/AddGenerator'
import { ref } from 'firebase/storage'


const BottomNav = () => {
  const [value, setValue] = useState(0)
  const ref = useRef()
  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0
  })
  return (
    <Box ref={ref}>
      {{
        0: <Hero />,
        1: <ClusterMap />,
        2: <Generators />,
        3: <AddGenerator />,
      }[value]}
      <Paper
        elevation={3}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label='Home' icon={<AddHome />} />
          <BottomNavigationAction label='Map' icon={<LocationOn />} />
          <BottomNavigationAction label='Generators' icon={<Handyman />} />
          <BottomNavigationAction label='Add' icon={<AddLocationAlt />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav