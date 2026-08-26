import React from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { LOGO_URL } from "../lib/assets";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onScrollTop: () => void;
  onBookCall?: () => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/919227953032?text=Hello!%20Got%20your%20reference%20from%20Sharp%20Design%20Website...",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/sharpdesign/",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/sharpdesign3",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    color: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]",
  },
  {
    name: "X",
    href: "https://x.com/sharp_design",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
      </svg>
    ),
    color: "hover:bg-black hover:text-white hover:border-black",
  },
];

export const Footer: React.FC<FooterProps> = ({ onScrollTop, onBookCall }) => {
  const navLinks = [
    { text: "Home", url: "/" },
    { text: "About Us", url: "/about" },
    { text: "Services", url: "/services" },
    { text: "Portfolio", url: "/portfolio" },
  ];

  return (
    <footer className="w-full font-sans border-t border-black/10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6 sm:gap-8"
        >
          {/* Main Top Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            {/* Left: Logo & Motto */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <img
                src={LOGO_URL}
                alt="Sharp Design Logo"
                className="h-8 sm:h-10 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={onScrollTop}
              />
              <div className="h-8 w-[1px] bg-black/10 hidden sm:block" />
              <div className="text-xs sm:text-sm font-medium leading-tight tracking-tight text-[#121212]/75 font-serif italic flex flex-col">
                <span>Strategy before aesthetics.</span>
                <span className="text-[#FF5C00]">Clarity over clutter.</span>
                <span>Consistency builds trust.</span>
              </div>
            </motion.div>

            {/* Right: Nav Links & Socials */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              {/* Horizontal Nav Links */}
              <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.text}
                    to={link.url}
                    className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#121212]/70 hover:text-[#FF5C00] transition-colors"
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>

              <div className="h-6 w-[1px] bg-black/10 hidden sm:block" />

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/10 text-[#121212] transition-all duration-300 hover:scale-110 shadow-xs ${social.color}`}
                  >
                    {React.cloneElement(social.icon, { className: "w-4 h-4" })}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Studio Info Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 text-xs font-mono text-[#121212]/60 border-t border-black/5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span>20, 1st Floor, APM Mall, Opp. Sun N Step Club, Ghatlodia, Ahmedabad - 380 061</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
              <a href="tel:+919227953032" className="hover:text-[#FF5C00] transition-colors">
                +91 92279 53032
              </a>
              <span className="text-black/20">/</span>
              <a href="tel:+917940096529" className="hover:text-[#FF5C00] transition-colors">
                +91 79 40096529
              </a>
              <span className="text-black/20">/</span>
              <a href="mailto:hiren@sharpdesign.co.in" className="font-bold text-[#121212] hover:text-[#FF5C00] transition-colors">
                hiren@sharpdesign.co.in
              </a>
            </div>
          </motion.div>

          {/* Compact Divider */}
          <div className="border-t border-black/10" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 text-[11px] sm:text-xs font-mono text-[#121212]/50">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Sharp Design Studio. All rights reserved.
            </p>

            <button
              onClick={onScrollTop}
              className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#121212]/60 hover:text-[#FF5C00] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
