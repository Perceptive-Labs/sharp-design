import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, FolderKanban } from "lucide-react";
import { motion } from "framer-motion";
import { ContactUs } from "./ContactUs";
import { Footer } from "../components/Footer";
import { ShaderBackground } from "../components/ShaderBackground";
import { getAssetUrl } from "../lib/assets";

import { CATEGORY_IMAGES, CATEGORY_MAP } from "../lib/portfolioCategories";

export const PortfolioGalleryPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const title = id ? CATEGORY_MAP[id] || "Portfolio" : "Portfolio";
  const images = id && CATEGORY_IMAGES[id] ? CATEGORY_IMAGES[id] : [];

  useEffect(() => {
    // Scroll to top immediately when route mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-[#121212] relative isolate overflow-x-hidden flex flex-col justify-between">
      <ShaderBackground />

      {/* Floating Back Button */}
      <button
        onClick={handleBack}
        aria-label="Go back to previous page"
        className="fixed left-4 sm:left-8 md:left-12 top-8 sm:top-12 z-[55] group flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-black/10 hover:bg-[#121212] hover:text-white text-[#121212] transition-all duration-300 cursor-pointer text-xs font-mono font-bold uppercase tracking-wider focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5C00] active:scale-95"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back</span>
      </button>

      <div>
        {/* Header */}
        <div className="pt-24 sm:pt-40 pb-8 sm:pb-16 px-4 sm:px-12 max-w-7xl mx-auto text-center font-sans">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[clamp(2.25rem,8vw,6rem)] font-black uppercase tracking-tight mb-2 sm:mb-6"
          >
            {title}
          </motion.h1>
        </div>

        {/* Dynamic Content: Masonry Grid or Empty State */}
        {images.length === 0 ? (
          <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 sm:py-20 text-center flex flex-col items-center gap-6 bg-white/80 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] border border-black/10 shadow-sm my-6 sm:my-12">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF5C00]/10 text-[#FF5C00] flex items-center justify-center">
              <FolderKanban className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-[#121212] font-sans">
                Works In Curation
              </h2>
              <p className="text-xs sm:text-base text-[#121212]/70 font-sans max-w-md">
                We are currently digitizing our archival physical print pieces and case studies for {title}. Check back soon or request samples directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleBack}
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#121212] text-white hover:bg-[#FF5C00] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Explore Other Works
              </button>
              <a
                href="https://wa.me/919227953032?text=Hello!%20I%20would%20like%20to%20request%20samples%20for%20portfolio..."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-black/20 text-[#121212] hover:border-[#FF5C00] hover:text-[#FF5C00] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Request Samples
              </a>
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-16 sm:pb-32 max-w-[1600px] mx-auto">
            {/* The Grid container */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                  className="relative flex items-center justify-center p-6 sm:p-10 aspect-square sm:aspect-[4/3] bg-transparent after:content-[''] after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-[1px] after:bg-[#121212]/10 lg:[&:nth-child(4n)]:after:hidden md:max-lg:[&:nth-child(3n)]:after:hidden max-md:[&:nth-child(2n)]:after:hidden"
                >
                  <img
                    src={src}
                    alt={`${title} project ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain max-w-[160px] sm:max-w-[200px]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact + Footer */}
      <div>
        <ContactUs />
        <Footer
          onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onBookCall={() => {
            window.location.href = "/#contact";
          }}
        />
      </div>
    </main>
  );
};
