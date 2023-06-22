import Loading from "./components/Loading"
import Notification from "./components/Notification"
import Login from "./components/user/Login"
import Home from "./pages/Home/Home"


function App() {

  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <Home />
    </>
  )
}

export default App
