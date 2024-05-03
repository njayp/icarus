import './App.css'
import { Outlet } from 'react-router-dom'
import { Box, Divider } from '@mui/material'
import { Header } from './header'

function App() {
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Header />
      <Divider />
      <Outlet />
    </Box>
  )
}

export default App
