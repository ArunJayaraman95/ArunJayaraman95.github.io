import React from "react";
import PropTypes from 'prop-types';
import styles from "./Spool.module.css";

const Spool = (props) => {
  return (
    <div className={styles.container}>
      <div 
        className={styles.pie} 
        style={{background: props.hex}}
      >
        <h3>{props.grams} g</h3>
      </div>
      <h3 className={styles.colorName}>{props.color}</h3>
    </div>
  );
};

Spool.propTypes = {
  color: PropTypes.string,
  hex: PropTypes.string,
  grams: PropTypes.number,
}
Spool.defaultProps = {
  color: "Invalid",
  hex: "#000000",
  grams: 0,
}

export default Spool;
