import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import { LOGO_URL } from "../lib/assets";
import { ArrowUp } from "lucide-react";

interface NavColumn {
  links: {
    text: string;
    onClick?: () => void;
    url?: string;
  }[];
}

interface FooterProps {
  onScrollTop: () => void;
  onBookCall: () => void;
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
  const navColumns: NavColumn[] = [
    {
      links: [
        { text: "Home", url: "/" },
        { text: "About Us", url: "/about" },
        { text: "Services", url: "/services" },
        { text: "Works", url: "/portfolio" },
      ],
    },
    {
      links: [
        { text: "Twitter / X", url: "https://x.com/sharp_design" },
        { text: "LinkedIn", url: "https://in.linkedin.com/company/sharpdesign3" },
        { text: "Instagram", url: "https://www.instagram.com/sharpdesign/" },
        { text: "WhatsApp", url: "https://wa.me/919227953032" },
      ],
    },
  ];

  return (
    <footer className="w-full font-sans pb-10 border-t border-black/10 bg-white">
      <div className="overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-6 pt-10 pb-0 md:px-12 md:pt-14 max-w-7xl mx-auto"
        >
          {/* Logo + Motto */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <motion.div variants={itemVariants}>
              <img
                src={LOGO_URL}
                alt="Sharp Design Logo"
                className="h-10 sm:h-14 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={onScrollTop}
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-medium leading-tight tracking-tight text-[#121212]/70 md:text-right md:max-w-sm italic font-serif"
            >
              Make every pixel <br className="hidden sm:block" />
              <span className="text-[#FF5C00]">pay for itself.</span>
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-8 border-t border-black/10"
          />

          {/* Social Icons + Nav Columns */}
          <div className="mt-8 flex flex-col gap-10 md:flex-row md:gap-16 md:justify-between pb-8">
            {/* Animated Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 md:max-w-xs w-full"
            >
              <p className="text-sm font-semibold text-[#121212] uppercase tracking-wider">
                Connect with us
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full border border-black/10 text-[#121212] transition-all duration-500 ease-out hover:shadow-lg ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Nav Columns */}
        <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-x-12 gap-y-2 md:gap-x-20 self-start mt-4 md:mt-0"
            >
              {navColumns.map((col, colIdx) => (
                <ul key={colIdx} className="flex flex-col gap-3">
                  {col.links.map((link, linkIdx) => (
                    <motion.li key={linkIdx} variants={itemVariants}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="text-sm font-medium uppercase tracking-wide text-[#121212]/70 hover:text-[#FF5C00] transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C00] rounded"
                        >
                          {link.text}
                        </button>
                      ) : link.url?.startsWith("http") ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium uppercase tracking-wide text-[#121212]/70 hover:text-[#FF5C00] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C00] rounded"
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link
                          to={link.url || "/"}
                          className="text-sm font-medium uppercase tracking-wide text-[#121212]/70 hover:text-[#FF5C00] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C00] rounded"
                        >
                          {link.text}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="border-t border-black/10"
          />

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4 sm:gap-0"
          >
            <p className="text-[10px] sm:text-xs text-[#121212]/50 font-mono w-full sm:w-1/3 text-center sm:text-left">
              © {new Date().getFullYear()} Sharp Design Studio.
              <br /> All rights reserved.
            </p>
            <div className="w-full sm:w-1/3" />
            <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
              <button
                onClick={onScrollTop}
                className="flex items-center gap-2 text-xs font-mono font-medium text-[#121212]/50 hover:text-[#FF5C00] transition-colors cursor-pointer"
              >
                BACK TO TOP
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
