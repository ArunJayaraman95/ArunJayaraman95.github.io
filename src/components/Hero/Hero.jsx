import React from 'react'
import { getImageUrl } from '../../utils'
import styles from './Hero.module.css'


const Hero = () => {
  return (
    <section className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm Arun</h1>
            <p className={styles.description}>I'm a computer engineer that likes to 3D print stuff! Lorem30</p>
            <a className={styles.contactBtn} href="mailto:riparun.aj@gmail.com">Contact Me</a>
        </div>
        <img 
            className={styles.heroImg} 
            src={getImageUrl("images/logo.png")} 
            alt="Logo" 
        />
        <div className={styles.topBlur}></div>
        <div className={styles.bottomBlur}></div>
    </section>
  )
}

export default Hero