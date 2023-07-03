import BottomNav from '../../components/BottomNav'
import Notification from "../../components/Notification"
import Login from "../../components/user/Login"
// import { useValue } from '../../context/ContextProvider'

const Home = () => {

  // const {state: {currentUser}} = useValue
  return (
    <>
      <Notification />
      <Login />
      <BottomNav />
    </>
  )
}

export default Home