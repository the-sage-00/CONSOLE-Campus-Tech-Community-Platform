import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calculator, Trophy, Zap, Target, Award, Star } from 'lucide-react';

const ScoreCalculationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const platforms = [
    {
      name: 'Codeforces',
      icon: <Zap className="w-5 h-5 text-[#FF3C5F]" />,
      color: 'text-[#FF3C5F]',
      bgColor: 'bg-[#FF3C5F]/10',
      borderColor: 'border-[#FF3C5F]/30',
      formula: 'CF_rating',
      example: '2000 rating → 2000 points',
      description: 'We use your actual Codeforces rating directly.'
    },
    {
      name: 'LeetCode',
      icon: <Target className="w-5 h-5 text-[#FF7A30]" />,
      color: 'text-[#FF7A30]',
      bgColor: 'bg-[#FF7A30]/10',
      borderColor: 'border-[#FF7A30]/30',
      formula: 'sqrt(easy × 1 + medium × 2.5 + hard × 4) × 22 + 700',
      example: '100 easy, 50 medium, 20 hard → sqrt(100*1 + 50*2.5 + 20*4) × 22 + 700 ≈ 1245 points',
      description: 'We calculate a score based on the weighted sum of problems solved (easy × 1, medium × 2.5, hard × 4), take the square root, multiply by 25, and add 700.'
    },
    {
      name: 'Final Score',
      icon: <Star className="w-5 h-5 text-[#FFC22D]" />,
      color: 'text-[#FFC22D]',
      bgColor: 'bg-[#FFC22D]/10',
      borderColor: 'border-[#FFC22D]/30',
      formula: 'max(CF_rating, LC_score)',
      example: 'CF: 2000, LC: 1200 → Final: 2000 points',
      description: 'We take the maximum of your Codeforces rating and calculated LeetCode score.'
    }
  ];

  return (
    <div className="w-full bg-black/60 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden transition-all duration-500 shadow-lg hover:shadow-[#FF3C5F]/20 group">
      {/* Header/Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="w-full px-5 py-4 flex items-center justify-between text-white hover:bg-gray-800/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F]/10 group-hover:to-[#FFC22D]/10"
      >
        <div className="flex items-center space-x-3">
          <Calculator className="w-5 h-5 text-[#FF3C5F]" />
          <span className="font-bold text-lg">How We Calculate Scores</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-5 py-4 border-t border-gray-800/50 space-y-6 animate-fadeIn transition-all duration-500 transform">
          {/* Introduction */}
          <div className="text-gray-300 text-sm">
            <p className="mb-3">
              Our unified scoring system uses a simple and fair formula to combine performance across
              Codeforces and LeetCode platforms. Here's how we calculate scores:
            </p>
          </div>

          {/* Platform Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className={`${platform.bgColor} ${platform.borderColor} border rounded-xl p-4 transition-transform duration-300 hover:scale-105`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  {platform.icon}
                  <h3 className={`${platform.color} font-bold`}>{platform.name}</h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-white font-semibold">Formula:</div>
                    <div className="text-gray-300 font-mono">{platform.formula}</div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-white font-semibold">Example:</div>
                    <div className="text-gray-300">{platform.example}</div>
                  </div>

                  <p className="text-gray-400 text-xs mt-2">{platform.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Total Score Calculation */}
          <div className="bg-gradient-to-r from-[#FF3C5F]/20 to-[#FFC22D]/20 rounded-xl p-4 border border-[#FF3C5F]/30">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="w-5 h-5 text-[#FFC22D]" />
              <h3 className="text-white font-bold">Complete Formula</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-3 mb-3">
              <div className="text-white font-semibold">Final Score Calculation:</div>
              <div className="text-gray-300 font-mono text-sm">
                score = max(codeforces_rating, (sqrt(easy × 1 + medium × 2.5 + hard × 4) × 22 + 700))
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-3 mb-3">
              <div className="text-white font-semibold">Why This Formula?</div>
              <div className="text-gray-300 text-sm">
                <ul className="list-disc list-inside space-y-1">
                  <li>Codeforces rating is used directly (no scaling needed)</li>
                  <li>LeetCode uses square root to reward consistent problem solving</li>
                  <li>Base score of 700 ensures even new users have a starting point</li>
                  <li>Maximum function ensures your best platform determines your rank</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              This formula creates a fair comparison between competitive programming (Codeforces)
              and interview preparation (LeetCode) performance.
            </p>
          </div>

          {/* Examples Table */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
            <h3 className="text-white font-bold mb-3">Score Examples</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="py-2">LeetCode Problems</th>
                    <th className="py-2">Calculated Score</th>
                    <th className="py-2">Codeforces Rating</th>
                    <th className="py-2">Final Score</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-2">100</td>
                    <td className="py-2">950</td>
                    <td className="py-2">1200</td>
                    <td className="py-2 font-bold text-[#FFC22D]">1200</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">400</td>
                    <td className="py-2">1200</td>
                    <td className="py-2">1100</td>
                    <td className="py-2 font-bold text-[#FFC22D]">1200</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2">900</td>
                    <td className="py-2">1450</td>
                    <td className="py-2">1800</td>
                    <td className="py-2 font-bold text-[#FFC22D]">1800</td>
                  </tr>
                  <tr>
                    <td className="py-2">1600</td>
                    <td className="py-2">1700</td>
                    <td className="py-2">1500</td>
                    <td className="py-2 font-bold text-[#FFC22D]">1700</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Note */}
          <div className="text-gray-500 text-xs italic">
            Note: This scoring system is designed to be simple, fair, and transparent.
            The square root function ensures that solving more problems has diminishing returns,
            while the base score of 700 provides a reasonable starting point for new users.
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCalculationDropdown;