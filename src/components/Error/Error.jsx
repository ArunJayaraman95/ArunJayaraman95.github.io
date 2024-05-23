import React from 'react'
import styles from "./Error.module.css"
import { getImageUrl } from '../../utils'
const Error = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContent}>
        <h1 className={styles.title}>
          404
        </h1>
        <h2 className={styles.subtitle}>
          Apologies! This page is either <br/>invalid or in-development.
        </h2>
      </div>
      <div className={styles.image}>
       <img 
        src={getImageUrl("images/megamind.png")}
        alt="Webpage Error"
       />
      </div>
      
    </div>
  )
}

export default Error