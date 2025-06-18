import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsCarousel from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  const storedMode = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(
    storedMode ? JSON.parse(storedMode) : true
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div>
      <div className="mode-toggle-wrapper">
        <button onClick={toggleDarkMode} className="mode-toggle">
          {darkMode ? "🌙" : "🌞"}
        </button>
      </div>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <SkillsCarousel />
        <Projects />
        <Contact />
        <Footer />
      </main>
      <ChatBot />
    </div>
  );
}

export default App;
