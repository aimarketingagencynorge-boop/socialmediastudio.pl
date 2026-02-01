
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { Starfield } from './components/Starfield.tsx';
import { HUD } from './components/HUD.tsx';
import { HomePage } from './components/Sections.tsx';
import { SubpageManager } from './components/Subpages.tsx';
import { Crosshair } from './components/Crosshair.tsx';
import { JedAIHologram } from './components/JedAI.tsx';

export type PageId = 'home' | 'co-robimy' | 'webfabrikk' | 'geneza' | 'dlaczego' | 'wspolpraca';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isWarping, setIsWarping] = useState(false);
  const [warpLevel, setWarpLevel] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  // System Boot Sequence
  useEffect(() => {
    const sequence = [
      "SYSTEM INIT: JED-AI V4.5...",
      "WEBFABRIKK PROTOKÓŁ ŁADOWANIE...",
      "POŁĄCZENIE SECURE: SOCIAL MEDIA STUDIO ESTABLISHED...",
      "MAPOWANIE SEKTORÓW: POLSKA / NORWEGIA...",
      "HYPER-DRIVE GOTOWY JEST.",
      "WITAJ, MASTERZE."
    ];
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < sequence.length) {
        setBootText(sequence[currentIdx]);
        currentIdx++;
      } else {
        setTimeout(() => setIsBooting(false), 800);
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Handle Page Navigation with Warp Effect
  const navigateTo = (page: PageId) => {
    if (page === activePage) return;
    setIsWarping(true);
    setWarpLevel(5); // Hyper velocity
    
    setTimeout(() => {
      setActivePage(page);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsWarping(false);
        setWarpLevel(0);
      }, 600);
    }, 600);
  };

  // Scroll dynamics for ambient shake
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  
  // Shake intensity depends on both warping state AND scroll velocity
  const shakeX = useTransform(smoothProgress, p => {
    const v = Math.abs(scrollVelocity.get()) * 50;
    const base = Math.sin(p * 200) * (isWarping ? 15 : 1);
    return base * (1 + v);
  });
  
  const shakeY = useTransform(smoothProgress, p => {
    const v = Math.abs(scrollVelocity.get()) * 50;
    const base = Math.cos(p * 200) * (isWarping ? 15 : 1);
    return base * (1 + v);
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#0A0A12] min-h-screen">
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[2000] bg-black flex items-center justify-center font-mono p-10"
          >
            <div className="text-cyan-400 text-lg md:text-xl">
              <span className="opacity-50 mr-2">>></span>
              {bootText}
              <motion.span 
                animate={{ opacity: [0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="inline-block w-3 h-5 bg-cyan-400 ml-2"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cosmic Engine */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Starfield intensity={warpLevel} progress={smoothProgress} />
      </div>

      {/* Cockpit Frame Overlays (Visual Foundations) */}
      <div className="fixed inset-0 pointer-events-none z-[40] opacity-40">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Wrapper */}
      <motion.div 
        style={{ x: shakeX, y: shakeY }}
        className="relative z-10 w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            animate={{ opacity: isWarping ? 0 : 1, scale: isWarping ? 0.8 : 1, filter: isWarping ? 'blur(20px)' : 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {activePage === 'home' ? (
              <HomePage onCta={() => navigateTo('co-robimy')} />
            ) : (
              <SubpageManager activePage={activePage} onNavigate={navigateTo} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Global Interface */}
      <HUD 
        activePage={activePage} 
        onNavigate={navigateTo}
        isMuted={isMuted} 
        onToggleMute={() => setIsMuted(!isMuted)} 
        isWarping={isWarping}
      />
      
      <JedAIHologram activePage={activePage} />
      <Crosshair />

      <div className="fixed bottom-4 left-4 z-[100] flex items-center gap-2 text-[10px] text-cyan-500 font-mono hidden sm:flex">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#34E0F7]" />
        GLIWICE HQ // WEBFABRIKK // SEKTOR: {activePage.toUpperCase()}
      </div>
    </div>
  );
};

export default App;
