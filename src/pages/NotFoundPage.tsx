import React from "react";
import { Link } from "react-router-dom";
import { Home, Sparkles, ArrowRight } from "lucide-react";
import { ShaderBackground } from "../components/ShaderBackground";
import { Footer } from "../components/Footer";
export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen relative isolate flex flex-col justify-between overflow-x-hidden">
      <ShaderBackground />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-28 sm:py-44 max-w-4xl mx-auto relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-black/10 text-[#FF5C00] font-mono text-xs font-bold uppercase tracking-widest mb-6 shadow-xs backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404</span>
        </div>

        <h1 className="text-[clamp(3rem,9vw,7rem)] font-black uppercase tracking-[-0.04em] text-[#121212] font-sans leading-none">
          Page Not <br />
          <span className="font-normal italic font-serif text-[#FF5C00] normal-case">
            Found.
          </span>
        </h1>

        <p className="mt-6 text-[clamp(1.05rem,2.2vw,1.5rem)] font-medium tracking-tight text-[#121212]/70 max-w-lg font-sans">
          The requested path does not exist or has been moved within our studio directory.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#121212] text-white hover:bg-[#FF5C00] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/90 border border-black/15 text-[#121212] hover:border-[#FF5C00] hover:text-[#FF5C00] font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
          >
            <span>View Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <Footer
        onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};
