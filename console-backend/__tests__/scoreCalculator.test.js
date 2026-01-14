// console-backend/__tests__/scoreCalculator.test.js

import { calculateLeetcodeScore, calculateUnifiedScore } from '../utils/scoreCalculator.js';

describe('calculateLeetcodeScore', () => {
  test('should correctly calculate LeetCode score for various inputs', () => {
    // Test case 1: All zero
    expect(calculateLeetcodeScore(0, 0, 0)).toBe(700);

    // Test case 2: Only easy problems
    expect(calculateLeetcodeScore(100, 0, 0)).toBeCloseTo(920);

    // Test case 3: Only medium problems
    expect(calculateLeetcodeScore(0, 100, 0)).toBeCloseTo(1047.85, 2);

    // Test case 4: Only hard problems
    expect(calculateLeetcodeScore(0, 0, 100)).toBeCloseTo(1140);

    // Test case 5: Mixed problems should be between pure easy(100) and hard(100)
    const mixed = calculateLeetcodeScore(50, 30, 10);
    expect(mixed).toBeGreaterThan(920);
    expect(mixed).toBeLessThan(1140);
  });
});

describe('calculateUnifiedScore', () => {
  test('should return the maximum of Codeforces and LeetCode scores', () => {
    // Test case 1: Codeforces higher
    expect(calculateUnifiedScore(1500, 1200)).toBe(1500);

    // Test case 2: LeetCode higher
    expect(calculateUnifiedScore(1000, 1300)).toBe(1300);

    // Test case 3: Equal scores
    expect(calculateUnifiedScore(1400, 1400)).toBe(1400);

    // Test case 4: One score is zero
    expect(calculateUnifiedScore(0, 1100)).toBe(1100);
    expect(calculateUnifiedScore(1600, 0)).toBe(1600);

    // Test case 5: Both scores are zero
    expect(calculateUnifiedScore(0, 0)).toBe(0);
  });
});
