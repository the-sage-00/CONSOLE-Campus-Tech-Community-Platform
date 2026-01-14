import React, { useState } from 'react';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';
import ScrollToTop from '../ui/ScrollToTop';
import MLWeek1 from './MLWeek1';
import MLWeek2 from './MLWeek2';
import MLWeek3 from './MLWeek3';
import MLWeek4 from './MLWeek4';
import MLWeek5 from './MLWeek5';
import MLWeek6 from './MLWeek6';
import MLWeek7 from './MLWeek7';
import MLWeek8 from './MLWeek8';

const weekTabs = [
  { label: 'Week 1', component: <MLWeek1 /> },
  { label: 'Week 2', component: <MLWeek2 /> },
  { label: 'Week 3', component: <MLWeek3 /> },
  { label: 'Week 4', component: <MLWeek4 /> },
  { label: 'Week 5', component: <MLWeek5 /> },
  { label: 'Week 6', component: <MLWeek6 /> },
  { label: 'Week 7', component: <MLWeek7 /> },
  { label: 'Week 8', component: <MLWeek8 /> },
];

const MachineLearningRoadmap = () => {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />
      <div className="roadmap-hero">
        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80" alt="Machine Learning Hero" />
        <div className="roadmap-hero-title">Roadmap to Machine Learning</div>
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

export default MachineLearningRoadmap; 