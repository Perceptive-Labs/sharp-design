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
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-14 sm:pt-20 pb-14 sm:pb-20 bg-transparent"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-start gap-6 sm:gap-10">
        {/* Big Bold Heading: About Us */}
        <div>
          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em] text-[#121212] font-sans leading-none">
            About Us <span className="text-[#FF5C00]">.</span>
          </h2>
        </div>

        {/* New Highly Specific Editorial Content */}
        <div className="about-content space-y-4 sm:space-y-6 max-w-4xl text-[#121212]">
          <p className="text-[clamp(1.25rem,4vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.3] font-sans">
            We are an elite art direction and graphic design studio. We partner
            with visionaries to engineer visual systems that feel physical,
            premium, and deeply intentional.
          </p>
          <p className="text-[clamp(1.125rem,3vw,1.5rem)] font-normal italic font-serif text-[#FF5C00] pt-1">
            Print is not dead. It just requires better taste.
          </p>

          <div className="pt-4 sm:pt-8">
            <Link
              to="/about"
              className="group inline-flex items-center gap-4 sm:gap-6 transition-colors"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold uppercase tracking-widest text-[#121212] group-hover:text-[#FF5C00] transition-colors">
                Read More
              </span>
              <span className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FF5C00] text-white flex items-center justify-center overflow-hidden relative shrink-0 shadow-lg">
                <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
