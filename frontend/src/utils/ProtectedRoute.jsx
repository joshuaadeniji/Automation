import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />
  }

  return children // Otherwise render the protected page
}

export default ProtectedRoute
