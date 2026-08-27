import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

import { CATEGORY_IMAGES } from "../lib/portfolioCategories";

export interface ServiceCardData {
  id: string;
  titlePrefix: string;
  titleItalic: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  buttonTextColor: string;
  italicColor: string;
}

const STACKED_SERVICES: ServiceCardData[] = [
  {
    id: "brochure-designs",
    titlePrefix: "Brochure",
    titleItalic: "Designs",
    description:
      "We pair evocative typography with multi-fold precision and vibrant color depth for tactile editorial layouts.",
    bgColor: "#121212", // 01: Deep Obsidian Silk Black
    textColor: "#ffffff",
    accentColor: "#FF5C00", // Electric Studio Orange
    buttonTextColor: "#ffffff",
    italicColor: "#FF5C00",
  },
  {
    id: "logos",
    titlePrefix: "Logo",
    titleItalic: "Identity",
    description:
      "We build enduring visual identity systems, vector marks, and comprehensive brand guidelines that scale.",
    bgColor: "#F5EFEB", // 02: Alabaster Warm Fine Linen Paper
    textColor: "#121212",
    accentColor: "#121212", // High-Contrast Charcoal Black
    buttonTextColor: "#ffffff",
    italicColor: "#FF5C00",
  },
  {
    id: "booklet-prints",
    titlePrefix: "Booklet",
    titleItalic: "Editions",
    description:
      "From luxury product lookbooks to executive corporate annual reports, with velvet laminated finishes.",
    bgColor: "#E6DDCE", // 03: Warm Sandstone / Raw Kraft Paper Tone
    textColor: "#121212",
    accentColor: "#121212", // Charcoal Black
    buttonTextColor: "#ffffff",
    italicColor: "#FF5C00",
  },
  {
    id: "stationery-prints",
    titlePrefix: "Stationery",
    titleItalic: "Prints",
    description:
      "Executive letterheads, edge-painted 450gsm cards, and luxury foil-blocked presentation sets.",
    bgColor: "#FF5C00", // 04: Signature Studio Flame Orange
    textColor: "#ffffff",
    accentColor: "#121212", // Deep Velvet Black
    buttonTextColor: "#ffffff",
    italicColor: "#121212",
  },
];

interface PortfolioCardSectionProps {
  onBookCall?: () => void;
}

export const PortfolioCardSection: React.FC<PortfolioCardSectionProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
      const isMobile = window.innerWidth < 768;
      const yOffset = isMobile ? 12 : 36;
      const scaleStep = isMobile ? 0.025 : 0.04;

      // Set initial stacked states
      cardEls.forEach((card, i) => {
        gsap.set(card, {
          y: i * yOffset,
          scale: 1 - i * scaleStep,
          transformOrigin: "top center",
          opacity: 1,
          force3D: true,
        });
      });

      // The container fades in smoothly when first entering
      gsap.from(".portfolio-header-el", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-wrapper",
          start: "center center",
          end: `+=${cardEls.length * 60}%`,
          pin: containerRef.current,
          scrub: 0.4,
        },
      });

      // Stacking animation:
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return;

        const stepTl = gsap.timeline();

        // Top card slides up and away
        stepTl.to(
          card,
          {
            y: -window.innerHeight,
            opacity: 0,
            scale: 1.05,
            force3D: true,
            ease: "power2.inOut",
          },
          0,
        );

        // Remaining cards shift up one logical slot
        for (let j = i + 1; j < cardEls.length; j++) {
          const remainingCard = cardEls[j];
          const newSlot = j - i - 1;
          stepTl.to(
            remainingCard,
            {
              y: newSlot * yOffset,
              scale: 1 - newSlot * scaleStep,
              force3D: true,
              ease: "power2.inOut",
            },
            0,
          );
        }

        tl.add(stepTl);
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative w-full flex flex-col items-center pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* Integrated Section Header */}
      <div className="portfolio-header-el text-center max-w-4xl mx-auto px-2 mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em] text-[#121212] font-sans leading-none flex flex-wrap justify-center gap-x-2 sm:gap-x-3">
          <span>Selected</span>
          <span className="font-normal italic font-serif text-[#FF5C00] normal-case">
            Portfolios.
          </span>
        </h2>
        <p className="mt-4 sm:mt-6 text-[clamp(1.2rem,3.5vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.3] font-sans text-[#121212] max-w-4xl mx-auto">
          A curated showcase of our fine-craft print runs, identity systems, and tactile editions.
        </p>
      </div>

      {/* Stacked Cards Area (Centered) */}
      <div className="cards-wrapper shrink-0 max-w-[340px] sm:max-w-xl md:max-w-3xl lg:max-w-[880px] mx-auto relative h-[360px] sm:h-[430px] md:h-[470px] w-full">
        {STACKED_SERVICES.map((card, i) => {
          const images = (CATEGORY_IMAGES[card.id] || []).slice(0, 3);
          const hasImages = images.length > 0;

          return (
            <div
              key={card.id}
              className="stack-card absolute inset-0 w-full rounded-2xl sm:rounded-[2rem] overflow-hidden p-5 sm:p-8 md:p-12 border border-[#121212]/10 shadow-xl sm:shadow-2xl flex flex-col justify-center will-change-transform"
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                zIndex: STACKED_SERVICES.length - i,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-6 md:gap-10 w-full justify-center">
                <div className="flex flex-col flex-none md:flex-1 max-w-md min-w-0">
                  <div className="pr-1 sm:pr-2">
                    {/* 2-Font Mixed Heading: Bold Sans + Cursive Serif */}
                    <h3 className="text-[clamp(1.75rem,4vw,3.2rem)] font-black font-sans uppercase tracking-[-0.035em] leading-[0.95]">
                      <span>{card.titlePrefix} </span>
                      <span
                        className="font-serif italic font-normal normal-case"
                        style={{ color: card.italicColor }}
                      >
                        {card.titleItalic}
                      </span>
                    </h3>

                    {/* Clean Sans-serif Description */}
                    <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base font-sans opacity-90 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-3.5 sm:pt-6 shrink-0">
                    <button
                      onClick={() => navigate(`/portfolio/${card.id}`)}
                      className="self-start group inline-flex items-center gap-2 px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-full font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
                      style={{
                        backgroundColor: card.accentColor,
                        color: card.buttonTextColor,
                      }}
                    >
                      <span>VIEW GALLERY</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {hasImages && (
                  <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar snap-x snap-mandatory md:w-56 md:flex-shrink-0 pb-0.5 md:pb-0 pointer-events-auto shrink-0 justify-start md:justify-center mt-1 sm:mt-0">
                    {images.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 w-24 sm:w-40 md:w-52 h-16 sm:h-24 md:h-28 rounded-xl overflow-hidden snap-center group/img bg-white border border-black/10 shadow-xs"
                      >
                        <img
                          src={src}
                          alt={`${card.titlePrefix} ${idx + 1}`}
                          className="absolute inset-0 w-full h-full object-contain object-center p-1.5 sm:p-2 transition-transform duration-700 group/img:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
