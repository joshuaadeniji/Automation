import { useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const useUtilities = () => {
  const { isAuthenticated, logout } = useAuth()

  return { logout, isAuthenticated }
}

export default useUtilities
