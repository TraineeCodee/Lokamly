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

## 🌐 Deploy to Public Web (Free)

The project is structured with a root `package.json` and `render.yaml` so the entire full-stack app builds and deploys to a single public HTTPS URL with one command.

### Option A: Free Permanent Hosting on Render.com (Recommended)

1. **Create a GitHub Repository**:
   - Create a new public repository on [GitHub](https://github.com/new) (e.g. `lokamly-globe-quiz`).
   - Push this project to your repository:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/lokamly-globe-quiz.git
     git branch -M main
     git push -u origin main
     ```

2. **Deploy on Render**:
   - Sign up / log in to [Render.com](https://render.com).
   - Click **New +** -> **Web Service**.
   - Connect your GitHub repository.
   - Render automatically detects the configuration, or set:
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free
   - Click **Deploy Web Service**!
   - Your game will be live globally at `https://lokamly-globe-quiz.onrender.com`!

---

### Option B: Free Permanent Hosting on Railway.app

1. Go to [Railway.app](https://railway.app).
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select your repository. Railway automatically detects `package.json`, runs `npm run build`, and starts the server with zero configuration!
4. Go to **Settings** -> **Generate Domain** to get your public HTTPS URL.

---

### Option C: Instant Live Public Link Right Now (Localtunnel)

If your local server is running on port 5000, you can instantly expose it to anyone on the internet without deploying:

```bash
npx localtunnel --port 5000
```

1. Open the generated URL (e.g., `https://xxxx.loca.lt`).
2. When prompted for the "Tunnel Password / Endpoint IP", enter your machine's public IP: `152.58.216.6`.
3. Anyone in the world can now interact with your 3D globe game in real time!

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
