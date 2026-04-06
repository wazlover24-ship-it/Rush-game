import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100 }}
        className="w-32 h-32 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.4)]"
      >
        <Zap size={64} className="text-slate-900 fill-current" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-black tracking-tighter text-white">
          TAP MASTER<br />
          <span className="text-yellow-400">RUSH</span>
        </h1>
        <p className="text-slate-400 font-medium mt-2">Only 1% can reach Level 20!</p>
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="h-1.5 bg-yellow-400 rounded-full mt-8"
      />
    </div>
  );
}
