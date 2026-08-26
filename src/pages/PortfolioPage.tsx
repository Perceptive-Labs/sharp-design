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

      {/* Stacked Portfolio Cards with Integrated Header */}
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
