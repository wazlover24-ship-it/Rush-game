import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { Trophy, Play, Settings, Info } from 'lucide-react';

export default function Home({ user, onStart }: { user: UserProfile; onStart: () => void }) {
  return (
    <div className="flex flex-col h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Player</p>
            <p className="font-bold text-lg leading-tight">{user.name}</p>
          </div>
        </div>
        <div className="bg-slate-900/50 px-4 py-2 rounded-2xl border border-white/5 flex items-center gap-2">
          <Trophy size={16} className="text-yellow-400" />
          <span className="font-black text-yellow-400">{user.totalScore}</span>
        </div>
      </div>

      {/* High Score Display */}
      <div className="mt-8 mb-4">
        <div className="bg-slate-900/50 p-4 rounded-2xl border border-yellow-400/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400/10 p-2 rounded-xl">
              <Trophy size={20} className="text-yellow-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Master Record</p>
              <p className="font-black text-sm text-white">{user.highScoreName || user.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">High Score</p>
            <p className="font-black text-lg text-yellow-400">{user.highScore || 0}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-yellow-400/20 blur-3xl rounded-full" />
          <div className="w-48 h-48 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-[3rem] flex flex-col items-center justify-center shadow-2xl border-4 border-white/20 relative z-10">
            <p className="text-slate-900 font-black text-6xl">{user.currentLevel}</p>
            <p className="text-slate-900 font-bold text-sm uppercase tracking-widest">Level</p>
          </div>
        </motion.div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Ready for the Rush?</h2>
          <p className="text-slate-400 font-medium">Level {user.currentLevel} is waiting for you!</p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="space-y-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full bg-white text-indigo-900 font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 text-2xl shadow-2xl"
        >
          PLAY NOW <Play fill="currentColor" size={24} />
        </motion.button>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-slate-900/50 text-slate-400 py-4 rounded-2xl border border-white/5 flex items-center justify-center gap-2 font-bold">
            <Settings size={20} /> SETTINGS
          </button>
          <button className="bg-slate-900/50 text-slate-400 py-4 rounded-2xl border border-white/5 flex items-center justify-center gap-2 font-bold">
            <Info size={20} /> ABOUT
          </button>
        </div>
      </div>
    </div>
  );
}
