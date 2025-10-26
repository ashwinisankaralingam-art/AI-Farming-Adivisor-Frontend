import React, { useEffect, useState, useRef } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [connected, setConnected] = useState(false);
  const esRef = useRef(null);

  useEffect(() => {
    // Try to connect to Server-Sent Events endpoint
    const url = (process.env.REACT_APP_API_BASE || "http://localhost:5000") + "/alerts";
    if (!!window.EventSource) {
      const es = new EventSource(url);
      es.onopen = () => setConnected(true);
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          setAlerts(a => [data, ...a]);
        } catch {
          setAlerts(a => [{ text: e.data, ts: new Date().toISOString() }, ...a]);
        }
      };
      es.onerror = () => {
        setConnected(false);
        es.close();
      };
      esRef.current = es;
      return () => es.close();
    } else {
      // Fallback: poll every 15s
      setConnected(false);
      const id = setInterval(async () => {
        try {
          const res = await fetch((process.env.REACT_APP_API_BASE || "http://localhost:5000") + "/alerts/poll");
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length) setAlerts(a => [...data, ...a]);
          }
        } catch {}
      }, 15000);
      return () => clearInterval(id);
    }
  }, []);

  return (
    <div className="panel">
      <h2>Real-time Alerts</h2>
      <div className={`status ${connected ? "online" : "offline"}`}>Status: {connected ? "Connected (SSE)" : "Disconnected / Polling"}</div>
      <div className="alerts-list">
        {alerts.length === 0 && <div className="muted">No alerts yet. Alerts appear here in real-time.</div>}
        {alerts.map((a, i) => (
          <div key={i} className="alert">
            <div className="alert-title">{a.title || "Alert"}</div>
            <div className="alert-body">{a.body || a.text || JSON.stringify(a)}</div>
            <div className="muted small">{a.ts || a.time || new Date().toISOString()}</div>
          </div>
        ))}
      </div>
      <small className="muted">Backend should expose /alerts (SSE) or /alerts/poll for polling.</small>
    </div>
  );
}