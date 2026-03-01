import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Trophy, BookOpen, FileText, Mail, User, LogOut, LogIn, UserPlus, Medal, Rocket } from 'lucide-react';
import TextType from "./ui/text/TextType";
import SplashCursor from "./ui/SplashCursor";

const SidebarNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  // Escape key close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  const navigationItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy className="w-5 h-5" /> },
    { name: "Contest", path: "/contest", icon: <Medal className="w-5 h-5" /> },
    { name: "Tech Guide", path: "/tech-guide", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Resources", path: "/resources", icon: <FileText className="w-5 h-5" /> },
    { name: "Projects", path: "/projects", icon: <Rocket className="w-5 h-5" /> },
    { name: "Contact", path: "/contact", icon: <Mail className="w-5 h-5" /> },
  ];

  const isLoggedIn = localStorage.getItem("token");
  const user = isLoggedIn
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const authItems = isLoggedIn
    ? [
      { name: "Profile", path: "/profile", icon: <User className="w-5 h-5" /> },
      { name: "Logout", icon: <LogOut className="w-5 h-5" />, action: "logout" },
    ]
    : [
      { name: "Login", path: "/login", icon: <LogIn className="w-5 h-5" /> },
    ];

  return (
    <>

      {/* Logo */}
      <div className="fixed top-4 left-4 z-40">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer group bg-black"
        >
          {/* Logo Image */}
          <img
            src="/console_logo_withText.png"
            alt="Console Logo"
            className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300 hover:drop-shadow-lg hover:drop-shadow-[#FF3C5F]/50"
          />

          {/* Text Logo */}
          <div className="hidden sm:block">
            <div className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] transition-all duration-300 transform group-hover:scale-105">
              <TextType
                text={["CONSOLE"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                textColors={['yellow-400']}
              />
            </div>
            <div className="text-xs group-hover:text-[#FF7A30] transition-all duration-300 transform group-hover:translate-x-1">
              <TextType
                text={["<tech_community/>"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={false}
                cursorCharacter="|"
                textColors={['#FFC22D']}

              />
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-xl bg-black/80 backdrop-blur-sm hover:bg-gradient-to-br hover:from-[#FF3C5F]/20 hover:to-[#FFC22D]/20 border border-gray-600/50 hover:border-[#FF3C5F]/70 transition-all duration-500 transform hover:scale-110 group"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>

        <div className="flex flex-col space-y-1 relative z-10">
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] ${isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] ${isOpen ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] ${isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
          ></span>
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={handleBackdropClick}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-gray-800/50 z-50 transform transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3">
            <img
              src="/console_logo_withText.png"
              alt="Console Logo"
              className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300 hover:drop-shadow-lg hover:drop-shadow-[#FF3C5F]/50"
            />
            <div>
              <div className="text-white font-bold text-lg">CONSOLE</div>
              <div className="text-gray-400 text-xs">
                &lt;tech_community /&gt;
              </div>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gradient-to-br hover:from-[#FF3C5F]/20 hover:to-[#FFC22D]/20 flex items-center justify-center border border-gray-600/50 hover:border-[#FF3C5F]/50 transition-all duration-300 transform hover:scale-110 group"
          >
            <span className="text-white text-lg group-hover:text-[#FF3C5F] transition-colors duration-300">×</span>
          </button>
        </div>

        {/* Auth at Top */}
        <nav className="p-6 border-b border-gray-800/50">
          <div className="space-y-2">
            {authItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  if (item.action === "logout") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/");
                  } else {
                    navigate(item.path);
                  }
                  closeMenu();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 group ${location.pathname === item.path
                  ? "bg-gradient-to-r from-[#FF3C5F]/20 to-[#FFC22D]/20 text-[#FF3C5F] shadow-lg shadow-[#FF3C5F]/20"
                  : "text-gray-300 hover:bg-gradient-to-r hover:from-[#FF3C5F]/10 hover:to-[#FFC22D]/10 hover:text-white hover:shadow-lg hover:shadow-[#FF3C5F]/10"
                  }`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Navigation */}
        <nav className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  closeMenu();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:translate-x-2 group ${location.pathname === item.path
                  ? "bg-gradient-to-r from-[#FF3C5F]/20 to-[#FFC22D]/20 text-[#FF3C5F] shadow-lg shadow-[#FF3C5F]/20"
                  : "text-gray-300 hover:bg-gradient-to-r hover:from-[#FF3C5F]/10 hover:to-[#FFC22D]/10 hover:text-white hover:shadow-lg hover:shadow-[#FF3C5F]/10"
                  }`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>



        {/* Footer */}
        <div className="p-6 border-t border-gray-800/50 text-center group">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-4 h-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full group-hover:animate-pulse transition-all duration-300"></div>
            <span className="text-white font-bold text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] transition-all duration-300">CONSOLE</span>
          </div>
          <p className="text-gray-400 text-xs group-hover:text-[#FF7A30] transition-colors duration-300">Tech Community Platform</p>
        </div>
      </div>
    </>
  );
};

export default SidebarNavbar;
