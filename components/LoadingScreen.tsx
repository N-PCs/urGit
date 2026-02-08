
import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white p-6 overflow-hidden">
      <div className="relative mb-12 animate-float">
        <div className="absolute -inset-8 bg-blue-500/20 blur-3xl rounded-full"></div>
        <Github size={120} className="relative text-white fill-white" />
      </div>
      
      <h2 className="text-2xl md:text-4xl font-extrabold text-center tracking-tight mb-4">
        Wanna take ur github profile to <span className="text-blue-400 italic">another level?</span>
      </h2>
      
      <div className="flex items-center space-x-2 text-slate-400 font-medium">
        <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-sm uppercase tracking-widest mono">Building Assets{dots}</p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
