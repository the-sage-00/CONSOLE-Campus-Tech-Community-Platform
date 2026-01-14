import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoadmapNav = () => {
  const navigate = useNavigate();

  const go = (path) => () => navigate(path);

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={go('/') }>
              <div className="w-8 h-8 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                Console
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={go('/')} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">HOME</button>
            <button onClick={go('/resources')} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">RESOURCES</button>
            <button onClick={go('/tech-guide')} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">TECH GUIDE</button>
            <button onClick={go('/leaderboard')} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">LEADERBOARD</button>
            <button onClick={go('/contact')} className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">CONTACT</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default RoadmapNav;


