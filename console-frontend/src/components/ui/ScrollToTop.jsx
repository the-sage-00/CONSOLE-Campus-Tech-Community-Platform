import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = ({ 
  showAfter = 400,
  className = "",
  position = "bottom-right" // bottom-right, bottom-left, top-right, top-left
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6'
    };
    return positions[position] || positions['bottom-right'];
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed ${getPositionClasses()} z-50 
        w-12 h-12 
        bg-gradient-to-r from-[#FF3C5F] to-[#FF7A30] 
        hover:from-[#FF2A4F] hover:to-[#FF6A20] 
        text-white 
        rounded-full 
        shadow-lg hover:shadow-xl hover:shadow-[#FF3C5F]/25
        transition-all duration-300 
        transform hover:scale-110 active:scale-95
        flex items-center justify-center
        animate-fade-in
        border-2 border-white/10 hover:border-white/20
        backdrop-blur-sm
        group
        ${className}
      `}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ChevronUp 
        className="w-6 h-6 group-hover:animate-bounce transition-transform duration-300" 
      />
      
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF3C5F] to-[#FF7A30] rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-lg -z-10" />
    </button>
  );
};

export default ScrollToTop;
