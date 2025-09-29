import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePin from "./pages/CreatePin";
import styles from "./styles/app.module.css";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // lift search state here

  return (
    <Router basename="/CGT390-Project">
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          {/* pass search state and setter to TopBar */}
          <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className={styles.pageContent}>
            <Routes>
              {/* pass searchTerm to Home page */}
              <Route path="/" element={<Home searchTerm={searchTerm} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-pin" element={<CreatePin />} />
              {/* optional: support /create as shortcut */}
              <Route path="/create" element={<CreatePin />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
