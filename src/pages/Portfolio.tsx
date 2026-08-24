import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { StackedServiceCardsSection } from '../components/StackedServiceCardsSection';

export const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Advanced entry animation
    gsap.from('.portfolio-header span', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2
    });
    
    gsap.from('.portfolio-desc', {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power3.out',
      delay: 0.8
    });
  }, { scope: containerRef });

  return (
    <div id="portfolio" ref={containerRef} className="min-h-screen pt-32 text-[#121212]">
      <div className="px-6 sm:px-12 max-w-7xl mx-auto mb-20 overflow-hidden">
        <h1 className="portfolio-header text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-medium tracking-tight flex flex-wrap gap-x-4">
          <span className="block">Selected</span>
          <span className="block font-normal italic font-serif text-[#FF5C00]">Works.</span>
        </h1>
        <p className="portfolio-desc mt-8 max-w-xl text-lg text-[#121212]/60">
          A showcase of our world-class digital experiences, combining striking typography with fluid, unexpected motion.
        </p>
      </div>

      {/* Reuse the world-class stacked cards section for portfolio items */}
      <StackedServiceCardsSection onBookCall={() => {}} />
    </div>
  );
};
