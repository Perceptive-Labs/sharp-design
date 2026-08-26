import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Footer } from "../components/Footer";
import { BackButton } from "../components/BackButton";
import { ShaderBackground } from "../components/ShaderBackground";
import { ContactUs } from "./ContactUs";
import { smoothScrollToId } from "../lib/scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PILLARS = [
  {
    id: "strategy",
    title: "Strategy Before Aesthetics",
    description:
      "We do not decorate brands based on fleeting trends. Every identity, typographic system, and colorway is engineered with strategic intent to endure and build lasting equity.",
    tags: ["Brand Architecture", "Purpose-Driven", "Visual Strategy"],
    actionText: "Explore Services",
    actionPath: "/services",
  },
  {
    id: "clarity",
    title: "Clarity Over Clutter",
    description:
      "Print and brand communication stripped of unnecessary noise. We distill complex propositions into razor-sharp, unforgettable visual hierarchies that command attention.",
    tags: ["High-Impact", "Zero Clutter", "Editorial Focus"],
    actionText: "View Portfolio",
    actionPath: "/portfolio",
  },
  {
    id: "consistency",
    title: "Consistency Builds Trust",
    description:
      "Two decades of print mastery. From fine-grain tactile finishes to cohesive digital assets, we ensure flawless brand fidelity across every customer touchpoint.",
    tags: ["20+ Yrs Mastery", "Precision Print", "Brand Fidelity"],
    actionText: "Explore Services",
    actionPath: "/services",
  },
  {
    id: "execution",
    title: "End-to-End Craft",
    description:
      "From early-stage conceptualization to physical die-cutting, foil stamping, and final production — we oversee the entire creative pipeline under one roof.",
    tags: ["Design & Print", "Turnkey Craft", "Tactile Finishes"],
    actionText: "Start a Project",
    actionPath: "/contact",
  },
];

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useGSAP(
    () => {
      // Hero Elements Reveal
      gsap.fromTo(
        ".about-hero-el",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "all",
        },
      );

      // Cards Stagger on Scroll
      gsap.fromTo(
        ".about-card-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".about-cards-grid",
            start: "top 85%",
            once: true,
          },
        },
      );

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative isolate bg-transparent pt-20 sm:pt-32 pb-0 overflow-x-hidden"
    >
      <ShaderBackground />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        {/* ─── SECTION 1: HERO & STUDIO IDENTITY ─── */}
        <section className="py-12 sm:py-20 md:py-24 flex flex-col items-start gap-4 sm:gap-6">
          <div className="max-w-4xl">
            <p className="about-hero-el text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF5C00] mb-3 sm:mb-4">
              About The Studio
            </p>
            <h1 className="about-hero-el text-[clamp(2.75rem,8vw,6.5rem)] font-black uppercase tracking-[-0.04em] text-[#121212] leading-[0.85] mb-4 sm:mb-6">
              Built With <br />
              <span className="font-normal italic font-serif text-[#FF5C00] normal-case">
                Intent.
              </span>
            </h1>
            <p className="about-hero-el mt-4 sm:mt-6 text-[clamp(1.15rem,2.8vw,2rem)] font-medium tracking-[-0.025em] leading-[1.35] font-sans text-[#121212]/85 max-w-2xl">
              An art direction and graphic design studio with over 20 years of real-world craft. We help businesses define how they are seen, remembered, and trusted.
            </p>
          </div>
        </section>

        {/* ─── SECTION 2: 2×2 SIGNATURE CARDS GRID ─── */}
        <section className="pb-16 sm:pb-32">
          <div className="about-cards-grid grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 lg:gap-10">
            {PILLARS.map((pillar, i) => {
              const isExpanded = expandedCard === i;

              return (
                <div
                  key={pillar.id}
                  className="about-card-item group flex flex-col rounded-2xl sm:rounded-[2rem] bg-[#f0eee3] border border-[#121212]/5 shadow-sm sm:hover:shadow-xl transition-all duration-500 sm:hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Signature Expanding Circle Hover Layer (desktop only) */}
                  <div className="absolute inset-0 bg-[#ee5b05] [clip-path:circle(0%_at_100%_0%)] group-hover:[clip-path:circle(150%_at_100%_0%)] transition-[clip-path] duration-700 ease-out group-hover:duration-[2000ms] group-hover:ease-in-out z-0 pointer-events-none hidden sm:block"></div>

                  {/* ─── Mobile: Tap-to-expand compact card ─── */}
                  <div className="sm:hidden relative z-10">
                    <button
                      type="button"
                      onClick={() => setExpandedCard(isExpanded ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                    >
                      <h2 className="text-base font-bold tracking-tight text-[#121212] leading-tight">
                        {pillar.title}
                      </h2>
                      <ChevronDown
                        className={`w-5 h-5 text-[#121212]/50 shrink-0 ml-3 transition-transform duration-400 ease-out ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        maxHeight: isExpanded ? "500px" : "0px",
                        opacity: isExpanded ? 1 : 0,
                      }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p className="text-sm text-[#121212]/75 leading-relaxed font-medium">
                          {pillar.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {pillar.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono font-bold uppercase tracking-[0.12em] px-2.5 py-1 border border-[#121212]/12 text-[#121212]/65 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (pillar.actionPath.startsWith("#")) {
                                smoothScrollToId(pillar.actionPath.replace("#", ""));
                              } else if (pillar.actionPath === "/contact") {
                                smoothScrollToId("contact");
                              } else {
                                navigate(pillar.actionPath);
                              }
                            }}
                            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl font-mono text-[10px] font-bold uppercase tracking-[0.15em] bg-[#121212] text-white cursor-pointer shadow-sm active:scale-95 transition-transform"
                          >
                            <span>{pillar.actionText}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─── Desktop: Full card (unchanged) ─── */}
                  <div className="hidden sm:flex relative z-10 flex-col h-full pointer-events-none p-10 md:p-12">
                    <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-[#121212] leading-[1.1] group-hover:text-white transition-colors duration-500 group-hover:duration-1000">
                      {pillar.title}
                    </h2>
                    <p className="mt-4 text-[15px] text-[#121212]/80 group-hover:text-white/90 transition-colors duration-500 group-hover:duration-1000 leading-relaxed max-w-md font-medium">
                      {pillar.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {pillar.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-3 py-1.5 border border-[#121212]/15 text-[#121212]/75 rounded-full group-hover:border-white/30 group-hover:text-white transition-colors duration-500 group-hover:duration-1000"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 pt-4 mt-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (pillar.actionPath.startsWith("#")) {
                            smoothScrollToId(pillar.actionPath.replace("#", ""));
                          } else if (pillar.actionPath === "/contact") {
                            smoothScrollToId("contact");
                          } else {
                            navigate(pillar.actionPath);
                          }
                        }}
                        className="pointer-events-auto group/btn inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer bg-[#121212] text-white hover:bg-[#FF5C00] hover:scale-[1.02] shadow-sm hover:shadow-lg group-hover:bg-white group-hover:text-[#121212] group-hover:hover:bg-[#121212] group-hover:hover:text-white"
                      >
                        <span>{pillar.actionText}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ─── CONTACT + FOOTER ─── */}
      <ContactUs />
      <Footer
        onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onBookCall={() => smoothScrollToId("contact")}
      />
    </div>
  );
};
