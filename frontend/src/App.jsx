import React, { useState, useEffect, useCallback } from 'react';
import GlobeQuiz, { isCountryMatch } from './components/GlobeQuiz';
import QuestionCard from './components/QuestionCard';
import ScoreBoard from './components/ScoreBoard';
import { Compass, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { sounds } from './utils/soundEffects';

// Helpers to persist seen questions across page reloads during the session
const getStoredSeenIds = () => {
  try {
    const raw = sessionStorage.getItem('lokamly_seen_ids');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveStoredSeenIds = (ids) => {
  try {
    sessionStorage.setItem('lokamly_seen_ids', JSON.stringify(ids));
  } catch (e) {}
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  // Track if hint (flag clue) was used for the active question:
  // True = 5 marks, False = 10 points
  const [hintUsed, setHintUsed] = useState(false);

  // Feedback state: { status: 'idle' | 'correct' | 'incorrect', clickedCountryName?: string, pointsEarned?: number, hintUsed?: boolean }
  const [feedback, setFeedback] = useState({ status: 'idle' });
  const [lastClickedFeature, setLastClickedFeature] = useState(null);

  /**
   * Fetch a new random question from backend, passing exclude param to guarantee no repeats
   */
  const fetchNextQuestion = useCallback(async (isInitial = false) => {
    if (!isInitial) {
      sounds.playPop();
    }
    setLoadingQuestion(true);
    setFeedback({ status: 'idle' });
    setLastClickedFeature(null);
    setHintUsed(false);

    try {
      const storedSeen = getStoredSeenIds();
      const excludeQuery = storedSeen.length > 0 
        ? `?exclude=${encodeURIComponent(storedSeen.join(','))}` 
        : '';

      const res = await fetch(`/api/quiz/random${excludeQuery}`);
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setCurrentQuestion(data);

      if (data.id) {
        let updated = storedSeen.includes(data.id) ? storedSeen : [...storedSeen, data.id];
        if (updated.length >= (data.totalAvailable || 40)) {
          updated = [data.id]; // Reset cycle after exhausting the 40 questions
        }
        saveStoredSeenIds(updated);
      }
    } catch (err) {
      console.error('Error fetching quiz question via proxy:', err);
      // Direct port 5000 fallback
      try {
        const storedSeen = getStoredSeenIds();
        const excludeQuery = storedSeen.length > 0 
          ? `?exclude=${encodeURIComponent(storedSeen.join(','))}` 
          : '';
        const directRes = await fetch(`http://localhost:5000/api/quiz/random${excludeQuery}`);
        if (directRes.ok) {
          const directData = await directRes.json();
          setCurrentQuestion(directData);
          if (directData.id) {
            let updated = storedSeen.includes(directData.id) ? storedSeen : [...storedSeen, directData.id];
            if (updated.length >= (directData.totalAvailable || 40)) {
              updated = [directData.id];
            }
            saveStoredSeenIds(updated);
          }
          setLoadingQuestion(false);
          return;
        }
      } catch (directErr) {
        console.error('Direct fallback also failed:', directErr);
      }
    } finally {
      setLoadingQuestion(false);
    }
  }, []);

  // Fetch initial question on mount
  useEffect(() => {
    fetchNextQuestion(true);
  }, [fetchNextQuestion]);

  /**
   * Handle user clicking a country polygon on the 3D globe
   */
  const handleCountryClick = (feature) => {
    if (!currentQuestion || loadingQuestion) return;
    // If already answered correctly, wait for next question
    if (feedback.status === 'correct') return;

    const clickedCountryName =
      feature.properties?.ADMIN ||
      feature.properties?.NAME ||
      feature.properties?.name ||
      feature.properties?.sovereignt ||
      'Unknown Country';

    setLastClickedFeature(feature);

    const isCorrect = isCountryMatch(feature.properties, currentQuestion);

    if (isCorrect) {
      // Play celebratory victory sound
      sounds.playCorrect();

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      
      // Strict scoring rule: 5 marks if flag hint was used, 10 points without clue!
      const pointsEarned = hintUsed ? 5 : 10;
      setScore((prev) => prev + pointsEarned);
      setCorrectCount((prev) => prev + 1);
      setTotalAnswered((prev) => prev + 1);

      setFeedback({
        status: 'correct',
        clickedCountryName,
        pointsEarned,
        hintUsed
      });
    } else {
      // Play gentle wrong answer sound
      sounds.playWrong();

      setStreak(0);
      setTotalAnswered((prev) => prev + 1);

      setFeedback({
        status: 'incorrect',
        clickedCountryName,
        hintUsed
      });
    }
  };

  /**
   * Skip to the next question
   */
  const handleSkipQuestion = () => {
    sounds.playPop();
    setStreak(0);
    fetchNextQuestion();
  };

  /**
   * Toggle audio mute
   */
  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMuted();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playPop();
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 3D Interactive Globe */}
      <GlobeQuiz
        currentQuestion={currentQuestion}
        feedback={feedback}
        lastClickedFeature={lastClickedFeature}
        onCountryClick={handleCountryClick}
      />

      {/* Top Header Bar */}
      <header className="absolute top-4 left-4 right-4 sm:left-8 sm:right-8 z-30 pointer-events-none flex items-start justify-between gap-4">
        {/* Brand Badge */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-xl flex items-center space-x-2.5 pointer-events-auto">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 leading-tight">
              Lokamly <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Quiz Game</span>
            </h1>
            <p className="text-[11px] text-slate-400">Find the Country on the 3D Globe</p>
          </div>
        </div>

        {/* Right Header Controls: Sound Toggle & ScoreBoard */}
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2.5 sm:p-3 rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-all pointer-events-auto flex items-center justify-center"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Live ScoreBoard */}
          <ScoreBoard
            score={score}
            streak={streak}
            bestStreak={bestStreak}
            totalAnswered={totalAnswered}
            correctCount={correctCount}
          />
        </div>
      </header>

      {/* Side-Docked Floating Question Card */}
      <div className="absolute top-20 right-4 sm:right-8 z-30 w-[calc(100%-2rem)] sm:w-[380px] pointer-events-none">
        <QuestionCard
          question={currentQuestion}
          loading={loadingQuestion}
          feedback={feedback}
          onNextQuestion={() => fetchNextQuestion(false)}
          onSkipQuestion={handleSkipQuestion}
          onUseHint={() => setHintUsed(true)}
          hintUsed={hintUsed}
        />
      </div>

      {/* Bottom Controls / Hints */}
      <footer className="absolute bottom-4 left-4 sm:left-8 z-20 pointer-events-none">
        <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-[11px] text-slate-400 shadow-lg flex items-center space-x-2">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
          <span>Rotate & zoom 3D globe • Click country to answer</span>
        </div>
      </footer>
    </div>
  );
}
