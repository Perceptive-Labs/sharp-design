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
  number: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

const STACKED_SERVICES: ServiceCardData[] = [
  {
    id: "brochure-designs",
    number: "(01)",
    title: "Brochure Designs",
    description:
      "We pair evocative typography with multi-fold precision and vibrant color depth. Our editorial layouts communicate with high authority.",
    bgColor: "#121212",
    textColor: "#ffffff",
    accentColor: "#FF5C00",
  },
  {
    id: "packaging-prints",
    number: "(02)",
    title: "Packaging Prints",
    description:
      "Packaging drives the unboxing experience. We engineer bespoke dielines, tactile material finishes, metallic foils, and spot UV treatments.",
    bgColor: "#fbf9ef",
    textColor: "#121212",
    accentColor: "#FF5C00",
  },
  {
    id: "logos",
    number: "(03)",
    title: "Logos",
    description:
      "We build visual systems that work across acquisition and product. Each sprint ships a robust logo and pragmatic brand guidelines.",
    bgColor: "#16161d",
    textColor: "#ffffff",
    accentColor: "#FF5C00",
  },
  {
    id: "booklet-prints",
    number: "(04)",
    title: "Booklet Prints",
    description:
      "Distributing corporate profiles or showcasing fashion lookbooks, our multipage layouts ensure your content commands respect and engagement.",
    bgColor: "#ffffff",
    textColor: "#121212",
    accentColor: "#FF5C00",
  },
  {
    id: "stationery-prints",
    number: "(05)",
    title: "Stationery Prints",
    description:
      "Executive letterheads, edge-painted 450gsm cards, and foil-blocked envelopes. We outfit your staff with materials that convey absolute prestige.",
    bgColor: "#121212",
    textColor: "#ffffff",
    accentColor: "#FF5C00",
  },
  {
    id: "gift-cover-designs",
    number: "(06)",
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

      // Set initial stacked states
      cardEls.forEach((card, i) => {
        gsap.set(card, {
          y: i * 45,
          scale: 1 - i * 0.05,
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
          scrub: 0.4, // Much faster scrub response
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
              y: newSlot * 45,
              scale: 1 - newSlot * 0.05,
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
      className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 py-12"
    >
      <div className="max-w-7xl mx-auto relative h-[65vh] min-h-[420px] md:h-[75vh] md:min-h-[480px] max-h-[700px] w-full">
        {STACKED_SERVICES.map((card, i) => {
          const images = (CATEGORY_IMAGES[card.id] || []).slice(0, 3);
          const hasImages = images.length > 0;

          return (
            <div
              key={card.id}
              className={`stack-card absolute inset-0 w-full rounded-[32px] overflow-hidden p-6 sm:p-10 md:p-12 border border-[#121212]/5 shadow-2xl flex flex-col will-change-transform ${
                hasImages ? "justify-start" : "justify-center"
              }`}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                zIndex: STACKED_SERVICES.length - i,
              }}
            >
              <div
                className={`flex flex-col md:flex-row md:items-start gap-6 md:gap-10 overflow-hidden w-full h-full justify-center md:justify-between`}
              >
                <div className="flex flex-col flex-none md:flex-1 max-w-2xl min-w-0 overflow-hidden">
                  <div className="overflow-y-auto no-scrollbar pr-2 md:pr-4">
                    <span className="block font-mono text-sm md:text-xl font-bold uppercase tracking-widest opacity-60 mb-4">
                      {card.number}
                    </span>
                    <h3 className="text-[clamp(2rem,4.5vw,3.75rem)] font-black uppercase tracking-tight leading-[0.95]">
                      {card.title}
                    </h3>
                    <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg opacity-80 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-6 shrink-0">
                    <button
                      onClick={() => navigate(`/portfolio/${card.id}`)}
                      className="self-start group inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      style={{
                        backgroundColor: card.accentColor,
                        color:
                          card.bgColor === "#FF5C00" ? "#ffffff" : card.bgColor,
                      }}
                    >
                      <span>VIEW GALLERY</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {hasImages && (
                  <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar snap-x snap-mandatory md:w-64 md:flex-shrink-0 md:h-full pb-2 md:pb-0 md:pr-2 pointer-events-auto shrink-0 mt-4 md:mt-0">
                    {images.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 w-64 md:w-64 h-48 rounded-2xl overflow-hidden snap-center group/img bg-white border border-black/5"
                      >
                        <img
                          src={src}
                          alt={`${card.title} ${idx + 1}`}
                          className="absolute inset-0 w-full h-full object-contain object-center p-4 transition-transform duration-700 group-hover/img:scale-105"
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
