import { Link, useLocation } from "react-router-dom";
import '../styles/navBar.css'

function NavBar(){
    let location = useLocation();

    return(
        <nav className="navbar">
            <div className="logo">CINE</div>
            <ul className="nav-links">
                <li>
                    <Link 
                    to="/"
                    style={{textDecoration: "none", 
                        color: '#1A1A1A', 
                        fontSize: '24px'}}
                    className={location.pathname === "/" ? "active" : ""}>ПОИСК</Link>
                </li>
                <li>
                    <Link 
                    to="/favorites"
                    style={{textDecoration: "none", 
                            color: '#1A1A1A', 
                            fontSize: '24px'}}
                    className={location.pathname === "/favorites" ? "active" : ""}>ИЗБРАННОЕ</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;