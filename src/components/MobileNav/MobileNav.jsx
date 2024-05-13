import React from 'react'
import './MobileNav.css'
import reactSvg from "../../assets/images/react.svg"

const MobileNav = ({ isOpen, toggleMenu }) => {
  return (
    <>
    <div 
        className={`mobile-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
    >

        <div className="mobile-menu-container">
            <img src={reactSvg} alt="logo stuff" className="logo" />

            <ul>
                <li><a className="menu-item" href="">Home</a></li>
                <li><a className="menu-item" href="">Favorites</a></li>
                <li><a className="menu-item" href="">AniList</a></li>
                <li><a className="menu-item" href="">Contact</a></li>

                <button className="contact-btn" onClick={() => {}}>
                    Hire Me
                </button>
            </ul>
        </div>
    </div>
    </>
  )
}

export default MobileNav