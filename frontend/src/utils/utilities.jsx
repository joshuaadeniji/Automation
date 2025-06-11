import { useNavigate } from "react-router-dom"


const utilities = () => {
    const navigate = useNavigate()

    const isAuthenticated = !!localStorage.getItem('access_token')

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
    }

    /*
    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login')
        }
    }, [navigate])
    
    */

    return { logout, isAuthenticated }
}
 
export default utilities
