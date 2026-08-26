import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps?cid=18118991527458197835&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed";
const GOOGLE_MAPS_EMBED =
  "https://maps.google.com/maps?cid=18118991527458197835&hl=en&gl=IN&output=embed";

export const ContactUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      tl.from(".contact-compact-el", {
        y: 25,
        opacity: 0,
        stagger: 0.06,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
      });
    },
    { scope: containerRef },
  );

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("hiren@sharpdesign.co.in");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 text-[#121212] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Compact Unified Studio Card */}
        <div className="contact-compact-el grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: Heading & Contact Channels */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-[-0.03em] text-[#121212] font-sans leading-[0.95]">
                Contact{" "}
                <span className="font-normal italic font-serif text-[#FF5C00] normal-case">
                  Us.
                </span>
              </h2>


            </div>

            {/* Direct Contact Channels List */}
            <div className="flex flex-col gap-3">
              {/* Row 1: WhatsApp & Phone */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#121212]/50 block font-medium">
                      Mobile & Direct
                    </span>
                    <a
                      href="tel:+919227953032"
                      aria-label="Call Mobile: +91 92279 53032"
                      className="text-base sm:text-xl font-bold text-[#121212] hover:text-[#FF5C00] transition-colors font-sans tracking-tight"
                    >
                      +91 92279 53032
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-12 sm:pl-0">
                  <a
                    href="tel:+917940096529"
                    aria-label="Call Studio Desk: +91 79 40096529"
                    className="text-l font-mono text-[#121212]/70 hover:text-[#FF5C00] transition-colors"
                  >
                    <span className="font-bold">+91 7940096529</span>
                  </a>
                  <a
                    href="https://wa.me/919227953032?text=Hello!%20Got%20your%20reference%20from%20Sharp%20Design%20Website..."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp: +91 92279 53032"
                    className="w-7 h-7 rounded-md bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Row 2: Studio Email */}
              <div className="flex items-center justify-between gap-3 py-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#121212]/50 block font-medium">
                      Studio Email
                    </span>
                    <a
                      href="mailto:hiren@sharpdesign.co.in"
                      className="text-l sm:text-xl font-bold text-[#121212] hover:text-[#FF5C00] transition-colors font-sans tracking-tight truncate block"
                    >
                      hiren@sharpdesign.co.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy studio email address"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/5 hover:bg-[#FF5C00]/10 font-mono text-[10px] font-bold uppercase tracking-wider text-[#121212]/70 hover:text-[#FF5C00] transition-all cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:hiren@sharpdesign.co.in"
                    aria-label="Compose email"
                    className="w-7 h-7 rounded-md bg-black/5 hover:bg-[#FF5C00] hover:text-white text-[#121212] flex items-center justify-center transition-all"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Row 3: Compact Address */}
              <div className="py-2 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF5C00]/10 flex items-center justify-center text-[#FF5C00] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs sm:text-sm font-sans text-[#121212]/80 leading-snug">
                  <p className="font-bold text-[#121212]">Sharp Design Studio</p>
                  <p className="text-l text-[#121212]/65 mt-0.5">
                    20, 1st Floor, APM Mall, Opp. Sun N Step Club, Sattadhar Cross Road, Ghatlodia, Ahmedabad - 380 061
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps & Direct Action */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3 min-h-[260px] sm:min-h-[300px]">
            {/* Map Frame */}
            <div className="w-full h-full min-h-[220px] sm:min-h-[260px] rounded-xl overflow-hidden border border-black/10 relative shadow-inner bg-[#f0ede6]">
              <iframe
                title="Sharp Design Studio Location on Google Maps"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-2.5 right-2.5 pointer-events-none">
                <span className="px-2.5 py-1 rounded bg-black/85 text-white font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                  Studio Location
                </span>
              </div>
            </div>

            {/* Quick Actions Under Map */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#121212]/60">
                <Clock className="w-3.5 h-3.5 text-[#FF5C00]" />
                <span>Mon–Sat · 10:00 AM – 7:30 PM IST</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#121212] text-white hover:bg-[#FF5C00] font-mono text-[11px] font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://wa.me/919227953032?text=Hello!%20I%20would%20like%20to%20schedule%20a%20visit%20to%20your%20studio..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black/5 hover:bg-black/10 text-[#121212] font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>Schedule Visit</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
