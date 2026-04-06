import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target } from '../types';
import { Timer, Zap } from 'lucide-react';

interface GameplayProps {
  level: number;
  onComplete: (points: number) => void;
  onFail: () => void;
}

export default function Gameplay({ level, onComplete, onFail }: GameplayProps) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarting, setIsStarting] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [tapsCount, setTapsCount] = useState(0);

  // Level configuration
  const getLevelConfig = useCallback(() => {
    // Level 1: 5s, 3 targets
    // Level 10: 3s, 12 targets
    const baseTime = Math.max(3, 5 - (level - 1) * 0.2);
    const targetCount = 3 + (level - 1);
    return { baseTime, targetCount };
  }, [level]);

  const generateTargets = useCallback(() => {
    const { targetCount } = getLevelConfig();
    const newTargets: Target[] = [];
    for (let i = 0; i < targetCount; i++) {
      newTargets.push({
        id: Math.random().toString(36).substr(2, 9),
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 70,
        size: Math.max(60, 100 - (level * 2)) // Targets get smaller
      });
    }
    setTargets(newTargets);
  }, [level, getLevelConfig]);

  // Start countdown
  useEffect(() => {
    if (isStarting) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsStarting(false);
        const { baseTime } = getLevelConfig();
        setTimeLeft(baseTime);
        generateTargets();
      }
    }
  }, [isStarting, countdown, generateTargets, getLevelConfig]);

  // Game timer
  useEffect(() => {
    if (!isStarting && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.05) {
            clearInterval(timer);
            onFail();
            return 0;
          }
          return prev - 0.05;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isStarting, timeLeft, onFail]);

  const handleTap = (id: string) => {
    setTargets((prev) => {
      const newTargets = prev.filter(t => t.id !== id);
      if (newTargets.length === 0) {
        onComplete(5); // Exactly +5 points
      }
      return newTargets;
    });
    setTapsCount(prev => prev + 1);
    
    // Simple haptic feedback simulation
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  if (isStarting) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <motion.p 
          key={countdown}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 1 }}
          exit={{ scale: 2, opacity: 0 }}
          className="text-8xl font-black text-yellow-400"
        >
          {countdown > 0 ? countdown : 'GO!'}
        </motion.p>
        <p className="mt-8 text-slate-400 font-bold uppercase tracking-widest">Level {level}</p>
      </div>
    );
  }

  const { targetCount } = getLevelConfig();
  const progress = (tapsCount / targetCount) * 100;

  return (
    <div className="h-full relative overflow-hidden">
      {/* HUD */}
      <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-20">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
          <Timer size={18} className={timeLeft < 1 ? "text-red-500 animate-pulse" : "text-indigo-400"} />
          <span className={`font-black text-xl tabular-nums ${timeLeft < 1 ? "text-red-500" : "text-white"}`}>
            {timeLeft.toFixed(1)}s
          </span>
        </div>
        
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-black text-yellow-400">{tapsCount}/{targetCount}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="h-full w-full relative">
        <AnimatePresence>
          {targets.map((target) => (
            <motion.button
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleTap(target.id)}
              className="absolute z-10 flex items-center justify-center"
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                width: `${target.size}px`,
                height: `${target.size}px`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] border-4 border-white/30 flex items-center justify-center">
                <Zap size={target.size * 0.4} className="text-slate-900 fill-current" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/30 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/20 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}
