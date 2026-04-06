import React from 'react';

export default function AdBanner() {
  // In a real APK environment using Capacitor, this component would trigger 
  // the native AdMob banner. For the web preview, we show a placeholder.
  
  const bannerId = import.meta.env.VITE_ADMOB_BANNER_ID;

  return (
    <div className="w-full bg-black/40 border-t border-white/5 flex flex-col items-center justify-center py-1 overflow-hidden">
      <div className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter mb-0.5">Advertisement</div>
      <div className="w-full max-w-[320px] h-[50px] bg-slate-800 rounded flex items-center justify-center border border-white/10 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <div className="text-center">
          <p className="text-[10px] font-black text-slate-400">ADMOB BANNER AD</p>
          <p className="text-[8px] text-slate-600 font-mono truncate max-w-[200px]">{bannerId}</p>
        </div>
      </div>
    </div>
  );
}
