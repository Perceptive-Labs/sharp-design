import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Smooth scroll to a section by id so that the section or its content
 * is centered in the viewport.
 */
export const smoothScrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const absoluteElementTop = rect.top + window.scrollY;
  const viewportHeight = window.innerHeight;

  let targetY = absoluteElementTop;

  if (id === "hero") {
    targetY = 0;
  }

  const maxScroll = document.documentElement.scrollHeight - viewportHeight;
  targetY = Math.max(0, Math.min(targetY, maxScroll));

  gsap.to(window, {
    duration: 0.6,
    scrollTo: { y: targetY, autoKill: false },
    ease: "power2.inOut",
    overwrite: true,
  });
};
