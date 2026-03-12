import { Link, useLocation } from "react-router-dom";

function NavBar(){
    let location = useLocation();

    return(
        <nav className="navbar">
            <div className="logo">CINE</div>
            <ul className="nav-links">
                <li>
                    <Link 
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}>ПОИСК</Link>
                </li>
                <li>
                    <Link 
                    to="/favorites"
                    className={location.pathname === "/favorites" ? "active" : ""}>ИЗБРАННОЕ</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;