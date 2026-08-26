import React, { useRef } from "react";
import { Instagram, Linkedin, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { smoothScrollToId } from "../lib/scroll";
import { useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  // Kept for backward compatibility with App.tsx/Home.tsx if they pass these
  onBookCall?: () => void;
  onNavigateToHero?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToWorks?: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useGSAP(() => {
    if (isOpen && drawerRef.current) {
      const isMobile = window.innerWidth < 640;
      gsap.fromTo(
        drawerRef.current,
        {
          opacity: 0,
          y: isMobile ? -40 : 0,
          x: isMobile ? 0 : -40,
          scale: 0.96,
        },
        { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      );
    }
  }, [isOpen]);

  const handleNavClick = (id: string, path?: string) => {
    onClose();
    if (path) {
      navigate(path);
    } else {
      // For items without a dedicated page, scroll on homepage
      if (location.pathname === "/") {
        smoothScrollToId(id);
      } else {
        navigate(`/#${id}`);
        setTimeout(() => smoothScrollToId(id), 100);
      }
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[100] overflow-hidden select-none flex items-start sm:items-center justify-center sm:justify-start p-4 sm:p-7 md:p-10"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
      />

      <div
        ref={drawerRef}
        className="relative z-20 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-auto min-h-[60vh] max-h-[90vh] sm:h-full sm:max-h-[88vh] bg-[#121212] text-white rounded-[28px] xs:rounded-[32px] sm:rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col justify-between p-6 xs:p-8 sm:p-10 md:p-12 overflow-y-auto no-scrollbar"
      >
        {/* Top bar with Navigation Label and Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#FF5C00]">
            Navigation
          </span>
          <button
            onClick={onClose}
            aria-label="Close Navigation"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF5C00] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1 sm:gap-2 my-auto py-6">
          {([
            { label: "Home", id: "hero", tip: "Back to the top", path: "/" },
            { label: "About Us", id: "about", tip: "Our story & philosophy", path: "/about" },
            { label: "Services", id: "services", tip: "What we craft", path: "/services" },
            { label: "Portfolio", id: "portfolio", tip: "Selected work", path: "/portfolio" },
            { label: "Clients", id: "clients", tip: "Trusted by visionaries" },
            { label: "Contact Us", id: "contact", tip: "Let's build something" },
          ] as { label: string; id: string; tip: string; path?: string }[]).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.path)}
              className="group flex items-center gap-3 sm:gap-4 text-left cursor-pointer focus:outline-none w-full py-1 sm:py-1.5 overflow-hidden"
            >
              <span className="text-[clamp(1.5rem,6.5vw,2.5rem)] font-black tracking-tight text-[#8c8882] group-hover:text-white transition-all duration-300 group-hover:translate-x-2 font-sans uppercase whitespace-nowrap shrink-0">
                {item.label}
              </span>
              <span className="text-[11px] sm:text-sm font-mono text-[#FF5C00] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out whitespace-nowrap hidden xs:inline">
                — {item.tip}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom studio mark */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>Sharp Design Studio</span>
          <span>EST. 2004</span>
        </div>
      </div>
    </div>,
    document.body,
  );
};
