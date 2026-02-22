import React, { useState, useMemo } from 'react';
import { useGame } from '@/app/[locale]/game/GameContext';
import { useTranslations } from 'next-intl';

// Background images per location
const LOCATION_BG: Record<string, string> = {
  'o-quan-chuong': '/images/img1-2.jpeg',
};

const DEFAULT_BG = '/images/img1-2.jpeg';

export default function QuizScreen() {
  const { setCurrentScreen, currentLocationId } = useGame();
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [correctSelectedIndex, setCorrectSelectedIndex] = useState<number | null>(null);
  const t = useTranslations('game');

  const quiz = useMemo(() => {
    const locId = currentLocationId || 'o-quan-chuong';
    try {
      return t.raw(`locations.${locId}.quiz`);
    } catch {
      return t.raw('locations.o-quan-chuong.quiz');
    }
  }, [t, currentLocationId]);

  const bgUrl = useMemo(() => {
    const locId = currentLocationId || 'o-quan-chuong';
    return LOCATION_BG[locId] || DEFAULT_BG;
  }, [currentLocationId]);

  const correctIndex = quiz.correctIndex ?? 0;

  const handleSelect = (index: number) => {
    if (correctSelectedIndex !== null || wrongIndices.includes(index)) return; // Prevent clicking after correct or re-clicking wrong

    if (index === correctIndex) {
      setCorrectSelectedIndex(index);
      setTimeout(() => {
        setCurrentScreen('fact');
      }, 800);
    } else {
      setWrongIndices((prev) => [...prev, index]);
      // Remove the wrong indication after a short flash (600ms)
      setTimeout(() => {
        setWrongIndices((prev) => prev.filter((i) => i !== index));
      }, 600);
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden font-display text-white">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        ></div>
        {/* Dark gradient overlay - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/95 via-[#0b1120]/40 to-transparent"></div>
      </div>

      {/* Main UI Container */}
      <div className="relative z-20 flex h-full flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        {/* Header */}
        <div className="z-30 flex w-full items-start justify-between py-2">
          <button
            onClick={() => setCurrentScreen('scanning')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-black/40 px-4 py-2 shadow-[0_0_12px_rgba(249,212,6,0.15)] backdrop-blur-md">
            <span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
            <span className="whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-[0.15em] text-primary/90">
              {t('history_question')}
            </span>
          </div>
        </div>

        {/* Quiz Body - centered */}
        <div className="flex flex-1 items-center justify-center py-4">
          <div className="quiz-panel relative flex w-full max-w-md flex-col gap-5 overflow-hidden rounded-2xl p-6">
            {/* Corner decorations */}
            <div className="absolute right-3 top-3 h-5 w-5 border-r border-t border-primary/40"></div>
            <div className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-primary/40"></div>

            {/* Question label */}
            <div className="text-center">
              <div className="mb-4 inline-block rounded border border-primary/30 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80">
                {t('quiz_step', { current: 1, total: 3 })}
              </div>

              {/* Question text */}
              <h2
                className="text-xl font-medium leading-snug text-primary sm:text-2xl"
                style={{ textShadow: '0 0 20px rgba(249,212,6,0.3)' }}
              >
                {quiz.question}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-1 grid w-full grid-cols-1 gap-3">
              {quiz.options.map((option: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={correctSelectedIndex !== null || wrongIndices.includes(idx)}
                  className={`quiz-option group relative flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300
                    ${
                      idx === correctSelectedIndex
                        ? 'correct-answer border-emerald-400/60 bg-emerald-500/15 text-emerald-300'
                        : wrongIndices.includes(idx)
                          ? 'wrong-answer border-red-400/60 bg-red-500/15 text-red-300'
                          : correctSelectedIndex !== null
                            ? 'border-white/5 bg-white/[0.02] opacity-40'
                            : 'border-primary/25 bg-white/[0.03] text-white/80 hover:border-primary/50 hover:bg-primary/10'
                    }
                  `}
                >
                  <span className="font-body shrink-0 text-sm font-medium text-inherit opacity-60">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-grow text-center text-lg font-medium sm:text-xl">
                    {option}
                  </span>
                  {idx === correctSelectedIndex && (
                    <span className="material-symbols-outlined absolute right-5 shrink-0 text-[20px]">
                      check_circle
                    </span>
                  )}
                  {wrongIndices.includes(idx) && (
                    <span className="material-symbols-outlined absolute right-5 shrink-0 text-[20px]">
                      cancel
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .quiz-panel {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(249, 212, 6, 0.2);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
        }
        .quiz-option {
          border: 1px solid rgba(249, 212, 6, 0.25);
          transition: all 0.3s ease;
        }
        .correct-answer {
          animation: pulse-green 0.6s ease-out;
        }
        .wrong-answer {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
        }
        @keyframes pulse-green {
          0% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
          }
        }
      `}</style>
    </div>
  );
}
