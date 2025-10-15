import React, { useEffect, useState } from "react";
import styles from "../styles/topbar.module.css";
import { useNavigate } from "react-router-dom";

const TopBar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePicture") || "/pfp/placeholder.jpg"
  );

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "profilePicture") {
        setProfilePic(e.newValue || "/pfp/placeholder.jpg");
      }
    };

    const onProfileUpdated = () => {
      const pic = localStorage.getItem("profilePicture") || "/pfp/placeholder.jpg";
      setProfilePic(pic);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("profileUpdated", onProfileUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("profileUpdated", onProfileUpdated);
    };
  }, []);

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
        style={{ backgroundImage: `url(${profilePic})` }}
      />
    </div>
  );
};

export default TopBar;
