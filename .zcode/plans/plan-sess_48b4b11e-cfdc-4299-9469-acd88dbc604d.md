## Goal
Eliminate the lag with zero visual/design changes — every animation stays, looks identical, and (where anything changes at all) behaves *better*.

## Root causes (verified)
1. Full-screen 4-layer WebGL shader (`Home.tsx:19-26`) renders every frame at up to 2× DPR behind the whole page; the `shaders` lib has no pause/quality API (confirmed in `node_modules/shaders/dist/core`: pixel ratio capped only by `min(devicePixelRatio, 2)`).
2. Infinite GSAP loops never pause: `LogoDesigningVideoCard.tsx` (float yoyo + 12s sequence, ×2 instances when modal open), `Clients.tsx` marquee.
3. Below-fold entrances (`Portfolio.tsx`, `Clients.tsx`, `ContactUs.tsx`) run `gsap.from` on mount — off-screen — during initial load.
4. 10 Unsplash images load eagerly; 6th Google font family (Syne) is unused; bento overlays carry an imperceptible `backdrop-blur-[2px]`.

## Changes

**1. New `src/components/ShaderBackground.tsx`** (moves the shader stack out of `Home.tsx`)
- Render the canvas at a fraction of viewport size and upscale with a CSS `transform: scale()` (adaptive: DPR ≥ 1.5 → render at 50% and scale ×2, else 75% and scale ×1.33). Cuts GPU fragment work ~4× on retina screens; visually identical for soft organic gradients. %-based sizing means resizes need no JS listener.
- `onUnavailable` callback → static CSS radial-gradient fallback in the same palette (#fbf9ef / #f0ede1) for browsers/GPUs that can't run it.
- `prefers-reduced-motion: reduce` → static gradient instead of the animated shader.

**2. Pause infinite loops when off-screen (IntersectionObserver)**
- `LogoDesigningVideoCard.tsx`: keep refs to the float tween + master timeline; pause when the card leaves the viewport, resume (seamlessly, no jump) when it re-enters. Each instance gates itself, so the modal copy is handled too.
- `Clients.tsx` marquee: same pause/resume gating.

**3. Make below-fold entrances scroll-triggered** (identical tweens, moved into ScrollTrigger with `start: 'top 80%'`)
- `Portfolio.tsx` header/desc, `Clients.tsx` grid, `ContactUs.tsx` title/form. Same animations — but now the user actually sees them instead of them finishing off-screen.

**4. Images** — add `loading="lazy" decoding="async"` to below-fold `<img>`s (bento cards in `ServicesSection.tsx`, galleries in `StackedServiceCardsSection.tsx`).

**5. Micro-wins**
- Drop `backdrop-blur-[2px]` from the 6 bento overlays (invisible under `bg-black/40`; expensive on mobile).
- Remove unused `Syne` family from the Google Fonts link in `index.html`.
- Header scroll listener → `{ passive: true }`.

**Untouched on purpose:** AboutRevealSection's scrubbed word-color reveal, the pinned 3D card stack, all hover transitions, and the header/contact blur surfaces (design-critical; the shader downscale already relieves most of their cost).

## Safety & verification
- No git repo exists → `git init` + baseline commit before touching anything.
- Before/after comparison: run dev server, measure FPS with an rAF-based meter while scrolling through all sections, and take screenshots at hero/services/portfolio/clients/contact to confirm the look is unchanged.
- `npm run lint` (tsc) must pass.

## Expected impact
The shader downscale removes ~75% of the constant GPU load on retina displays (the dominant cause); pausing offscreen loops eliminates steady background CPU/GPU work; lazy images + deferred entrances cut initial-load jank.