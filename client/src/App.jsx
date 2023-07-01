import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Dashboard from './pages/dashboard/Dashboard'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='dashboard/*' element={<Dashboard />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
