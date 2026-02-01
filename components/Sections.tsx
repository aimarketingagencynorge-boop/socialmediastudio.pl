
import React from 'react';
import { motion } from 'framer-motion';
import { Anchor, Globe, Layers, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onCta: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCta }) => (
  <section className="h-screen flex items-center justify-center relative overflow-hidden px-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-2xl"
    >
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/30 border border-cyan-500/20 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-cyan-400">Hub Gliwice Aktywny Jest</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight font-orbitron">
        NAWIGACJA <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-magenta-500">CYFROWEGO ROZWOJU</span>
      </h1>
      <p className="text-cyan-200/70 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-mono mb-8 px-4">
        Z Gliwic jesteśmy, lecz globalnie działamy. Precyzję Webfabrikk z zasięgami Social Media łączymy. Ekosystemy cyfrowe w Polsce i Norwegii budujemy.
      </p>
      
      <div className="flex flex-col items-center gap-6">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          animate={{ 
            boxShadow: [
              "0 0 0px rgba(52,224,247,0)",
              "0 0 25px rgba(52,224,247,0.5)",
              "0 0 0px rgba(52,224,247,0)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="bg-cyan-500 text-black px-10 py-4 font-orbitron font-black text-xs tracking-[0.2em] rounded-sm cursor-pointer flex items-center gap-3 relative overflow-hidden group"
          onClick={onCta}
        >
          <span className="relative z-10">INICJUJ MISJĘ</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <motion.div 
            className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"
          />
        </motion.button>

        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 opacity-40 cursor-pointer"
          onClick={onCta}
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.3em]">Nawiguj w dół</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 opacity-40 px-4">
        <div className="flex items-center gap-2"><Anchor className="w-3 h-3" /><span className="text-[9px] font-bold uppercase tracking-widest">Polska</span></div>
        <div className="flex items-center gap-2"><Globe className="w-3 h-3" /><span className="text-[9px] font-bold uppercase tracking-widest">Norwegia</span></div>
        <div className="flex items-center gap-2"><Layers className="w-3 h-3" /><span className="text-[9px] font-bold uppercase tracking-widest">Webfabrikk</span></div>
      </div>
    </motion.div>
  </section>
);
