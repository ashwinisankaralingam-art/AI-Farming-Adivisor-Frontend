import React, { useState } from "react";
import { sendChat } from "../api";

export default function Recommendations() {
  const [season, setSeason] = useState("monsoon");
  const [soilType, setSoilType] = useState("loamy");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGet() {
    setLoading(true);
    setResult(null);
    const prompt = `Provide productive and profitable crop recommendations for ${season} season on ${soilType} soil${budget ? " with a budget of " + budget : ""}. Mention expected inputs, estimated yield, and simple economics. Keep it concise for a farmer.`;
    try {
      const { reply } = await sendChat(prompt);
      setResult(reply);
    } catch (err) {
      setResult("Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h2>AI Recommendations</h2>
      <div className="form-row">
        <label>Season</label>
        <select value={season} onChange={e => setSeason(e.target.value)}>
          <option value="monsoon">Monsoon</option>
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
        </select>
      </div>

      <div className="form-row">
        <label>Soil Type</label>
        <select value={soilType} onChange={e => setSoilType(e.target.value)}>
          <option value="loamy">Loamy</option>
          <option value="sandy">Sandy</option>
          <option value="clay">Clay</option>
        </select>
      </div>

      <div className="form-row">
        <label>Budget (optional)</label>
        <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="₹ amount" />
      </div>

      <div className="actions">
        <button onClick={handleGet} disabled={loading}>
          {loading ? "Working..." : "Get Recommendations"}
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>Recommendation</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}