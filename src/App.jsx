import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePin from "./pages/CreatePin";
import styles from "./styles/app.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router basename="/CGT390-Project">
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className={styles.pageContent}>
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-pin" element={<CreatePin />} />
              <Route path="/create" element={<CreatePin />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
