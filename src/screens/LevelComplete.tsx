import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowRight, Zap } from 'lucide-react';

interface LevelCompleteProps {
  level: number;
  points: number;
  totalScore: number;
  onNext: () => void;
}

export default function LevelComplete({ level, points, totalScore, onNext }: LevelCompleteProps) {
  return (
    <div className="flex flex-col h-full p-8 items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.4)] mb-8"
      >
        <Trophy size={64} className="text-slate-900" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h2 className="text-4xl font-black italic tracking-tighter">LEVEL {level} CLEAR!</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest">You're getting faster!</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full mt-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/50 p-6 rounded-3xl border border-white/5"
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Reward</p>
          <p className="text-3xl font-black text-yellow-400">+{points}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/50 p-6 rounded-3xl border border-white/5"
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Score</p>
          <p className="text-3xl font-black text-white">{totalScore}</p>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-full bg-white text-indigo-900 font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 text-2xl shadow-2xl mt-12"
      >
        NEXT LEVEL <ArrowRight size={24} />
      </motion.button>

      <div className="mt-8 flex items-center gap-2 text-slate-500 font-bold">
        <Zap size={16} />
        <span>Keep the momentum going!</span>
      </div>
    </div>
  );
}
