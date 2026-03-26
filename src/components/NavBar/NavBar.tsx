import { Link, useLocation } from "react-router-dom";
import { translations } from "../../locales/translate";
import { useLanguage } from "../../context/LanguageContext";
import LangButton from "../LangButton/LangButton";
import styles from './Navbar.module.css';


function NavBar(){
    let location = useLocation();
    const {language} = useLanguage();
    const t = translations[language].nav

    return(
        <nav className={styles.navbar}>
            <div className={styles.logo}>CINE</div>
            <div className={styles.langButtonDiv}>
                <LangButton/>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link 
                    to="/"
                    className={location.pathname === "/" ? styles.active : ""}>{t.searchTitle}</Link>
                </li>
                <li>
                    <Link 
                    to="/favorites"
                    className={location.pathname === "/favorites" ? styles.active : ""}>{t.favTitle}</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;