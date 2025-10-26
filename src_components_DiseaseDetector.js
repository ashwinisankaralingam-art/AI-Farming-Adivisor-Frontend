import React, { useState } from "react";
import { detectDisease } from "../api";

export default function DiseaseDetector() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e && e.preventDefault();
    if (!file) return;
    setLoading(true);
    setResult(null);
    const fd = new FormData();
    fd.append("image", file);
    try {
      const data = await detectDisease(fd);
      setResult(data);
    } catch (err) {
      setResult({ error: "Detection failed. Backend/model not available." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h2>Crop Disease Detector</h2>
      <form onSubmit={handleUpload} className="form-inline">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>{loading ? "Detecting..." : "Upload & Detect"}</button>
      </form>

      {result && (
        <div className="result">
          {result.error ? (
            <div className="error">{result.error}</div>
          ) : (
            <>
              <h3>Result</h3>
              <div>Disease: {result.disease}</div>
              <div>Recommendation: {result.recommendation}</div>
              <pre>{result.confidence ? `Confidence: ${result.confidence}` : ""}</pre>
            </>
          )}
        </div>
      )}

      <small className="muted">Upload a clear leaf image. Replace backend mock with a trained TF/PyTorch model for production.</small>
    </div>
  );
}