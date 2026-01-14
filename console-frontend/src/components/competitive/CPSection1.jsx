import React from 'react';

const CPSection1 = () => (
  <div>
    <h2 id="section-1">🧠 Section 1: Basic Theory</h2>
    
    <h3 id="number-theory">🔢 Number Theory</h3>
    
    <h4>Number Sieve</h4>
    <p><strong>Expected time:</strong> 1 - 1.5 hours</p>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes" target="_blank" rel="noopener">Sieve of Eratosthenes - Wikipedia</a></li>
      <li><a href="https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html" target="_blank" rel="noopener">Sieve of Eratosthenes - CpAlgorithms</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://leetcode.com/problems/count-primes/description/" target="_blank" rel="noopener">Count Primes - LeetCode</a></li>
      <li><a href="https://www.spoj.com/problems/NFACTOR/" target="_blank" rel="noopener">SPOJ.com - Problem NFACTOR</a></li>
    </ul>

    <h4>Modular Multiplicative Inverse</h4>
    <p><strong>Expected time:</strong> 20 - 30 minutes</p>
    <ul>
      <li><a href="https://forthright48.com/modular-multiplicative-inverse/" target="_blank" rel="noopener">Modular Multiplicative Inverse | forthright48</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://vjudge.net/problem/EOlymp-9606" target="_blank" rel="noopener">Virtual Judge - Modular division</a></li>
      <li><a href="https://cses.fi/problemset/task/1712" target="_blank" rel="noopener">CSES : Exponentiation II</a></li>
    </ul>

    <h3 id="two-pointers">👆 Two Pointers / Sliding Windows</h3>
    <p><strong>Expected time:</strong> 30 - 40 minutes</p>
    <ul>
      <li><a href="https://usaco.guide/CPH.pdf#page=87" target="_blank" rel="noopener">CPH</a></li>
      <li><a href="https://www.youtube.com/watch?v=On03HWe2tZM" target="_blank" rel="noopener">video</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1660" target="_blank" rel="noopener">CSES : Subarray Sum</a></li>
      <li><a href="https://codeforces.com/edu/course/2/lesson/9/2/practice/contest/307093/problem/B" target="_blank" rel="noopener">ITMO - Big Sum</a></li>
      <li><a href="https://codeforces.com/edu/course/2/lesson/9/2/practice/contest/307093/problem/C" target="_blank" rel="noopener">ITMO - Number of small sum segments</a></li>
      <li><a href="https://codeforces.com/edu/course/2/lesson/9/3/practice/contest/307094/problem/E" target="_blank" rel="noopener">ITMO - Knapsack on a segment</a></li>
      <li><a href="https://codeforces.com/contest/702/problem/C" target="_blank" rel="noopener">CF - Cellular network</a></li>
    </ul>

    <h3 id="range-queries">📊 Range Queries</h3>
    <p><strong>Expected time:</strong> 40 - 50 minutes</p>
    <p><code>Prefix Sums are Intensively Used in other problems to reduce Time Complexity of Solution.</code></p>
    <ul>
      <li><a href="https://cses.fi/book/book.pdf#page=93" target="_blank" rel="noopener">CPH Range Queries</a> (before Binary Indexed Tree)</li>
      <li><a href="https://darrenyao.com/usacobook/cpp.pdf#page=60" target="_blank" rel="noopener">USACOBOOK ch11 Prefix Sums</a></li>
      <li><a href="https://leetcodethehardway.com/tutorials/basic-topics/prefix-sum" target="_blank" rel="noopener">Solved Examples Leetcode</a></li>
      <li><a href="https://www.iarcs.org.in/inoi/online-study-material/topics/prefix-sums-maximum-sum-subsection.php" target="_blank" rel="noopener">Maximum Sum Subsection</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1646" target="_blank" rel="noopener">CSES : Sum Queries</a>, <a href="https://cses.fi/problemset/task/1650" target="_blank" rel="noopener">Xor Queries</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1808/B" target="_blank" rel="noopener">CF - Playing in a Casino</a></li>
      <li><a href="https://cses.fi/problemset/task/1661/" target="_blank" rel="noopener">CSES : Subarray Sums II</a></li>
      <li><a href="https://www.codechef.com/problems/GCDISCOUNT" target="_blank" rel="noopener">Codechef : GCD Discount</a></li>
      <li><a href="https://cses.fi/problemset/task/1643" target="_blank" rel="noopener">CSES : Maximum Subarray Sum</a> (search for <strong>Kadane's Algorithm</strong>)</li>
    </ul>

    <h4>2D Prefix Sum</h4>
    <ul>
      <li><a href="https://www.iarcs.org.in/inoi/online-study-material/topics/prefix-sums-ramus-mango-trees.php" target="_blank" rel="noopener">Ramu's Mango Trees</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1652" target="_blank" rel="noopener">CSES : Forest Queries</a></li>
      <li><a href="https://onlinejudge.u-aizu.ac.jp/courses/library/3/DSL/5/DSL_5_B" target="_blank" rel="noopener">Aizu Online Judge - Maximum Number of Overlaps</a></li>
    </ul>

    <h3 id="divide-conquer">✂️ Divide and Conquer</h3>
    <p><strong>Expected time:</strong> 20 - 30 minutes</p>
    <p>Read <a href="https://www.programiz.com/dsa/divide-and-conquer" target="_blank" rel="noopener">this</a> to know what divide and conquer is. Watch this <a href="https://www.youtube.com/watch?v=ib4BHvr5-Ao" target="_blank" rel="noopener">video</a> to get more insight into this topic</p>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://codeforces.com/problemset/problem/1167/B" target="_blank" rel="noopener">CF - Lost numbers</a></li>
      <li><a href="https://vjudge.net/problem/SPOJ-ABACABA" target="_blank" rel="noopener">CF - Print the pattern</a></li>
      <li><a href="https://codeforces.com/contest/1490/problem/D" target="_blank" rel="noopener">CF - Permutation Transformation</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1676/H2" target="_blank" rel="noopener">CF - Maximum Crossings</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1915/F" target="_blank" rel="noopener">CF - Greetings</a></li>
    </ul>

    <h3 id="greedy">🎯 Intro to Greedy Algorithms</h3>
    <p><strong>Expected time:</strong> 1.5 - 2 hours</p>
    <p><code>Moving in the direction which gives the most optimal solution at every step is a major characteristic of these algorithms.</code></p>
    <ul>
      <li>Read <a href="https://cses.fi/book/book.pdf#page=67" target="_blank" rel="noopener">Greedy Algorithms - CPH</a> and <a href="https://cp-algorithms.com/schedules/schedule-with-completion-duration.html" target="_blank" rel="noopener">Job Scheduling</a> to get a better idea of these algorithms.</li>
      <li><a href="https://leetcodethehardway.com/tutorials/basic-topics/greedy" target="_blank" rel="noopener">Greedy | LeetCode The Hard Way</a></li>
      <li>Alternatively, you may go through <a href="https://www.youtube.com/watch?v=bC7o8P_Ste4" target="_blank" rel="noopener">this</a> video.</li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://codeforces.com/gym/102951/problem/B" target="_blank" rel="noopener">CF - Studying algorithms</a> - An easy problem to start with</li>
      <li><a href="https://www.geeksforgeeks.org/optimal-file-merge-patterns/" target="_blank" rel="noopener">Optimal Merge Pattern</a> - Involves the use of multiset/priority queue</li>
    </ul>

    <h4>SELF ASSESSMENT:</h4>
    <ul>
      <li><a href="https://codeforces.com/problemset/problem/1909/C" target="_blank" rel="noopener">CF - Heavy Intervals</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1832/C" target="_blank" rel="noopener">CF - Contrast Values</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1816/B" target="_blank" rel="noopener">CF - Grid Reconstruction</a></li>
      <li><a href="https://cses.fi/problemset/task/1090" target="_blank" rel="noopener">CSES - Ferris Wheel</a></li>
      <li><a href="https://cses.fi/problemset/task/1629" target="_blank" rel="noopener">CSES - Movie festival</a></li>
      <li><a href="https://cses.fi/problemset/task/1073" target="_blank" rel="noopener">CSES - Towers</a></li>
      <li><a href="https://cses.fi/problemset/task/1632" target="_blank" rel="noopener">CSES - Movie festival 2</a></li>
    </ul>

    <h3 id="dynamic-programming">💡 Dynamic Programming</h3>
    <h4>Basic Concepts:</h4>
    <p><code>Dynamic Programming, more famously known as DP is a technique in which we calculate and store subproblems in a particular problem.</code></p>
    <p>There are two methods to apply dp in your code: recursion and iteration.</p>
    <p><strong>Expected time:</strong> 1.5 - 2 hours</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=YBSt1jYwVfU&list=PLl0KD3g-oDOGJUdmhFk19LaPgrfmAGQfo&index=1" target="_blank" rel="noopener">This video</a> explains the difference between the two implementations for <em>fibonacci numbers</em>, then try this problem:</li>
      <li><a href="https://cses.fi/problemset/task/1633" target="_blank" rel="noopener">CSES : Dice Combinations</a></li>
      <li>Read <a href="https://cses.fi/book/book.pdf#page=75" target="_blank" rel="noopener">Chapter - 7 CPH</a></li>
      <li><a href="https://www.iarcs.org.in/inoi/online-study-material/topics/dp-classics.php" target="_blank" rel="noopener">Classic Solved Illustrations</a></li>
    </ul>

    <h4>Standard DP Problems:</h4>
    <ul>
      <li><a href="https://leetcode.com/problems/longest-increasing-subsequence/description/" target="_blank" rel="noopener">Longest Increasing Subsequence - LeetCode</a></li>
      <li><a href="https://leetcode.com/problems/longest-common-subsequence/description/" target="_blank" rel="noopener">Longest Common Subsequence - LeetCode</a></li>
      <li><a href="https://leetcode.com/problems/longest-palindromic-substring/description/" target="_blank" rel="noopener">Longest Palindromic substring - LeetCode</a></li>
      <li><a href="https://cses.fi/problemset/task/1639" target="_blank" rel="noopener">CSES : Edit Distance</a></li>
      <li><a href="https://atcoder.jp/contests/dp/tasks/dp_d" target="_blank" rel="noopener">Atcoder - Knapsack 1</a></li>
    </ul>

    <h4>DP on Grids:</h4>
    <p>Read <a href="https://usaco.guide/CPH.pdf#page=81" target="_blank" rel="noopener">CPH CH7-3</a> and <a href="https://usaco.guide/CPH.pdf#page=84" target="_blank" rel="noopener">CPH CH7-5</a>. It will develop your understanding about DP on Grids.</p>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1638" target="_blank" rel="noopener">CSES : Grid Paths</a> (A tougher version of counting number of paths from one corner to another)</li>
      <li><a href="https://www.hackerearth.com/practice/algorithms/dynamic-programming/2-dimensional/practice-problems/algorithm/superjump-in-a-grid-773f1e31/" target="_blank" rel="noopener">Superjump in a grid</a> - Another variant of path counting problem</li>
      <li><a href="https://leetcode.com/problems/cherry-pickup-ii/description/?envType=problem-list-v2&envId=50izszui" target="_blank" rel="noopener">LeetCode - Cherry Pickup-2</a> (Here we have 2 sources, different as compared to other questions, think about dp-states) [TOUGH QUESTION]</li>
    </ul>

    <h4>DP Bitmask:</h4>
    <p><strong>Expected time:</strong> 1.5 - 2 hours</p>
    <ul>
      <li>Read this <a href="https://codeforces.com/blog/entry/18169" target="_blank" rel="noopener">blog</a> (it is based on the CP book of Felix & Halim) to begin with bitmasking.</li>
      <li>Follow this <a href="https://www.hackerearth.com/practice/algorithms/dynamic-programming/bit-masking/tutorial/" target="_blank" rel="noopener">tutorial</a> for further understanding.</li>
      <li>More resources - <a href="https://www.youtube.com/watch?v=JvNHdmxTc74" target="_blank" rel="noopener">Advanced DP concepts</a> (you may follow up to 45:00)</li>
    </ul>
    <p><strong>Some Problems:</strong></p>
    <ul>
      <li><a href="https://codeforces.com/contest/1847/problem/C" target="_blank" rel="noopener">CF - Vampiric Powers, anyone?</a></li>
      <li><a href="https://cses.fi/problemset/task/2181" target="_blank" rel="noopener">CSES : Counting Tilings</a></li>
      <li><a href="https://cses.fi/problemset/task/1653" target="_blank" rel="noopener">CSES : Elevator Rides</a></li>
    </ul>

    <h4>SELF-ASSESSMENT (Topic: DP):</h4>
    <ul>
      <li><a href="https://codeforces.com/problemset/problem/877/B" target="_blank" rel="noopener">CF - Nikita and String</a></li>
      <li><a href="https://cses.fi/problemset/task/1635" target="_blank" rel="noopener">CSES : Coin Combinations - 1</a> (You can also try Coin combinations-2 on CSES)</li>
      <li><a href="https://codeforces.com/problemset/problem/1722/E" target="_blank" rel="noopener">CF - Counting Rectangles</a></li>
      <li><a href="https://codeforces.com/problemset/problem/855/B" target="_blank" rel="noopener">CF - Marvalo Gaunt's Ring</a></li>
      <li><a href="https://cses.fi/problemset/task/1744" target="_blank" rel="noopener">CSES : Rectangle Cutting</a></li>
      <li><a href="https://codeforces.com/problemset/problem/545/C" target="_blank" rel="noopener">CF - Woodcutters</a></li>
      <li><a href="https://codeforces.com/problemset/problem/166/E" target="_blank" rel="noopener">CF - Tetrahedron</a></li>
      <li><a href="https://codeforces.com/problemset/problem/407/B" target="_blank" rel="noopener">CF - Long Path</a></li>
    </ul>

    <h3 id="interactive-problems">💬 Interactive Problems</h3>
    <p><strong>Expected time:</strong> 15 - 20 minutes</p>
    <p><a href="https://codeforces.com/blog/entry/45307" target="_blank" rel="noopener">Here</a> is a tutorial on how to solve interactive problems.</p>
    <p><strong>Here are some questions:</strong></p>
    <ul>
      <li><a href="https://codeforces.com/problemset/problem/1807/E" target="_blank" rel="noopener">CF - Interview</a></li>
      <li><a href="https://codeforces.com/contest/727/problem/C" target="_blank" rel="noopener">CF - Guess The Array</a></li>
      <li><a href="https://codeforces.com/contest/1780/problem/D" target="_blank" rel="noopener">CF - Bit Guessing game</a> (Involves bit manipulations)</li>
    </ul>

    <div style={{ backgroundColor: '#1a1a2e', padding: '2rem', margin: '2rem 0', borderRadius: '12px', border: '1px solid #6366f1' }}>
      <h3 style={{ color: '#6366f1', marginBottom: '1rem' }}>🎯 Section 1 Complete!</h3>
      <p style={{ color: '#d1d5db', fontSize: '1.1rem' }}>
        Excellent! You've mastered the basic theory of Competitive Programming including number theory, 
        two pointers, range queries, divide and conquer, greedy algorithms, dynamic programming, and interactive problems.
        You're now ready for intermediate topics in Section 2!
      </p>
    </div>
  </div>
);

export default CPSection1; 