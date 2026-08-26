import React from "react";
import { ShaderBackground } from "../components/ShaderBackground";
import { PortfolioCardSection } from "../components/PortfolioCardSection";
import { ContactUs } from "./ContactUs";
import { Footer } from "../components/Footer";
import { smoothScrollToId } from "../lib/scroll";

export const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen relative isolate">
      <ShaderBackground />

      {/* Hero Section */}
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden relative -mt-10">
        <h1 className="text-[clamp(2rem,5vw,4.5rem)] leading-[0.9] font-medium tracking-tight flex flex-wrap justify-center gap-x-4 text-[#121212]">
          <span className="block">Selected</span>
          <span className="block font-normal italic font-serif text-[#FF5C00]">
            Portfolios.
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[#121212]/60 leading-relaxed font-sans font-medium">
          A showcase of our world-class digital experiences, combining striking
          typography with fluid, unexpected motion.
        </p>

        {/* Animated scroll-down arrow */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#121212]/40">
            Scroll
          </span>
          <svg
            className="w-10 h-10 text-[#FF5C00] animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Stacked Portfolio Cards */}
      <PortfolioCardSection onBookCall={() => smoothScrollToId("contact")} />

      {/* Contact + Footer */}
      <ContactUs />
      <Footer
        onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onBookCall={() => smoothScrollToId("contact")}
      />
    </div>
  );
};
