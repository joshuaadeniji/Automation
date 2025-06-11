import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    // Optionally prevent flicker or return null while redirecting
    
    if (!token) return null

    return children
}

export default ProtectedRoute
