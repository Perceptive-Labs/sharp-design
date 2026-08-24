import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SharpDesignLogo } from './SharpDesignLogo';

interface FooterProps {
  onScrollTop: () => void;
  onBookCall: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTop, onBookCall }) => {
  return (
    <footer className="w-full border-t border-zinc-800/80 py-12 px-6 md:px-14 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SharpDesignLogo
            variant="light"
            size="sm"
            onClick={onScrollTop}
          />
          <span className="text-xs text-zinc-400 font-mono">
            © {new Date().getFullYear()} Sharp Design Studio. All rights reserved. Registered in Paris & Worldwide.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold text-zinc-300">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF5C00] transition-colors"
          >
            Twitter / X
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF5C00] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF5C00] transition-colors"
          >
            Instagram
          </a>
          <button
            onClick={onScrollTop}
            className="flex items-center gap-1 hover:text-[#FF5C00] transition-colors cursor-pointer text-zinc-300"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

