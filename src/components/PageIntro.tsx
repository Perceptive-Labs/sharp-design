import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LOGO_URL } from "../lib/assets";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, useGSAP);

const SEEN_KEY = "sharp-design-intro-seen";

/**
 * A one-time cinematic curtain: the studio wordmark types itself into focus,
 * a blade line draws under it, then the screen splits open along that line —
 * like a sheet of paper being sliced clean in two — revealing the site.
 */
export const PageIntro: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLImageElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bladeRef = useRef<HTMLDivElement>(null);

  const skip = useRef(
    typeof window !== "undefined" && sessionStorage.getItem(SEEN_KEY) === "1",
  );

  useEffect(() => {
    if (skip.current) {
      document.documentElement.classList.add("intro-done");
      return;
    }
    document.body.style.overflow = "hidden";
  }, []);

  useGSAP(
    () => {
      if (skip.current || !rootRef.current) return;

      const finish = () => {
        document.body.style.overflow = "";
        document.documentElement.classList.add("intro-done");
        sessionStorage.setItem(SEEN_KEY, "1");
        gsap.set(rootRef.current, { display: "none" });
        ScrollTrigger.refresh();
      };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      tl.set(rootRef.current, { display: "flex" })
        .from(markRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1.0,
          ease: "back.out(1.5)",
        })
        .from(subRef.current, { opacity: 0, y: 10, duration: 0.5 }, "-=0.25")
        .fromTo(
          bladeRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.55, ease: "power4.inOut" },
          "+=0.1",
        )
        .addLabel("split", "+=0.3")
        .to(
          [markRef.current, subRef.current, bladeRef.current],
          { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" },
          "split",
        )
        .to(
          topRef.current,
          { yPercent: -100, duration: 0.95, ease: "power4.inOut" },
          "split",
        )
        .to(
          bottomRef.current,
          { yPercent: 100, duration: 0.95, ease: "power4.inOut" },
          "split",
        );
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[999] hidden items-center justify-center overflow-hidden bg-[#f9f7ec]"
      aria-hidden="true"
    >
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#f9f7ec]"
      />
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#f9f7ec]"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <img
          ref={markRef}
          src={LOGO_URL}
          alt="Sharp Design Logo"
          className="h-16 sm:h-20 w-auto object-contain"
        />

        <p
          ref={subRef}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#271812] font-bold"
        >
          BRANDING <span className="text-[#FF5C00]">|</span> PACKAGING{" "}
          <span className="text-[#FF5C00]">|</span> SOCIAL MEDIA
        </p>
        <div
          ref={bladeRef}
          className="h-[2px] w-48 sm:w-64 bg-[#FF5C00] origin-center"
        />
      </div>
    </div>
  );
};
