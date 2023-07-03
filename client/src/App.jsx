import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Loading from './components/Loading'
import Notification from './components/Notification'
import Generator from './components/generators/Generator'
import Dashboard from './pages/dashboard/Dashboard'


function App() {

  return (
    <>
      <Loading />
      <Notification />
      <BrowserRouter>
        <Routes>
          <Route path='dashboard/*' element={<Dashboard />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Generator />
    </>
  )
}

export default App
