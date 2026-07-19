import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram, Rocket, Lightbulb, Trophy, Globe, Brain, Zap, Link, Shield } from 'lucide-react';



function LandingFooter() {
  return (
    <footer className="relative bg-black border-t-2 border-orange-800">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" className="w-14 h-14 sm:w-20 sm:h-20 object-contain" alt="console logo" />
              <div>
                <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                  CONSOLE
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-400">Tech Community</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-md">
              The premier tech community platform. Empowering students to learn, build, and compete together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm sm:text-lg mb-4">
              <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">Quick Links</span>
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {[
                { label: "Leaderboard", color: "#FF3C5F", link: "/leaderboard" },
                { label: "First-Year Guide", color: "#FF7A30", link: "/tech-guide" },
                { label: "Resources", color: "#FFC22D", link: "/resources" },
                { label: "About Developers", color: "#4079ff", link: "/about-developers" }
              ].map((item, idx) => (
                <RouterLink
                  key={idx}
                  to={item.link}
                  className="group flex items-center space-x-2 text-xs sm:text-base text-gray-300 hover:text-white transition-colors duration-300 w-full text-left"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium">{item.label}</span>
                </RouterLink>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold text-sm sm:text-lg mb-4">
              <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">Connect</span>
            </h4>
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/console.comm?igsh=MWZ6NGtwcTNqMGdwYQ==", hover: "#FF3C5F" },
                { name: "WhatsApp", icon: Link, url: "https://chat.whatsapp.com/G3YUPil5jjP3PkOQWkCeo5?mode=ems_copy_t", hover: "#25D366" }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-800/30 p-2 sm:p-4 rounded-xl border border-gray-700/30 hover:border-current transition-all duration-300 hover:scale-105"
                  style={{ "--tw-border-opacity": 0.5, borderColor: item.hover }}
                >
                  <div className="flex flex-col items-center space-y-1 sm:space-y-2">
                    <item.icon size={18} className="sm:size-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <span className="text-[9px] sm:text-xs font-medium text-gray-300 group-hover:text-white">{item.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative border-t border-gray-800/30 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-[10px] sm:text-sm">
                © {new Date().getFullYear()} Console — The Tech Community
              </p>
              <p className="text-gray-500 text-[9px] sm:text-xs mt-1">
                Built with ❤️ by the CONSOLE Team
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-6 text-[9px] sm:text-xs">
              <RouterLink to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</RouterLink>
              <RouterLink to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</RouterLink>
              <RouterLink to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default LandingFooter;
