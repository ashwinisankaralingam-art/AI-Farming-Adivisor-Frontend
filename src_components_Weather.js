import React, { useState } from "react";
import { getWeather } from "../api";

export default function Weather() {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFetch(e) {
    e && e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setForecast(null);
    try {
      const data = await getWeather(location.trim());
      setForecast(data);
    } catch (err) {
      setForecast({ error: "Unable to fetch weather. Backend may be down or missing API key." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h2>Weather Forecast</h2>
      <form onSubmit={handleFetch} className="form-inline">
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Town, City or lat,lng" />
        <button type="submit" disabled={loading}>{loading ? "Loading..." : "Get Forecast"}</button>
      </form>

      {forecast && (
        <div className="forecast">
          {forecast.error ? (
            <div className="error">{forecast.error}</div>
          ) : (
            <>
              <h3>{forecast.location || location}</h3>
              <div>Summary: {forecast.summary}</div>
              <div>Temp: {forecast.temp}</div>
              <div>Chance of rain: {forecast.rain_chance}</div>
              <pre>{forecast.raw && JSON.stringify(forecast.raw, null, 2)}</pre>
            </>
          )}
        </div>
      )}
      <small className="muted">Tip: backend should proxy OpenWeatherMap or your preferred weather API.</small>
    </div>
  );
}