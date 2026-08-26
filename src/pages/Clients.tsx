import React from "react";
import { getAssetUrl } from "../lib/assets";

export const Clients: React.FC = () => {
  const row1 = Array.from({ length: 7 }, (_, i) => getAssetUrl(`portfolio/logo/${i + 1}.webp`));
  const row2 = Array.from({ length: 7 }, (_, i) => getAssetUrl(`portfolio/logo/${i + 8}.webp`));

  return (
    <section
      id="clients"
      className="relative w-full py-16 sm:py-24 md:py-32 flex flex-col justify-center text-[#121212] overflow-hidden gap-8 sm:gap-12 md:gap-16 px-4 sm:px-8 md:px-16"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-[-0.04em] text-[#121212] font-sans leading-none flex flex-wrap gap-x-3 sm:gap-x-4">
          <span className="block">Trusted by</span>
          <span className="block font-normal italic font-serif text-[#FF5C00] normal-case">
            Visionaries.
          </span>
        </h2>
        <p className="mt-4 sm:mt-6 max-w-4xl text-[clamp(1.2rem,3.5vw,2.5rem)] font-medium tracking-[-0.025em] leading-[1.3] font-sans text-[#121212]">
          A partial list of the forward-thinking brands, ambitious startups, and
          industry leaders we've had the pleasure of partnering with.
        </p>
      </div>

      {/* Dual Opposing Direction Marquee Bands */}
      <div className="w-full overflow-hidden flex flex-col gap-3 sm:gap-6">
        {/* Band 1 - Flowing Left */}
        <div
          className="relative w-[110%] -ml-[5%] overflow-hidden flex whitespace-nowrap rotate-[-2deg] backdrop-blur-md bg-white/30 border-y border-black/15 py-3 sm:py-5"
          style={{ willChange: "transform" }}
        >
          <div
            className="flex gap-4 sm:gap-8 items-center shrink-0"
            style={{
              animation: "marquee-left 22s linear infinite",
              willChange: "transform",
            }}
          >
            {row1.map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-28 sm:w-40 h-14 sm:h-22 bg-white/80 rounded-xl px-3 py-2 shadow-sm border border-black/5"
              >
                <img
                  src={src}
                  alt="Client Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            className="flex gap-4 sm:gap-8 items-center shrink-0 ml-4 sm:ml-8"
            style={{
              animation: "marquee-left 22s linear infinite",
              willChange: "transform",
            }}
            aria-hidden="true"
          >
            {row1.map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-28 sm:w-40 h-14 sm:h-22 bg-white/80 rounded-xl px-3 py-2 shadow-sm border border-black/5"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Band 2 - Flowing Right (Opposite Direction) */}
        <div
          className="relative w-[110%] -ml-[5%] overflow-hidden flex whitespace-nowrap rotate-[-2deg] backdrop-blur-md bg-white/30 border-y border-black/15 py-3 sm:py-5"
          style={{ willChange: "transform" }}
        >
          <div
            className="flex gap-4 sm:gap-8 items-center shrink-0"
            style={{
              animation: "marquee-right 22s linear infinite",
              willChange: "transform",
            }}
          >
            {row2.map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-28 sm:w-40 h-14 sm:h-22 bg-white/80 rounded-xl px-3 py-2 shadow-sm border border-black/5"
              >
                <img
                  src={src}
                  alt="Client Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div
            className="flex gap-4 sm:gap-8 items-center shrink-0 ml-4 sm:ml-8"
            style={{
              animation: "marquee-right 22s linear infinite",
              willChange: "transform",
            }}
            aria-hidden="true"
          >
            {row2.map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-28 sm:w-40 h-14 sm:h-22 bg-white/80 rounded-xl px-3 py-2 shadow-sm border border-black/5"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-right {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </section>
  );
};
