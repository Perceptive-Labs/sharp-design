import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const clients = [
    "Arper", "Nomad Goods", "Fieldnotes", "Kavat", "Stripe", "Spotify", "Vercel", "Framer", "Linear"
  ];

  useGSAP(() => {
    // 3D Staggered entrance for the grid
    gsap.from('.client-card', {
      y: 50,
      rotationX: -45,
      opacity: 0,
      stagger: {
        amount: 0.8,
        grid: 'auto',
        from: 'center'
      },
      duration: 1,
      ease: 'back.out(1.2)'
    });

    // Marquee animation
    gsap.to('.marquee-track', {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: 'none'
    });
  }, { scope: containerRef });

  return (
    <div id="clients" ref={containerRef} className="min-h-screen pt-32 pb-20 text-[#121212] overflow-hidden">
      
      <div className="px-6 sm:px-12 max-w-7xl mx-auto mb-24 text-center">
        <h1 className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-tight mb-6">
          Trusted by <span className="font-normal italic font-serif text-[#FF5C00]">Visionaries</span>
        </h1>
      </div>

      {/* GSAP Infinite Marquee */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-32 rotate-[-2deg] bg-[#121212] text-[#fbf9ef] py-6">
        <div className="marquee-track flex gap-12 sm:gap-24 items-center">
          {[...clients, ...clients].map((client, i) => (
            <span key={i} className="text-4xl sm:text-6xl font-medium uppercase tracking-wider">{client} <span className="text-[#FF5C00] ml-12 sm:ml-24">*</span></span>
          ))}
        </div>
      </div>

      {/* 3D Staggered Grid */}
      <div className="px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 perspective-1000">
          {clients.map((client, i) => (
            <div 
              key={i} 
              className="client-card aspect-video border border-black/10 flex items-center justify-center rounded-xl bg-white hover:bg-[#FF5C00] hover:text-white transition-colors duration-500 cursor-pointer group"
              style={{ transformOrigin: 'center center' }}
            >
              <span className="text-xl sm:text-2xl font-medium group-hover:scale-110 transition-transform duration-500">{client}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
