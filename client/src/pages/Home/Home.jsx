import BottomNav from '../../components/BottomNav'
import NavBar from '../../components/NavBar'
import Loading from "../../components/Loading"
import Notification from "../../components/Notification"
import Room from "../../components/generators/Generator"
import Login from "../../components/user/Login"
// import { useValue } from '../../context/ContextProvider'

const Home = () => {

  // const {state: {currentUser}} = useValue
  return (
    <>
      <NavBar />
      <Loading />
      <Notification />
      <Login />
      <Room />
      <BottomNav />
    </>
  )
}

export default Home