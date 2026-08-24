import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const ContactUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.contact-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.form-element', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

  }, { scope: containerRef });

  return (
    <div id="contact" ref={containerRef} className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h1 className="contact-title text-[clamp(3rem,6vw,5rem)] leading-[1] font-medium tracking-tight text-[#121212] mb-6">
            Let's build <br/><span className="font-normal italic font-serif text-[#FF5C00]">something.</span>
          </h1>
          <p className="contact-title text-[#121212]/60 text-lg max-w-md">
            Whether you have a fully formed project or just an idea, we'd love to collaborate with you.
          </p>
        </div>

        <form className="bg-black/5 backdrop-blur-xl border border-black/10 rounded-2xl p-8 sm:p-12" onSubmit={e => e.preventDefault()}>
          <div className="space-y-6">
            <div className="form-element">
              <label className="block text-sm font-medium text-[#121212]/70 mb-2">Name</label>
              <input type="text" className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-[#121212] focus:outline-none focus:border-[#FF5C00] transition-colors" placeholder="John Doe" />
            </div>
            <div className="form-element">
              <label className="block text-sm font-medium text-[#121212]/70 mb-2">Email</label>
              <input type="email" className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-[#121212] focus:outline-none focus:border-[#FF5C00] transition-colors" placeholder="john@example.com" />
            </div>
            <div className="form-element">
              <label className="block text-sm font-medium text-[#121212]/70 mb-2">Project Details</label>
              <textarea rows={4} className="w-full bg-black/5 border border-black/10 rounded-lg px-4 py-3 text-[#121212] focus:outline-none focus:border-[#FF5C00] transition-colors resize-none" placeholder="Tell us about your vision..." />
            </div>
            <button className="form-element w-full bg-[#FF5C00] text-white font-medium py-4 rounded-lg hover:bg-[#121212] hover:text-white transition-colors duration-300">
              Submit Inquiry
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
