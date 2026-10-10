import React, { useState, useEffect } from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  RotateCw, 
  Globe, 
  Eye, 
  EyeOff, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

/**
 * TriviaCard Component
 * Displays a floating glassmorphic card over the 3D globe with trivia Q&A.
 */
export default function TriviaCard({ 
  countryName, 
  trivia, 
  loading, 
  error, 
  onClose, 
  onRefresh 
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset showAnswer state whenever a new country or trivia question is loaded
  useEffect(() => {
    setShowAnswer(false);
  }, [countryName, trivia?.question]);

  return (
    <div className="absolute top-20 right-4 sm:right-8 w-[92%] sm:w-[420px] max-w-full z-40 animate-fade-in pointer-events-auto">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-slate-100 transition-all duration-300">
        
        {/* Top subtle ambient glow strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-rose-500" />

        {/* Card Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                Selected Country
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
                {countryName || 'Global Explorer'}
                {trivia?.category && !loading && (
                  <span className="text-[10px] font-medium bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full border border-slate-700">
                    {trivia.category}
                  </span>
                )}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title="Close card"
            aria-label="Close card"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          {/* Loading State */}
          {loading && (
            <div className="py-8 flex flex-col items-center justify-center space-y-3 text-slate-400">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              </div>
              <p className="text-sm font-medium animate-pulse text-indigo-200">
                Consulting world archives for {countryName}...
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold">Unable to fetch trivia</p>
                <p className="text-xs text-red-300/80 mt-1">{error}</p>
                <button
                  onClick={onRefresh}
                  className="mt-3 px-3 py-1 bg-red-600/30 hover:bg-red-600/50 text-white rounded-lg text-xs font-medium border border-red-500/40 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Loaded Trivia Content */}
          {!loading && !error && trivia && (
            <>
              {/* Question Section */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-400">
                  <HelpCircle className="w-4 h-4" />
                  <span>TRIVIA QUESTION</span>
                </div>
                <p className="text-base font-medium text-slate-100 leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50 shadow-inner">
                  "{trivia.question}"
                </p>
              </div>

              {/* Reveal Answer Section */}
              <div className="pt-1">
                {showAnswer ? (
                  <div className="animate-fade-in p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-lg space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ANSWER
                      </span>
                      <button
                        onClick={() => setShowAnswer(false)}
                        className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        Hide
                      </button>
                    </div>
                    <p className="text-base font-bold text-emerald-100 tracking-wide">
                      {trivia.answer}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full group py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-md hover:shadow-indigo-500/25 transition-all duration-200 flex items-center justify-center space-x-2 border border-indigo-400/30"
                  >
                    <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Show Answer</span>
                  </button>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1 text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                  {trivia.isFallback ? 'General Country Fact' : 'Curated Trivia'}
                </span>

                <button
                  onClick={onRefresh}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
                  title="Load another question for this country"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Another Question</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
