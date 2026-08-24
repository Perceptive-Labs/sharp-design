import React from 'react';

interface SharpDesignLogoProps {
  variant?: 'dark' | 'light' | 'colored';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SharpDesignLogo: React.FC<SharpDesignLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showText = true,
  className = '',
  onClick,
}) => {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Sharp Design Vector Mark */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} flex-shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          {/* Outer Sharp Polygon / Diamond */}
          <path
            d="M20 2L36 12V28L20 38L4 28V12L20 2Z"
            fill={isLight ? '#ffffff' : '#121212'}
            stroke={isLight ? '#ffffff' : '#121212'}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Sharp S / Razor Kinetic Facet */}
          <path
            d="M26 12L14 20H26L14 28"
            stroke="#FF5C00"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Central Sharp Point */}
          <circle cx="20" cy="20" r="1.8" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      {showText && (
        <div className="flex flex-col tracking-tight leading-[0.88]">
          <span
            className={`font-black uppercase tracking-[-0.03em] font-sans ${textSizes[size]} ${
              isLight ? 'text-white' : 'text-[#121212]'
            }`}
          >
            Sharp Design
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-bold font-mono tracking-[0.2em] uppercase mt-0.5 ${
              isLight ? 'text-white/60' : 'text-[#8E8B85]'
            }`}
          >
            Design Studio
          </span>
        </div>
      )}
    </div>
  );
};
