---
target: Homepage
total_score: 16
max_score: 40
na_heuristics: 
p0_count: 3
p1_count: 2
timestamp: 2026-08-24T11-59-28Z
slug: src-pages-home-tsx
---
#### Report header provenance
Method: dual-agent (A: 99a38475-a414-4c61-8a96-72f03077e9f6 · B: a6a74956-a5bc-4620-8e6e-64a0d462cbde)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Rich scroll/hover feedback everywhere, but the funnel's terminal action (ContactUs.tsx submit) gives zero confirmation of anything happening |
| 2 | Match Between System and Real World | 2 | Clients.tsx lists Stripe/Spotify/Vercel/Framer/Linear as clients of a print/packaging studio; MenuDrawer.tsx's "currently being curated" toast contradicts the finished section it scrolls you to |
| 3 | User Control and Freedom | 2 | Backdrop-click closes overlays, but zero Esc-key handling across BookCallModal, both service/case-study modals, and MenuDrawer |
| 4 | Consistency and Standards | 1 | ContactUs.tsx uses a different visual dialect than every other CTA surface; all four "Book Discovery Call" buttons never open the modal built for that purpose |
| 5 | Error Prevention | 0 | The one live form has no required fields, no validation, and its submit handler is e.preventDefault() and nothing else |
| 6 | Recognition Rather Than Recall | 3 | Nav is text-labeled throughout; only minor icon-only social links in the drawer |
| 7 | Flexibility and Efficiency of Use | 2 | Five redundant paths converge on "contact," but no keyboard accelerators or manual intro-skip |
| 8 | Aesthetic and Minimalist Design | 3 | Strong editorial hierarchy in Hero/About/Services; ContactUs.tsx is the one visual outlier |
| 9 | Error Recovery | 0 | No error states exist anywhere in the site's only working form |
| 10 | Help and Documentation | 1 | Dense print jargon (gsm, Spot UV, dielines, Pantone) with zero inline definitions |
| **Total** | | **16/40** | **Poor (40%)** |

All 10 heuristics were genuinely assessable on this surface (Persuade + Experience), so none are scored n/a this run.

#### Design Specificity Verdict

**LLM assessment:** The motion layer is genuinely authored for this studio — the diagonal "blade wipe" (SectionTransition.tsx), the scramble-text/screen-split intro (PageIntro.tsx), and the razor-facet logo mark they both echo are a real point of view, not templated Framer-motion filler. But specificity collapses in the back half of the funnel: ContactUs.tsx is a generic glassmorphism form indistinguishable from any SaaS landing page, and the "Works" section still isn't showing real work. Portfolio.tsx renders StackedServiceCardsSection, which just re-titles the same six service categories from ServicesSection.tsx as if they were case studies.

Two complete, unused data files sit dead in src/data/:
- mockData.ts exports PROJECTS: four fully-written case studies (RockFi, ircam amplify, AUST Dynamics, BNP Paribas Horizon) with challenge/solution/results copy and real metrics, plus CLIENT_LOGOS — a far more plausible client roster (BNP Paribas, Mistral, Alan, Qonto, Spendesk) than the Stripe/Spotify/Vercel list actually shown in Clients.tsx.
- portfolioShowcase.ts exports SHOWCASE_CARDS: nine case-study cards with varied treatments and bento-grid column spans already laid out. Zero references exist anywhere in the codebase.

This is the single biggest opportunity on the site.

**Deterministic scan:** detect.mjs --json src returned exit code 0, zero findings, across 25 confirmed scannable files. This reads as a clean pattern scan, not a clean site: the detector checks for templated JSX/anti-patterns, which this codebase avoids at the component level — but it can't notice a component wired to the wrong data, or a form that silently does nothing. LLM review and detector agree the code isn't templated; they diverge sharply on whether the experience works.

**Visual overlays:** No reliable user-visible overlay is available this run — no browser automation tool was exposed in this session (confirmed independently by parent context and Assessment B), so live-server/injection were correctly skipped.

#### Overall Impression

The front two-thirds of this site (Hero → About → Services → entry into Works) is genuinely distinctive and on-brand. Then the experience quietly breaks: the portfolio shows services instead of case studies while richer case-study data sits unused two folders away, the contact form doesn't submit anything, the polished book-call modal is unreachable, and the header made transparent last turn is now unreadable against the black sections added this turn. The biggest opportunity isn't more polish — it's finishing the wiring on work that's already been designed and written.

#### What's Working

- SectionTransition.tsx — the scroll-scrubbed diagonal clip-path wipe with a crossfading giant word is a bespoke technique tied directly to the studio's own "sharp facet" mark.
- AboutRevealSection.tsx — word-by-word opacity/color scrub pinned to a 200vh track reads like ink gaining density on paper, an apt metaphor for a print studio.
- CustomCursor.tsx — a mix-blend-difference dot+ring that auto-inverts across cream/black/orange sections with zero per-section logic, correctly disabled for touch and reduced-motion.

#### Priority Issues

- **[P0] Portfolio shows recycled services, not real work.** Why it matters: contradicts "Portfolio First" and the prior request to show "the works you have created" — the current Works section is ServicesSection.tsx's six categories wearing different headlines, while mockData.ts (PROJECTS, CLIENT_LOGOS) and portfolioShowcase.ts (SHOWCASE_CARDS) contain fully-written, on-brand case studies and a more ambitious bento layout, completely unused. Fix: rebuild the Works section to consume PROJECTS/SHOWCASE_CARDS instead of the service list, and swap Clients.tsx's hardcoded array for CLIENT_LOGOS. Suggested command: $impeccable harden.
- **[P0] The only live form does nothing.** Why it matters: ContactUs.tsx's onSubmit={e => e.preventDefault()} has no request, no loading state, no success/error UI — every visitor who reaches the end of the funnel gets silence. Fix: wire real submission handling with visible success/error states, or route it into the modal below. Suggested command: $impeccable harden.
- **[P0] BookCallModal is fully built and completely unreachable.** Why it matters: a polished time-slot/budget picker with confetti and a success screen exists in App.tsx, but setIsModalOpen(true) is never called anywhere — all four "Book Discovery Call" CTAs scroll to the inert form instead. Fix: wire at least the primary CTAs to open the modal, or remove it. Suggested command: $impeccable harden.
- **[P1] Header is now illegible on the black sections.** Why it matters: Header.tsx is permanently bg-transparent with text-black nav links; now that Clients/ContactUs/Footer are solid #121212, the nav — including "Contact Us" — goes black-on-black exactly at the conversion sections. Fix: theme the header per-section (IntersectionObserver flipping to light text on dark sections, or a mix-blend-difference treatment). Suggested command: $impeccable audit.
- **[P1] Fabricated "curated" toast contradicts the finished section beneath it.** Why it matters: clicking "Works" in MenuDrawer.tsx shows "Works portfolio is currently being curated" while auto-scrolling to a fully-built section. Fix: delete the toast now that the section exists. Suggested command: $impeccable clarify.

#### Cognitive Load

2 of 8 checklist items fail (moderate).
1. Minimal choices — MenuDrawer.tsx presents ~14 simultaneous clickable targets at roughly equal visual weight, well past the ≤4 working-memory guideline.
2. Visual hierarchy — the Header contrast issue means the most important persistent element on the page loses hierarchy entirely once a dark section scrolls behind it.

#### Emotional Journey

The peak is the Portfolio entry: the blade-wipe slicing into the pinned 3D card reveal is the site's best, most on-brand moment. The valley is the ending — after that build-up, the funnel dumps the visitor into a generic form whose submit button does nothing, a textbook peak-end violation.

#### Persona Red Flags

**Jordan (Confused First-Timer):** Clicks "Works," is told the portfolio is "currently being curated," then watches the page scroll to a section full of finished cards. Hits "Submit Inquiry" and gets no confirmation, spinner, or error. Reads print-jargon specs with zero definitions.

**Riley (Deliberate Stress Tester):** Discovers ContactUs.tsx's form looks functional but is entirely inert. Finds BookCallModal.tsx fully implemented yet unreachable from any click path. Finds mockData.ts and portfolioShowcase.ts contain a richer dataset than what's rendered anywhere.

**Casey (Distracted Mobile User):** MenuDrawer.tsx's carousel chevrons are 24×24px, under the 44×44pt touch-target minimum. StackedServiceCardsSection pins the viewport for ~500vh of forced scroll with heavy hero images per card.

#### Minor Observations

- ServicesSection.tsx: one card's img (service6_GiftCover) is missing loading="lazy" decoding="async", inconsistent with its siblings.
- Footer.tsx social links point to bare domains, not real profiles.
- No overlay in the site handles Esc-key dismissal or role="dialog"/aria-modal semantics.
- Instrument Serif is only ever applied via a one-off inline style in Hero.tsx, so the "editorial serif accent" brand commitment doesn't propagate to any other heading.

#### Questions to Consider

- BookCallModal was clearly built to be the funnel's closing moment — why does every CTA quietly route around it into a form that doesn't submit?
- Portfolio.tsx calls the stacked cards "the actual work" in a code comment, but they just restate services — where are RockFi, ircam amplify, and BNP Paribas Horizon, which already exist, fully written, in mockData.ts?
- Is Stripe/Spotify/Vercel/Framer/Linear a placeholder client list that slipped through, or a claim the studio can stand behind — given CLIENT_LOGOS already has a more plausible roster sitting unused?
