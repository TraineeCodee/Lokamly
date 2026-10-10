import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  SkipForward, 
  CheckCircle2, 
  Sparkles, 
  Loader2, 
  Lightbulb, 
  Minimize2, 
  Maximize2, 
  MapPin, 
  Award,
  Star
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

/**
 * QuestionCard Component - Human-Centric Design
 * Features on-demand flag hint (with scoring indicator: 10 pts without clue, 5 marks with hint).
 */
export default function QuestionCard({ 
  question, 
  loading, 
  feedback, 
  onNextQuestion, 
  onSkipQuestion,
  onUseHint,
  hintUsed
}) {
  const [showHint, setShowHint] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Reset local showHint state whenever the question changes
  useEffect(() => {
    setShowHint(false);
  }, [question?.id]);

  // Automatically expand if player guesses so they see the friendly feedback
  useEffect(() => {
    if (feedback?.status === 'correct' || feedback?.status === 'incorrect') {
      setIsMinimized(false);
    }
  }, [feedback?.status]);

  if (loading) {
    return (
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-700/60 shadow-2xl text-slate-100 flex items-center justify-center space-x-3 w-full pointer-events-auto">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-white">Picking our next stop...</p>
          <p className="text-[11px] text-slate-400">Spinning the globe for a fresh non-repeating riddle 🌍</p>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const isCorrect = feedback?.status === 'correct';
  const isIncorrect = feedback?.status === 'incorrect';
  const flagVisible = showHint || isCorrect;

  // Minimized compact pill view
  if (isMinimized) {
    return (
      <div className="w-full pointer-events-auto animate-fade-in">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full p-2.5 px-4 rounded-full bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 hover:border-amber-400/60 shadow-2xl text-left flex items-center justify-between gap-3 hover:bg-slate-800/95 transition-all group"
          title="Click to bring back your question card"
        >
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-base">🧭</span>
            <span className="text-xs font-medium text-slate-200 truncate">
              {isCorrect 
                ? `You found ${question.targetCountryName}! 🎉` 
                : question.question}
            </span>
          </div>
          <span className="text-[11px] font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1 shrink-0 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Open <Maximize2 className="w-3 h-3" />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl bg-slate-900/92 backdrop-blur-2xl border border-slate-700/70 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-slate-100 overflow-hidden transition-all duration-300 pointer-events-auto">
      
      {/* Warm Ambient Decorative Top Strip */}
      <div className={`h-1.5 w-full transition-colors duration-500 ${
        isCorrect 
          ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500' 
          : isIncorrect 
          ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-orange-500' 
          : 'bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-500'
      }`} />

      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Friendly Traveler Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-500/30 flex items-center justify-center text-sm shadow-inner">
              🧭
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-wide">Traveler's Quest</span>
                <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
                  Where in the world?
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Can you find this country on the globe?</p>
            </div>
          </div>

          {/* Friendly Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="px-2 py-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center gap-1 text-[11px] font-medium"
            title="Tuck card away to view the full globe"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tuck away</span>
          </button>
        </div>

        {/* Question Riddle Box (Handcrafted Story Vibe) */}
        <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-800/70 to-slate-800/40 border border-slate-700/60 shadow-inner">
          <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-indigo-300" />
            The Clue
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed pt-1">
            "{question.question}"
          </p>
        </div>

        {/* Flag Clue (Presented like a Travel Postage Stamp) */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Score value:</span>
            <span className={`font-semibold px-1.5 py-0.5 rounded ${hintUsed ? 'bg-amber-500/15 text-amber-300' : 'bg-emerald-500/15 text-emerald-300'}`}>
              {hintUsed ? '5 Marks' : '10 Points'}
            </span>
          </div>

          {flagVisible ? (
            <div className="animate-fade-in flex items-center gap-2.5 bg-slate-800/80 p-1.5 px-3 rounded-2xl border border-slate-700/80 shadow-md">
              {/* Postage Stamp Border Effect */}
              <div className="relative overflow-hidden rounded-md border-2 border-white/80 shadow-sm bg-white">
                <img
                  src={question.flagUrl}
                  alt={`${question.targetCountryName} Flag`}
                  className="w-11 h-7 sm:w-12 sm:h-7.5 object-cover block"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col text-[10px]">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  🚩 Hint Active (5 Marks)
                </span>
                {!isCorrect && (
                  <button
                    onClick={() => setShowHint(false)}
                    className="text-slate-400 hover:text-slate-200 text-left underline"
                  >
                    Hide flag
                  </button>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                sounds.playHint();
                setShowHint(true);
                if (onUseHint) onUseHint();
              }}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/35 hover:border-amber-400/60 text-amber-300 text-xs font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              title="Peek at the country's flag for 5 marks instead of 10 points"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 transition-transform group-hover:rotate-12" />
              <span>💡 Peek at flag (Worth 5 marks)</span>
            </button>
          )}
        </div>

        {/* Human & Encouraging Feedback States */}
        {isCorrect && (
          <div className="animate-fade-in p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-teal-950/50 border border-emerald-500/60 shadow-lg space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <span className="text-lg">🎉</span>
                <span>Spot on! That's {question.targetCountryName}!</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold shadow-sm border ${
                feedback?.hintUsed 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {feedback?.hintUsed ? '+5 Marks' : '+10 Points! 🌟'}
              </span>
            </div>

            <p className="text-[11px] text-emerald-200/80 font-medium pl-6">
              {feedback?.hintUsed 
                ? 'Flag hint was used: awarded 5 marks.' 
                : 'Bravo! Solved without any clue: awarded full 10 points!'}
            </p>

            {question.funFact && (
              <div className="text-xs text-emerald-100/90 leading-relaxed pl-6 pt-1 border-t border-emerald-500/20">
                <span className="font-bold text-emerald-300">Traveler's Note: </span>
                {question.funFact}
              </div>
            )}
          </div>
        )}

        {isIncorrect && (
          <div className="animate-fade-in p-3 rounded-2xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/60 shadow-md flex items-start gap-2.5 text-rose-200">
            <span className="text-base shrink-0 mt-0.5">🌍</span>
            <div className="text-xs leading-snug">
              <span className="font-bold text-rose-300">
                Ooh, so close! That was {feedback?.clickedCountryName || 'another country'}.
              </span>
              <p className="text-rose-200/80 mt-1">
                {flagVisible 
                  ? "Take a close look at the flag stamp above and try another country!" 
                  : "Don't worry! Spin the globe and try again, or peek at the flag clue for 5 marks!"}
              </p>
            </div>
          </div>
        )}

        {/* Natural Action Controls */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          <button
            onClick={onSkipQuestion}
            disabled={isCorrect}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            title="Pass to the next country"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Pass for now</span>
          </button>

          {isCorrect ? (
            <button
              onClick={onNextQuestion}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
            >
              <span>Next destination! ✈️</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Tap a country on the Earth</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
