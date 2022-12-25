import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute2 = ({ children }) => {
  const authSelector = useSelector((state) => state.auth)

  if (!authSelector.username) {
    return <Navigate replace to="/login" />
  } else if (authSelector.username) {
    return <Navigate replace to="/login" />
  }

  return children
}

export default ProtectedRoute2
