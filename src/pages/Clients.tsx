import React from "react";
import { getAssetUrl } from "../lib/assets";

export const Clients: React.FC = () => {
  const row1 = Array.from({ length: 7 }, (_, i) => getAssetUrl(`portfolio/logo/${i + 1}.webp`));
  const row2 = Array.from({ length: 7 }, (_, i) => getAssetUrl(`portfolio/logo/${i + 8}.webp`));

  return (
    <section
      id="clients"
      className="relative w-full py-12 sm:py-16 md:min-h-screen md:py-0 md:pt-20 md:pb-16 flex flex-col justify-center md:justify-between text-[#121212] overflow-hidden gap-6 md:gap-0 px-4 sm:px-8 md:px-16"
    >
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-[clamp(2rem,5.5vw,5rem)] leading-[0.95] font-medium tracking-tight flex flex-wrap gap-x-3 sm:gap-x-4">
          <span className="block">Trusted by</span>
          <span className="block font-normal italic font-serif text-[#FF5C00]">
            Visionaries.
          </span>
        </h1>
        <p className="mt-3 sm:mt-6 max-w-xl text-sm sm:text-lg md:text-xl text-[#121212]/60 leading-relaxed font-sans font-medium">
          A partial list of the forward-thinking brands, ambitious startups, and
          industry leaders we've had the pleasure of partnering with.
        </p>
      </div>

      {/* Dual Opposing Direction Marquee Bands */}
      <div className="w-full overflow-hidden mt-4 sm:mt-10 md:mt-auto pt-2 md:pt-10 flex flex-col gap-3 sm:gap-6">
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
