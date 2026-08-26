import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { ShaderBackground } from "../components/ShaderBackground";
import { ContactUs } from "./ContactUs";
import { Footer } from "../components/Footer";
import { smoothScrollToId } from "../lib/scroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  {
    id: "brochure-design",
    portfolioPath: "/portfolio/brochure-designs",
    number: "01",
    title: "Brochure Design",
    description:
      "Visual storytelling through vibrant colors and meaningful layouts. Bi-fold, tri-fold, multi-fold — each designed to communicate what words alone cannot.",
    deliverables: ["Multi-fold Formats", "Vector Illustrations", "Print-Ready 300DPI"],
  },
  {
    id: "packaging-printing",
    portfolioPath: "/portfolio/packaging-prints",
    number: "02",
    title: "Packaging Printing",
    description:
      "Custom packaging that elevates the unboxing experience. Rigid boxes, folding cartons, embossing, foil stamping — engineered for shelf appeal.",
    deliverables: ["Custom Die-Cut", "Eco-Friendly Stock", "Pantone Matched"],
  },
  {
    id: "logo-design",
    portfolioPath: "/portfolio/logos",
    number: "03",
    title: "Logo Design",
    description:
      "Symbolic identity that creates deep brand connection. Primary, secondary, and monogram suites delivered as infinitely scalable vector art.",
    deliverables: ["Full Vector Suite", "Brand Guidelines", "Light & Dark Modes"],
  },
  {
    id: "booklet-printing",
    portfolioPath: "/portfolio/booklet-prints",
    number: "04",
    title: "Booklet Printing",
    description:
      "From product catalogs to annual reports — unique editorial design with up-to-the-mark printing on premium paper stocks.",
    deliverables: ["Saddle-Stitched & Perfect Bound", "8–64+ Pages", "Velvet Laminated"],
  },
  {
    id: "stationery-printing",
    portfolioPath: "/portfolio/stationery-prints",
    number: "05",
    title: "Stationery Printing",
    description:
      "Elevate your brand's visibility with premium business cards, letterheads, folders, and client gift kits — foil-stamped and edge-painted.",
    deliverables: ["450gsm Business Cards", "Executive Letterheads", "Foil Stamping"],
  },
  {
    id: "gift-cover",
    portfolioPath: "/portfolio/gift-cover-designs",
    number: "06",
    title: "Gift Covers",
    description:
      "Bespoke gift covers for festive, wedding, and corporate occasions. Metallic foils, wax seals, personalized monograms — all handcrafted.",
    deliverables: ["Festive & Corporate", "Embossed Patterns", "Custom Sizes"],
  },
];

import { useLocation, useNavigate } from "react-router-dom";

export const ServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500); // Wait for GSAP animations to settle
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useGSAP(
    () => {
      // Hero text reveal
      gsap.fromTo(
        ".sp-hero-el",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "all",
        }
      );

      // Grid items stagger on scroll
      gsap.fromTo(
        ".sp-grid-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".sp-grid",
            start: "top 90%",
            once: true,
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="min-h-screen relative isolate">
      <ShaderBackground />

      {/* ─── HERO ─── */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 max-w-7xl mx-auto pt-28 pb-20">
        <div className="max-w-4xl">
          <p className="sp-hero-el text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF5C00] mb-6">
            What We Do
          </p>
          <h1 className="sp-hero-el text-[clamp(4rem,10vw,8rem)] font-black uppercase tracking-tighter leading-[0.85] text-[#121212] mb-6">
            Services<span className="text-[#FF5C00]">.</span>
          </h1>
          <h2 className="sp-hero-el text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight leading-[1.1] text-[#121212]">
            Precision craft for
            <br />
            <span className="font-normal italic font-serif text-[#FF5C00]">
               print & identity.
            </span>
          </h2>
          <p className="sp-hero-el mt-8 max-w-xl text-lg text-[#121212]/80 leading-relaxed font-medium">
            Six disciplines. One standard. Every deliverable is print-ready,
            brand-consistent, and built to make your audience stop and look.
          </p>
        </div>
      </section>

      {/* ─── 2×3 SERVICES GRID ─── */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto pb-32">
        <div className="sp-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {SERVICES.map((service, i) => (
            <div
              id={service.id}
              key={service.number}
              className="sp-grid-item group flex flex-col p-8 sm:p-10 md:p-14 rounded-[2rem] bg-[#f0eee3] border border-[#121212]/5 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover Enveloping Layer */}
              <div className="absolute inset-0 bg-[#ee5b05] [clip-path:circle(0%_at_100%_0%)] group-hover:[clip-path:circle(150%_at_100%_0%)] transition-[clip-path] duration-700 ease-out group-hover:duration-[2000ms] group-hover:ease-in-out z-0 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full pointer-events-none">
                {/* Number */}
                <span className="text-[11px] font-mono font-bold text-[#FF5C00] group-hover:text-white transition-colors duration-500 group-hover:duration-1000 tracking-widest">
                  ({service.number})
                </span>

                {/* Title */}
                <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-[#121212] leading-[1.1] group-hover:text-white transition-colors duration-500 group-hover:duration-1000">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="mt-4 text-[15px] text-[#121212]/80 group-hover:text-white/90 transition-colors duration-500 group-hover:duration-1000 leading-relaxed max-w-md font-medium">
                  {service.description}
                </p>

                {/* Deliverable tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.deliverables.map((d) => (
                    <span
                      key={d}
                      className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] px-3 py-1.5 border border-[#121212]/15 text-[#121212]/75 rounded-full group-hover:border-white/30 group-hover:text-white transition-colors duration-500 group-hover:duration-1000"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* View Portfolio Button */}
                <div className="mt-8 pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.portfolioPath);
                    }}
                    className="pointer-events-auto group/btn inline-flex items-center justify-between gap-4 px-6 py-3.5 rounded-xl font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer bg-[#121212] text-white hover:bg-[#FF5C00] hover:scale-[1.02] shadow-sm hover:shadow-lg group-hover:bg-white group-hover:text-[#121212] group-hover:hover:bg-[#121212] group-hover:hover:text-white"
                  >
                    <span>View Portfolio</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONTACT + FOOTER ─── */}
      <ContactUs />
      <Footer
        onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onBookCall={() => smoothScrollToId("contact")}
      />
    </div>
  );
};
