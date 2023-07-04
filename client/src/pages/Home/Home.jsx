import BottomNav from '../../components/BottomNav'
import Navbar from "../../components/NavBar"
import Login from "../../components/user/Login"
// import { useValue } from '../../context/ContextProvider'

const Home = () => {

  // const {state: {currentUser}} = useValue
  return (
    <>
      <Navbar />
      <Login />
      <BottomNav />
    </>
  )
}

export default Home