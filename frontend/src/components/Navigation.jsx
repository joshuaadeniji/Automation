import { useNavigate, BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import utilities from "../utils/utilities"
import './Navigation.css'


const Navigation = () => {
    const { logout, isAuthenticated } = utilities()

    return (
        <div className="navigation">
            <Link to={'/'}><h3 className="logo">Logo</h3></Link>
            {isAuthenticated &&

                <div className="nav-buttons">
                    <button className="logout" onClick={ logout }>Logout</button>
                </div>
            }

            {!isAuthenticated &&
                <div className="login-signup">
                    <Link to={ '/login' }><button className="login-logout">Login</button></Link>
                    <Link to={ '/register' }><button className="login-logout">Sign Up</button></Link>
                </div>
            }
        </div>

    )
}

export default Navigation
