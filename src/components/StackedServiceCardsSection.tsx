import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ServiceCardData {
  id: string;
  number: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  caseStudyTitle: string;
  gallery: {
    title: string;
    subtitle?: string;
    image: string;
  }[];
}

const STACKED_SERVICES: ServiceCardData[] = [
  {
    id: 'branding-identity',
    number: '(01)',
    title: 'Branding that drives conversion & funding.',
    description:
      'We clarify your positioning, define a distinctive tone of voice, and build a visual system that works across acquisition and product. Each sprint ships a robust logo, pragmatic brand guidelines, and a social kit so you can launch fast.',
    bgColor: '#121212',
    textColor: '#ffffff',
    accentColor: '#FF5C00',
    caseStudyTitle: 'SEE OUR CASE STUDIES',
    gallery: [
      { title: 'INA', subtitle: 'Fluid Typographic Mark', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' },
      { title: 'IMPORTANT HOUSE', subtitle: 'Embossed Luxury', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  {
    id: 'product-experience',
    number: '(02)',
    title: 'Product experiences users adopt & keep.',
    description:
      'We start from business goals, map the critical journeys, and prototype what actually moves the needle. Every sprint ships clear flows, a reusable UI library, and dev-ready assets.',
    bgColor: '#fbf9ef',
    textColor: '#121212',
    accentColor: '#FF5C00',
    caseStudyTitle: 'SEE OUR CASE STUDIES',
    gallery: [
      { title: 'Analytics Cloud', subtitle: 'MacBook Pro UI Suite', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
      { title: 'Reward Flow', subtitle: 'Mobile App Wireframes', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  {
    id: 'packaging-shelf',
    number: '(03)',
    title: 'Packaging & unboxing that command shelf dominance.',
    description:
      'Having only an awesome product is not enough — packaging drives the unboxing experience. We engineer bespoke dielines, tactile material finishes, metallic foils, and spot UV treatments that make your physical goods irresistible.',
    bgColor: '#16161d',
    textColor: '#ffffff',
    accentColor: '#FF5C00',
    caseStudyTitle: 'SEE PACKAGING SAMPLES',
    gallery: [
      { title: 'Rigid Cartons', subtitle: 'Gold Foil Box', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80' },
      { title: 'Eco Mailers', subtitle: 'Kraft Line', image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  {
    id: 'editorial-brochures',
    number: '(04)',
    title: 'Brochures & lookbooks that convert readers.',
    description:
      'We pair evocative typography with multi-fold precision and vibrant color depth. Whether distributing corporate profiles or showcasing fashion lookbooks, our editorial layouts communicate with high authority.',
    bgColor: '#ffffff',
    textColor: '#121212',
    accentColor: '#FF5C00',
    caseStudyTitle: 'VIEW EDITORIAL WORKS',
    gallery: [
      { title: 'Tri-Fold Lookbook', subtitle: 'Silk Finish', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
      { title: 'Brand Gazette', subtitle: 'Art Paper', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80' },
    ],
  },
  {
    id: 'stationery-prestige',
    number: '(05)',
    title: 'Stationery suites that elevate authority.',
    description:
      'Executive letterheads, edge-painted 450gsm cards, foil-blocked envelopes, and bespoke gift covers. We outfit your staff and client interactions with physical materials that convey absolute prestige.',
    bgColor: '#FF5C00',
    textColor: '#ffffff',
    accentColor: '#121212',
    caseStudyTitle: 'SEE STATIONERY SUITES',
    gallery: [
      { title: 'Executive Letterheads', subtitle: 'Cotton Stock', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80' },
      { title: 'Edge-Painted Cards', subtitle: 'Velvet Touch', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80' },
    ],
  },
];

interface StackedServiceCardsSectionProps {
  onBookCall: () => void;
}

export const StackedServiceCardsSection: React.FC<StackedServiceCardsSectionProps> = ({ onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ServiceCardData | null>(null);

  useGSAP(() => {
    const cardEls = gsap.utils.toArray<HTMLElement>(".stack-card");
    
    // Set initial 3D states
    gsap.set(cardEls, { transformPerspective: 1500, transformOrigin: "top center" });
    // All cards except the first start off-screen at the bottom, rotated forward
    gsap.set(cardEls.slice(1), { y: "100%", rotationX: 45, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 120px", // pin just below the sticky header
        end: `+=${cardEls.length * 100}%`, // Scroll duration scales with number of cards
        pin: true,
        scrub: 1,
      }
    });

    cardEls.forEach((card, i) => {
      if (i === cardEls.length - 1) return;
      
      const nextCard = cardEls[i + 1];
      
      // Each transition takes 1 unit of time in the timeline
      tl.to(card, {
        scale: 0.85,
        rotationX: -45, // Flip away backward
        y: "-15%", // Rise up slightly
        opacity: 0,
        ease: "power2.inOut"
      }, i)
      .to(nextCard, {
        y: "0%", // Rise from the bottom
        rotationX: 0, // Untwist to flat
        opacity: 1,
        ease: "power2.inOut"
      }, i);
    });
  }, { scope: containerRef });

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative w-full bg-[#fbf9ef] py-10 px-4 sm:px-8 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative h-[75vh] min-h-[600px] w-full">
        {STACKED_SERVICES.map((card, i) => (
          <div
            key={card.id}
            className="stack-card absolute inset-0 w-full rounded-[32px] overflow-hidden p-8 sm:p-12 md:p-16 border border-[#121212]/5 shadow-2xl flex flex-col justify-between"
            style={{ 
              backgroundColor: card.bgColor, 
              color: card.textColor,
              zIndex: i // Ensure newer cards stack on top of older ones
            }}
          >
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16 h-full">
              <div className="flex flex-col max-w-2xl">
                <span className="font-mono text-sm md:text-xl font-bold uppercase tracking-widest opacity-60 mb-4">
                  {card.number}
                </span>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
                  {card.title}
                </h3>
                <p className="mt-6 text-lg sm:text-xl opacity-80 leading-relaxed font-medium">
                  {card.description}
                </p>
                <button
                  onClick={() => setSelectedCaseStudy(card)}
                  className="mt-10 self-start group inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all"
                  style={{ backgroundColor: card.accentColor, color: card.bgColor === '#FF5C00' ? '#ffffff' : card.bgColor }}
                >
                  <span>{card.caseStudyTitle}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex md:flex-col gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                {card.gallery.map((img, idx) => (
                  <div key={idx} className="relative flex-shrink-0 w-64 h-48 md:w-72 md:h-52 rounded-2xl overflow-hidden snap-center group/img">
                    <img src={img.image} alt={img.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-4 left-4 z-10 text-white">
                      <span className="text-sm font-black uppercase tracking-widest">{img.title}</span>
                      <span className="block text-[10px] font-mono mt-1 opacity-80 uppercase">{img.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal (Conditional Render) */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
          <div
            onClick={() => setSelectedCaseStudy(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer animate-in fade-in duration-300"
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#fbf9ef] text-[#121212] border border-[#121212]/10 rounded-[32px] p-8 sm:p-12 shadow-2xl overflow-y-auto max-h-[85vh] animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-[#121212]/10">
              <span className="font-mono text-xs font-bold text-[#FF5C00] uppercase tracking-widest">
                Case Study {selectedCaseStudy.number}
              </span>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/20 hover:bg-[#121212]/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mt-6 mb-4">
              {selectedCaseStudy.title}
            </h3>
            <p className="text-lg text-[#121212]/80 leading-relaxed mb-8">
              {selectedCaseStudy.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {selectedCaseStudy.gallery.map((g, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-black aspect-video relative group">
                  <img src={g.image} alt={g.title} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h5 className="text-xs font-black uppercase tracking-widest">{g.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#121212]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <button
                onClick={() => {
                  setSelectedCaseStudy(null);
                  onBookCall();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF5C00] hover:bg-[#121212] text-white text-xs font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                Book Discovery Call
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
