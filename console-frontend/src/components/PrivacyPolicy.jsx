import React from 'react';
import SidebarNavbar from './SidebarNavbar';
import LandingFooter from './Footer';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SidebarNavbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-8">
            <p className="text-xl font-medium mb-4">
              "Aap, privacy ka tension mat le. LeetCode aur CodeForces ka data toh safe hai! Bas apna coding journey track kar aur leaderboard mein top pe aa ja!"
            </p>
            <p className="text-lg">
              "It's all for your progress, buddy! Let’s grow together!"
            </p>
          </div>
          
          <p className="mb-4">
            At Console, we take your privacy seriously, but we also want to help you build your coding empire! We collect your coding platform data from LeetCode and CodeForces to power our leaderboard system and track your progress. No stress, we’ve got your back (and your code)!
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">What We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your name and email (for account creation – we won't spam you, promise!)</li>
            <li>Your branch info (just to categorize you and make things cooler!)</li>
            <li>Your LeetCode username and stats (because we're all about those problems solved!)</li>
            <li>Your CodeForces username and rating (you’re the next programming legend, we know it!)</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To create and manage your Console account (it's all about that smooth login experience!)</li>
            <li>To show your progress on our leaderboard (let’s show the world how awesome you are!)</li>
            <li>To help you track your coding journey (we're your digital coding coach, always cheering you on!)</li>
            <li>To build a stronger tech community (together, we code better!)</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">Data Sharing</h2>
          <p>
            We do display your name, branch, and coding stats on our leaderboard (we're all about that friendly competition!). 
            But don’t worry – your email stays private and is only used for account-related stuff, like password resets, 
            not random “hello” emails.
          </p>
          
          <div className="bg-orange-900/30 p-6 rounded-xl border border-orange-800/50 mt-8">
            <h3 className="text-xl font-bold mb-2 text-orange-400">Remember!</h3>
            <p>
              By using Console, you’re giving us permission to access your public coding platform data 
              (LeetCode, CodeForces) to fuel our leaderboard system and keep your coding journey on track.
            </p>
            <p className="text-sm text-gray-400">
              We promise we’ll be gentle with your data—no shady business here.
            </p>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default PrivacyPolicy;
