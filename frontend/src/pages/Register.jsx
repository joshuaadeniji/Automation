import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        
        try {
            await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password
            })

            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password
            })
            const { access, refresh } = response.data
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)

            navigate('/')
            
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            setError('Registration failed. Try again')
        }
    }

    return (
        <div className="registration">
            <h3>Register</h3>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder='Email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type='submit'>Register</button>

            </form>
        </div>
    )
}
 
export default Register
