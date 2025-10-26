import axios from "axios";

const BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export async function sendChat(message) {
  const res = await axios.post(`${BASE}/chat`, { message });
  return res.data;
}

export async function detectDisease(formData) {
  const res = await axios.post(`${BASE}/detect_disease`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
}

export async function getWeather(location) {
  // Backend can proxy to OpenWeather or return mock. We call backend endpoint.
  const res = await axios.get(`${BASE}/weather`, { params: { location } });
  return res.data;
}

export async function submitSoilData(payload) {
  const res = await axios.post(`${BASE}/soil_report`, payload);
  return res.data;
}

export async function getMarketPrices() {
  const res = await axios.get(`${BASE}/market_prices`);
  return res.data;
}