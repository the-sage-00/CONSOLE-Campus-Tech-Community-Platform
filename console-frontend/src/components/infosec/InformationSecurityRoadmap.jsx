import React, { useState } from 'react';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';
import ScrollToTop from '../ui/ScrollToTop';
import InfoSecWeek1 from './InfoSecWeek1';
import InfoSecWeek2 from './InfoSecWeek2';
import InfoSecWeek3 from './InfoSecWeek3';
import InfoSecWeek4 from './InfoSecWeek4';
import InfoSecWeek5 from './InfoSecWeek5';
import InfoSecWeek6 from './InfoSecWeek6';
import InfoSecWeek7 from './InfoSecWeek7';
import InfoSecWeek8 from './InfoSecWeek8';

const weekTabs = [
  { label: 'Week 1: Computer Fundamentals', component: <InfoSecWeek1 /> },
  { label: 'Week 2: Linux & Scripting', component: <InfoSecWeek2 /> },
  { label: 'Week 3: Web Exploitation', component: <InfoSecWeek3 /> },
  { label: 'Week 4: Cryptography', component: <InfoSecWeek4 /> },
  { label: 'Week 5: Network Tools', component: <InfoSecWeek5 /> },
  { label: 'Week 6: Forensics', component: <InfoSecWeek6 /> },
  { label: 'Week 7: Binary Exploitation', component: <InfoSecWeek7 /> },
  { label: 'Week 8: OSINT', component: <InfoSecWeek8 /> },
];

const InformationSecurityRoadmap = () => {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />
      <div className="roadmap-hero">
        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Information Security Hero" />
        <div className="roadmap-hero-title">Roadmap to Information Security</div>
      </div>
      
      <div className="week-navigation">
        {weekTabs.map((tab, index) => (
          <button
            key={index}
            className={`week-tab ${activeWeek === index ? 'active' : ''}`}
            onClick={() => setActiveWeek(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="week-content">
        {weekTabs[activeWeek].component}
      </div>
    </div>
  );
};

export default InformationSecurityRoadmap; 