
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Volume2, VolumeX, Menu, X, Rocket, Shield, Globe, Users, Zap } from 'lucide-react';
import { PageId } from '../App';

interface HUDProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isWarping: boolean;
}

export const HUD: React.FC<HUDProps> = ({ activePage, onNavigate, isMuted, onToggleMute, isWarping }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems: { id: PageId, label: string, icon: any }[] = [
    { id: 'home', label: 'BAZA', icon: Rocket },
    { id: 'co-robimy', label: 'MISJA', icon: Zap },
    { id: 'webfabrikk', label: 'POCHODZENIE', icon: Globe },
    { id: 'geneza', label: 'GENEZA', icon: Shield },
    { id: 'dlaczego', label: 'CEL', icon: Compass },
    { id: 'wspolpraca', label: 'SOJUSZ', icon: Users }
  ];

  const handleMobileNav = (id: PageId) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Responsive Frame */}
        <div className={`absolute inset-0 border-[8px] md:border-[20px] border-black/90 transition-all duration-700 ${isWarping ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
          
          {/* Top Header */}
          <div className="p-4 md:p-10 flex justify-between items-start pointer-events-auto">
            <motion.div 
              className="glass-panel p-3 md:p-4 flex gap-4 md:gap-6 items-center border-l-2 border-l-[#34E0F7] cursor-pointer"
              style={{ x: mousePos.x * 0.3, y: mousePos.y * 0.3 }}
              onClick={() => onNavigate('home')}
            >
              <div className="flex flex-col">
                <span className="text-[7px] md:text-[8px] text-cyan-500 font-black tracking-[0.2em] uppercase opacity-50">Nav Sys</span>
                <span className="text-sm md:text-xl font-orbitron font-black text-white italic">SMS // STUDIO</span>
              </div>
              <div className="h-6 md:h-8 w-[1px] bg-white/10" />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-[7px] md:text-[8px] text-cyan-500 font-black uppercase tracking-[0.2em] opacity-50">Status</span>
                <span className={`text-[10px] md:text-xs font-orbitron font-bold flex items-center gap-2 ${isWarping ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                  {isWarping ? 'WARP DRIVE ACTIVE' : 'ORBITA STABILNA'}
                  {!isWarping && <Compass className="w-3 h-3 animate-spin-slow" />}
                </span>
              </div>
            </motion.div>

            <div className="flex gap-2 md:gap-4 items-center">
               <button 
                  onClick={onToggleMute}
                  className="glass-panel p-2 md:p-3 rounded-full hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
                  aria-label="Mute toggle"
               >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
               </button>
               <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="glass-panel p-2 md:p-3 rounded-full hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer lg:hidden"
                  aria-label="Menu"
               >
                  {isMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
               </button>
            </div>
          </div>

          {/* Desktop Navigation Dots (Side) - Hidden on mobile */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6 pointer-events-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group flex items-center gap-4 cursor-none"
              >
                <div className={`w-3 h-3 rounded-full border border-cyan-500/30 transition-all ${activePage === item.id ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_#34E0F7]' : 'group-hover:bg-cyan-500/50'}`} />
                <span className={`text-[8px] font-black tracking-widest uppercase transition-all ${activePage === item.id ? 'text-white translate-x-1' : 'text-white/20 group-hover:text-white/60'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Global Nav Console (Bottom) - Hidden on small mobile */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto hidden sm:block">
            <div className="glass-panel p-2 px-6 flex gap-4 md:gap-8 items-center bg-black/40 backdrop-blur-xl rounded-full border-white/5">
              {navItems.slice(0, 3).map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[8px] md:text-[9px] font-black font-orbitron tracking-widest py-2 transition-all ${activePage === item.id ? 'text-cyan-400 border-b border-cyan-400' : 'text-white/40 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="w-[1px] h-4 bg-white/10" />
              {navItems.slice(3).map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[8px] md:text-[9px] font-black font-orbitron tracking-widest py-2 transition-all ${activePage === item.id ? 'text-purple-400 border-b border-purple-400' : 'text-white/40 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col p-8 pt-24"
          >
            <div className="grid grid-cols-1 gap-4 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMobileNav(item.id)}
                  className={`flex items-center justify-between p-6 glass-panel rounded-xl transition-all ${activePage === item.id ? 'border-cyan-400 bg-cyan-500/10' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 ${activePage === item.id ? 'text-cyan-400' : 'text-white/40'}`} />
                    <span className={`text-lg font-orbitron font-bold tracking-widest ${activePage === item.id ? 'text-white' : 'text-white/60'}`}>
                      {item.label}
                    </span>
                  </div>
                  {activePage === item.id && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#34E0F7]" />}
                </button>
              ))}
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/5 text-center">
              <p className="text-[10px] font-mono text-cyan-500 opacity-50 uppercase tracking-widest">
                System Status: Ready // Node: Gliwice
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
