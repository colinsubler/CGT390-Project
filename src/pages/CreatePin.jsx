import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/createpin.module.css";

const TAG_OPTIONS = ["Nature", "Food", "Work", "Fitness", "Art", "Other"];

const CreatePin = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(TAG_OPTIONS[0]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File size must be under 5MB");
      setImageFile(null);
    } else {
      setError("");
      setImageFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!imageFile && !imageURL.trim()) {
      setError("Please upload an image or provide a URL");
      return;
    }

    const reader = new FileReader();
    if (imageFile) {
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        savePin(reader.result);
      };
    } else {
      savePin(imageURL.trim());
    }
  };

  const savePin = (imageSrc) => {
    const newPin = {
      id: Date.now(),
      image: imageSrc,
      title: title.trim().slice(0, 20),
      description: description.trim().slice(0, 500),
      tag,
      username: localStorage.getItem("profileUsername") || "Unknown",
    };

    const existingPins = JSON.parse(localStorage.getItem("demoPins")) || [];
    localStorage.setItem(
      "demoPins",
      JSON.stringify([newPin, ...existingPins])
    );
    window.dispatchEvent(new Event("pinsUpdated"));

    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.imageCard}>
          {imageFile ? (
            <img src={URL.createObjectURL(imageFile)} alt="Preview" />
          ) : (
            <div className={styles.placeholder}>Upload Image</div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <input
          type="text"
          placeholder="Or enter image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className={styles.urlInput}
        />
      </div>
      <div className={styles.rightColumn}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title (max 20 chars)"
            maxLength={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
          />
          <textarea
            placeholder="Description (max 500 chars)"
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textareaField}
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className={styles.selectField}
          >
            {TAG_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.postButton}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePin;
