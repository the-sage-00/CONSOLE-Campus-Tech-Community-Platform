import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, BookOpen, GraduationCap, Phone, Shield, Rocket, Facebook, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';
import { logger } from '../utils/logger';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        logger.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Handle scroll effect for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.menu-nav-wrap')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Tech Guide', path: '/tech-guide', icon: <GraduationCap className="w-4 h-4" /> },
    { name: 'BuildVerse', path: '/buildverse', icon: <Rocket className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Phone className="w-4 h-4" /> },
    { name: 'Admin Panel', path: '/admin/login', icon: <Shield className="w-4 h-4" /> },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook className="w-4 h-4" /> },
    { name: 'LinkedIn', url: '#', icon: <Linkedin className="w-4 h-4" /> },
    { name: 'Instagram', url: '#', icon: <Instagram className="w-4 h-4" /> },
    { name: 'YouTube', url: '#', icon: <Youtube className="w-4 h-4" /> },
    { name: 'Twitter', url: '#', icon: <Twitter className="w-4 h-4" /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      {/* Sticky Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 group cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                CONSOLE
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.slice(0, -1).map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Authentication Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300 text-sm">Welcome, {user.name}</span>
                  <button
                    onClick={() => navigate('/profile')}
                    className="px-4 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 text-white rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 text-white rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>

            {/* Menu Trigger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex flex-col space-y-1">
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute top-16 left-0 right-0 bg-black/95 border-b border-gray-800">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center space-x-3 w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-2"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}

            {/* Authentication Section */}
            <div className="pt-4 border-t border-gray-800">
              {user ? (
                <div className="space-y-3">
                  <div className="text-gray-400 text-sm">Welcome, {user.name}</div>
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] hover:from-[#FF3C5F]/90 hover:to-[#FFC22D]/90 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;