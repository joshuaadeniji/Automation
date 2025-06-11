import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor to attach the JWT token to every request

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Handle expired access tokens

navigate = useNavigate()

axiosInstance.interceptors.request.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // check if the error is due to an expired access token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = True

            try {
                // attempt to refresh token
                const refreshToken = localStorage.getItem('refresh_token')
                const response = await axios.post('http://localhost:8000/api/token/refresh', {
                    refresh: refreshToken
                })

                const { access } = response.data
                localStorage.setItem('access_token', access)

                // update header and retry original requet

                axiosInstance.defaults.headers['Authorization'] = `Bearer ${access}`
                originalRequest.headers['Authorization'] = `Bearer ${access}`
                return axiosInstance(originalRequest)
            } catch (err) {
            // logout if refresh token failed
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            navigate('/login')
            return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
