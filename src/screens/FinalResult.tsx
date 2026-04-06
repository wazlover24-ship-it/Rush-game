import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, RotateCcw, Share2 } from 'lucide-react';

interface FinalResultProps {
  totalScore: number;
  onRestart: () => void;
}

export default function FinalResult({ totalScore, onRestart }: FinalResultProps) {
  return (
    <div className="flex flex-col h-full p-8 items-center justify-center text-center">
      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 opacity-20"
        >
          <Star size={160} className="text-yellow-400 fill-current" />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-40 h-40 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-[3rem] flex items-center justify-center shadow-[0_0_80px_rgba(250,204,21,0.4)] relative z-10"
        >
          <Trophy size={80} className="text-slate-900" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-5xl font-black italic tracking-tighter text-white">TAP MASTER!</h2>
        <p className="text-yellow-400 font-black text-xl uppercase tracking-[0.3em]">Game Complete</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10 mt-12 w-full"
      >
        <p className="text-slate-400 font-bold uppercase tracking-widest mb-2">Final Score</p>
        <p className="text-7xl font-black text-white">{totalScore}</p>
        <div className="flex justify-center gap-1 mt-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={24} className="text-yellow-400 fill-current" />
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-white text-indigo-900 font-black py-5 rounded-3xl flex items-center justify-center gap-2 text-lg shadow-xl"
        >
          <RotateCcw size={20} /> REPLAY
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-2 text-lg shadow-xl"
        >
          <Share2 size={20} /> SHARE
        </motion.button>
      </div>
    </div>
  );
}
