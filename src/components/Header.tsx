import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { smoothScrollToId } from "../lib/scroll";
import { LOGO_URL } from "../lib/assets";

interface HeaderProps {
  onMenuOpen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = React.useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isNotHome = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolled(currentY > 20);

      if (currentY > lastScrollY.current && currentY > 100) {
        setIsHidden(true); // scrolling down
      } else if (currentY < lastScrollY.current || currentY <= 100) {
        setIsHidden(false); // scrolling up
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2,
      clearProps: "all",
    });
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header
      className={`fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-4 sm:px-8 md:px-12 transition-all duration-300 ${
        isScrolled
          ? "py-2.5 sm:py-3.5 bg-white/85 backdrop-blur-md shadow-sm border-b border-black/5"
          : "py-4 sm:py-6 bg-transparent"
      } ${
        isHidden
          ? "lg:-translate-y-full lg:opacity-0 lg:pointer-events-none translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-0 opacity-100 pointer-events-auto"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="nav-item flex items-center gap-2 relative z-10 shrink-0"
        >
          <img
            src={LOGO_URL}
            alt="Sharp Design Logo"
            className="h-6 sm:h-8 w-auto object-contain"
          />
        </Link>
      </div>

      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        className={`nav-item group relative flex shrink-0 items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black text-white hover:bg-[#FF5C00] shadow-md transition-all duration-300 cursor-pointer pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C00] active:scale-95 ${
          location.pathname === "/" ? "lg:hidden" : ""
        }`}
      >
        <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center justify-center">
          MENU
        </span>
      </button>
      </header>

      {/* Floating Back Button (Below Header) */}
      {isNotHome && (
        <button
          onClick={handleBack}
          aria-label="Go back to previous page"
          className={`fixed left-4 sm:left-8 md:left-12 z-[55] nav-item group flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-black/10 hover:bg-[#121212] hover:text-white text-[#121212] transition-all duration-300 cursor-pointer text-xs font-mono font-bold uppercase tracking-wider focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5C00] active:scale-95 ${
            isScrolled ? "top-20 sm:top-24" : "top-24 sm:top-28"
          } ${
            isHidden ? "opacity-0 pointer-events-none translate-y-[-10px]" : "opacity-100 pointer-events-auto translate-y-0"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>
      )}
    </>
  );
};
