import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import Weather from "./components/Weather";
import SoilHealth from "./components/SoilHealth";
import Recommendations from "./components/Recommendations";
import Alerts from "./components/Alerts";
import DiseaseDetector from "./components/DiseaseDetector";

export default function App() {
  const [view, setView] = useState("chat");

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Agrominds</h1>
        <nav>
          <button onClick={() => setView("chat")}>Chatbot</button>
          <button onClick={() => setView("rec")}>AI Recommendations</button>
          <button onClick={() => setView("weather")}>Weather Forecast</button>
          <button onClick={() => setView("soil")}>Soil Health</button>
          <button onClick={() => setView("disease")}>Disease Detector</button>
          <button onClick={() => setView("alerts")}>Real-time Alerts</button>
        </nav>
        <footer className="sidebar-footer">Agrominds AI Farming Advisor</footer>
      </aside>

      <main className="main">
        {view === "chat" && <Chatbot />}
        {view === "rec" && <Recommendations />}
        {view === "weather" && <Weather />}
        {view === "soil" && <SoilHealth />}
        {view === "disease" && <DiseaseDetector />}
        {view === "alerts" && <Alerts />}
      </main>
    </div>
  );
}