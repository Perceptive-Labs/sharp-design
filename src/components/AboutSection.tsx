import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Subtle fade in for the text block as it enters viewport
      gsap.from(".about-content", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-14 sm:py-20 md:min-h-screen md:py-0 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 bg-transparent"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-5 sm:gap-8">
        {/* Big Bold Heading: About Us */}
        <div>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em] text-[#121212] font-sans leading-none">
            About Us <span className="text-[#FF5C00]">.</span>
          </h2>
        </div>

        {/* Editorial Content */}
        <div className="about-content space-y-4 sm:space-y-6 max-w-4xl text-[#121212]">
          <p className="text-[clamp(1.2rem,3.5vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.3] font-sans">
            We are an elite art direction and graphic design studio. We partner
            with visionaries to engineer visual systems that feel physical,
            premium, and deeply intentional.
          </p>
          <p className="text-[clamp(1.05rem,2.8vw,1.5rem)] font-normal italic font-serif text-[#FF5C00]">
            Print is not dead. It just requires better taste.
          </p>

          {/* Quick Pillar Tags for Rich Mobile Presence */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121212]/5 text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#121212]/80 uppercase">
              <span className="text-[#FF5C00]">✦</span> 10+ Yrs Craft
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121212]/5 text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#121212]/80 uppercase">
              <span className="text-[#FF5C00]">✦</span> 500+ Deliverables
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121212]/5 text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#121212]/80 uppercase">
              <span className="text-[#FF5C00]">✦</span> Print & Digital Mastery
            </span>
          </div>

          <div className="pt-3 sm:pt-6">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 sm:gap-6 transition-colors"
            >
              <span className="text-lg sm:text-2xl md:text-3xl font-mono font-bold uppercase tracking-widest text-[#121212] group-hover:text-[#FF5C00] transition-colors">
                Read More
              </span>
              <span className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-[#FF5C00] text-white flex items-center justify-center overflow-hidden relative shrink-0 shadow-lg">
                <ArrowUpRight className="w-4 h-4 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
