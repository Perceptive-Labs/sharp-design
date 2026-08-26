import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  className = "",
  label = "Back",
}) => {
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      aria-label="Go back to previous page"
      className={`group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-black/10 hover:bg-[#121212] hover:text-white text-[#121212] transition-all duration-300 cursor-pointer text-xs font-mono font-bold uppercase tracking-wider focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#FF5C00] active:scale-95 ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
      <span>{label}</span>
    </button>
  );
};
