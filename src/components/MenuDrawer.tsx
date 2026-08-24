import React, { useState, useRef, useEffect } from 'react';
import { 
  Instagram, 
  Linkedin, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  X
} from 'lucide-react';
import { COMPANY_SERVICES } from './ServicesSection';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
  onNavigateToHero?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToWorks?: () => void;
}

interface SubmenuCard {
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
  action?: () => void;
}

const SubmenuCarousel: React.FC<{ cards: SubmenuCard[] }> = ({ cards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 180;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full pt-2 pb-3 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
          Explore ({cards.length})
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              scroll('left');
            }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              scroll('right');
            }}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
            aria-label="Next items"
          >
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2.5 overflow-x-auto scroll-smooth py-1 no-scrollbar"
      >
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={(e) => {
              e.stopPropagation();
              card.action?.();
            }}
            className="group flex-shrink-0 w-32 sm:w-36 h-28 sm:h-32 rounded-xl overflow-hidden relative bg-[#222224] border border-white/10 shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-[#FF5C00]/80"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
            
            {card.badge && (
              <div className="absolute top-1.5 left-1.5 z-10">
                <span className="px-1.5 py-0.5 rounded-full bg-black/80 border border-white/15 text-[7px] font-mono font-bold uppercase text-[#FF5C00]">
                  {card.badge}
                </span>
              </div>
            )}

            <div className="absolute bottom-2 left-2 right-2 z-10">
              <h4 className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-wider font-sans drop-shadow-md group-hover:text-[#FF5C00] transition-colors leading-tight">
                {card.title}
              </h4>
              {card.subtitle && (
                <p className="text-[8px] text-white/70 font-mono mt-0.5 line-clamp-1">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onBookCall,
  onNavigateToHero,
  onNavigateToAbout,
  onNavigateToServices,
  onNavigateToWorks,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [worksToast, setWorksToast] = useState(false);
  const [activeModalInfo, setActiveModalInfo] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen && drawerRef.current) {
      gsap.fromTo(drawerRef.current, 
        { opacity: 0, x: -30, scale: 0.96 }, 
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const toggleSubmenu = (menuKey: string) => {
    setOpenSubmenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const servicesCards: SubmenuCard[] = COMPANY_SERVICES.map((s) => ({
    title: s.title.toUpperCase(),
    subtitle: s.tagline,
    image: s.image,
    badge: s.badge,
    action: () => {
      onClose();
      onNavigateToServices?.();
    },
  }));

  const industriesCards: SubmenuCard[] = [
    {
      title: 'RETAIL & E-COMM',
      subtitle: 'Luxury packaging & unboxing suites',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=85',
      badge: 'Bespoke',
      action: () => { onClose(); onNavigateToServices?.(); },
    },
    {
      title: 'CORPORATE & TECH',
      subtitle: 'Brand identity & annual profiles',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=85',
      badge: 'Identity',
      action: () => { onClose(); onNavigateToServices?.(); },
    },
    {
      title: 'FASHION & LUXURY',
      subtitle: 'Lookbooks, catalogs & gift covers',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=85',
      badge: 'Editorial',
      action: () => { onClose(); onNavigateToServices?.(); },
    },
    {
      title: 'HOSPITALITY & EVENTS',
      subtitle: 'Menus, invitations & stationery',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=85',
      badge: 'Print',
      action: () => { onClose(); onNavigateToServices?.(); },
    },
  ];

  const handleWorksClick = () => {
    setWorksToast(true);
    setTimeout(() => setWorksToast(false), 3000);
    onNavigateToWorks?.();
  };

  const handleJournalClick = () => {
    setActiveModalInfo('Sharp Design Journal: Explore design essays, print craft insights, and studio news coming in the upcoming editorial drop.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none flex items-center justify-start p-3 xs:p-5 sm:p-7 md:p-10">
      
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] cursor-pointer animate-in fade-in duration-300"
      />

      <div
        ref={drawerRef}
        className="relative z-20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-full max-h-[88vh] bg-[#121212] text-white rounded-[28px] xs:rounded-[34px] sm:rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col justify-between p-6 xs:p-8 sm:p-10 md:p-12 overflow-y-auto no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer z-30"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2">
          <button
            onClick={handleWorksClick}
            className="group flex items-center text-left cursor-pointer focus:outline-none w-full py-0.5"
          >
            <span className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight text-[#8c8882] group-hover:text-white transition-all duration-200 group-hover:translate-x-1 font-sans">
              Works
            </span>
          </button>

          <div className="w-full">
            <button
              onClick={() => toggleSubmenu('industries')}
              className="group flex items-center gap-1.5 text-left cursor-pointer focus:outline-none transition-all duration-200 py-0.5"
            >
              <span className={`text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight transition-colors duration-200 font-sans ${
                openSubmenu === 'industries' ? 'text-white' : 'text-[#8c8882] group-hover:text-white'
              }`}>
                Industries
              </span>
              <span className={`text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black transition-colors duration-200 ${
                openSubmenu === 'industries' ? 'text-[#FF5C00]' : 'text-[#8c8882] group-hover:text-white'
              }`}>
                +
              </span>
            </button>

            {openSubmenu === 'industries' && (
              <SubmenuCarousel cards={industriesCards} />
            )}
          </div>

          <div className="w-full">
            <button
              onClick={() => toggleSubmenu('services')}
              className="group flex items-center gap-1.5 text-left cursor-pointer focus:outline-none transition-all duration-200 py-0.5"
            >
              <span className={`text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight transition-colors duration-200 font-sans ${
                openSubmenu === 'services' ? 'text-white' : 'text-[#8c8882] group-hover:text-white'
              }`}>
                Services
              </span>
              <span className={`text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black transition-colors duration-200 ${
                openSubmenu === 'services' ? 'text-[#FF5C00]' : 'text-[#8c8882] group-hover:text-white'
              }`}>
                +
              </span>
            </button>

            {openSubmenu === 'services' && (
              <SubmenuCarousel cards={servicesCards} />
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onNavigateToAbout?.();
            }}
            className="group flex items-center text-left cursor-pointer focus:outline-none w-full py-0.5"
          >
            <span className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight text-[#8c8882] group-hover:text-white transition-all duration-200 group-hover:translate-x-1 font-sans">
              About us
            </span>
          </button>

          <button
            onClick={handleJournalClick}
            className="group flex items-center text-left cursor-pointer focus:outline-none w-full py-0.5"
          >
            <span className="text-3xl xs:text-4xl sm:text-5xl md:text-[54px] font-black tracking-tight text-[#8c8882] group-hover:text-white transition-all duration-200 group-hover:translate-x-1 font-sans">
              Journal
            </span>
          </button>
        </div>

        {worksToast && (
          <div className="p-2.5 bg-[#FF5C00]/20 border border-[#FF5C00]/40 rounded-xl text-[11px] font-mono text-white flex items-center gap-2 my-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Clock className="w-3.5 h-3.5 text-[#FF5C00] flex-shrink-0" />
            <span>Works portfolio is currently being curated.</span>
          </div>
        )}

        <div className="pt-6 sm:pt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-[#8c8882] uppercase">
            <button onClick={() => setActiveModalInfo('Join Sharp Design: We are always looking for passionate packaging engineers, print masters, and visual storytellers. Contact us at careers@sharpdesign.com')} className="text-left hover:text-white transition-colors cursor-pointer w-fit">JOIN THE TEAM</button>
            <button onClick={() => setActiveModalInfo('Client First Group: Our bespoke service tier providing direct access to creative directors and priority turnaround.')} className="text-left hover:text-white transition-colors cursor-pointer w-fit">CLIENT FIRST GROUP</button>
            <button onClick={() => setActiveModalInfo('Privacy Policy: All client artwork, vectors, dielines, and intellectual property remain 100% proprietary to client accounts.')} className="text-left hover:text-white transition-colors cursor-pointer w-fit">PRIVACY POLICY</button>
            <button onClick={() => setActiveModalInfo('Terms of Services: Guaranteed print fidelity, Pantone color tolerance guarantees, and quality inspections on every batch.')} className="text-left hover:text-white transition-colors cursor-pointer w-fit">TERMS OF SERVICES</button>
            <button onClick={() => { onClose(); onNavigateToServices?.(); }} className="text-left hover:text-white transition-colors cursor-pointer w-fit">SITE MAP</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF5C00] transition-all cursor-pointer"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF5C00] transition-all cursor-pointer font-sans font-bold text-xs">𝕏</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF5C00] transition-all cursor-pointer"><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF5C00] transition-all cursor-pointer font-serif font-bold text-xs">Bē</a>
            </div>

            <button onClick={onClose} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-[11px] font-mono font-bold uppercase transition-colors cursor-pointer">
              <span>CLOSE</span><X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {activeModalInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setActiveModalInfo(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer animate-in fade-in" />
          <div className="relative z-10 max-w-sm bg-[#16161d] text-white p-6 rounded-2xl border border-white/15 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-200">
            <p className="text-sm font-sans text-zinc-200 leading-relaxed">
              {activeModalInfo}
            </p>
            <button onClick={() => setActiveModalInfo(null)} className="mt-4 px-4 py-1.5 rounded-full bg-[#FF5C00] text-white font-mono text-xs font-bold uppercase cursor-pointer">
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
