import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, .cursor-hover';

/**
 * A clean mix-blend-difference cursor dot that expands over interactive elements.
 * Automatically inverts against any background color (cream, black, orange).
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");
    return () =>
      document.documentElement.classList.remove("custom-cursor-active");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR)) {
        isHovering.current = true;
        gsap.to(dot, { scale: 2.8, duration: 0.25, ease: "power3.out" });
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.(INTERACTIVE_SELECTOR)) {
        isHovering.current = false;
        gsap.to(dot, { scale: 1, duration: 0.25, ease: "power3.out" });
      }
    };

    const onDown = () =>
      gsap.to(dot, { scale: 0.7, duration: 0.12, ease: "power2.out" });
    const onUp = () =>
      gsap.to(dot, {
        scale: isHovering.current ? 2.8 : 1,
        duration: 0.2,
        ease: "power3.out",
      });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-white pointer-events-none z-[200] mix-blend-difference"
      aria-hidden="true"
    />
  );
};
