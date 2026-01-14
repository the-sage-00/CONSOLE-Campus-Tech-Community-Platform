import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../ui/ScrollToTop';
import WebWeek1 from './WebWeek1';
import WebWeek2 from './WebWeek2';
import WebWeek3 from './WebWeek3';
import WebWeek4 from './WebWeek4';
import WebWeek5 from './WebWeek5';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';

const WebDevelopmentRoadmap = () => {
  const navigate = useNavigate();
  const [activeWeek, setActiveWeek] = useState(1);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleResourcesClick = () => {
    navigate('/resources');
  };

  const handleTechGuideClick = () => {
    navigate('/tech-guide');
  };

  const handleLeaderboardClick = () => {
    navigate('/leaderboard');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const weeks = [
    { id: 1, title: 'Week 1', component: WebWeek1 },
    { id: 2, title: 'Week 2', component: WebWeek2 },
    { id: 3, title: 'Week 3', component: WebWeek3 },
    { id: 4, title: 'Week 4', component: WebWeek4 },
    { id: 5, title: 'Week 5', component: WebWeek5 }
  ];

  const ActiveComponent = weeks.find(week => week.id === activeWeek)?.component;

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />

      {/* Hero Section */}
      <div className="roadmap-hero">
        <img 
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
          alt="Web Development" 
          className="roadmap-hero-img"
        />
        <div className="roadmap-hero-title">
          Web Development Roadmap
        </div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto px-4">
          Master the art of building modern, responsive websites and web applications. 
          Learn HTML, CSS, JavaScript, React, and more with our comprehensive roadmap.
        </p>
      </div>

      {/* Week Navigation */}
      <div className="week-navigation">
        {weeks.map((week) => (
          <button
            key={week.id}
            onClick={() => setActiveWeek(week.id)}
            className={`week-tab ${activeWeek === week.id ? 'active' : ''}`}
          >
            {week.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="week-content">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
};

export default WebDevelopmentRoadmap;