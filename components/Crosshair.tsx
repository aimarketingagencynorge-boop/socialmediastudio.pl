
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Crosshair: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('.glass-panel')) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2000]">
      <motion.div 
        className={`absolute w-10 h-10 border rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${isLocked ? 'border-red-500' : 'border-cyan-400/40'}`}
        animate={{ 
            x: mousePos.x, 
            y: mousePos.y,
            scale: isLocked ? 0.75 : 1,
            rotate: isLocked ? 90 : 0
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.3 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-current" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-current" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-current" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-current" />
      </motion.div>

      <motion.div 
        className={`absolute w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2 ${isLocked ? 'bg-red-500' : 'bg-cyan-400'}`}
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 40, stiffness: 600, mass: 0.1 }}
      />

      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: mousePos.x + 25, y: mousePos.y - 25 }}
            exit={{ opacity: 0 }}
            className="absolute flex flex-col gap-0 text-[7px] font-bold text-red-500 uppercase font-mono"
          >
            <span>ANALIZA_CELU...</span>
            <span className="opacity-70">STATUS: IDENTYFIKACJA</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
