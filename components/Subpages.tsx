
import React from 'react';
import { motion } from 'framer-motion';
import { PageId } from '../App';
import { Rocket, Cpu, Sparkles, Shield, Users, ArrowRight, Zap, Target, Globe, Anchor, ChevronDown, MoveRight, Mail } from 'lucide-react';

interface SubpageProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export const SubpageManager: React.FC<SubpageProps> = ({ activePage, onNavigate }) => {
  switch (activePage) {
    case 'co-robimy':
      return <CoRobimy onNavigate={onNavigate} />;
    case 'webfabrikk':
      return <Webfabrikk onNavigate={onNavigate} />;
    case 'geneza':
      return <Geneza onNavigate={onNavigate} />;
    case 'dlaczego':
      return <Dlaczego onNavigate={onNavigate} />;
    case 'wspolpraca':
      return <Wspolpraca onNavigate={onNavigate} />;
    default:
      return null;
  }
};

const PageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen pt-32 md:pt-40 pb-32 px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center">
    {children}
  </div>
);

const ScrollIndicator = () => (
  <motion.div 
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="mt-8 mb-12 flex flex-col items-center gap-2 opacity-30 md:hidden"
  >
    <span className="text-[8px] font-bold tracking-[0.3em] uppercase">Scrolluj dalej</span>
    <ChevronDown className="w-4 h-4 text-cyan-400" />
  </motion.div>
);

const NextSectorButton = ({ label, destination, onNavigate, color = "cyan" }: { label: string, destination: PageId, onNavigate: (p: PageId) => void, color?: "cyan" | "purple" }) => {
  const colorClass = color === "cyan" ? "bg-cyan-500 shadow-[0_0_20px_rgba(52,224,247,0.3)]" : "bg-purple-600 shadow-[0_0_20px_rgba(140,77,255,0.3)]";
  const glowColor = color === "cyan" ? "rgba(52,224,247,0.4)" : "rgba(140,77,255,0.4)";

  return (
    <div className="mt-20 flex flex-col items-center gap-6 w-full max-w-sm">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-40">Następny Sektor</span>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        animate={{ 
          boxShadow: [
            `0 0 0px ${glowColor}`,
            `0 0 30px ${glowColor}`,
            `0 0 0px ${glowColor}`
          ]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => onNavigate(destination)}
        className={`${colorClass} text-white md:text-black font-orbitron font-black text-[10px] md:text-xs tracking-[0.2em] py-5 px-10 rounded-sm cursor-pointer flex items-center justify-between w-full group`}
      >
        <span className="uppercase">{label}</span>
        <div className="flex items-center gap-2">
           <span className="text-[8px] opacity-60 hidden group-hover:inline">WARP DRIVE</span>
           <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.button>
    </div>
  );
};

const CoRobimy = ({ onNavigate }: { onNavigate: (p: PageId) => void }) => (
  <PageContainer>
    <header className="text-center mb-16 md:mb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-6">
        <div className="px-4 py-1 border border-cyan-500/30 text-cyan-400 text-[9px] font-bold tracking-[0.5em] uppercase rounded-full bg-cyan-950/10">Sektor: Misja</div>
      </motion.div>
      <h1 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
        CO ROBIMY JAKO SOCIAL MEDIA STUDIO
      </h1>
      <p className="text-cyan-100/70 text-base md:text-lg font-mono leading-relaxed max-w-2xl mx-auto px-4">
        Przejmujemy stery Twojej komunikacji, abyś Ty mógł skupić się na celu podróży. Spokój w biznesie, mądrość w strategii.
      </p>
    </header>

    <ScrollIndicator />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full mb-10">
      <ServiceCard 
        icon={<Target className="w-6 h-6" />}
        title="Social Media Management"
        text="Prowadzimy Meta Ads, TikTok i Instagram. Nie szukamy lajków, szukamy realnej mocy konwersji."
      />
      <ServiceCard 
        icon={<Sparkles className="w-6 h-6" />}
        title="Content Creation"
        text="Tworzymy materiały wideo i graficzne, które przebijają się przez cyfrowy szum wszechświata."
      />
      <ServiceCard 
        icon={<Cpu className="w-6 h-6" />}
        title="AI Assisted Marketing"
        text="Wykorzystujemy AI, by optymalizować zasięgi, ale to ludzka mądrość kieruje każdym postem."
      />
      <ServiceCard 
        icon={<Globe className="w-6 h-6" />}
        title="Globalna Strategia"
        text="Budujemy kampanie na rynek Polski i Norweski, łącząc różne kultury w jeden spójny sygnał."
      />
    </div>

    <NextSectorButton label="Poznaj nasze pochodzenie" destination="webfabrikk" onNavigate={onNavigate} />
  </PageContainer>
);

const Webfabrikk = ({ onNavigate }: { onNavigate: (p: PageId) => void }) => (
  <PageContainer>
    <header className="text-center mb-16 md:mb-20 w-full">
      <h1 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 font-orbitron leading-tight px-4 uppercase">WEBFABRIKK – SKĄD POCHODZIMY</h1>
      <div className="h-1 w-24 bg-purple-500 mx-auto mb-12 shadow-[0_0_15px_#8C4DFF]" />
      
      <ScrollIndicator />

      <article className="max-w-2xl mx-auto font-mono text-cyan-100/70 leading-relaxed text-left space-y-12 px-4 text-sm md:text-base">
        <section className="space-y-4">
          <h2 className="text-cyan-400 font-bold text-xs md:text-sm tracking-widest uppercase">01 // Silnik Napędowy</h2>
          <p>
            Zanim powstała misja Social Media Studio, istniał silnik. Webfabrikk to nasz fundament – miejsce, gdzie precyzja kodu spotyka się z wizją strategiczną.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-cyan-400 font-bold text-xs md:text-sm tracking-widest uppercase">02 // Kultura Systemowa</h2>
          <p>
            Pochodzimy z kultury systemowego myślenia. Każda strona, każda aplikacja i każdy algorytm, który budujemy, ma jeden cel: działać bezbłędnie w najtrudniejszych warunkach rynkowych.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-cyan-400 font-bold text-xs md:text-sm tracking-widest uppercase">03 // Dwa Światy</h2>
          <p>
            Nasze korzenie in Polsce i Norwegii nauczyły nas łączenia ognia kreatywności z lodowatym spokojem skandynawskiej użyteczności.
          </p>
        </section>
      </article>
    </header>

    <NextSectorButton label="Jak to się zaczęło?" destination="geneza" onNavigate={onNavigate} color="purple" />
    
    <motion.button 
      onClick={() => onNavigate('home')}
      className="text-white/40 font-orbitron text-[8px] tracking-[0.4em] uppercase hover:text-white transition-colors cursor-pointer py-4 mt-8"
    >
      [ POWRÓT DO BAZY ]
    </motion.button>
  </PageContainer>
);

const Geneza = ({ onNavigate }: { onNavigate: (p: PageId) => void }) => (
  <PageContainer>
    <h1 className="text-3xl md:text-5xl font-black mb-12 md:mb-16 font-orbitron text-center leading-tight uppercase px-4">GENEZA SOCIAL MEDIA STUDIO</h1>
    
    <ScrollIndicator />

    <div className="space-y-8 w-full max-w-3xl">
      <div className="glass-panel p-8 md:p-10">
        <h2 className="text-lg md:text-xl font-bold text-cyan-400 mb-6 font-mono uppercase tracking-tight">Z CHAOSU W PORZĄDEK</h2>
        <p className="font-mono text-xs md:text-sm leading-relaxed mb-6 opacity-80">
          Świat mediów społecznościowych stał się głośny, chaotyczny i pełen przypadkowych działań. Widzieliśmy marki, które dryfują bez celu, marnując paliwo na kampanie, które nie niosą wartości.
        </p>
      </div>

      <div className="glass-panel p-8 md:p-10 border-purple-500/20">
        <h2 className="text-lg md:text-xl font-bold text-purple-400 mb-6 font-mono uppercase tracking-tight">ODPOWIEDŹ SYSTEMU</h2>
        <p className="font-mono text-xs md:text-sm leading-relaxed text-purple-400/80">
          Postanowiliśmy to zmienić. Zbudowaliśmy strukturę tam, gdzie był szum. Zastosowaliśmy inżynieryjne podejście Webfabrikk do ulotnego świata marketingu.
        </p>
      </div>
      
      <div className="flex justify-center pt-8">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
    </div>

    <NextSectorButton label="Dlaczego nasza misja?" destination="dlaczego" onNavigate={onNavigate} />
  </PageContainer>
);

const Dlaczego = ({ onNavigate }: { onNavigate: (p: PageId) => void }) => (
  <PageContainer>
    <h1 className="text-3xl md:text-5xl font-black mb-16 font-orbitron text-center px-4 uppercase">DLACZEGO TO ROBIMY</h1>
    
    <ScrollIndicator />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start w-full px-4">
      <div className="space-y-12 md:space-y-16">
        <div className="flex gap-6">
          <Shield className="w-10 h-10 text-cyan-400 shrink-0" />
          <div className="space-y-3">
            <h3 className="font-bold text-lg md:text-xl mb-2 text-white uppercase tracking-tight">Usuwamy Hałas</h3>
            <p className="text-sm md:text-base opacity-70 font-mono leading-relaxed">Pomagamy firmom odciąć się od marketingowego szumu i skupić na tym, co buduje realną wartość. Mniej szumu, więcej celu.</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          <Users className="w-10 h-10 text-purple-400 shrink-0" />
          <div className="space-y-3">
            <h3 className="font-bold text-lg md:text-xl mb-2 text-white uppercase tracking-tight">Budujemy Relacje</h3>
            <p className="text-sm md:text-base opacity-70 font-mono leading-relaxed">Social media to nie cyfry, to ludzie. Dbamy o to, by każda interakcja była autentyczna i niosła prawdziwe połączenie.</p>
          </div>
        </div>
      </div>
      
      <div className="sticky top-40 p-8 md:p-12 border border-white/5 bg-white/5 backdrop-blur-md rounded-2xl italic font-mono text-sm md:text-base leading-relaxed text-cyan-100/60 border-l-cyan-400 border-l-2">
        "Naszą misją jest danie Masterom Biznesu wolności. My zajmujemy się walką w okopach algorytmów, oni – wizją przyszłości. Razem tworzymy nową jakość cyfrowej egzystencji."
      </div>
    </div>

    <NextSectorButton label="Zjednoczmy siły" destination="wspolpraca" onNavigate={onNavigate} color="purple" />
  </PageContainer>
);

const Wspolpraca = ({ onNavigate }: { onNavigate: (p: PageId) => void }) => (
  <PageContainer>
    <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 font-orbitron text-center tracking-tighter uppercase px-4">ZJEDNOCZMY SIĘ</h1>
    <p className="text-cyan-400 font-mono text-[10px] md:text-sm mb-16 md:mb-24 tracking-[0.2em] uppercase text-center px-4">Nikt nie lata samotnie w tej galaktyce.</p>
    
    <ScrollIndicator />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full mb-20 px-4">
      <AllianceCard title="Dla Agencji" text="Model White-label i wsparcie techniczne dla Twoich klientów. Pełna integracja systemowa." />
      <AllianceCard title="Dla Freelancerów" text="Wspólne projekty i dostęp do ekosystemu Webfabrikk. Twoja kreatywność, nasz silnik." />
      <AllianceCard title="Partnerstwa" text="Długofalowe sojusze oparte na wspólnych wartościach i wzajemnym rozwoju." />
    </div>

    <div className="glass-panel p-8 md:p-12 w-full max-w-2xl text-center mx-4 space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-orbitron font-bold mb-2 uppercase tracking-tight">INICJUJ POŁĄCZENIE</h2>
        <p className="text-[8px] font-mono uppercase tracking-widest opacity-40">Otwórz kanał komunikacji</p>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="p-4 bg-cyan-500/10 rounded-full mb-2">
              <Mail className="w-8 h-8 text-cyan-400" />
            </div>
            <span className="text-cyan-400 font-mono text-sm tracking-wider font-bold">aimarketingagencynorge@gmail.com</span>
          </div>
          
          <motion.a 
            href="mailto:aimarketingagencynorge@gmail.com?subject=Polaczenie%20inicjuj&body=Witaj%20Masterze,%20inicjuję%20połączenie%20w%20sprawie%20sojuszu..."
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: [
                "0 0 0px rgba(140,77,255,0)",
                "0 0 40px rgba(140,77,255,0.5)",
                "0 0 0px rgba(140,77,255,0)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="inline-block w-full bg-purple-600 text-white py-6 font-orbitron font-black text-[12px] md:text-sm tracking-[0.3em] hover:bg-purple-500 transition-colors uppercase shadow-[0_0_20px_rgba(140,77,255,0.3)] cursor-pointer text-center"
          >
            WYŚLIJ SYGNAŁ SOJUSZU
          </motion.a>
          
          <p className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-40 mt-4">
            Inicjuj połączenie bezpośrednio z naszym centrum dowodzenia
          </p>
        </div>
      </div>
    </div>

    <motion.button 
      onClick={() => onNavigate('home')}
      className="text-white/30 font-orbitron text-[8px] tracking-[0.4em] uppercase hover:text-white transition-colors cursor-pointer py-10 mt-10"
    >
      [ POWRÓT DO BAZY GŁÓWNEJ ]
    </motion.button>
  </PageContainer>
);

const ServiceCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="glass-panel p-8 md:p-10 group hover:border-cyan-400 transition-colors flex flex-col items-start gap-4">
    <div className="text-cyan-400 bg-cyan-500/10 p-4 rounded-lg">{icon}</div>
    <h3 className="text-lg md:text-xl font-orbitron font-bold tracking-tight text-white uppercase">{title}</h3>
    <p className="text-sm font-mono opacity-60 leading-relaxed text-cyan-50/80">{text}</p>
  </div>
);

const AllianceCard = ({ title, text }: { title: string, text: string }) => (
  <div className="p-8 md:p-10 border border-white/10 hover:bg-cyan-500/5 transition-all text-center rounded-xl flex flex-col gap-4">
    <h3 className="font-orbitron font-bold text-base md:text-lg text-cyan-400 uppercase tracking-tight">{title}</h3>
    <p className="text-sm font-mono opacity-60 leading-relaxed">{text}</p>
  </div>
);
