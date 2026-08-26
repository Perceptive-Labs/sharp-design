import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ContactUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.from(".contact-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        ".form-element",
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      id="contact"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 text-[#121212]"
    >
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="contact-title text-[clamp(2rem,5vw,4rem)] leading-[1] font-medium tracking-tight text-[#121212] mb-6">
            Let's build <br />
            <span className="font-normal italic font-serif text-[#FF5C00]">
              something.
            </span>
          </h1>
          <p className="contact-title text-[#121212]/60 text-lg max-w-md">
            Whether you have a fully formed project or just an idea, we'd love
            to collaborate with you.
          </p>
          <div className="pt-8 sm:pt-12">
            <a
              href="https://wa.me/919227953032?text=Hello!%20Got%20your%20reference%20from%20Sharp%20Design%20Website..."
              target="_blank"
              rel="noopener noreferrer"
              className="form-element group inline-flex items-center gap-4 sm:gap-6 transition-colors"
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-mono font-bold uppercase tracking-widest text-[#121212] group-hover:text-[#FF5C00] transition-colors">
                Contact Us
              </span>
              <span className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#FF5C00] group-hover:bg-[#25D366] text-white flex items-center justify-center overflow-hidden relative shrink-0 shadow-lg transition-colors duration-500">
                {/* Arrow — visible by default, fades out on hover */}
                <svg className="w-6 h-6 sm:w-8 sm:h-8 absolute transition-all duration-400 ease-out opacity-100 group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
                {/* WhatsApp — hidden by default, fades in on hover */}
                <svg className="w-7 h-7 sm:w-9 sm:h-9 absolute transition-all duration-400 ease-out opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 md:mt-0">
          {[
            {
              name: "WhatsApp",
              href: "https://wa.me/919227953032?text=Hello!%20Got%20your%20reference%20from%20Sharp%20Design%20Website...",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              ),
              color:
                "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
            },
            {
              name: "Instagram",
              href: "https://www.instagram.com/sharpdesign/",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              ),
              color:
                "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
            },
            {
              name: "LinkedIn",
              href: "https://in.linkedin.com/company/sharpdesign3",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              ),
              color:
                "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]",
            },
            {
              name: "X",
              href: "https://x.com/sharp_design",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              ),
              color: "hover:bg-black hover:text-white hover:border-black",
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className={`form-element flex items-center justify-center w-14 h-14 rounded-full border border-black/10 text-[#121212] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lg ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
