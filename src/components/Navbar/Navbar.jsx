import React, {useState} from "react";
import styles from "./Navbar.module.css"
import {getImageUrl} from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    // TODO: Make this a slide out navbar that occupies whole screen
    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">Portfolio</a>
            <div className={styles.menu}>
                <FontAwesomeIcon 
                    className={styles.menuBtn} 
                    icon={menuOpen ? faTimes: faBars} 
                    onClick={() => setMenuOpen(!menuOpen)} 
                />
                <ul 
                    className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
                    onClick={() => setMenuOpen(false)}
                    >
                    <li><Link to="/favorites">Favorites</Link></li>
                    <li><Link to="/anilist">Anilist</Link></li>
                    <li><Link to="/printing">Printing</Link></li>
                    <li><Link to="/contact">Contact Me</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
