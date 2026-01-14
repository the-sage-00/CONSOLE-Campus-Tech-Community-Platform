// console-backend/utils/scoreCalculator.js

/**
 * Calculates the LeetCode score based on solved problems.
 * Formula: sqrt(easy*1 + medium*2.5 + hard*4) * 22 + 700
 * @param {number} easySolved
 * @param {number} mediumSolved
 * @param {number} hardSolved
 * @returns {number} LeetCode score
 */
export const calculateLeetcodeScore = (easySolved, mediumSolved, hardSolved) => {
  const lcEasy = easySolved || 0;
  const lcMedium = mediumSolved || 0;
  const lcHard = hardSolved || 0;

  const leetcodePoints = lcEasy * 1 + lcMedium * 2.5 + lcHard * 4;
  return Math.sqrt(leetcodePoints) * 22 + 700;
};

/**
 * Calculates the final unified score for a user.
 * Final score = max(Codeforces score, LeetCode score)
 * @param {number} cfRating
 * @param {number} leetcodeScore
 * @returns {number} Unified total score
 */
export const calculateUnifiedScore = (cfRating, leetcodeScore) => {
  return Math.max(cfRating, leetcodeScore);
};
