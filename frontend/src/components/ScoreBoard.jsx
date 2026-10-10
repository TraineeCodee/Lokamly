import React from 'react';
import { Trophy, Flame, Target, Award } from 'lucide-react';

/**
 * ScoreBoard Component
 * Displays score, current streak, best streak, and accuracy counter in a sleek glass pill.
 */
export default function ScoreBoard({ score, streak, bestStreak, totalAnswered, correctCount }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-xl text-slate-100 pointer-events-auto">
      {/* Score Counter */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
        <Trophy className="w-4 h-4" />
        <div className="flex flex-col leading-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80">Score</span>
          <span className="text-sm font-extrabold text-amber-300">{score}</span>
        </div>
      </div>

      {/* Streak Counter */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-300 ${
        streak > 0 
          ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 shadow-sm shadow-rose-500/20' 
          : 'bg-slate-800/60 border-slate-700 text-slate-400'
      }`}>
        <Flame className={`w-4 h-4 ${streak > 0 ? 'animate-bounce text-rose-400' : 'text-slate-500'}`} />
        <div className="flex flex-col leading-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400/80">Streak</span>
          <span className="text-sm font-extrabold text-white">
            {streak}
            {streak >= 3 && <span className="text-[10px] ml-1 text-rose-400 font-bold">🔥</span>}
          </span>
        </div>
      </div>

      {/* Solved Counter */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
        <Target className="w-4 h-4" />
        <div className="flex flex-col leading-none">
          <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400/80">Solved</span>
          <span className="text-sm font-extrabold text-indigo-200">{correctCount}</span>
        </div>
      </div>
    </div>
  );
}
