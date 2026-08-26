import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ContactUs } from "./ContactUs";
import { Footer } from "../components/Footer";
import { ShaderBackground } from "../components/ShaderBackground";
import { getAssetUrl } from "../lib/assets";

export const CATEGORY_IMAGES: Record<string, string[]> = {
  "brochure-designs": [],
  "packaging-prints": [],
  logos: Array.from({ length: 14 }, (_, i) => getAssetUrl(`portfolio/logo/${i + 1}.webp`)),
  "booklet-prints": [],
  "stationery-prints": [],
  "gift-cover-designs": [],
};

const CATEGORY_MAP: Record<string, string> = {
  "brochure-designs": "Brochure Designs",
  "packaging-prints": "Packaging Prints",
  logos: "Logos",
  "booklet-prints": "Booklet Prints",
  "stationery-prints": "Stationery Prints",
  "gift-cover-designs": "Gift Cover Designs",
};

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
    navigate("/");
    setTimeout(() => {
      const worksSection = document.getElementById("works");
      if (worksSection) {
        worksSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen bg-transparent text-[#121212] relative isolate overflow-x-hidden">
      <ShaderBackground />
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50 flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-[#121212]/10 hover:bg-[#121212] hover:text-white transition-colors cursor-pointer text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest"
      >
        <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="inline sm:hidden">Back</span>
      </button>

      {/* Header */}
      <div className="pt-20 sm:pt-40 pb-8 sm:pb-16 px-5 sm:px-12 max-w-7xl mx-auto text-center font-sans">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(2.25rem,8vw,6rem)] font-black uppercase tracking-tight mb-2 sm:mb-6"
        >
          {title}
        </motion.h1>
      </div>

      {/* Masonry Grid - 2 cols on mobile for rich density */}
      <div className="px-3.5 sm:px-8 md:px-12 lg:px-16 pb-16 sm:pb-32 max-w-[1600px] mx-auto">
        <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-2.5 sm:gap-6 lg:gap-8 space-y-2.5 sm:space-y-6 lg:space-y-8">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: (i % 4) * 0.08,
                ease: "easeOut",
              }}
              className="break-inside-avoid relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/70 border border-[#121212]/5 shadow-sm group cursor-pointer p-2 sm:p-4"
            >
              <img
                src={src}
                alt={`Portfolio ${i + 1}`}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <ContactUs />
      <Footer
        onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onBookCall={() => {
          window.location.href = "/#contact";
        }}
      />
    </main>
  );
};
