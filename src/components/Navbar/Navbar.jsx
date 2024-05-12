import React from "react";
import './Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
    <>
        <nav className="nav-wrapper">
        
            <div className="nav-content">
                <img className="logo" src="https://t3.ftcdn.net/jpg/03/15/08/30/360_F_315083065_hjHTD5DXBvwaPSNJjRWlcNLVuaZkHrsp.jpg" alt="Logo" />
                <ul>
                    <li><a className="menu-item" href="">Home</a></li>
                    <li><a className="menu-item" href="">Favorites</a></li>
                    <li><a className="menu-item" href="">AniList</a></li>
                    <li><a className="menu-item" href="">Contact</a></li>
                
                    <button className="contact-btn" onClick={() => {}}>Prints</button>
                </ul>

                <button className="menu-btn" onClick={() => {}}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </nav>
    </>
    )
}

export default Navbar