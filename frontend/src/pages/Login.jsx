import { useState } from "react"
import axios from "axios"
import './Login.css'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8000/api/token/', {username, password})
            const { access, refresh } = response.data
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)

            navigate('/')
        
        } catch (err) {
            setError('Invalid Login Credentials')
        }
    }
    
    return (
        <div>
            <h3>Login</h3>
            { error && <p className="error">{ error }</p> }
                <form onSubmit={ handleLogin }>
                <input
                    type="text"
                    placeholder="Username"
                    value={ username }
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

        </div>
     )
}
 
export default Login;