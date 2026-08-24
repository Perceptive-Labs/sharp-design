import React from 'react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { Hero } from '../components/Hero';
import { AboutRevealSection } from '../components/AboutRevealSection';
import { ServicesSection } from '../components/ServicesSection';
import { Portfolio } from './Portfolio';
import { Clients } from './Clients';
import { ContactUs } from './ContactUs';

export const Home: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative isolate">
      {/* Global Animated Background */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <Shader style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}>
          <Swirl colorA="#fbf9ef" colorB="#f0ede1" detail={1.7} />
          <ChromaFlow baseColor="#fbf9ef" downColor="#FF5C00" leftColor="#FF8C00" rightColor="#FF4500" upColor="#FFD700" momentum={13} radius={3.5} />
          <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      <Hero />
      <div id="about">
        <AboutRevealSection />
      </div>
      <div id="services">
        <ServicesSection onBookCall={scrollToContact} />
      </div>
      <Portfolio />
      <Clients />
      <ContactUs />
    </div>
  );
};
