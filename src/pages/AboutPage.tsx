import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { ShaderBackground } from "../components/ShaderBackground";
import { ContactUs } from "./ContactUs";
import { smoothScrollToId } from "../lib/scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      // Hero Reveal
      gsap.from(".about-hero-el", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });

      // Pixel Hook Reveal
      gsap.from(".pixel-hook-el", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pixel-hook-section",
          start: "top 80%",
        },
      });

      // Philosophy/Who We Are Section
      gsap.from(".philosophy-el", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 80%",
        },
      });

      // Values Section
      gsap.from(".value-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-section",
          start: "top 75%",
        },
      });

      // Services Sections
      gsap.utils.toArray(".service-section").forEach((section: any) => {
        gsap.from(section.querySelectorAll(".service-el"), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative isolate bg-transparent pt-20 sm:pt-32 pb-0 overflow-x-hidden"
    >
      <ShaderBackground />

      <main className="max-w-7xl mx-auto px-5 sm:px-10 md:px-16 lg:px-24">
        {/* HERO SECTION */}
        <section className="flex flex-col justify-center items-center text-center pt-14 pb-12 sm:pt-36 sm:pb-24">
          <div className="max-w-4xl flex flex-col items-center">
            <h1 className="about-hero-el text-[clamp(2.75rem,8vw,6.5rem)] font-black uppercase tracking-[-0.04em] text-[#121212] leading-[0.85] will-change-transform">
              <span className="font-display">Built With</span> <br />
              <span className="font-serif italic font-normal normal-case tracking-tight text-[#FF5C00]">
                Intent
              </span>
              <span className="text-[#FF5C00] font-display">.</span>
            </h1>
            <p className="about-hero-el mt-6 sm:mt-8 text-[clamp(1rem,2vw,1.5rem)] font-medium tracking-[-0.02em] leading-relaxed max-w-xl text-[#121212]/80 font-sans will-change-transform">
              A branding and design studio with over 20 years of industry
              experience. We help businesses define how they are seen,
              remembered, and trusted.
            </p>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="philosophy-section py-12 sm:py-20 md:py-24 border-t border-black/10 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center">
            <h2 className="philosophy-el text-[clamp(2rem,4.5vw,4rem)] font-black tracking-tighter mb-6 sm:mb-10 font-display uppercase flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
              <span>Who</span>
              <span className="italic font-serif normal-case font-normal text-[#FF5C00] tracking-normal pt-1">
                We Are
              </span>
            </h2>
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
              <p className="philosophy-el text-[clamp(1rem,2vw,1.75rem)] leading-relaxed text-[#121212] font-medium tracking-tight">
                Our work is rooted in{" "}
                <span className="text-[#FF5C00]">strategy</span>, not trends.
                Every identity, visual system, and piece of communication we
                create is built with{" "}
                <span className="text-[#FF5C00]">purpose</span> — designed to be
                clear, consistent, and scalable across every touchpoint.
              </p>
              <p className="philosophy-el text-[clamp(1rem,2vw,1.75rem)] leading-relaxed text-[#121212] font-medium tracking-tight">
                With two decades of real-world experience, we understand what
                works, what lasts, and what delivers{" "}
                <span className="text-[#FF5C00]">value</span>. We don't decorate
                brands. We build them with{" "}
                <span className="font-serif italic font-normal text-[#FF5C00]">
                  intent
                </span>
                .
              </p>
            </div>
          </div>
        </section>

        {/* WHAT MAKES US DIFFERENT */}
        <section className="values-section py-12 sm:py-20 md:py-24 border-t border-black/10 flex flex-col items-center">
          <h2 className="philosophy-el text-[clamp(2rem,4.5vw,4rem)] font-black tracking-tighter mb-8 sm:mb-12 text-center font-display uppercase flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
            <span>What Makes Us</span>
            <span className="font-serif italic font-normal normal-case tracking-tight text-[#FF5C00] pt-1">
              Different.
            </span>
          </h2>
          <div className="flex flex-col w-full max-w-5xl text-left border-t border-black/10">
            {[
              "Brand-focused creative thinking",
              "Strategy before aesthetics",
              "Clarity over clutter",
              "Consistency builds trust",
              "Customized solutions for every business",
              "Consistent quality and timely delivery",
              "Cost-effective solutions without compromise",
            ].map((value, i) => (
              <div
                key={i}
                className="value-card group border-b border-black/10 py-3.5 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6 hover:bg-black/5 transition-colors px-3 sm:px-6"
              >
                <span className="font-serif italic text-lg sm:text-2xl font-normal text-[#FF5C00] shrink-0">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-base sm:text-xl lg:text-2xl font-black uppercase tracking-tight font-display">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* DESIGN SERVICES */}
        <section className="service-section py-12 sm:py-20 md:py-24 border-t border-black/10 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center w-full">
            <h2 className="service-el text-[clamp(2rem,4.5vw,4rem)] font-black tracking-tighter mb-4 sm:mb-8 font-display uppercase flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
              <span>Our</span>
              <span className="italic font-serif normal-case font-normal text-[#FF5C00] tracking-normal pt-1">
                Design Services
              </span>
            </h2>
            <p className="service-el text-[clamp(1.05rem,2vw,1.75rem)] leading-relaxed text-[#121212] font-medium tracking-tight mb-8 sm:mb-14">
              Ideas turned into something you can{" "}
              <span className="font-serif italic font-normal text-[#FF5C00]">
                see
              </span>
              .
            </p>

            <div className="w-full flex flex-col border-t border-black/10 mb-10 sm:mb-20 text-left">
              {[
                {
                  name: "Logo Design & Brand Identity",
                  link: "/portfolio/logos",
                },
                { name: "Corporate Branding", link: null },
                {
                  name: "Brochures & Catalogues",
                  link: "/portfolio/brochure-designs",
                },
                {
                  name: "Packaging Design",
                  link: "/portfolio/packaging-prints",
                },
                { name: "Social Media & Digital Creatives", link: null },
                { name: "Advertising & Marketing Collaterals", link: null },
              ].map((service, i) => (
                <div
                  key={i}
                  onClick={() => service.link && navigate(service.link)}
                  className={`service-el group flex items-center justify-between py-4 sm:py-7 border-b border-black/10 hover:bg-[#121212] hover:text-white transition-colors px-3 sm:px-6 ${service.link ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className="text-base sm:text-2xl md:text-3xl font-bold tracking-tight font-sans">
                    {service.name}
                  </span>
                  {service.link ? (
                    <span className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5C00] uppercase font-bold tracking-widest">
                      View Work{" "}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5C00]">
                      SERVICE
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="service-el text-[clamp(1.4rem,3.5vw,3.5rem)] font-bold uppercase tracking-tight text-[#121212] leading-[1.1] font-display max-w-4xl mx-auto">
              “We don't just design — <br className="hidden sm:block" />
              we create{" "}
              <span className="font-serif italic font-normal normal-case tracking-tight text-[#FF5C00]">
                brand experiences
              </span>
              .”
            </p>
          </div>
        </section>

        {/* PRINTING SERVICES */}
        <section className="service-section py-12 sm:py-20 md:py-24 border-t border-black/10 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center w-full">
            <h2 className="service-el text-[clamp(2rem,4.5vw,4rem)] font-black tracking-tighter mb-4 sm:mb-8 font-display uppercase flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
              <span>Our</span>
              <span className="italic font-serif normal-case font-normal text-[#FF5C00] tracking-normal pt-1">
                Printing Services
              </span>
            </h2>
            <p className="service-el text-[clamp(1rem,2vw,1.75rem)] leading-relaxed text-[#121212] font-medium tracking-tight mb-8 sm:mb-14 max-w-2xl">
              Design made to live{" "}
              <span className="font-serif italic font-normal text-[#FF5C00]">
                beyond the screen
              </span>
              . <br />
              <br />
              From short runs to bulk production, our printing solutions deliver
              sharp colours, clean finishes, and professional results every
              time. We believe print quality should reflect the value of the
              brand behind it.
            </p>

            <div className="w-full flex flex-col border-t border-black/10 mb-10 sm:mb-20 text-left">
              {[
                { name: "Offset & Digital Printing", link: null },
                {
                  name: "Brochures & Catalogues",
                  link: "/portfolio/brochure-designs",
                },
                { name: "Sticker Labels", link: null },
                {
                  name: "Packaging Boxes & Pouches",
                  link: "/portfolio/packaging-prints",
                },
                { name: "Large Format & Promotional Prints", link: null },
              ].map((service, i) => (
                <div
                  key={i}
                  onClick={() => service.link && navigate(service.link)}
                  className={`service-el group flex items-center justify-between py-4 sm:py-7 border-b border-black/10 hover:bg-[#FF5C00] hover:text-white transition-colors px-3 sm:px-6 ${service.link ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className="text-base sm:text-2xl md:text-3xl font-bold tracking-tight font-sans">
                    {service.name}
                  </span>
                  {service.link ? (
                    <span className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[#121212] uppercase font-bold tracking-widest">
                      View Work{" "}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[#121212]">
                      SERVICE
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="service-el text-[clamp(1.4rem,3.5vw,3.5rem)] font-bold uppercase tracking-tight text-[#121212] leading-[1.1] font-display max-w-4xl mx-auto">
              “Premium printing <br className="hidden sm:block" />
              that makes an{" "}
              <span className="font-serif italic font-normal normal-case tracking-tight text-[#FF5C00]">
                impact
              </span>
              .”
            </p>
          </div>
        </section>

        {/* PIXEL HOOK */}
        <section className="pixel-hook-section py-14 sm:py-24 flex flex-col items-center text-center px-4 w-full overflow-hidden">
          <div className="w-full flex flex-col items-center">
            <h2 className="text-[clamp(3rem,10vw,12rem)] font-black tracking-tighter leading-[0.85] font-sans flex flex-col items-center">
              <span className="pixel-hook-el text-[#121212]/40 tracking-[-0.04em] block will-change-transform">
                Make every
              </span>
              <span className="pixel-hook-el text-[#121212] tracking-[-0.05em] block will-change-transform">
                pixel pay for
              </span>
              <span className="pixel-hook-el text-[#121212] tracking-[-0.05em] block will-change-transform">
                itself!
              </span>
            </h2>
          </div>
        </section>
      </main>

      {/* FOOTER CTA */}
      <div className="mt-8 sm:mt-12 bg-transparent relative z-10 rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-black/10">
        <ContactUs />
        <Footer
          onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onBookCall={() => smoothScrollToId("contact")}
        />
      </div>
    </div>
  );
};
