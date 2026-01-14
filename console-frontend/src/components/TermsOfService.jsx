import React from 'react';
import SidebarNavbar from './SidebarNavbar';
import LandingFooter from './Footer';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SidebarNavbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mb-8">
            <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
              परंपरा (Parampara) | प्रतिष्ठा (Prestige) | अनुशासन (Anushasan)
            </p>
            <p className="text-xl font-medium">बस कोडिंग करो (Just Keep Coding)</p>
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">Tradition (परंपरा)</h2>
          <p className="mb-4">
            By using Console, you agree to uphold the tradition of continuous learning and improvement. 
            Our community thrives on a shared commitment to growth. We support each other as developers and problem solvers, always pushing the limits of what we can achieve.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">Prestige (प्रतिष्ठा)</h2>
          <p className="mb-4">
            We uphold the prestige of our community by fostering respect, collaboration, and kindness. 
            Your actions, whether in code or conversation, should reflect positively on both yourself and the Console community. Be a source of inspiration for others.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">Discipline (अनुशासन)</h2>
          <p className="mb-4">
            Discipline is key to mastering any craft. We encourage you to approach coding with focus, consistency, and passion. 
            By maintaining good habits and adhering to a steady practice schedule, you'll unlock your full potential as a developer. 
            The more you commit, the more you grow.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-orange-400">Just Code (बस कोडिंग करो)</h2>
          <p className="mb-4">
            At the end of the day, the most important thing is to keep coding. Progress isn’t made overnight; it’s made day by day, one line of code at a time. 
            Console is here to track your progress, celebrate your wins, and support you on your journey to becoming a coding master.
          </p>
          
          <div className="bg-orange-900/30 p-6 rounded-xl border border-orange-800/50 mt-8">
            <h3 className="text-xl font-bold mb-2 text-orange-400">Agreement</h3>
            <p>
              By using Console, you agree to these terms and commit to being an active, respectful member of our community. Remember: the goal is simple—keep coding, keep learning, and keep growing.
            </p>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default TermsOfService;
