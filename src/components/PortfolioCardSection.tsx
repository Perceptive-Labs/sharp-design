import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

import { CATEGORY_IMAGES } from "../pages/PortfolioGalleryPage";

export interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

const STACKED_SERVICES: ServiceCardData[] = [
  {
    id: "brochure-designs",
    title: "Brochure Designs",
    description:
      "We pair evocative typography with multi-fold precision and vibrant color depth. Our editorial layouts communicate with high authority.",
    bgColor: "#121212",
    textColor: "#ffffff",
    accentColor: "#FF5C00",
  },
  {
    id: "packaging-prints",
    title: "Packaging Prints",
    description:
      "Packaging drives the unboxing experience. We engineer bespoke dielines, tactile material finishes, metallic foils, and spot UV treatments.",
    bgColor: "#fbf9ef",
    textColor: "#121212",
    accentColor: "#FF5C00",
  },
  {
    id: "logos",
    title: "Logos",
    description:
      "We build visual systems that work across acquisition and product. Each sprint ships a robust logo and pragmatic brand guidelines.",
    bgColor: "#16161d",
    textColor: "#ffffff",
    accentColor: "#FF5C00",
  },
  {
    id: "booklet-prints",
    title: "Booklet Prints",
    description:
      "Distributing corporate profiles or showcasing fashion lookbooks, our multipage layouts ensure your content commands respect and engagement.",
    bgColor: "#ffffff",
    textColor: "#121212",
    accentColor: "#FF5C00",
  },
  {
    id: "stationery-prints",
    title: "Stationery Prints",
    description:
      "Executive letterheads, edge-painted 450gsm cards, and foil-blocked envelopes. We outfit your staff with materials that convey absolute prestige.",
    bgColor: "#121212",
    textColor: "#ffffff",
    accentColor: "#FF5C00",
  },
  {
    id: "gift-cover-designs",
    title: "Gift Cover Designs",
    description:
      "Custom wrapping paper, exclusive sleeves, and luxury ribbons designed to make the unboxing moment truly unforgettable.",
    bgColor: "#FF5C00",
    textColor: "#ffffff",
    accentColor: "#121212",
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
      const yOffset = isMobile ? 14 : 45;
      const scaleStep = isMobile ? 0.025 : 0.05;

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
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cardEls.length * 60}%`, // Smaller scroll duration
          pin: true,
          scrub: 0.4, // Fast scrub response
        },
      });

      // The stacking animation:
      // On each step, the top card moves up/away, and the remaining stack pushes forward.
      cardEls.forEach((card, i) => {
        if (i === cardEls.length - 1) return; // Last card just stays when reached

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
      className="relative w-full h-[100dvh] min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      <div className="max-w-[340px] sm:max-w-lg md:max-w-2xl lg:max-w-[760px] mx-auto relative h-[330px] sm:h-[440px] md:h-[480px] w-full">
        {STACKED_SERVICES.map((card, i) => {
          const images = (CATEGORY_IMAGES[card.id] || []).slice(0, 3);
          const hasImages = images.length > 0;

          return (
            <div
              key={card.id}
              className="stack-card absolute inset-0 w-full rounded-[24px] sm:rounded-[28px] overflow-hidden p-5 sm:p-7 md:p-8 border border-[#121212]/5 shadow-xl sm:shadow-2xl flex flex-col justify-center will-change-transform"
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                zIndex: STACKED_SERVICES.length - i,
              }}
            >
              <div
                className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-6 md:gap-8 w-full justify-center"
              >
                <div className="flex flex-col flex-none md:flex-1 max-w-sm min-w-0">
                  <div className="pr-1 sm:pr-2">
                    <h3 className="text-[clamp(1.35rem,2.5vw,2.25rem)] font-black uppercase tracking-tight leading-[0.95]">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-sm opacity-80 leading-snug font-medium line-clamp-2 sm:line-clamp-none">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-2 sm:pt-4 shrink-0">
                    <button
                      onClick={() => navigate(`/portfolio/${card.id}`)}
                      className="self-start group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      style={{
                        backgroundColor: card.accentColor,
                        color:
                          card.bgColor === "#FF5C00" ? "#ffffff" : card.bgColor,
                      }}
                    >
                      <span>VIEW GALLERY</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {hasImages && (
                  <div className="flex md:flex-col gap-2 sm:gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar snap-x snap-mandatory md:w-48 md:flex-shrink-0 pb-0.5 md:pb-0 pointer-events-auto shrink-0 justify-start md:justify-center mt-1 sm:mt-0">
                    {images.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 w-28 sm:w-44 md:w-48 h-20 sm:h-28 md:h-32 rounded-xl overflow-hidden snap-center group/img bg-white border border-black/5"
                      >
                        <img
                          src={src}
                          alt={`${card.title} ${idx + 1}`}
                          className="absolute inset-0 w-full h-full object-contain object-center p-2 sm:p-2.5 transition-transform duration-700 group/img:scale-105"
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
