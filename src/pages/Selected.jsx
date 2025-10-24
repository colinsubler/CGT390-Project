import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/selected.module.css";
import { usePins } from "../context/PinsContext";

const randomLikes = () => Math.floor(Math.random() * 500) + 1;

const Selected = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pins, savedPins, setSavedPins } = usePins();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const BASE = import.meta.env.BASE_URL || "/";

  const pin = useMemo(() => pins.find((p) => String(p.id) === String(id)), [pins, id]);
  const saved = useMemo(() => savedPins.includes(pin?.id), [savedPins, pin]);

  useEffect(() => {
    if (pin) {
      const storedLike = JSON.parse(localStorage.getItem(`likes:${pin.id}`));
      const likedPins = JSON.parse(localStorage.getItem("likedPins")) || [];
      const isLiked = likedPins.includes(pin.id);
      if (storedLike != null) setLikes(storedLike);
      else setLikes(pin.username === (localStorage.getItem("profileUsername") || "Unknown") ? 0 : randomLikes());
      setLiked(isLiked);
    }
  }, [pin]);

  const toggleLike = () => {
    if (!pin) return;
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : Math.max(0, likes - 1);
    setLiked(newLiked);
    setLikes(newLikes);

    localStorage.setItem(`likes:${pin.id}`, JSON.stringify(newLikes));
    const likedPins = JSON.parse(localStorage.getItem("likedPins")) || [];
    if (newLiked) {
      localStorage.setItem("likedPins", JSON.stringify([...likedPins, pin.id]));
    } else {
      localStorage.setItem(
        "likedPins",
        JSON.stringify(likedPins.filter((i) => i !== pin.id))
      );
    }
  };

  const handleSave = () => {
    if (!pin) return;
    const savedList = JSON.parse(localStorage.getItem("savedPins")) || [];
    let newList;
    
    if (savedList.includes(pin.id)) {
      newList = savedList.filter((id) => id !== pin.id);
    } else {
      newList = [pin.id, ...savedList];
    }
    
    localStorage.setItem("savedPins", JSON.stringify(newList));
    
    setSavedPins(newList);

    window.dispatchEvent(new Event("pinsUpdated"));
    window.dispatchEvent(new Event("savedUpdated"));
  };

  const handleShare = async () => {
    if (!pin) return;
    const link = `${window.location.origin}${window.location.pathname}`;
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!pin) {
    return <div style={{ padding: 24 }}>Pin not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.topLeftIcons}>
            <button className={styles.iconButton} onClick={toggleLike}>
              <img src={`${BASE}heart${liked ? "-fill" : ""}.png`} alt="like" />
            </button>
            <button className={styles.iconButton} onClick={handleShare}>
              <img src={`${BASE}share.png`} alt="share" />
            </button>
          </div>
          <div className={styles.topRightArea}>
            <div className={styles.username} onClick={() => navigate("/profile")}>{pin.username}</div>
            <button className={styles.saveButton} onClick={handleSave}>{saved ? "Saved" : "Save"}</button>
          </div>
        </div>

        <div className={styles.imageWrap}>
          <img src={pin.image} alt={pin.title} className={styles.image} />
        </div>

        <div className={styles.metaArea}>
          <div className={styles.countLikes}>{likes} likes</div>
          <div className={styles.title}>{pin.title}</div>
          {pin.description && <div className={styles.description}>{pin.description}</div>}
          {pin.tag && <div className={styles.tag}>{pin.tag}</div>}
        </div>
      </div>
    </div>
  );
};

export default Selected;