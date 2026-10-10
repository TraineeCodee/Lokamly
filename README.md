# 🌍 Lokamly - 3D Interactive Country Quiz Game

An interactive 3D Earth Globe Quiz web application built with **React (Vite)**, **Tailwind CSS**, **react-globe.gl (Three.js)**, and **Node.js with Express**.

---

## 🎮 Game Concept & Rules

1. **Question & Flag Clue**: The app automatically fetches a random country trivia question (e.g. *"Which country is home to the ancient rock-cut city of Petra?"*) and displays the target country's flag as a visual clue.
2. **Interactive 3D Globe**: Players rotate, zoom, and explore the Earth in 3D.
3. **Click to Guess**: Players click on the country they believe is the answer.
4. **Instant Feedback**:
   - **Correct Guess 🎉**: The country highlights in glowing emerald green, the camera zooms in smoothly to center on the nation, points (+10 pts + streak bonus) and streak are awarded, a fun fact is revealed, and the "Next Question" button unlocks.
   - **Incorrect Guess ❌**: The clicked country highlights in warning red with an instant message: *"Wrong! You selected [Country]. Try again!"*, resetting the streak and allowing the player to retry.

---

## 📁 Project Structure

```
Lokamly/
├── backend/
│   ├── package.json              # Express & CORS dependencies
│   └── server.js                 # API server on port 5000 with /api/quiz/random endpoint
├── frontend/
│   ├── package.json              # React 18, Vite, Tailwind CSS, react-globe.gl, three
│   ├── vite.config.js            # Vite build configuration with /api proxy
│   ├── tailwind.config.js        # Tailwind styling & animations
│   ├── postcss.config.js         # PostCSS configuration
│   ├── index.html                # Main entry HTML
│   └── src/
│       ├── main.jsx              # React DOM entry
│       ├── index.css             # Tailwind base & custom globe styles
│       ├── App.jsx               # Game orchestrator, score & feedback state
│       └── components/
│           ├── GlobeQuiz.jsx     # 3D Globe with GeoJSON polygons & feedback colors
│           ├── QuestionCard.jsx  # Floating question panel, flag clue & feedback banners
│           └── ScoreBoard.jsx    # Live score, streak & solved tracker
└── README.md
```

---

## 🚀 Quick Setup & Run Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.
Verify via:
```bash
node -v
npm -v
```

---

### 2. Backend Setup (Node.js & Express)

Open a terminal and start the backend:

```bash
cd backend
npm install
npm start
```

The Express server will start on:
👉 **`http://localhost:5000`**

Test the quiz endpoint:
- Quiz Question: `http://localhost:5000/api/quiz/random`
- Health check: `http://localhost:5000/api/health`

---

### 3. Frontend Setup (React + Vite + Tailwind CSS)

Open a **separate** terminal window and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend development server will launch at:
👉 **`http://localhost:5173`**

Open `http://localhost:5173` in any modern web browser to play the quiz game!

---

## 🛠 API Specification

### `GET /api/quiz/random`
Returns a random question object:
```json
{
  "id": "quiz-1",
  "question": "Which Middle Eastern country is home to the ancient rock-cut archaeological city of Petra, one of the New Seven Wonders of the World?",
  "targetCountryName": "Jordan",
  "targetCountryCode": "JO",
  "iso3": "JOR",
  "flagUrl": "https://flagcdn.com/w160/jo.png",
  "funFact": "Petra's iconic Treasury was carved directly into pink sandstone cliffs over 2,000 years ago by the Nabataeans."
}
```
