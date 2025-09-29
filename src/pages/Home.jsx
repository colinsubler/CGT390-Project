import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import HomeTopBar from "../components/HomeTopBar";
import styles from "../styles/home.module.css";

const Home = ({ searchTerm }) => {
  const [pins, setPins] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const url = import.meta.env.BASE_URL + "pins.json";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Get pins stored from CreatePin page
        const localPins = JSON.parse(localStorage.getItem("demoPins")) || [];
        // Prepend local pins so they show first
        setPins([...localPins, ...data]);
      })
      .catch((err) => console.error("Error loading pins:", err));
  }, []);


  const filteredPins = pins.filter((pin) => {
    const matchesTag = selectedTag ? pin.tag === selectedTag : true;
    const matchesSearch = pin.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className={styles.home}>
      <HomeTopBar selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <div className={styles.pinGrid}>
        {filteredPins.map((pin) => (
          <Card key={pin.id} image={pin.image} title={pin.title} username={pin.username} />
        ))}
      </div>
    </div>
  );
};

export default Home;
