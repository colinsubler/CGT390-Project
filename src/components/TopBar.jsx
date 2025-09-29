import React from 'react';
import styles from '../styles/topbar.module.css';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.topbar}>
      <input type="text" placeholder="Search pins..." className={styles.search} />
      <button className={styles.profileButton} onClick={() => navigate('/profile')}>
        Profile
      </button>
    </div>
  );
};

export default TopBar;
