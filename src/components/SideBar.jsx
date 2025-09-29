import React from "react";
import styles from "../styles/sidebar.module.css";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <button
        className={`${styles.sidebarButton} ${styles.homeButton}`}
        onClick={() => navigate("/")}
      />
      <button
        className={`${styles.sidebarButton} ${styles.addButton}`}
        onClick={() => navigate("/create")}
      />
    </div>
  );
};

export default SideBar;
