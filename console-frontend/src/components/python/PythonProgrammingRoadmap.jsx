import React, { useState } from 'react';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';
import ScrollToTop from '../ui/ScrollToTop';
import PythonWeek1 from './PythonWeek1';
import PythonWeek2 from './PythonWeek2';
import PythonWeek3 from './PythonWeek3';
import PythonWeek4 from './PythonWeek4';
import PythonWeek5 from './PythonWeek5';
import PythonWeek6 from './PythonWeek6';
import PythonWeek7 from './PythonWeek7';
import PythonWeek8 from './PythonWeek8';
import PythonWeek9 from './PythonWeek9';

const weekTabs = [
  { label: 'Week 1: Python Foundations', component: <PythonWeek1 /> },
  { label: 'Week 2: Control Flow & Functions', component: <PythonWeek2 /> },
  { label: 'Week 3: Data Structures', component: <PythonWeek3 /> },
  { label: 'Week 4: Advanced Functions & Modules', component: <PythonWeek4 /> },
  { label: 'Week 5: Object-Oriented Programming', component: <PythonWeek5 /> },
  { label: 'Week 6: Error Handling & File Operations', component: <PythonWeek6 /> },
  { label: 'Week 7: Package Management & Tools', component: <PythonWeek7 /> },
  { label: 'Week 8: Framework Introduction', component: <PythonWeek8 /> },
  { label: 'Week 9: Project', component: <PythonWeek9 /> },
];

const PythonProgrammingRoadmap = () => {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />
      <div className="roadmap-hero">
        <img src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80" alt="Python Programming Hero" />
        <div className="roadmap-hero-title">Python Programming Roadmap</div>
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

export default PythonProgrammingRoadmap;
