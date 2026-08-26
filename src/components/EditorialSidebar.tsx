import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { smoothScrollToId } from "../lib/scroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface EditorialSidebarProps {
  onMenuOpen: () => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "clients", label: "Clients" },
  { id: "contact", label: "Contact Us" },
  { id: "menu", label: "Menu" },
];

const MAX_SCALE = 1.6;
const BASE_SCALE = 1;
const INFLUENCE_RADIUS = 120; // pixels of influence above/below the cursor

export const EditorialSidebar: React.FC<EditorialSidebarProps> = ({
  onMenuOpen,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useGSAP(
    () => {
      gsap.set(containerRef.current, {
        opacity: 0,
        pointerEvents: "none",
        x: -20,
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "100px top",
        onEnter: () => {
          gsap.to(containerRef.current, {
            opacity: 1,
            pointerEvents: "auto",
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.set(containerRef.current, {
            opacity: 0,
            pointerEvents: "none",
            x: -20,
            overwrite: "auto",
          });
        },
      });

      // Dock Scaling Physics
      const tiles = gsap.utils.toArray<HTMLElement>(".nav-tile");

      const handleMouseMove = (e: MouseEvent) => {
        tiles.forEach((tile) => {
          const rect = tile.getBoundingClientRect();
          const centerY = rect.top + rect.height / 2;
          const dist = Math.abs(e.clientY - centerY);

          let scale = BASE_SCALE;
          if (dist < INFLUENCE_RADIUS) {
            // Linear falloff
            const influence = 1 - dist / INFLUENCE_RADIUS;
            // Apply easing (sine) for smoother curve
            const easedInfluence = Math.sin(influence * (Math.PI / 2));
            scale = BASE_SCALE + (MAX_SCALE - BASE_SCALE) * easedInfluence;
          }

          gsap.to(tile, {
            scale,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      const handleMouseLeave = () => {
        gsap.to(tiles, {
          scale: BASE_SCALE,
          duration: 0.4,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
      };

      if (containerRef.current) {
        containerRef.current.addEventListener("mousemove", handleMouseMove);
        containerRef.current.addEventListener("mouseleave", handleMouseLeave);
      }

      // Custom Micro-Animations per Icon (triggered on precise hover of the element)
      tiles.forEach((tile) => {
        const id = tile.id.replace("nav-tile-", "");
        const iconWrap = tile.querySelector(".icon-wrap");

        const hoverTl = gsap.timeline({ paused: true });
        hoverTl.to(
          iconWrap,
          { color: "#FF5C00", duration: 0.3, ease: "power2.out" },
          0,
        );

        switch (id) {
          case "hero": {
            const roof = tile.querySelector(".home-roof");
            hoverTl.to(roof, { y: -2, duration: 0.3, ease: "power2.out" }, 0);
            break;
          }
          case "portfolio": {
            const flap = tile.querySelector(".folder-flap");
            const doc = tile.querySelector(".folder-doc");
            hoverTl
              .to(
                flap,
                {
                  rotationX: 40,
                  transformOrigin: "bottom center",
                  duration: 0.3,
                  ease: "power2.out",
                },
                0,
              )
              .to(doc, { y: -3, duration: 0.3, ease: "power2.out" }, 0);
            break;
          }
          case "about": {
            const head = tile.querySelector(".person-head");
            const body = tile.querySelector(".person-body");
            hoverTl
              .to(head, { y: -2, duration: 0.3, ease: "power2.out" }, 0)
              .to(body, { scaleX: 1.1, duration: 0.3, ease: "power2.out" }, 0);
            break;
          }
          case "services": {
            const gear = tile.querySelector(".gear-icon");
            hoverTl.to(
              gear,
              { rotation: 90, duration: 0.6, ease: "back.out(1.5)" },
              0,
            );
            break;
          }
          case "clients": {
            const p1 = tile.querySelector(".client-p1");
            const p2 = tile.querySelector(".client-p2");
            hoverTl
              .to(p1, { x: -2, duration: 0.3, ease: "power2.out" }, 0)
              .to(p2, { x: 2, duration: 0.3, ease: "power2.out" }, 0);
            break;
          }
          case "contact": {
            const lines = tile.querySelectorAll(".doc-line");
            hoverTl.to(
              lines,
              {
                scaleX: 1.2,
                transformOrigin: "left center",
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out",
              },
              0,
            );
            break;
          }
          case "menu": {
            const dots = tile.querySelectorAll(".menu-dot");
            hoverTl.to(
              dots,
              {
                scale: 1.5,
                duration: 0.2,
                stagger: { each: 0.05, yoyo: true, repeat: 1 },
                ease: "power1.inOut",
              },
              0,
            );
            break;
          }
        }

        tile.addEventListener("mouseenter", () => hoverTl.play());
        tile.addEventListener("mouseleave", () => hoverTl.reverse());
      });

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener(
            "mousemove",
            handleMouseMove,
          );
          containerRef.current.removeEventListener(
            "mouseleave",
            handleMouseLeave,
          );
        }
      };
    },
    { scope: containerRef },
  );

  const handleClick = (id: string) => {
    if (id === "menu") {
      onMenuOpen();
      return;
    }

    if (location.pathname === "/") {
      smoothScrollToId(id);
    } else {
      navigate(`/#${id}`);
      setTimeout(() => smoothScrollToId(id), 100);
    }
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case "hero":
        return (
          <svg
            className="w-[22px] h-[22px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="home-roof"
              d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case "portfolio":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="folder-doc"
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            />
            <path className="folder-flap" d="M14 2v6h6" />
          </svg>
        );
      case "about":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle className="person-head" cx="12" cy="8" r="4" />
            <path className="person-body" d="M20 21a8 8 0 0 0-16 0" />
          </svg>
        );
      case "services":
        return (
          <svg
            className="w-5 h-5 gear-icon origin-center"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case "clients":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g className="client-p1">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </g>
            <g className="client-p2">
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </g>
          </svg>
        );
      case "contact":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 4v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            <line className="doc-line" x1="9" y1="8" x2="15" y2="8" />
            <line className="doc-line" x1="9" y1="12" x2="15" y2="12" />
            <line className="doc-line" x1="9" y1="16" x2="13" y2="16" />
          </svg>
        );
      case "menu":
        return (
          <span className="font-mono text-[9px] font-black tracking-widest text-[#121212] flex items-center justify-center">
            MENU
          </span>
        );
      default:
        return null;
    }
  };

  const navLinks = NAV_ITEMS.filter((item) => item.id !== "menu");
  const menuLink = NAV_ITEMS.find((item) => item.id === "menu");

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-[40] flex-col items-center gap-2 px-4 py-8 opacity-0 pointer-events-none group/rail"
    >
      {/* Primary Navigation Icons */}
      <div className="flex flex-col items-center gap-2">
        {navLinks.map((item) => (
          <button
            type="button"
            key={item.id}
            id={`nav-tile-${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(item.id);
            }}
            className="nav-tile group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-transparent overflow-visible cursor-pointer border border-transparent transition-colors hover:bg-black/5"
          >
            <div className="icon-wrap shrink-0 flex items-center justify-center text-[#121212] transition-colors rounded-2xl p-3 bg-white/40 shadow-sm backdrop-blur-md border border-white/50 group-hover:bg-white group-hover:shadow-md pointer-events-none">
              {renderIcon(item.id)}
            </div>

            {/* Floating Tooltip */}
            <div className="absolute left-full ml-6 opacity-0 -translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center">
              <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-[#121212] absolute -left-[4px]" />
              <div className="bg-[#121212] text-white px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-widest leading-none">
                {item.label}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Separated Menu Button */}
      {menuLink && (
        <div className="mt-6 border-t border-[#121212]/10 pt-6">
          <button
            type="button"
            key={menuLink.id}
            id={`nav-tile-${menuLink.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(menuLink.id);
            }}
            className="nav-tile group relative flex items-center justify-center w-12 h-12 rounded-2xl bg-transparent overflow-visible cursor-pointer border border-transparent transition-colors hover:bg-black/5"
          >
            <div className="icon-wrap shrink-0 flex items-center justify-center text-[#121212] transition-colors rounded-2xl p-3 bg-white/40 shadow-sm backdrop-blur-md border border-white/50 group-hover:bg-white group-hover:shadow-md pointer-events-none">
              {renderIcon(menuLink.id)}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
