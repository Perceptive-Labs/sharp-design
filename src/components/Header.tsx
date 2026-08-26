import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
    });
  }, []);

  const handleHomeScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    if (location.pathname === "/") {
      e.preventDefault();
      smoothScrollToId(id);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-4 sm:px-8 md:px-12 transition-all duration-500 bg-transparent ${
        isScrolled ? "py-3 sm:py-4" : "py-5 sm:py-6"
      } ${isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100 pointer-events-auto"}`}
    >
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



      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        className={`mt-2 nav-item group relative flex shrink-0 items-center justify-center w-12 h-12 rounded-2xl bg-transparent overflow-visible cursor-pointer border border-transparent transition-all duration-300 pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C00] ${
          location.pathname === "/" ? "lg:hidden" : ""
        }`}
      >
        <div className="icon-wrap w-full h-full shrink-0 flex items-center justify-center transition-colors rounded-2xl p-3 bg-black shadow-sm backdrop-blur-md border border-[#121212]/20 group-hover:bg-[#fbf9ef] pointer-events-none">
          <span className="font-mono text-[10px] sm:text-[9px] font-bold tracking-widest text-white flex items-center justify-center pt-0.5">
            MENU
          </span>
        </div>
      </button>
    </header>
  );
};
