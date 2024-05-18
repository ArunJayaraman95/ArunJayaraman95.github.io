import React, {useState} from "react";
import styles from "./Navbar.module.css"
import {getImageUrl} from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href="/">Portfolio</a>
            <div className={styles.menu}>
                <FontAwesomeIcon icon={faBars}/>
                <ul className={styles.menuItems}>
                    <li><a href="#favorites">Favorites</a></li>
                    <li><a href="#anilist">Anilist</a></li>
                    <li><a href="#printing">Printing</a></li>
                    <li><a href="Contact">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
