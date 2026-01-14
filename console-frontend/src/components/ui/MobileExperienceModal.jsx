import React, { useEffect, useState, useCallback } from 'react';
import { Monitor, X } from 'lucide-react';

const DISMISS_KEY = 'console-mobile-warning-dismissed';
const MOBILE_BREAKPOINT = 768;

const MobileExperienceModal = () => {
  const [visible, setVisible] = useState(false);

  const checkViewport = useCallback(() => {
    if (typeof window === 'undefined') return;

    const dismissed = window.sessionStorage.getItem(DISMISS_KEY) === 'true';
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

    setVisible(isMobile && !dismissed);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, [checkViewport]);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(DISMISS_KEY, 'true');
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center pb-6 px-4 pointer-events-none">
      {/* Small popup card at bottom */}
      <div
        className="relative w-full max-w-xs rounded-2xl bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 p-4 shadow-2xl pointer-events-auto"
        style={{
          animation: 'slideUp 0.4s ease-out'
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0d0d12] border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all"
          aria-label="Close"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="flex items-center space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF3C5F]/20 to-[#FFC22D]/20 border border-[#FF3C5F]/30 flex items-center justify-center">
            <Monitor className="w-5 h-5 text-[#FF3C5F]" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white">
              💻 Better on desktop
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Full features available on larger screens
            </p>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-[10px] font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Got it
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-t-full bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] opacity-60" />
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MobileExperienceModal;
