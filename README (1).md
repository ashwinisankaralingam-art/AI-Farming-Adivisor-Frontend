```markdown
# Agrominds — AI Farming Advisor (Frontend)

This repository contains a React frontend for the Agrominds AI Farming Advisor. It includes:
- Chatbot interface (connects to /chat)
- AI Recommendations (uses /chat prompts)
- Weather Forecast (calls /weather)
- Soil Health Reports (posts to /soil_report)
- Crop Disease Detector (uploads to /detect_disease)
- Real-time Alerts (SSE at /alerts with /alerts/poll fallback)

Prerequisites
- Node 18+/npm
- Backend running (example backend expected at http://localhost:5000)
  - Endpoints used by frontend:
    - POST /chat { message }
    - GET /weather?location=
    - POST /soil_report { ph, n, p, k }
    - GET /market_prices
    - POST /detect_disease (multipart/form-data, key: image)
    - GET /alerts (SSE) or GET /alerts/poll (polling)

How to run
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure backend base URL (optional)
   - Create a `.env` file in project root:
     ```
     REACT_APP_API_BASE=http://localhost:5000
     ```
3. Start the app
   ```bash
   npm start
   ```

Notes & next steps
- The frontend is ready to interact with the backend endpoints defined above. Several backend endpoints were mocked in earlier examples; to fully enable features you should:
  - Implement /weather to proxy a weather API (OpenWeatherMap)
  - Implement /soil_report to analyze soil values and return structured recommendations
  - Connect /detect_disease to a trained ML model for inference
  - Expose /alerts as Server-Sent Events (SSE) to push realtime alerts (e.g., upcoming heavy rain, pest outbreak)
- UI is intentionally lightweight and easy to extend (mobile-first improvements, localization to local languages, simpler large-font UI for field users).
```