import { Link, useLocation } from "react-router-dom";
import styles from './Navbar.module.css';

function NavBar(){
    let location = useLocation();

    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>CINE</div>
            <ul className={styles.navLinks}>
                <li>
                    <Link 
                    to="/"
                    className={location.pathname === "/" ? styles.active : ""}>ПОИСК</Link>
                </li>
                <li>
                    <Link 
                    to="/favorites"
                    className={location.pathname === "/favorites" ? styles.active : ""}>ИЗБРАННОЕ</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;