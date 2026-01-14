import React, { useState } from 'react';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';
import ScrollToTop from '../ui/ScrollToTop';
import CPPWeek1 from './CPPWeek1';
import CPPWeek2 from './CPPWeek2';
import CPPWeek3 from './CPPWeek3';
import CPPWeek4 from './CPPWeek4';
import CPPWeek5 from './CPPWeek5';
import CPPWeek6 from './CPPWeek6';
import CPPWeek7 from './CPPWeek7';
import CPPWeek8 from './CPPWeek8';
import CPPWeek9 from './CPPWeek9';

const weekTabs = [
  { label: 'Week 1: Introduction & Basics', component: <CPPWeek1 /> },
  { label: 'Week 2: Operators & Flow Control', component: <CPPWeek2 /> },
  { label: 'Week 3: Pointers, Arrays & Data Types', component: <CPPWeek3 /> },
  { label: 'Week 4: Functions & Recursion', component: <CPPWeek4 /> },
  { label: 'Week 5: Revise & Practice', component: <CPPWeek5 /> },
  { label: 'Week 6: OOP - Part 1', component: <CPPWeek6 /> },
  { label: 'Week 7: OOP - Part 2', component: <CPPWeek7 /> },
  { label: 'Week 8: OOP - Part 3', component: <CPPWeek8 /> },
  { label: 'Week 9: STL & Advanced Topics', component: <CPPWeek9 /> },
];

const CPPProgrammingRoadmap = () => {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />
      <div className="roadmap-hero">
        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80" alt="C++ Programming Hero" />
        <div className="roadmap-hero-title">Roadmap to C++ Programming</div>
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

export default CPPProgrammingRoadmap;
