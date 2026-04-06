import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, Play } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: (name: string, phone: string) => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onLogin(name, phone);
    }
  };

  return (
    <div className="flex flex-col h-full p-8 justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Welcome, <span className="text-yellow-400">Master</span></h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full bg-slate-800 border-2 border-transparent focus:border-yellow-400 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone"
                className="w-full bg-slate-800 border-2 border-transparent focus:border-yellow-400 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all font-bold text-lg"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-yellow-400 text-slate-900 font-black py-5 rounded-2xl flex items-center justify-center gap-3 text-xl shadow-[0_10px_30px_rgba(250,204,21,0.3)] mt-4"
          >
            START RUSHING <Play fill="currentColor" size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
