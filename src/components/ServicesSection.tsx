import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X, CheckCircle2, Printer, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  specs: string[];
  turnaround: string;
  badge: string;
  isVideo?: boolean;
}

export const COMPANY_SERVICES: ServiceDetail[] = [
  {
    id: "brochure-design",
    title: "Brochure Design",
    category: "Graphic Design",
    tagline:
      "Captivating visual storytelling through drawings & vibrant colors",
    description:
      "We have often seen that designs have the power to captivate and people find it interesting to know and understand by drawings and designs rather than reading it. Words at times fail to make people understand their motives but with vibrant colors and meaningful designs, the message can be communicated very well.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Bi-Fold, Tri-Fold & Multi-Fold Formats",
      "High-Impact Infographics & Vector Illustrations",
      "Print-Ready 300DPI PDF with Full Bleed Marks",
      "Editable Adobe Illustrator & InDesign Source Files",
    ],
    specs: [
      "Silk / Matte / Gloss finish",
      "170gsm to 350gsm premium art paper",
      "Spot UV & Metallic foil ready",
    ],
    turnaround: "3–5 Business Days",
    badge: "Popular",
  },
  {
    id: "packaging-printing",
    title: "Packaging Printing",
    category: "Print & Packaging",
    tagline: "Custom packaging solutions tailored for standout shelf appeal",
    description:
      "Have you noticed that having only incredibly awesome product is not enough, nowadays even the packaging needs to look attractive. Hence we are certainly the solution that you are looking for because we deal with all the type of package printing that you will need. We know that each product is different and so is the packaging details. Hence we make a customized package printing available to you at the most competitive rates.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Custom Rigid Boxes & Folding Cartons",
      "Corrugated Mailers, Sleeves & Inserts",
      "Embossing, Debossing & Foil Stamping",
      "Prototyping, Dielines & 3D Structural Mockups",
    ],
    specs: [
      "Eco-friendly recyclable kraft & card stock",
      "Custom die-cut shapes",
      "Pantone color matching",
    ],
    turnaround: "7–12 Business Days",
    badge: "High Impact",
  },
  {
    id: "logo-design",
    title: "Logo Design",
    category: "Brand Identity",
    tagline: "Symbolic identity that creates deep brand connection",
    description:
      "Each business needs a symbolic identity what we call it as a logo and that logo should be so designed that it can convey the theme of your business or brand. Our creative corner has the vision and they design logo in such a way that it will let people connect with the brand.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Primary, Secondary & Monogram Logo Suites",
      "Full Vector Suite (SVG, EPS, PNG, PDF)",
      "Brand Color Palette & Typography Guidelines",
      "Favicon, App Icon & Social Kit Formats",
    ],
    specs: [
      "Infinitely scalable vector art",
      "Light & Dark mode variations",
      "100% intellectual property ownership",
    ],
    turnaround: "4–7 Business Days",
    badge: "Core Identity",
    isVideo: true,
  },
  {
    id: "booklet-printing",
    title: "Booklet Printing",
    category: "Print & Packaging",
    tagline: "Unique design concepts with up-to-the-mark printing",
    description:
      "Having a marketing done by handing over a booklet is one of the ways we can assist you and that is by providing you with unique concept of designing and up to the mark printing. We provide customized printing service so that your requirements can be met and it can look the way you have thought it to be.",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Saddle-Stitched, Perfect Bound & Wire-O Options",
      "Product Catalogs & Editorial Lookbooks",
      "Corporate Profiles, Portfolios & Annual Reports",
      "High-Density Color Calibration & Bleed Controls",
    ],
    specs: [
      "8 to 64+ page options",
      "Soft-touch velvet laminated covers",
      "FSC-certified interior paper",
    ],
    turnaround: "5–8 Business Days",
    badge: "Editorial",
  },
  {
    id: "stationery-printing",
    title: "Stationery Printing",
    category: "Print & Packaging",
    tagline: "Elevate visibility with vibrant, high-clarity stationery",
    description:
      "There’s another way how you can make your brand gain visibility and popularity and this by stationery printing or putting up your brand’s name on stationery items. We supply well printed and clear stationery supply that can make your brand communication strongly. Our team can design and make colorful printing nicely visible on your stationery items so that it looks really good when handed over to your staff members or gifted to clients.",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Soft-Touch 450gsm Premium Business Cards",
      "Official Executive Letterheads & Envelopes",
      "Custom Presentation Folders & Notepads",
      "Staff Onboarding & Client Gift Stationery Kits",
    ],
    specs: [
      "Gold, Silver & Rose Gold foil stamping",
      "Textured cotton paper stocks",
      "Edge-painted card accents",
    ],
    turnaround: "4–6 Business Days",
    badge: "Essential",
  },
  {
    id: "gift-cover",
    title: "Gift Cover",
    category: "Print & Packaging",
    tagline: "Heartfelt blessings in beautifully designed sealed covers",
    description:
      "What’s more than the wishes and blessings that comes straight from the heart and from a beautiful sealed covers? The vibrant colors with lovely designs will surely make you attracted towards the gift covers and it is one of the most convenient ways of giving gifts away. Hence we have this creative team that handles making gift covers and they also customize it if you want to.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    deliverables: [
      "Festive, Wedding & Corporate Bespoke Gift Covers",
      "Metallic Foil Embossed & Debossed Patterns",
      "Custom Ribbon, Wax Seal & Peel Closures",
      "Personalized Monograms & Greeting Inserts",
    ],
    specs: [
      "Handcrafted shimmer & textured cardstocks",
      "Custom batch sizes & dimensions",
      "Self-seal adhesive strip",
    ],
    turnaround: "3–5 Business Days",
    badge: "Bespoke",
  },
];

interface ServicesSectionProps {
  onBookCall: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onBookCall,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // GSAP Reveal for Header
      gsap.fromTo(
        ".service-header-el",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // GSAP Reveal for Bento Grid Cards using batch
      ScrollTrigger.batch(".bento-card", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
        start: "top 85%",
      });
    },
    { scope: containerRef },
  );

  const handleMouseEnter = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector(".editorial-img");
    const content = card.querySelector(".editorial-content");
    const arrow = card.querySelector(".editorial-arrow");
    const microTarget = card.querySelector(".micro-target");

    gsap.to(card, { y: -2, duration: 1, ease: "power3.out" });
    if (img) gsap.to(img, { scale: 1.03, duration: 1.5, ease: "power2.out" });
    if (content) gsap.to(content, { y: -4, duration: 0.8, ease: "power2.out" });
    if (arrow)
      gsap.to(arrow, { x: 3, y: -3, duration: 0.6, ease: "power3.out" });
    if (microTarget)
      gsap.to(microTarget, {
        rotation: 90,
        scale: 1.1,
        duration: 1,
        ease: "power2.out",
      });
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector(".editorial-img");
    const content = card.querySelector(".editorial-content");
    const arrow = card.querySelector(".editorial-arrow");
    const microTarget = card.querySelector(".micro-target");

    gsap.to(card, { y: 0, duration: 1, ease: "power3.out" });
    if (img) gsap.to(img, { scale: 1, duration: 1.5, ease: "power2.out" });
    if (content) gsap.to(content, { y: 0, duration: 0.8, ease: "power2.out" });
    if (arrow)
      gsap.to(arrow, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    if (microTarget)
      gsap.to(microTarget, {
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });
  });

  const service1_Brochure = COMPANY_SERVICES[0];
  const service2_Packaging = COMPANY_SERVICES[1];
  const service3_Logo = COMPANY_SERVICES[2];
  const service4_Booklet = COMPANY_SERVICES[3];
  const service5_Stationery = COMPANY_SERVICES[4];
  const service6_GiftCover = COMPANY_SERVICES[5];

  const navigate = useNavigate();

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full bg-transparent text-white pt-10 sm:pt-16 md:pt-20 pb-12 sm:pb-20 md:pb-32 px-4 sm:px-8 md:px-16 overflow-hidden"
    >
      {/* Top Header Editorial Block */}
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-6 sm:mb-12 md:mb-14">
        <h1
          className="service-header-el text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-tight leading-none text-[#2B2A29]"
          style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}
        >
          Our
        </h1>
        <h2
          className="service-header-el text-[clamp(2rem,5vw,4.5rem)] uppercase tracking-tight leading-none text-[#2B2A29]"
          style={{ fontFamily: '"Syne", sans-serif', fontWeight: 800 }}
        >
          Services <span className="text-[#FF5C00]">.</span>
        </h2>
        <p className="service-header-el mt-3 sm:mt-6 max-w-2xl text-[clamp(0.95rem,2.2vw,1.5rem)] text-[#2B2A29] font-medium leading-relaxed tracking-tight">
          We create innovative graphic designs, bespoke packaging, and
          high-precision print solutions that captivate your audience.
        </p>
      </div>

      {/* ================= EDITORIAL ART-DIRECTION GRID ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-6 md:gap-8 auto-rows-[minmax(180px,_auto)]">
        {/* 1. Top Left: Brochure (span 7) */}
        <article
          onClick={() => navigate(`/services#${service1_Brochure.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bento-card col-span-1 md:col-span-7 bg-[#121212] border border-white/10 rounded-sm group relative overflow-hidden flex flex-col justify-end min-h-[210px] sm:min-h-[250px] md:min-h-[300px] cursor-pointer"
        >
          {/* Micro-Details Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="micro-target absolute top-6 left-6 w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-[1px] h-full bg-white/40"></div>
              <div className="absolute w-full h-[1px] bg-white/40"></div>
            </div>
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/40"></div>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRmWecMymJ4K0_tMjhSpgE6QexJVWf7w18JrnWVKqrpfleCu1L_Bd295rNx9Xu4RxTl7AU1jB1QPgt-_6MH6BW0zi4dpfprv80bUd645f_NrWd4EsSKauJk70E5y3mw24pnhzxBEZCUppNu2mn7UkU3neEQSsFcSkhY9Sw6LobTfnD8A-mAF29gb8hHR6wUfhVv2DfqL1TuRCoVLPYFc1q2ZDDPJAnHN7694bJjVVwQoq_6nCXX-RF1Q=s1600"
            alt="Brochure Design"
            className="editorial-img absolute inset-0 w-full h-full object-cover z-0 opacity-90"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />

          <div className="editorial-content relative z-20 p-4 sm:p-6 md:p-8 flex flex-col w-full text-white">
            <div className="flex justify-end items-end w-full mb-1">
              <span className="editorial-arrow text-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-light">
                ↗
              </span>
            </div>
            <h2 className="font-sans font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none mb-2 md:mb-3">
              Brochure Design
            </h2>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">
              PRINT / EDITORIAL / BRANDING
            </p>
          </div>
        </article>

        {/* 2. Top Right: Logo (span 5) */}
        <article
          onClick={() => navigate(`/services#${service3_Logo.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bento-card col-span-1 md:col-span-5 bg-[#271812] border border-white/10 rounded-sm group relative overflow-hidden flex flex-col justify-end min-h-[210px] sm:min-h-[250px] md:min-h-[300px] cursor-pointer"
        >
          {/* Micro-Details Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="micro-target absolute top-6 right-6 w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-[1px] h-full bg-white/40"></div>
              <div className="absolute w-full h-[1px] bg-white/40"></div>
            </div>
            <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-white/40"></div>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzuybRzVad9lFQNVwd6Zr-BMgl9OIMTcYwVKWkZQ0KZbqSNXU1L3EF924PAOJwPodRp2bYoqglz_lSIgYAX2qStKZ4Xz6ldg5E8qyyS2fCeWYEHp1n-iwngwLsIaEzOmy0IjkDMSLmg1F4MDpRNKMnqd9Muc2GJc-LDMSThE7fDoIINekkMPQfUmpCQ1SHQ0od8V7mYmBHwDcJi272StRhM7fhdPg5dwKDIbouNkGN7c_IxwMXWSlQeQ=s1600"
            alt="Logo Design"
            className="editorial-img absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#120a06]/95 via-[#120a06]/40 to-transparent z-10 pointer-events-none" />

          <div className="editorial-content relative z-20 p-4 sm:p-6 md:p-8 flex flex-col w-full text-white">
            <div className="flex justify-end items-end w-full mb-1">
              <span className="editorial-arrow text-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-light">
                ↗
              </span>
            </div>
            <h2 className="font-sans font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none mb-1 sm:mb-2 md:mb-3">
              Logo Design
            </h2>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">
              IDENTITY / TYPOGRAPHY / MARKS
            </p>
          </div>
        </article>

        {/* 3. Row 2 Left (Tall): Packaging Designing (span 5, row-span-2) */}
        <article
          onClick={() => navigate(`/services#${service2_Packaging.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bento-card col-span-1 md:col-span-5 md:row-span-2 bg-[#ff5c00] border border-white/10 rounded-sm group relative overflow-hidden flex flex-col justify-end min-h-[260px] sm:min-h-[400px] md:min-h-[500px] cursor-pointer"
        >
          {/* Micro-Details Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="micro-target absolute top-6 left-6 w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-[1px] h-full bg-white/40"></div>
              <div className="absolute w-full h-[1px] bg-white/40"></div>
            </div>
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/40"></div>
            <span className="absolute top-6 right-6 font-mono text-[8px] text-white/40 tracking-widest">
              X-4029
            </span>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMqxvq_9Y0XRRPGt_ql3JEpQdA5JIPr3__i6tVkiyPaK0dn9QaQ_HgOEg_xHIjCXL7UifnZ2wBPyfaVwAnZW_Rg3Y3o_bTLFtiIdHGtENyfiXBpIpCQZ3aaIjnNU5ujIgaa4keu_E6Pl9ioOFxTPf-5SgVRlBXyspKvakewvzI5K2qYtU9iuS9sQ35lKRJVSGsj6ofQGg7b0VuYGyvjyvB_WFshnW7ahL52GJMIr0xwK8qtDSsmArnYg=s1600"
            alt="Packaging"
            className="editorial-img absolute inset-0 w-full h-full object-cover z-0 opacity-90"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />

          <div className="editorial-content relative z-20 p-4 sm:p-6 md:p-8 flex flex-col w-full text-white">
            <div className="flex justify-end items-end w-full mb-1">
              <span className="editorial-arrow text-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-light text-[#ff5c00]">
                ↗
              </span>
            </div>
            <h2 className="font-sans font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none mb-1 sm:mb-2 md:mb-3">
              Packaging Design
            </h2>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">
              3D STRUCTURAL / RETAIL / BESPOKE
            </p>
          </div>
        </article>

        {/* 4. Row 2 Right: Gift Cover (span 7) */}
        <article
          onClick={() => navigate(`/services#${service6_GiftCover.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bento-card col-span-1 md:col-span-7 bg-[#121212] border border-white/10 rounded-sm group relative overflow-hidden flex flex-col justify-end min-h-[180px] sm:min-h-[220px] md:min-h-[250px] cursor-pointer"
        >
          {/* Micro-Details Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/40"></div>
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/40"></div>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA4rTne13ioUde5jy9RrhSYhICK-xE6TPMrIpyHnGBhMdr0JjuOMa4GxCjwckQ-NV9WYei7xRNVLFv3kjFYa-fzJp-BtMJEA7DQfTbSsfwEgl-6V-nCvDmdNf3-h0lgix0YrBtJjuxQC6Kc19yIn8qxcTKByKNqbVdnWO2sYD64Z2QzqImyYOX14Q-6ZnPSU1tyiszhO1ix3ZI0vpXPhEgp8UUGttIEiF6hh12bZn6L-YDPPqnhs5tZw=s1600"
            alt="Gift Cover"
            className="editorial-img absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 pointer-events-none" />

          <div className="editorial-content relative z-20 p-4 sm:p-6 md:p-8 flex flex-col w-full text-white">
            <div className="flex justify-end items-end w-full mb-1">
              <span className="editorial-arrow text-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-light">
                ↗
              </span>
            </div>
            <h2 className="font-sans font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none mb-1 sm:mb-2 md:mb-3">
              Gift Cover Design
            </h2>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">
              LUXURY / FOIL STAMPING / PREMIUM
            </p>
          </div>
        </article>

        {/* 5. Row 3 Right: Booklet Printing (span 7) */}
        <article
          onClick={() => navigate(`/services#${service4_Booklet.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bento-card col-span-1 md:col-span-7 bg-[#121212] border border-white/10 rounded-sm group relative overflow-hidden flex flex-col justify-end min-h-[180px] sm:min-h-[220px] md:min-h-[250px] cursor-pointer"
        >
          {/* Micro-Details Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-white/40"></div>
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-white/40"></div>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW_C-GLSyN8c9H7bt4WAn2G-wVGsTdsrGZQCMinGuEkpKtCAR4cvayo5IdinBnJ_CRlyxTGPTLzuDdpgSiZGqtBJcNOdYfIsY-usRNrSHJdT4gPMuSkq7b67zHg72HoDLM4ZpJdGBRx-a4bBd0GphdaDJZxAVhmDc0XyIg7hjGLEn9w1yykTdx9Ary7x7yitTPw3CS-9yQxONVwYTn1zJgAWdjyu-UH8130at1O_p2YPBVjKbeUcfqwQ=s1600"
            alt="Booklet Printing"
            className="editorial-img absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#120a06]/95 via-[#120a06]/40 to-transparent z-10 pointer-events-none" />

          <div className="editorial-content relative z-20 p-4 sm:p-6 md:p-8 flex flex-col w-full text-white">
            <div className="flex justify-end items-end w-full mb-1">
              <span className="editorial-arrow text-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-light">
                ↗
              </span>
            </div>
            <h2 className="font-sans font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none mb-1 sm:mb-2 md:mb-3">
              Booklet Design
            </h2>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">
              LAYOUT / BINDING / MULTI-PAGE
            </p>
          </div>
        </article>

        {/* 6. Row 4: Stationery Printing (span 12, full-width) */}
        <article
          onClick={() => navigate(`/services#${service5_Stationery.id}`)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bento-card col-span-1 md:col-span-12 bg-[#ff5c00] border border-white/10 rounded-sm group relative overflow-hidden flex flex-col justify-end min-h-[220px] sm:min-h-[280px] md:min-h-[350px] cursor-pointer"
        >
          {/* Micro-Details Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="micro-target absolute top-8 left-8 w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-[1px] h-full bg-white/40"></div>
              <div className="absolute w-full h-[1px] bg-white/40"></div>
            </div>
            <div className="micro-target absolute top-8 right-8 w-4 h-4 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-[1px] h-full bg-white/40"></div>
              <div className="absolute w-full h-[1px] bg-white/40"></div>
            </div>
            <div className="absolute bottom-8 left-8 w-3 h-3 border-b border-l border-white/40"></div>
            <div className="absolute bottom-8 right-8 w-3 h-3 border-b border-r border-white/40"></div>
          </div>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdA_7fUucq2AhDTsyOOVxee_NIBXANNoOJXwqkhdOfFE_I_ajqjfrGFADaUt1qOFuC-bQcVXf8ez82MiDq9ru9Sio3f4PPGbn7niHY38kIlX7QrOcu_TT_H3UuzP7NolFmo3pVtLlYdoHlf7RfYTIRkrUi24bFW_V4avyqva-EvzwxbIgWjJTyOvA7UyrpGrS2RXuANC2l2PiMdRdqOsndSKuingWaJR06YRsDtszKnwZuQi-QDis4iQ=s1600"
            alt="Stationery Printing"
            className="editorial-img absolute inset-0 w-full h-full object-cover z-0 opacity-90"
          />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#000000]/90 via-[#000000]/40 to-transparent z-10 pointer-events-none" />

          <div className="editorial-content relative z-20 p-4 sm:p-6 md:p-10 flex flex-col w-full text-white max-w-2xl">
            <div className="flex justify-end items-end w-full mb-1">
              <span className="editorial-arrow text-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 font-light text-[#ff5c00]">
                ↗
              </span>
            </div>
            <h2 className="font-sans font-bold text-xl sm:text-2xl md:text-4xl uppercase tracking-tighter leading-[0.9] mb-2 sm:mb-3 md:mb-4">
              Stationery Printing
            </h2>
            <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/40">
              BUSINESS CARDS / LETTERHEADS / CORPORATE SETS
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
