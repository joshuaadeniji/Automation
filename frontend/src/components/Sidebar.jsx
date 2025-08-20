import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <h3>Navigation</h3>
            <ul>
                <li>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/notes"
                        className={location.pathname === '/notes' ? 'active' : ''}
                    >
                        Notes
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
