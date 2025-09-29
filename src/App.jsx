import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePin from "./pages/CreatePin";
import styles from "./styles/app.module.css"; // create this CSS module

function App() {
  return (
    <Router basename="/CGT390-Project">
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <div className={styles.pageContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-pin" element={<CreatePin />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
