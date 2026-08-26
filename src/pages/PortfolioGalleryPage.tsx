import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ContactUs } from "./ContactUs";
import { Footer } from "../components/Footer";
import { ShaderBackground } from "../components/ShaderBackground";

export const CATEGORY_IMAGES: Record<string, string[]> = {
  "brochure-designs": [],
  "packaging-prints": [],
  logos: [
    "/portfolio/logo/1.jpg",
    "/portfolio/logo/2.jpg",
    "/portfolio/logo/3.jpg",
    "/portfolio/logo/4.jpg",
    "/portfolio/logo/5.jpg",
    "/portfolio/logo/6.jpg",
    "/portfolio/logo/7.jpg",
    "/portfolio/logo/8.jpg",
    "/portfolio/logo/9.jpg",
    "/portfolio/logo/10.jpg",
    "/portfolio/logo/11.jpg",
    "/portfolio/logo/12.jpg",
    "/portfolio/logo/13.jpg",
    "/portfolio/logo/14.jpg",
  ],
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
      <div className="pt-32 sm:pt-40 pb-12 sm:pb-20 px-6 sm:px-12 max-w-7xl mx-auto text-center font-sans">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase tracking-tight mb-4 sm:mb-6"
        >
          {title}
        </motion.h1>
      </div>

      {/* Masonry Grid */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 pb-20 sm:pb-32 max-w-[1600px] mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 lg:gap-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: (i % 4) * 0.1,
                ease: "easeOut",
              }}
              className="break-inside-avoid relative overflow-hidden rounded-2xl bg-white/50 border border-[#121212]/5 shadow-sm group cursor-pointer"
            >
              <img
                src={src}
                alt={`Portfolio ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
