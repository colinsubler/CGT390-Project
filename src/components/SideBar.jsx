import React from 'react';
import styles from '../styles/sidebar.module.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.button}>Home</Link>
      <Link to="/create-pin" className={styles.button}>Create Pin</Link>
    </div>
  );
};

export default SideBar;
