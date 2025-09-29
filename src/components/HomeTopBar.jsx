import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/homeTopBar.module.css";

const tags = ["All", "Nature", "Food", "Work", "Fitness", "Art"];

const HomeTopBar = ({ selectedTag, setSelectedTag }) => {
  return (
    <div className={styles.topBar}>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`${styles.tagButton} ${
            selectedTag === tag || (tag === "All" && selectedTag === "") ? styles.active : ""
          }`}
          onClick={() => setSelectedTag(tag === "All" ? "" : tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

HomeTopBar.propTypes = {
  selectedTag: PropTypes.string.isRequired,
  setSelectedTag: PropTypes.func.isRequired,
};

export default HomeTopBar;
