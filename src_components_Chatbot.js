import React, { useState } from "react";
import { sendChat } from "../api";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { from: "bot", text: "Hello! I'm Agrominds assistant. Ask me about crops, schemes, market prices, disease detection or soil advice." }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e && e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setHistory(h => [...h, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await sendChat(userMsg);
      setHistory(h => [...h, { from: "bot", text: reply }]);
    } catch (err) {
      setHistory(h => [...h, { from: "bot", text: "Error: unable to reach server." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <h2>Chatbot</h2>
      <div className="chat-window">
        {history.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
        {loading && <div className="msg bot"><div className="bubble">Thinking...</div></div>}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask: best crops for monsoon, schemes, market price, etc."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}