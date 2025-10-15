import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/editprofile.module.css";

const DEFAULT_PIC = "/public/pfp/placeholder.jpg";
const ONE_MB = 1024 * 1024;

const EditProfile = () => {
	const navigate = useNavigate();
	const fileInputRef = useRef(null);
	const [username, setUsername] = useState("");
	const [picture, setPicture] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const storedName = localStorage.getItem("profileUsername") || "Unknown";
		const storedPic = localStorage.getItem("profilePicture") || DEFAULT_PIC;
		setUsername(storedName === "" ? "Unknown" : storedName);
		setPicture(storedPic);
	}, []);

	const onChangeClick = () => {
		setError("");
		fileInputRef.current?.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setError("Please select an image file.");
			return;
		}
		if (file.size > ONE_MB) {
			setError("Image is too large (max 1 MB). Please choose a smaller file.");
			return;
		}

		const reader = new FileReader();
		reader.onload = (ev) => {
			setPicture(ev.target.result);
		};
		reader.readAsDataURL(file);
	};

	const handleSave = () => {
		localStorage.setItem("profileUsername", username || "Unknown");
		localStorage.setItem("profilePicture", picture || DEFAULT_PIC);
			window.dispatchEvent(new Event("profileUpdated"));
			navigate("/profile");
	};

	const handleReset = () => {
		setUsername("Unknown");
		setPicture(DEFAULT_PIC);
		localStorage.removeItem("profileUsername");
		localStorage.removeItem("profilePicture");
	};

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<h1 className={styles.title}>Edit profile</h1>
				<p className={styles.hint}>
					Keep your personal details private. Information you add here is visible to anyone who can view your profile.
				</p>

				<div className={styles.photoRow}>
					<div className={styles.avatarWrap}>
						<img src={picture} alt="profile" className={styles.avatar} />
					</div>
					<div className={styles.photoControls}>
						<button className={styles.changeButton} onClick={onChangeClick}>
							Change
						</button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>
						{error && <div className={styles.error}>{error}</div>}
					</div>
				</div>

				<div className={styles.fieldBox}>
					<label className={styles.label}>Username</label>
					<input
						className={styles.textInput}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className={styles.footerButtons}>
					<button className={styles.resetButton} onClick={handleReset}>
						Reset
					</button>
					<button className={styles.saveButton} onClick={handleSave}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
