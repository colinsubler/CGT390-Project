import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import styles from "../styles/profile.module.css";
import { usePins } from "../context/PinsContext";

const DEFAULT_PIC = `${import.meta.env.BASE_URL}pfp.png`;
const Profile = () => {
    const navigate = useNavigate();
    const { pins, savedPins: savedPinIds, loadPins } = usePins(); 

    const [username, setUsername] = useState("Unknown");
    const [profilePic, setProfilePic] = useState(DEFAULT_PIC);
    const [selectedTab, setSelectedTab] = useState("Created");
    const [copied, setCopied] = useState(false);
    
    const [savedPinObjects, setSavedPinObjects] = useState([]);

    useEffect(() => {
        const storedName = localStorage.getItem("profileUsername");
            const storedPic = localStorage.getItem("profilePicture");
            if (storedName) setUsername(storedName);
                    if (storedPic && storedPic !== "" && storedPic !== "undefined" && storedPic !== "null") {
                        setProfilePic(storedPic);
                    } else {
                        setProfilePic(DEFAULT_PIC);
                    }
        
        const savedObjs = savedPinIds
            .map((id) => pins.find((p) => String(p.id) === String(id)))
            .filter(Boolean);
        setSavedPinObjects(savedObjs);
        
        const onPinsUpdated = () => loadPins();
        const onSavedUpdated = () => loadPins();
        const onStorage = (e) => {
            if (e.key === "savedPins" || e.key === "demoPins") loadPins();
        };

        window.addEventListener("pinsUpdated", onPinsUpdated);
        window.addEventListener("savedUpdated", onSavedUpdated);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener("pinsUpdated", onPinsUpdated);
            window.removeEventListener("savedUpdated", onSavedUpdated);
            window.removeEventListener("storage", onStorage);
        };
    }, [pins, savedPinIds, loadPins]);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const createdPins = pins.filter((p) => p.username === username);

    const pinsToShow = selectedTab === "Created" ? createdPins : savedPinObjects;

    return (
        <div className={styles.profile}>
            <div className={styles.header}>
                        <div className={styles.avatarWrapper}>
                            <img src={profilePic || DEFAULT_PIC} alt="profile" className={styles.avatar} />
                        </div>
                <div className={styles.username}>{username}</div>

                <div className={styles.buttonRow}>
                    <button className={styles.shareButton} onClick={handleShare}>
                        Share
                    </button>
                    <button
                        className={styles.editButton}
                        onClick={() => navigate("/edit-profile")}
                    >
                        Edit Profile
                    </button>
                    {copied && <div className={styles.copiedToast}>Link Copied</div>}
                </div>

                <div className={styles.tabRow}>
                    {["Created", "Saved"].map((t) => (
                        <button
                            key={t}
                            className={`${styles.tabButton} ${selectedTab === t ? styles.active : ""}`}
                            onClick={() => setSelectedTab(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.pinGrid}>
                {pinsToShow.length > 0 ? (
                    pinsToShow.map((pin) => (
                        <Card
                            key={pin.id}
                            id={pin.id}
                            image={pin.image}
                            title={pin.title}
                            username={pin.username}
                        />
                    ))
                ) : (
                    <div className={styles.emptyMessage}>
                        {selectedTab === "Created"
                            ? "You haven't created any posts yet."
                            : "You haven't saved any pins yet."}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;