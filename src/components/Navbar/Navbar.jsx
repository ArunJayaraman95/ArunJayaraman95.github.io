import React, {useState} from "react";
import styles from "./Navbar.module.css"
import {getImageUrl} from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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
                    <li><a href="#favorites">Favorites</a></li>
                    <li><a href="#anilist">Anilist</a></li>
                    <li><a href="/printing">Printing</a></li>
                    <li><a href="Contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
