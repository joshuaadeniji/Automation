import { useAuth } from "../utils/AuthContext"
import './Navigation.css'

const Navigation = () => {
    const { logout, isAuthenticated } = useAuth()

    return (
        <div className="navigation">
            <div className="logo">Notes App</div>
            {isAuthenticated && (
                <div className="nav-buttons">
                    <button className="btn btn-secondary" onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Navigation
