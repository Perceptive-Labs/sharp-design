import React, { useEffect } from "react";
import { ShaderBackground } from "../components/ShaderBackground";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "../components/ServicesSection";
import { Portfolio } from "./Portfolio";
import { Clients } from "./Clients";
import { ContactUs } from "./ContactUs";
import { Footer } from "../components/Footer";
import { smoothScrollToId } from "../lib/scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Home: React.FC = () => {
  const scrollToContact = () => smoothScrollToId("contact");

  useEffect(() => {
    // Refresh ScrollTrigger to ensure pinned elements lock correctly after layout settles
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);

    // Robust tracking of any document height changes that might break pinning
    const ro = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    ro.observe(document.body);

    return () => {
      clearTimeout(timeout);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen relative isolate">
      {/* Global Animated Background */}
      <ShaderBackground />

      <Hero />
      <div>
        <AboutSection />
      </div>
      <div>
        <ServicesSection onBookCall={scrollToContact} />
      </div>
      <Portfolio />
      <Clients />
      <ContactUs />
      <Footer
        onScrollTop={() => smoothScrollToId("hero")}
        onBookCall={scrollToContact}
      />
    </div>
  );
};
