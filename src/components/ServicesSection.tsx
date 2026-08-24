import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, CheckCircle2, Printer, ArrowRight } from 'lucide-react';
import { LogoDesigningVideoCard } from './LogoDesigningVideoCard';

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
    id: 'brochure-design',
    title: 'Brochure Design',
    category: 'Graphic Design',
    tagline: 'Captivating visual storytelling through drawings & vibrant colors',
    description:
      'We have often seen that designs have the power to captivate and people find it interesting to know and understand by drawings and designs rather than reading it. Words at times fail to make people understand their motives but with vibrant colors and meaningful designs, the message can be communicated very well.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85',
    deliverables: [
      'Bi-Fold, Tri-Fold & Multi-Fold Formats',
      'High-Impact Infographics & Vector Illustrations',
      'Print-Ready 300DPI PDF with Full Bleed Marks',
      'Editable Adobe Illustrator & InDesign Source Files',
    ],
    specs: ['Silk / Matte / Gloss finish', '170gsm to 350gsm premium art paper', 'Spot UV & Metallic foil ready'],
    turnaround: '3–5 Business Days',
    badge: 'Popular',
  },
  {
    id: 'packaging-printing',
    title: 'Packaging Printing',
    category: 'Print & Packaging',
    tagline: 'Custom packaging solutions tailored for standout shelf appeal',
    description:
      'Have you noticed that having only incredibly awesome product is not enough, nowadays even the packaging needs to look attractive. Hence we are certainly the solution that you are looking for because we deal with all the type of package printing that you will need. We know that each product is different and so is the packaging details. Hence we make a customized package printing available to you at the most competitive rates.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85',
    deliverables: [
      'Custom Rigid Boxes & Folding Cartons',
      'Corrugated Mailers, Sleeves & Inserts',
      'Embossing, Debossing & Foil Stamping',
      'Prototyping, Dielines & 3D Structural Mockups',
    ],
    specs: ['Eco-friendly recyclable kraft & card stock', 'Custom die-cut shapes', 'Pantone color matching'],
    turnaround: '7–12 Business Days',
    badge: 'High Impact',
  },
  {
    id: 'logo-design',
    title: 'Logo Design',
    category: 'Brand Identity',
    tagline: 'Symbolic identity that creates deep brand connection',
    description:
      'Each business needs a symbolic identity what we call it as a logo and that logo should be so designed that it can convey the theme of your business or brand. Our creative corner has the vision and they design logo in such a way that it will let people connect with the brand.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=85',
    deliverables: [
      'Primary, Secondary & Monogram Logo Suites',
      'Full Vector Suite (SVG, EPS, PNG, PDF)',
      'Brand Color Palette & Typography Guidelines',
      'Favicon, App Icon & Social Kit Formats',
    ],
    specs: ['Infinitely scalable vector art', 'Light & Dark mode variations', '100% intellectual property ownership'],
    turnaround: '4–7 Business Days',
    badge: 'Core Identity',
    isVideo: true,
  },
  {
    id: 'booklet-printing',
    title: 'Booklet Printing',
    category: 'Print & Packaging',
    tagline: 'Unique design concepts with up-to-the-mark printing',
    description:
      'Having a marketing done by handing over a booklet is one of the ways we can assist you and that is by providing you with unique concept of designing and up to the mark printing. We provide customized printing service so that your requirements can be met and it can look the way you have thought it to be.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
    deliverables: [
      'Saddle-Stitched, Perfect Bound & Wire-O Options',
      'Product Catalogs & Editorial Lookbooks',
      'Corporate Profiles, Portfolios & Annual Reports',
      'High-Density Color Calibration & Bleed Controls',
    ],
    specs: ['8 to 64+ page options', 'Soft-touch velvet laminated covers', 'FSC-certified interior paper'],
    turnaround: '5–8 Business Days',
    badge: 'Editorial',
  },
  {
    id: 'stationery-printing',
    title: 'Stationery Printing',
    category: 'Print & Packaging',
    tagline: 'Elevate visibility with vibrant, high-clarity stationery',
    description:
      'There’s another way how you can make your brand gain visibility and popularity and this by stationery printing or putting up your brand’s name on stationery items. We supply well printed and clear stationery supply that can make your brand communication strongly. Our team can design and make colorful printing nicely visible on your stationery items so that it looks really good when handed over to your staff members or gifted to clients.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=85',
    deliverables: [
      'Soft-Touch 450gsm Premium Business Cards',
      'Official Executive Letterheads & Envelopes',
      'Custom Presentation Folders & Notepads',
      'Staff Onboarding & Client Gift Stationery Kits',
    ],
    specs: ['Gold, Silver & Rose Gold foil stamping', 'Textured cotton paper stocks', 'Edge-painted card accents'],
    turnaround: '4–6 Business Days',
    badge: 'Essential',
  },
  {
    id: 'gift-cover',
    title: 'Gift Cover',
    category: 'Print & Packaging',
    tagline: 'Heartfelt blessings in beautifully designed sealed covers',
    description:
      'What’s more than the wishes and blessings that comes straight from the heart and from a beautiful sealed covers? The vibrant colors with lovely designs will surely make you attracted towards the gift covers and it is one of the most convenient ways of giving gifts away. Hence we have this creative team that handles making gift covers and they also customize it if you want to.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
    deliverables: [
      'Festive, Wedding & Corporate Bespoke Gift Covers',
      'Metallic Foil Embossed & Debossed Patterns',
      'Custom Ribbon, Wax Seal & Peel Closures',
      'Personalized Monograms & Greeting Inserts',
    ],
    specs: ['Handcrafted shimmer & textured cardstocks', 'Custom batch sizes & dimensions', 'Self-seal adhesive strip'],
    turnaround: '3–5 Business Days',
    badge: 'Bespoke',
  },
];

interface ServicesSectionProps {
  onBookCall: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  useGSAP(() => {
    // GSAP Reveal for Header
    gsap.fromTo(
      '.service-header-el',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // GSAP Reveal for Bento Grid Cards using batch
    ScrollTrigger.batch('.bento-card', {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', overwrite: true }
        );
      },
      start: 'top 85%',
    });
  }, { scope: containerRef });

  const service1_Brochure = COMPANY_SERVICES[0];
  const service2_Packaging = COMPANY_SERVICES[1];
  const service3_Logo = COMPANY_SERVICES[2];
  const service4_Booklet = COMPANY_SERVICES[3];
  const service5_Stationery = COMPANY_SERVICES[4];
  const service6_GiftCover = COMPANY_SERVICES[5];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full text-[#121212] py-20 md:py-32 px-4 sm:px-8 md:px-16 overflow-hidden"
    >
      {/* Top Header Editorial Block */}
      <div className="max-w-7xl mx-auto flex flex-col items-start mb-16 md:mb-24">
        <h2 className="service-header-el text-4xl sm:text-6xl md:text-8xl font-black text-[#121212] tracking-tight leading-none uppercase">
          Capabilities <span className="text-[#FF5C00]">.</span>
        </h2>
        <p className="service-header-el mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl text-[#2b2927] font-medium leading-relaxed tracking-tight">
          We create innovative graphic designs, bespoke packaging, and high-precision print solutions that captivate your audience.
        </p>
      </div>

      {/* ================= BENTO GRID LAYOUT ================= */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
        {/* Left Col (Brochure & Packaging) */}
        <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
          
          <div 
            onClick={() => setSelectedService(service1_Brochure)}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] cursor-pointer h-64 md:h-80 transition-all duration-500 hover:shadow-2xl"
          >
            <img src={service1_Brochure.image} alt={service1_Brochure.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-30">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                {service1_Brochure.title}
              </h3>
            </div>
          </div>

          <div 
            onClick={() => setSelectedService(service2_Packaging)}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] cursor-pointer h-64 md:h-80 transition-all duration-500 hover:shadow-2xl"
          >
            <img src={service2_Packaging.image} alt={service2_Packaging.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-30">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                {service2_Packaging.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Right Col (Logo Design - Tall) */}
        <div className="md:col-span-7">
          <div 
            onClick={() => setSelectedService(service3_Logo)}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#111215] cursor-pointer h-[500px] md:h-full transition-all duration-500 hover:shadow-2xl flex items-center justify-center"
          >
            <div className="absolute inset-0 w-full h-full">
              <LogoDesigningVideoCard />
            </div>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-30">
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                {service3_Logo.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Full Width Banner (Booklet) */}
        <div className="md:col-span-12">
          <div 
            onClick={() => setSelectedService(service4_Booklet)}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] cursor-pointer h-64 md:h-96 transition-all duration-500 hover:shadow-2xl"
          >
            <img src={service4_Booklet.image} alt={service4_Booklet.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-30">
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                {service4_Booklet.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Left Col (Stationery - Tall) */}
        <div className="md:col-span-7">
          <div 
            onClick={() => setSelectedService(service5_Stationery)}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] cursor-pointer h-[500px] md:h-full transition-all duration-500 hover:shadow-2xl"
          >
            <img src={service5_Stationery.image} alt={service5_Stationery.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-30">
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                {service5_Stationery.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Right Col (Gift Cover & CTA) */}
        <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
          <div 
            onClick={() => setSelectedService(service6_GiftCover)}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] cursor-pointer h-64 md:h-80 transition-all duration-500 hover:shadow-2xl"
          >
            <img src={service6_GiftCover.image} alt={service6_GiftCover.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-30">
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                {service6_GiftCover.title}
              </h3>
            </div>
          </div>

          <div 
            onClick={onBookCall}
            className="bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] border border-white/5 cursor-pointer h-64 md:h-80 transition-all duration-500 hover:shadow-2xl flex items-center justify-center p-8 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#1a1a1a]" />
            <div className="relative z-10 flex flex-col items-center justify-center w-full">
              <span className="text-[#FF5C00] font-mono text-xs font-bold uppercase tracking-widest mb-3">
                Bespoke Project?
              </span>
              <h4 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-6">
                Request Quote
              </h4>
              <span className="px-6 py-3 rounded-full bg-white text-[#121212] font-mono text-xs font-bold uppercase tracking-wider group-hover:bg-[#FF5C00] group-hover:text-white transition-all">
                Contact →
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Modal - Simple Conditional Render for now, or lightweight CSS animation */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
          <div 
            onClick={() => setSelectedService(null)} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer animate-in fade-in duration-300" 
          />
          <div className="relative w-full max-w-4xl bg-[#16161d] border border-white/10 rounded-3xl shadow-2xl overflow-y-auto z-10 text-white flex flex-col p-8 animate-in slide-in-from-bottom-8 duration-300 max-h-[90vh]">
            
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C00]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF5C00]">
                {selectedService.category}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 font-sans uppercase">
              {selectedService.title}
            </h2>

            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-[#121212]">
              {selectedService.isVideo ? (
                <LogoDesigningVideoCard />
              ) : (
                <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
              )}
            </div>

            <div className="mb-8">
              <p className="text-lg text-zinc-300 leading-relaxed font-sans max-w-3xl">
                {selectedService.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t border-white/10">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#FF5C00] mb-4 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> What We Deliver
                </h4>
                <ul className="space-y-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-[#FF5C00]">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-bold flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Specs & Turnaround
                </h4>
                <ul className="space-y-3">
                  {selectedService.specs.map((item, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-zinc-500">•</span> {item}
                    </li>
                  ))}
                  <li className="text-sm text-zinc-300 flex items-start gap-2 mt-4 pt-4 border-t border-white/10">
                    <span className="text-white font-bold">Turnaround:</span> {selectedService.turnaround}
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
