# Portfolio Chatbot Setup

## 1. Backend Setup

1. Create a `.env` file in the `backend/` directory with:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
2. Install dependencies:
   ```
   pip install -r backend/requirements.txt
   ```
3. Run the backend:
   ```
   python backend/app.py
   ```

## 2. Frontend Usage

- Open `index.html` in your browser, or serve it with a local server for best results.
- The chatbot will appear as a floating button. Click to open and chat.

## 3. Notes
- Ensure the backend is running on `localhost:5000` for the chatbot to work.
- CORS is enabled for local development.
- The Gemini API key is required for AI responses.

