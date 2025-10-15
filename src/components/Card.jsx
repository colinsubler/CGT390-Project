import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "../styles/card.module.css";

const Card = ({ id, image, title, username }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/pin/${id}`)}>
      <div className={styles.cardImageContainer}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.username}>@{username}</div>
      </div>
      <div className={styles.cardTitle}>{title}</div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Card;
