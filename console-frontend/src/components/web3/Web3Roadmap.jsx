import React, { useState } from 'react';
import '../Roadmap.css';
import RoadmapNav from '../RoadmapNav';
import ScrollToTop from '../ui/ScrollToTop';
import Web3Week1 from './Web3Week1';
import Web3Week2 from './Web3Week2';
import Web3Week3 from './Web3Week3';
import Web3Week4 from './Web3Week4';
import Web3Week5 from './Web3Week5';

const weekTabs = [
  { label: 'Week 1: Introduction', component: <Web3Week1 /> },
  { label: 'Week 2: Ethereum & Smart Contracts', component: <Web3Week2 /> },
  { label: 'Week 3: Solidity', component: <Web3Week3 /> },
  { label: 'Week 4: Web Development', component: <Web3Week4 /> },
  { label: 'Week 5: DApps, NFTs & DeFi', component: <Web3Week5 /> },
];

const Web3Roadmap = () => {
  const [activeWeek, setActiveWeek] = useState(0);

  return (
    <div className="roadmap-container">
      <ScrollToTop />
      <RoadmapNav />
      <div className="roadmap-hero">
        <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80" alt="Web3 Hero" />
        <div className="roadmap-hero-title">Roadmap to Web3 and Blockchains</div>
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

export default Web3Roadmap; 