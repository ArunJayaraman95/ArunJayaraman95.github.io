import React from 'react'
import styles from "./Inventory.module.css";
import Spool from '../Spool/Spool';
import filaments from "../../data/filaments.json";

// TODO: json file the spool colors: name, g, hexCode
const Inventory = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Available Colors (PLA)</h2>
      <div className={styles.spoolList}>
        {filaments.map((filament, id) => {
          return <Spool
            key={id}
            className={styles.spoolItem}
            color={filament.color}
            grams={filament.grams}
            hex={filament.hex}
          />
        })}
      </div>
    </div>
  )
}

export default Inventory