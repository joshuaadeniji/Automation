import { Link } from "react-router-dom"
import './Navigation.css'

const LoginRegister = () => {

    return (        
        <div className="login-signup">
            <Link to={ '/login' }><button className="login-logout">Login</button></Link>
            <Link to={ '/register' }><button className="login-logout">Sign Up</button></Link>
        </div>
    )
}

export default LoginRegister
