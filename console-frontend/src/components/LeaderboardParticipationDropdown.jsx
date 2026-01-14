import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Target, Trophy, Sparkles, Globe, Zap } from 'lucide-react';

const LeaderboardParticipationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="w-full bg-black/60 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-[#FF3C5F]/20 group">
      <button
        onClick={toggleDropdown}
        className="w-full px-5 py-4 flex items-center justify-between text-white hover:bg-gray-800/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F]/10 group-hover:to-[#FFC22D]/10"
      >
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-[#FF3C5F]" />
          <span className="font-bold text-lg">How The Unified Leaderboard Works</span>
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
              The unified leaderboard tracks your verified performance across LeetCode, Codeforces, and total
              questions solved. It surfaces active profiles so you can see who is putting in consistent effort across
              the campus.
            </p>
            <p>
              Switching the tabs shows specialized views: contest rating (LeetCode), Codeforces rating, or total
              LeetCode questions solved.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-[#FF7A30]/10 border border-[#FF7A30]/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-[#FF7A30]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Eligibility To Appear</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Connect and verify your LeetCode and/or Codeforces handle.</li>
                <li>Solve at least one problem after verification to activate your profile.</li>
                <li>Contest tab shows only users with a recorded contest rating.</li>
              </ul>
            </div>

            <div className="bg-[#3C5CFF]/10 border border-[#3C5CFF]/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-[#3C5CFF]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Why This Leaderboard</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Encourages consistent practice on both interview and contest platforms.</li>
                <li>Creates visibility for active contributors and motivates others to join in.</li>
                <li>Helps you benchmark your progress with peers every time data refreshes.</li>
              </ul>
            </div>

            <div className="bg-[#FFC22D]/10 border border-[#FFC22D]/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#FFC22D]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Make The Most Of It</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Use the yearly filters to compare batches and track collective growth.</li>
                <li>Swap tabs to focus on contests, pure problem counts, or specific platforms.</li>
                <li>Celebrate jumps in rating/solved counts and keep the competition friendly.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800/60 rounded-xl p-4 text-gray-400 text-sm leading-relaxed">
            <p>
              Remember: the leaderboard updates when handles are synced. A single solved problem or contest start can
              bump you into the rankings. Keep showing up, keep practicing, and let the board reflect the energy across
              the campus community.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardParticipationDropdown;

