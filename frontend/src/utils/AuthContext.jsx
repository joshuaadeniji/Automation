import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("access_token"))
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refresh_token"))
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("access_token"))

  // Keep tokens in sync with localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("access_token", accessToken)
    } else {
      localStorage.removeItem("access_token")
    }

    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken)
    } else {
      localStorage.removeItem("refresh_token")
    }
    
    // Update isAuthenticated based on accessToken
    setIsAuthenticated(!!accessToken)
  }, [accessToken, refreshToken])

  const login = async (username, password) => {
    try {
      // In a real app, you would make an API call here
      // For now, we'll simulate a successful login
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      const { access, refresh } = data
      
      setAccessToken(access)
      setRefreshToken(refresh)
      setIsAuthenticated(true)
      
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    setAccessToken(null)
    setRefreshToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
