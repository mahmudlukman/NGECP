import { useEffect } from "react"
import { useValue } from "../context/ContextProvider"
import jwtDecode from "jwt-decode"
import { storeGenerator } from "../actions/generator"
import { logout } from "../actions/user"

const useCheckToken = () => {
  const { state: { currentUser, location, details, images, updatedGenerator, deletedImages, addedImages }, dispatch } = useValue()
  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwtDecode(currentUser.token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        storeGenerator(location, details, images, updatedGenerator, deletedImages, addedImages, currentUser.id)
        logout(dispatch)
      }
    }
  })
  return (
    <div>useCheckToken</div>
  )
}

export default useCheckToken