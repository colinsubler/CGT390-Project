import React from "react";
import styles from "../styles/topbar.module.css";
import { useNavigate } from "react-router-dom";

const TopBar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.topbar}>
      <input
        type="text"
        placeholder="Search pins..."
        className={styles.search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className={styles.profileButton}
        onClick={() => navigate("/profile")}
      />
    </div>
  );
};

export default TopBar;
