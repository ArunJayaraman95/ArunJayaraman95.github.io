import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./About.module.css";

// TODO: In-page links?
// TODO: Tags in the about section to external pages

const About = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>About</h2>
            <div className={styles.content}>
                <img
                    className={styles.aboutImage}
                    src={getImageUrl("images/squareph.png")}
                    alt="About image"
                />
                <ul className={styles.aboutItems}>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("images/squareph.png")} alt="" />
                        <div className={styles.aboutItemText}>
                            <h3>Software Engineering</h3>
                            <p>Experience developing in Python and C++</p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("images/squareph.png")} alt="" />
                        <div className={styles.aboutItemText}>
                            <h3>3D Printing</h3>
                            <p>Printing design pieces</p>
                        </div>
                    </li>
                    <li className={styles.aboutItem}>
                        <img src={getImageUrl("images/squareph.png")} alt="" />
                        <div className={styles.aboutItemText}>
                            <h3>Painting</h3>
                            <p>Animation</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default About;
