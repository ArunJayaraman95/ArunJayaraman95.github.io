import { useState } from "react";
import reactLogo from "./assets/images/react.svg";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import styles from "./App.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import HomePage from "./pages/HomePage";
import PrintPage from "./pages/PrintPage";

function App() {
  return (
    <div className={styles.App}>
      <HashRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/printing" element={<PrintPage />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
