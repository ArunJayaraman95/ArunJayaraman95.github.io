import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./Footer.module.css";
import { faCcPaypal, faGithub, faInstagram, faLinkedin, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className={styles.wholeFooter}>
      <div className={styles.container}>
        <div className={styles.socials}>
          <FontAwesomeIcon 
            className={styles.social}
            icon={faGithub}
          />
          <FontAwesomeIcon 
            className={styles.social}
            icon={faCcPaypal}
          />
          <FontAwesomeIcon 
            className={styles.social}
            icon={faLinkedin}
          />
          <FontAwesomeIcon 
            className={styles.social}
            icon={faEnvelope}
          />
        </div>
        <div className={styles.copyright}>
          <h2 className={styles.name}>Arun Jayaraman</h2>
          <h3 className={styles.copyrightsymbol}>&copy; Copyright 2024</h3>
          <h3 className={styles.rights}>All rights reserved. Powered by React.js and Sass</h3>
        </div>
      </div>
    </div>
  )
}

export default Footer