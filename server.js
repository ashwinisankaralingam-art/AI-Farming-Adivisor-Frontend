// Demo Node/Express server for the frontend. This returns canned responses
// for quick local testing. Do NOT use this in production as-is.
//
// Run: node server.js
// Install: npm install express

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '.')));

// Simple in-memory "assistant" with canned replies for demo.
app.post('/api/chat', async (req, res) => {
  try {
    const { message, metadata } = req.body || {};
    const crop = (metadata && metadata.crop) ? metadata.crop.toLowerCase() : '';
    const soil = (metadata && metadata.soil) ? metadata.soil.toLowerCase() : '';

    // Very naive rule-based demo reply:
    let reply = "Thanks for your question. Here's a general tip: maintain good drainage and balanced fertilization.";
    if (message && /yellow/i.test(message)) {
      reply = "Yellow leaves can indicate nutrient deficiency (nitrogen, magnesium), overwatering, or root issues. Check soil moisture first. If the soil is wet, reduce irrigation and inspect roots. If dry, consider a soil test for nitrogen levels.";
    } else if (message && /pest|aphid|mite/i.test(message)) {
      reply = "Pests such as aphids can often be managed with insecticidal soap, neem oil, or by introducing beneficial insects (ladybugs). For strong infestations, consult a local extension office for registered treatments.";
    } else if (crop.includes('rice') && /irrigat/i.test(message)) {
      reply = "For rice, critical irrigation stages include tillering and panicle initiation. Keep a close eye around panicle initiation to avoid drought stress during yield formation.";
    } else if (soil.includes('clay')) {
      reply = "Heavy clay soils need good drainage and may benefit from organic matter to improve structure. Avoid compaction by limiting heavy traffic when wet.";
    }

    // Add a short, friendly closing
    reply += "\n\nIf you'd like, upload a photo of the affected area or share more field notes for a more specific suggestion.";

    // Simulate small delay
    await new Promise(r => setTimeout(r, 700));
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

/*
Production integration notes:

Replace the canned reply logic above with a call to your LLM provider.
Pseudo-example (do NOT put API keys in frontend):

const fetch = require('node-fetch');
const OPENAI_KEY = process.env.OPENAI_API_KEY;

const payload = {
  model: 'gpt-4o', // or whichever model you choose
  messages: [
    { role: 'system', content: 'You are an agricultural advisor...' },
    { role: 'user', content: `${message}\nContext: ${JSON.stringify(metadata)}` }
  ],
  max_tokens: 700
};

const r = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_KEY}`
  },
  body: JSON.stringify(payload)
});

const data = await r.json();
const assistantReply = data.choices?.[0]?.message?.content || 'No reply';
res.json({ reply: assistantReply });

Make sure to:
- Rate-limit requests per user/IP.
- Validate and sanitize user inputs.
- Add usage logging and user consent banners if storing data.
- Consider content moderation for uploaded images and text.
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Demo server running on http://localhost:${PORT}`);
});