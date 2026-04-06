import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Home, AlertCircle } from 'lucide-react';

interface RetryProps {
  onRetry: () => void;
  onHome: () => void;
}

export default function Retry({ onRetry, onHome }: RetryProps) {
  return (
    <div className="flex flex-col h-full p-8 items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center border-4 border-red-500/30 mb-8"
      >
        <AlertCircle size={64} className="text-red-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h2 className="text-4xl font-black italic tracking-tighter">TOO SLOW!</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest">Don't give up now!</p>
      </motion.div>

      <div className="space-y-4 w-full mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="w-full bg-white text-slate-900 font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 text-2xl shadow-2xl"
        >
          TRY AGAIN <RefreshCcw size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHome}
          className="w-full bg-slate-900/50 text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 text-xl border border-white/10"
        >
          BACK TO HOME <Home size={20} />
        </motion.button>
      </div>
    </div>
  );
}
