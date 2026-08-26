import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { smoothScrollToId } from "../lib/scroll";

gsap.registerPlugin(ScrambleTextPlugin, useGSAP);

const PHRASES = [
  { main1: "Design", main2: "that", emp: "speaks." },
  { main1: "Print", main2: "that", emp: "performs." },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mainRef1 = useRef<HTMLSpanElement>(null);
  const mainRef2 = useRef<HTMLSpanElement>(null);
  const empRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Transformative 3D Masked Entry Animation
      const entryTl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      entryTl
        .fromTo(
          ".hero-title-line",
          {
            y: "135%",
            rotateX: -30,
            opacity: 0,
            scale: 0.92,
            filter: "blur(14px)",
            transformOrigin: "bottom center",
          },
          {
            y: "0%",
            rotateX: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            stagger: 0.2,
            clearProps: "transform,filter",
          },
          0.1
        )
        .fromTo(
          ".hero-sub-wrap",
          {
            y: 35,
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.3,
            clearProps: "transform,filter",
          },
          "-=0.9"
        );

      // Initial scramble on load for subtext right after the entry reveal
      gsap.to(mainRef1.current, {
        duration: 1.2,
        delay: 1.1,
        scrambleText: {
          text: PHRASES[0].main1,
          chars: "lowerCase",
          speed: 0.6,
        },
        ease: "none",
      });
      gsap.to(mainRef2.current, {
        duration: 1.2,
        delay: 1.2,
        scrambleText: {
          text: PHRASES[0].main2,
          chars: "lowerCase",
          speed: 0.6,
        },
        ease: "none",
      });
      gsap.to(empRef.current, {
        duration: 1.2,
        delay: 1.3,
        scrambleText: { text: PHRASES[0].emp, chars: "lowerCase", speed: 0.6 },
        ease: "none",
      });

      const tl = gsap.timeline({ repeat: -1, delay: 4.2 });

      // Loop through the alternative phrases
      PHRASES.slice(1).forEach((phrase) => {
        tl.to(
          mainRef1.current,
          {
            duration: 1.2,
            scrambleText: {
              text: phrase.main1,
              chars: "lowerCase",
              revealDelay: 0.1,
              speed: 0.6,
            },
            ease: "none",
          },
          "+=0",
        );

        tl.to(
          mainRef2.current,
          {
            duration: 1.2,
            scrambleText: {
              text: phrase.main2,
              chars: "lowerCase",
              revealDelay: 0.15,
              speed: 0.6,
            },
            ease: "none",
          },
          "<",
        );

        tl.to(
          empRef.current,
          {
            duration: 1.2,
            scrambleText: {
              text: phrase.emp,
              chars: "lowerCase",
              revealDelay: 0.2,
              speed: 0.6,
            },
            ease: "none",
          },
          "<",
        );

        tl.to({}, { duration: 3 });
      });

      // Loop back to the first one
      tl.to(
        mainRef1.current,
        {
          duration: 1.2,
          scrambleText: {
            text: PHRASES[0].main1,
            chars: "lowerCase",
            revealDelay: 0.1,
            speed: 0.6,
          },
          ease: "none",
        },
        "+=0",
      );

      tl.to(
        mainRef2.current,
        {
          duration: 1.2,
          scrambleText: {
            text: PHRASES[0].main2,
            chars: "lowerCase",
            revealDelay: 0.15,
            speed: 0.6,
          },
          ease: "none",
        },
        "<",
      );

      tl.to(
        empRef.current,
        {
          duration: 1.2,
          scrambleText: {
            text: PHRASES[0].emp,
            chars: "lowerCase",
            revealDelay: 0.2,
            speed: 0.6,
          },
          ease: "none",
        },
        "<",
      );

      tl.to({}, { duration: 3 });
    },
    { scope: containerRef },
  );

  return (
    <main
      id="hero"
      ref={containerRef}
      className="relative isolate flex flex-col min-h-[100dvh] overflow-hidden text-[#121212] antialiased"
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      <section className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 pb-[10vh]">
        <div className="w-full text-center flex flex-col items-center [perspective:1000px]">
          {/* STATIC MAIN HERO TEXT WITH 3D MASKED REVEAL */}
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.03em] flex flex-col items-center w-full max-w-full px-4">
            <div className="overflow-hidden py-1">
              <span className="hero-title-line block sm:whitespace-nowrap will-change-transform">
                Brands seen
              </span>
            </div>
            <div className="overflow-hidden py-1 mt-1 sm:mt-3 w-full">
              <span className="hero-title-line block w-full sm:whitespace-nowrap text-balance sm:text-auto will-change-transform">
                <span className="inline mr-[0.3em]">through</span>
                <em
                  className="font-normal inline text-[#FF5C00]"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: "italic",
                  }}
                >
                  a different light.
                </em>
              </span>
            </div>
          </h1>

          {/* ANIMATED LOOPING SUB-TEXT */}
          <div className="hero-sub-wrap overflow-hidden mt-8 sm:mt-12">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] leading-[1.1] sm:leading-none font-medium tracking-[-0.02em] flex flex-row flex-wrap sm:flex-nowrap items-center justify-center sm:whitespace-nowrap text-center w-full max-w-full px-4 mx-auto">
              <span ref={mainRef1} className="mr-[0.3em] text-[#FF5C00]">
                {PHRASES[0].main1}
              </span>
              <span ref={mainRef2} className="mr-[0.3em]">
                {PHRASES[0].main2}
              </span>
              <em
                ref={empRef}
                className="font-normal inline-block mt-1 sm:mt-0"
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: "italic",
                }}
              >
                {PHRASES[0].emp}
              </em>
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
};
