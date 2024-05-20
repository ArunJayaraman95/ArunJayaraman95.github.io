import React from "react";
import { getImageUrl } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <FontAwesomeIcon icon={faEnvelope} />
          <a href="mailto:riparun.aj@gmail.com">riparun.aj@gmail.com</a>
        </li>
        <li className={styles.link}>
          <FontAwesomeIcon icon={faLinkedin} />
          <a
            href="https://www.linkedin.com/in/arun-jayaraman-a158011a3/"
            target="blank"
          >
            LinkedIn
          </a>
        </li>
        <li className={styles.link}>
          <FontAwesomeIcon icon={faGithub} />
          <a href="https://github.com/ArunJayaraman95" target="blank">
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Contact;
