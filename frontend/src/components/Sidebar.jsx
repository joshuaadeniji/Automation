import './Sidebar.css'
import { Link } from 'react-router-dom'
import utilities from "../utils/utilities"

const Sidebar = () => {

    return (
        <div className="sidebar">
            <ul>
                <li className='nav-list'>
                    <Link to={'/notes'}><button className="notes">Notes</button></Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
