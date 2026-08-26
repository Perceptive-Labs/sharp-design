import React from "react";
import { PortfolioCardSection } from "../components/PortfolioCardSection";
import { smoothScrollToId } from "../lib/scroll";

export const Portfolio: React.FC = () => {
  return (
    <div id="portfolio" className="relative w-full">
      <PortfolioCardSection onBookCall={() => smoothScrollToId("contact")} />
    </div>
  );
};
