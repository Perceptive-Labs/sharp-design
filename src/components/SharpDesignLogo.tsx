import React from "react";
import { LOGO_URL } from "../lib/assets";

interface SharpDesignLogoProps {
  variant?: "dark" | "light" | "colored";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SharpDesignLogo: React.FC<SharpDesignLogoProps> = ({
  variant = "dark",
  size = "md",
  showText = true,
  className = "",
  onClick,
}) => {
  const iconSizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <img
        src={LOGO_URL}
        alt="Sharp Design Logo"
        className={`${iconSizes[size]} h-auto object-contain transition-transform duration-300 hover:scale-105 `}
      />
    </div>
  );
};
