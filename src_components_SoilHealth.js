import React, { useState } from "react";
import { submitSoilData } from "../api";

export default function SoilHealth() {
  const [ph, setPh] = useState("");
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e && e.preventDefault();
    setLoading(true);
    setReport(null);
    try {
      const payload = { ph, n, p, k };
      const data = await submitSoilData(payload);
      setReport(data);
    } catch (err) {
      setReport({ error: "Unable to generate report. Backend missing." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h2>Soil Health Report</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div>
          <label>pH</label>
          <input value={ph} onChange={e => setPh(e.target.value)} placeholder="e.g. 6.5" />
        </div>
        <div>
          <label>N (ppm)</label>
          <input value={n} onChange={e => setN(e.target.value)} placeholder="e.g. 250" />
        </div>
        <div>
          <label>P (ppm)</label>
          <input value={p} onChange={e => setP(e.target.value)} placeholder="e.g. 30" />
        </div>
        <div>
          <label>K (ppm)</label>
          <input value={k} onChange={e => setK(e.target.value)} placeholder="e.g. 180" />
        </div>

        <div className="actions" style={{ gridColumn: "1 / -1" }}>
          <button type="submit" disabled={loading}>{loading ? "Analyzing..." : "Get Soil Report"}</button>
        </div>
      </form>

      {report && (
        <div className="result">
          {report.error ? (
            <div className="error">{report.error}</div>
          ) : (
            <>
              <h3>Soil Analysis Summary</h3>
              <pre>{JSON.stringify(report, null, 2)}</pre>
            </>
          )}
        </div>
      )}
      <small className="muted">Note: sample backend returns recommendations based on values; integrate lab results for production.</small>
    </div>
  );
}