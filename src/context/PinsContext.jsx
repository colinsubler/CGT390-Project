import React, { createContext, useContext, useState, useEffect } from 'react';

const PinsContext = createContext();

export const usePins = () => {
  const context = useContext(PinsContext);
  if (!context) {
    throw new Error('usePins must be used within a PinsProvider');
  }
  return context;
};

export const PinsProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [savedPins, setSavedPins] = useState([]);

  useEffect(() => {
    const loadPins = async () => {
      const url = import.meta.env.BASE_URL + "pins.json";
      const localPins = JSON.parse(localStorage.getItem("demoPins")) || [];
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPins([...localPins, ...data]);
      } catch (err) {
        console.error("Error loading pins:", err);
        setPins(localPins);
      }
    };

    const loadSavedPins = () => {
      const saved = JSON.parse(localStorage.getItem("savedPins")) || [];
      setSavedPins(saved);
    };

    loadPins();
    loadSavedPins();

    const onPinsUpdated = () => {
      loadPins();
      loadSavedPins();
    };

    window.addEventListener("pinsUpdated", onPinsUpdated);
    window.addEventListener("savedUpdated", loadSavedPins);
    
    return () => {
      window.removeEventListener("pinsUpdated", onPinsUpdated);
      window.removeEventListener("savedUpdated", loadSavedPins);
    };
  }, []);

  const value = {
    pins,
    savedPins,
    setPins,
    setSavedPins
  };

  return <PinsContext.Provider value={value}>{children}</PinsContext.Provider>;
};