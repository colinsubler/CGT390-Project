import React, { useState, useMemo } from "react";
import Card from "../components/Card";
import HomeTopBar from "../components/HomeTopBar";
import styles from "../styles/home.module.css";
import { usePins } from "../context/PinsContext";

const Home = ({ searchTerm }) => {
  const { pins } = usePins();
  const [selectedTag, setSelectedTag] = useState("");


  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      const matchesTag = selectedTag ? pin.tag === selectedTag : true;
      const matchesSearch = pin.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [pins, selectedTag, searchTerm]);

  return (
    <div className={styles.home}>
      <HomeTopBar selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <div className={styles.pinGrid}>
        {filteredPins.map((pin) => (
          <Card key={pin.id} id={pin.id} image={pin.image} title={pin.title} username={pin.username} />
        ))}
      </div>
    </div>
  );
};

export default Home;
