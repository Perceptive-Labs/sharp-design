import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitParagraph: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ');
  return (
    <p className="reveal-paragraph text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium tracking-[-0.025em] leading-[1.32] sm:leading-[1.36] text-[#121212] font-sans">
      {words.map((word, i) => (
        <span key={i} className="relative inline-block mr-[0.28em] my-[0.04em] reveal-word">
          {word}
        </span>
      ))}
    </p>
  );
};

export const AboutRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scrubbed text reveal
    const words = gsap.utils.toArray('.reveal-word');
    
    gsap.fromTo(
      words,
      { opacity: 0.2, color: '#c7c4ba' },
      {
        opacity: 1,
        color: '#121212',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef });

  const paragraph1 = "Existence needs to be shown otherwise people around you let you go unnoticed. In today’s world it stands true therefore if you are making endless efforts to get your visibility then you need to have awesome and interactive designs.";
  const paragraph2 = "We are a bunch of creative heads that are engaged in making designs that are thoroughly responsive and attractive at first sight. Regardless of the projects that may be new or established ones, our focus remains on adding value to their existence via generating enough profound marketing and advertising ideas.";
  const paragraph3 = "Godspeed.";

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full h-[200vh] select-none"
    >
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 min-h-[100dvh] w-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-12 sm:gap-20">
          
          {/* Big Bold Heading: About Us */}
          <div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.04em] text-[#121212] font-sans leading-none">
              About Us <span className="text-[#FF5C00]">.</span>
            </h2>
          </div>

          {/* Main Manifesto Text with Scroll Reveal */}
          <div className="space-y-8 sm:space-y-12 max-w-4xl">
            <SplitParagraph text={paragraph1} />
            <SplitParagraph text={paragraph2} />
            <div className="pt-4">
              <SplitParagraph text={paragraph3} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
