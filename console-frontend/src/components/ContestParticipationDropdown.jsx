import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Target, Trophy, Sparkles } from 'lucide-react';

const ContestParticipationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full bg-black/60 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-[#3C5CFF]/20 group">
      <button
        onClick={toggleDropdown}
        className="w-full px-5 py-4 flex items-center justify-between text-white hover:bg-gray-800/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#3C5CFF]/10 group-hover:to-[#3CFFB7]/10"
      >
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-[#3C5CFF]" />
          <span className="font-bold text-lg">How Contest Visibility Works</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 py-4 border-t border-gray-800/50 space-y-6 animate-fadeIn transition-all duration-500 transform">
          <div className="text-gray-300 text-sm space-y-3">
            <p>
              We highlight campus members who are actively solving problems and joining contests. If you are
              missing from the leaderboard or contest table, here is how to get visible again.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#3C5CFF]/10 border border-[#3C5CFF]/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-[#3C5CFF]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Eligibility Checklist</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Solve at least one problem on LeetCode or Codeforces after verifying your handle.</li>
                <li>Join at least one campus-tracked contest to appear in the contest rankings.</li>
                <li>Keep your handle linked; we automatically refresh data every sync.</li>
              </ul>
            </div>

            <div className="bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Trophy className="w-5 h-5 text-[#4CAF50]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Why We Do This</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Rewards consistent participation instead of idle profiles.</li>
                <li>Keeps the leaderboard meaningful for current performers.</li>
                <li>Makes every new contest a chance to climb the ranks.</li>
              </ul>
            </div>

            <div className="bg-[#FFC22D]/10 border border-[#FFC22D]/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#FFC22D]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Make The Most Of It</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Use upcoming contests to challenge friends and compare progress.</li>
                <li>Share handles, sync regularly, and celebrate win streaks publicly.</li>
                <li>Let the board fuel friendly competition inside the campus.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/60 rounded-xl p-4 text-gray-400 text-sm leading-relaxed">
            <p>
              Tip: even one solved problem or a single contest appearance gets you on the radar. From there, every
              weekly sync turns your practice into campus-wide recognition. Stay active, stay visible, and keep the
              competitive energy positive.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestParticipationDropdown;

