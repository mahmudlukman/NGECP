import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles"
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Loading from './components/Loading'
import Notification from './components/Notification'
import Generator from './components/generators/Generator'
import Dashboard from './pages/dashboard/Dashboard'
import { useValue } from './context/ContextProvider';
import ForgotPassword from './pages/passwordReset/ForgotPassword';
import ResetPassword from './pages/passwordReset/ResetPassword';


function App() {
  const { state: { mode } } = useValue()
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <>
      <Loading />
      <Notification />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='dashboard/*' element={<Dashboard />} />
            <Route path='*' element={<Home />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <Generator />
    </>
  )
}

export default App
