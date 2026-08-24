import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const LogoDesigningVideoCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Continuous floating animation for the card
    gsap.to('.slate-card', {
      y: -4,
      rotateX: 14,
      rotateY: -6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Main timeline sequence (4 steps)
    const tl = gsap.timeline({ repeat: -1 });

    // Step 0 -> 1: Blueprint appears
    tl.to('.blueprint-guides', { opacity: 0.85, duration: 0.5 }, 2.8)
      
      // Step 1 -> 2: Cursor glides in and clicks
      .to('.mouse-cursor', { x: 15, y: -10, duration: 0.7, ease: 'power2.inOut' }, 5.6)
      
      // Click effect
      .to('.mouse-cursor-svg', { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, 6.3)
      .fromTo('.click-ripple', { scale: 0.2, opacity: 1 }, { scale: 2.8, opacity: 0, duration: 0.6 }, 6.3)
      
      // Step 2 -> 3: Logo appears
      .to('.wireframe-nodes', { opacity: 0, duration: 0.3 }, 6.3)
      .fromTo('.rendered-logo', 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, 
        6.4
      )
      
      // Step 3 -> 4: Cursor moves away slightly
      .to('.mouse-cursor', { x: 25, y: 5, duration: 0.7, ease: 'power2.inOut' }, 8.4)
      
      // Reset for next loop
      .to('.rendered-logo', { opacity: 0, duration: 0.5 }, 11.2)
      .to('.wireframe-nodes', { opacity: 1, duration: 0.5 }, 11.2)
      .to('.blueprint-guides', { opacity: 0.25, duration: 0.5 }, 11.2)
      .to('.mouse-cursor', { x: -40, y: 30, duration: 0.7 }, 11.2);

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[420px] bg-[#111215] overflow-hidden select-none flex items-center justify-center"
    >
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f46e5 1px, transparent 1px),
            linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
          transform: 'perspective(600px) rotateX(45deg) scale(1.4)',
        }}
      />

      <div className="absolute -top-12 -left-12 w-48 h-32 rounded-xl bg-white/[0.04] border border-white/10 rotate-12 opacity-40 blur-[1px] pointer-events-none hidden sm:block" />
      <div className="absolute -bottom-10 -right-10 w-52 h-36 rounded-xl bg-white/[0.04] border border-white/10 -rotate-6 opacity-40 blur-[1px] pointer-events-none hidden sm:block" />
      <div className="absolute top-4 -right-16 w-44 h-28 rounded-xl bg-white/[0.04] border border-white/10 rotate-12 opacity-30 pointer-events-none hidden sm:block" />

      <div
        className="slate-card relative w-[92%] sm:w-[90%] max-w-[500px] aspect-[16/10] bg-[#1a1b1e] rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(79,70,229,0.15)] p-2.5 sm:p-5 md:p-7 flex flex-col justify-between overflow-hidden"
        style={{ transformStyle: 'preserve-3d', perspective: 1000, transform: 'rotateX(12deg) rotateY(-8deg)' }}
      >
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-black/40 pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          <defs>
            <pattern id="cardGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cardGrid)" />
        </svg>

        <div className="blueprint-guides absolute inset-0 pointer-events-none" style={{ opacity: 0.25 }}>
          <div className="absolute top-1/4 left-1/3 w-16 sm:w-28 h-[1px] bg-cyan-400/60" />
          <div className="absolute top-1/6 left-1/2 w-[1px] h-20 sm:h-36 bg-cyan-400/60" />
          <div className="absolute bottom-1/3 right-1/4 w-12 sm:w-20 h-[1px] bg-cyan-400/60" />

          <span className="absolute top-2 sm:top-6 left-3 sm:left-10 font-mono text-[7px] sm:text-[9px] text-cyan-300/80 tracking-widest">
            0.05.93.19
          </span>
          <span className="absolute top-8 sm:top-16 left-2 sm:left-6 font-mono text-[6px] sm:text-[8px] text-cyan-300/70">
            R: 0.5
          </span>
          <span className="absolute bottom-6 sm:bottom-16 right-3 sm:right-10 font-mono text-[6px] sm:text-[8px] text-cyan-300/70">
            6.04
          </span>
        </div>

        <div className="relative z-10 my-auto flex items-center justify-center">
          <svg
            viewBox="0 0 200 160"
            className="w-28 xs:w-36 sm:w-48 md:w-60 h-20 xs:h-26 sm:h-36 md:h-44 overflow-visible drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          >
            <defs>
              <linearGradient id="ldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb703" />
                <stop offset="30%" stopColor="#fb8500" />
                <stop offset="60%" stopColor="#f72585" />
                <stop offset="100%" stopColor="#7209b7" />
              </linearGradient>
              <linearGradient id="ldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4cc9f0" />
                <stop offset="50%" stopColor="#7209b7" />
                <stop offset="100%" stopColor="#f72585" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g className="wireframe-nodes" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8">
              <circle cx="65" cy="40" r="3.5" fill="#38bdf8" />
              <circle cx="135" cy="40" r="3.5" fill="#38bdf8" />
              <circle cx="65" cy="115" r="3.5" fill="#38bdf8" />
              <circle cx="105" cy="115" r="3.5" fill="#38bdf8" />
              <circle cx="145" cy="80" r="3.5" fill="#38bdf8" />
              
              <path d="M 65 40 L 65 115 L 105 115" strokeDasharray="3 3" />
              <path d="M 65 40 L 120 40 C 150 40 150 115 105 115" strokeDasharray="3 3" />
              <line x1="65" y1="78" x2="140" y2="78" stroke="#38bdf8" strokeWidth="0.75" />
            </g>

            <g className="rendered-logo" style={{ opacity: 0 }} filter="url(#glow)">
              <path d="M 60 38 L 60 118 L 100 118 L 100 100 L 78 100 L 78 38 Z" fill="#431259" transform="translate(4, 4)" opacity="0.6" />
              <path d="M 55 35 L 55 120 L 105 120 L 105 98 L 78 98 L 78 35 Z" fill="url(#ldGrad1)" className="drop-shadow-lg" />
              <path d="M 82 35 C 130 35 155 60 155 85 C 155 110 128 120 100 120 L 88 120 L 88 98 L 100 98 C 122 98 132 90 132 82 C 132 70 118 57 95 57 L 82 57 Z" fill="url(#ldGrad2)" />
              <path d="M 55 35 L 78 35 L 78 98 L 105 98" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
              <path d="M 82 35 C 130 35 155 60 155 85" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
              <circle cx="95" cy="57" r="4" fill="#ffffff" filter="url(#glow)" />
            </g>
          </svg>

          <div className="mouse-cursor absolute z-20 pointer-events-none" style={{ transform: 'translate(-40px, 30px)' }}>
            <svg viewBox="0 0 24 24" className="mouse-cursor-svg w-7 sm:w-9 h-7 sm:h-9 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] fill-white stroke-black stroke-[1.5]">
              <path d="M 3 3 L 10 21 L 13 14 L 20 12 Z" />
            </svg>

            <div className="click-ripple absolute top-0 left-0 w-8 h-8 rounded-full bg-cyan-400/80 -translate-x-1/4 -translate-y-1/4 pointer-events-none" style={{ opacity: 0 }} />
          </div>
        </div>

        <div className="relative z-10 flex flex-col">
          <span className="text-white text-base sm:text-xl font-bold font-sans tracking-tight">Logo</span>
          <span className="text-white text-base sm:text-xl font-bold font-sans tracking-tight -mt-1">Designing</span>
        </div>
      </div>
    </div>
  );
};
