
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageId } from '../App';

interface JedAIProps {
  activePage: PageId;
}

const DIALOGUES: Record<PageId, string> = {
  home: "Masterze, Sektor Gliwice osiągnięty. W nadprzestrzeń cyfrową Polski i Norwegii wchodzimy. Cel podróży podaj, Ty.",
  'co-robimy': "Potężne narzędzia tu widzę. Meta Ads i TikTok... Nie lajków szukaj, lecz mocy konwersji, Masterze. Strategia cierpliwości wymaga.",
  webfabrikk: "Webfabrikk silnikiem naszym jest. Solidność skandynawska z polską duszą tu połączona. Fundamenty silne, misję stabilną czynią, hm?",
  geneza: "Z chaosu porządek wyłonić się musi. Systemy zamiast przypadku... Tak narodziło się Studio, by jasność w marketingu dać.",
  dlaczego: "Dlaczego to robimy, pytasz? Hałas usunąć chcemy. Ciszę i wzrost Masterom dać, by wizję swoją spełniać mogli, bez trosk zbędnych.",
  wspolpraca: "Nikt sam nie lata, Masterze. Sojusz siłę daje. Sygnał wyślij, partnerów godnych znajdziemy, by razem galaktykę podbijać."
};

export const JedAIHologram: React.FC<JedAIProps> = ({ activePage }) => {
  const [text, setText] = useState("");
  const fullText = DIALOGUES[activePage] || DIALOGUES.home;

  useEffect(() => {
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        current += fullText[i];
        setText(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-5 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div 
          key={activePage}
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 10 }}
          className="glass-panel p-4 max-w-[240px] rounded-2xl border-[#34E0F7]/30 relative shadow-[0_0_20px_rgba(52,224,247,0.1)] crt-flicker"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-1 bg-[#34E0F7] rounded-full animate-ping" />
            <span className="text-[8px] text-[#34E0F7] font-bold tracking-[0.2em] uppercase opacity-60">Jed-AI Holo-Link</span>
          </div>
          <p className="text-[10px] font-mono leading-relaxed text-cyan-50 italic">{text}</p>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 glass-panel rotate-45 border-t-0 border-l-0" />
        </motion.div>
      </AnimatePresence>

      <div className="relative w-20 h-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-cyan-400/20 blur-lg rounded-full" />
        <motion.div 
          animate={{ y: [-3, 3, -3], rotateY: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
           <div className="relative">
              <div className="w-10 h-10 border border-purple-500/30 rotate-45 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-5 h-5 border border-cyan-300/20 animate-spin-slow" />
                 <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff]" />
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};
