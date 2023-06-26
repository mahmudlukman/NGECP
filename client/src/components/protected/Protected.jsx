import { useValue } from "../../context/ContextProvider"
import AccessMessage from "./AccessMessage"


// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {
  const { state: { currentUser } } = useValue()
  return currentUser ? children : <AccessMessage />
}

export default Protected