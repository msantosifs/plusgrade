import plusgrade from '../assets/plusgrade.png'
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return <nav className="nav-bar">
        <img src={plusgrade} alt="plusgrade" />
        <ul className="nav-links">
            <li>
                <NavLink to="/">Reservations</NavLink>
            </li>
        </ul>
    </nav>
}
