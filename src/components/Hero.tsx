import React from 'react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(14px);
          animation: reveal-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--reveal-delay, 0s);
        }
        @keyframes reveal-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
      
      <main 
        id="hero" 
        className="relative isolate flex flex-col min-h-[100dvh] overflow-hidden text-[#121212] antialiased" 
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >

        {/* Headline row */}
        <section 
          className="relative z-10 flex-1 flex flex-col justify-center items-start px-6 sm:px-12"
        >
          <div className="max-w-3xl w-full">
            <h1 
              className="reveal text-[clamp(3rem,7.5vw,6rem)] leading-[0.95] font-medium tracking-[-0.03em] text-balance" 
              style={{ '--reveal-delay': '0.25s' } as React.CSSProperties}
            >
              Brands seen through <em className="font-normal" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', color: '#FF5C00' }}>a different light.</em>
            </h1>
            
            <div className="reveal flex flex-wrap gap-4 mt-10" style={{ '--reveal-delay': '0.4s' } as React.CSSProperties}>
              <Link to="/contact" className="px-8 py-3.5 bg-[#FF5C00] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#121212] transition-colors inline-flex items-center justify-center">
                Book Discovery Call
              </Link>
              <Link to="/portfolio" className="px-8 py-3.5 bg-white/50 backdrop-blur-md border border-[#121212]/20 text-[#121212] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#121212]/10 transition-colors inline-flex items-center justify-center">
                View Portfolio
              </Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
};
