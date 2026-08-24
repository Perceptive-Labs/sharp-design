import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from('.nav-item', {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });
  }, []);

  const handleHomeScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-6 sm:px-12 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent'
      }`}
    >
      <Link to="/" className="nav-item flex items-center gap-2 relative z-10">
        <img src="/logo.png" alt="Sharp Design Logo" className="h-8 w-auto object-contain" />
      </Link>

      <nav className="flex items-center gap-8 mx-auto font-sans font-medium text-sm text-[#121212]">
        <Link to="/" onClick={(e) => handleHomeScroll(e, 'hero')} className="nav-item hover:text-[#FF5C00] transition-colors">Home</Link>
        <Link to="/#about" onClick={(e) => handleHomeScroll(e, 'about')} className="nav-item hover:text-[#FF5C00] transition-colors">About Us</Link>
        <Link to="/#services" onClick={(e) => handleHomeScroll(e, 'services')} className="nav-item hover:text-[#FF5C00] transition-colors">Services</Link>
        <Link to="/#portfolio" onClick={(e) => handleHomeScroll(e, 'portfolio')} className="nav-item hover:text-[#FF5C00] transition-colors">Portfolio</Link>
        <Link to="/#clients" onClick={(e) => handleHomeScroll(e, 'clients')} className="nav-item hover:text-[#FF5C00] transition-colors">Clients</Link>
        <Link to="/#contact" onClick={(e) => handleHomeScroll(e, 'contact')} className="nav-item text-[#FF5C00] hover:opacity-80 transition-opacity font-bold">Contact Us</Link>
      </nav>
    </header>
  );
};
