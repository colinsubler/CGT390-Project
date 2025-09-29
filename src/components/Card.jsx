import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/card.module.css";

const Card = ({ image, title, username }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.username}>@{username}</div>
      </div>
      <div className={styles.cardTitle}>{title}</div>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Card;
