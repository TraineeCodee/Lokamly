# 🌍 Lokamly - 3D Interactive Country Quiz Game

An interactive 3D Earth Globe Quiz web application built with **React (Vite)**, **Tailwind CSS**, **react-globe.gl (Three.js)**, and **Node.js with Express**.

---

## 🎮 Game Concept & Rules

1. **Question & Flag Clue**: The app presents a random country trivia question and lets you optionally reveal the target country's flag as a clue.
2. **Dynamic Scoring**:
   - **No Clue**: Solved without opening the flag clue awards **10 Points** (`+10 Points! 🌟`).
   - **Hint Used**: Peeking at the flag clue awards **5 Marks** (`+5 Marks`).
3. **Non-Repeating Questions**: A massive curated bank of 40 sovereign countries. Questions never repeat during your session until all 40 countries have been visited!
4. **Interactive 3D Globe**: Players rotate, zoom, and explore the Earth in 3D.
5. **Instant Feedback**:
   - **Correct Guess 🎉**: Glowing emerald green country highlight, smooth camera zoom to target, points awarded, and fun fact revealed.
   - **Incorrect Guess ❌**: Warning red highlight with encouragement: *"Ooh, so close! That was [Country]. Try again!"*.

---


## 💻 Local Development

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Start Both Services
```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
