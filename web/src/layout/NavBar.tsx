import plusgrade from '../assets/plusgrade.png'
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return <nav className="nav-bar">
        <img src={plusgrade} alt="plusgrade" />
        <ul className="nav-links">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/reservations">Reservations</NavLink>
            </li>
            <li><NavLink to="/about">About</NavLink>
            </li>
        </ul>
    </nav>
}
