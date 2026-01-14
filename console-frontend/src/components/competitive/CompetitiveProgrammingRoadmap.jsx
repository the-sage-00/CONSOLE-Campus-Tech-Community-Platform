import React, { useState } from 'react';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';
import ScrollToTop from '../ui/ScrollToTop';
import CPSection0 from './CPSection0';
import CPSection1 from './CPSection1';
import CPSection2 from './CPSection2';
import CPSection3 from './CPSection3';

const sectionTabs = [
  { label: 'Section 0: Introduction', component: <CPSection0 /> },
  { label: 'Section 1: Basic Theory', component: <CPSection1 /> },
  { label: 'Section 2: Intermediate', component: <CPSection2 /> },
  { label: 'Section 3: Advanced', component: <CPSection3 /> },
];

const CompetitiveProgrammingRoadmap = () => {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />
      <div className="roadmap-hero">
        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="Competitive Programming Hero" />
        <div className="roadmap-hero-title">Roadmap to Competitive Programming</div>
      </div>
      
      <div className="week-navigation">
        {sectionTabs.map((tab, index) => (
          <button
            key={index}
            className={`week-tab ${activeSection === index ? 'active' : ''}`}
            onClick={() => setActiveSection(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="week-content">
        {sectionTabs[activeSection].component}
      </div>
    </div>
  );
};

export default CompetitiveProgrammingRoadmap; 