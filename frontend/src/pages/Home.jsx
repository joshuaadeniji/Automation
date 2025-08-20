import { useAuth } from "../utils/AuthContext"

const Home = () => {
    const { isAuthenticated } = useAuth()

    return (
        <div className="card">
            <h2 className="card-title">Welcome to the Notes App</h2>
            <p className="mb-3">
                {isAuthenticated
                    ? "You are successfully logged in. You can now access your notes."
                    : "Please log in to access your notes."}
            </p>
            <div className="d-flex justify-content-between">
                <div className="feature-card">
                    <h3>📝 Create Notes</h3>
                    <p>Create and manage your personal notes with ease.</p>
                </div>
                <div className="feature-card">
                    <h3>🔒 Secure</h3>
                    <p>Your notes are securely stored and only accessible to you.</p>
                </div>
                <div className="feature-card">
                    <h3>📱 Access Anywhere</h3>
                    <p>Access your notes from any device, anytime.</p>
                </div>
            </div>
        </div>
    )
}
 
export default Home