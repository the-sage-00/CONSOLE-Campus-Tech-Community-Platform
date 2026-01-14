import React from 'react';
import { Rocket, Lightbulb, Target, Wrench, Clock, BookOpen, Zap } from 'lucide-react';

const CPSection0 = () => (
  <div>
    <h2 id="section-0" className="flex items-center">
      <Rocket className="w-6 h-6 mr-2" />
      Section 0: Introduction to Competitive Programming
    </h2>
    
    <h3 id="what-is-cp" className="flex items-center">
      <Lightbulb className="w-5 h-5 mr-2" />
      What is CP and Why do it?
    </h3>
    <ul>
      <li>It's a mind-sport where you are given a problem and have to come up with optimized solutions for the given constraints with your problem-solving skills and implement with your coding skills.</li>
      <li>We do it because it helps us in building our logical and analytical thinking skills and also in enhancing our knowledge. But most importantly, because it's a lot of fun! (and it helps get a job 👀)</li>
      <li>Some Popular CP Platforms are:
        <table>
          <thead>
            <tr>
              <th><a href="https://codeforces.com/" target="_blank" rel="noopener">Codeforces</a><br />
                <a href="https://www.codechef.com/" target="_blank" rel="noopener">Codechef</a><br />
                <a href="https://www.topcoder.com/" target="_blank" rel="noopener">Topcoder</a></th>
              <th><a href="https://atcoder.jp/" target="_blank" rel="noopener">Atcoder</a><br />
                <a href="https://leetcode.com/" target="_blank" rel="noopener">Leetcode</a><br />
                <a href="https://www.hackerrank.com/" target="_blank" rel="noopener">Hackerrank</a></th>
            </tr>
          </thead>
        </table>
      </li>
    </ul>

    <h3 id="getting-started" className="flex items-center">
      <Target className="w-5 h-5 mr-2" />
      Getting Started
    </h3>
    <h4>Learn C++</h4>
    <ul>
      <li>If you have already gone through ESC112 (any Coding Course in C) then you may follow this article for a smooth transition: <a href="https://saiankit.medium.com/moving-from-c-to-c-b38b13d04682" target="_blank" rel="noopener">Moving from C to C++</a></li>
      <li>If you have no prior coding experience, you can follow:
        <ul>
          <li>For youtube fans: <a href="https://youtu.be/-TkoO8Z07hI?si=dg18FC3M85T2-Owu" target="_blank" rel="noopener">Bro Code</a> : [first 5 hours] OR <a href="https://www.youtube.com/watch?v=vLnPwxZdW4Y" target="_blank" rel="noopener">Free Code Camp</a> : [first 3 hours]</li>
          <li>If you prefer to read: <a href="https://usaco.guide/PAPS.pdf#page=29" target="_blank" rel="noopener">USACO : PAPS</a> (book Chapter 2) OR <a href="https://www.w3schools.com/cpp/default.asp" target="_blank" rel="noopener">Learn C++</a> (Just the intro and functions parts)</li>
        </ul>
      </li>
      <li>Register on <a href="https://www.codechef.com/dashboard" target="_blank" rel="noopener">CodeChef</a> and solve:
        <ul>
          <li><a href="https://www.codechef.com/problems/GDTURN" target="_blank" rel="noopener">Codechef - GDTURN</a></li>
          <li><a href="https://www.codechef.com/problems/TAXES" target="_blank" rel="noopener">Codechef - TAXES</a></li>
        </ul>
      </li>
    </ul>

    <h4>Setting Up Environment</h4>
    <ul>
      <li><strong>Windows:</strong> Watch the <a href="https://youtu.be/-TkoO8Z07hI?si=MBam0S02pNlGpdVu&t=87" target="_blank" rel="noopener">same video from above</a> from [0:1:27] to [0:8:40]</li>
      <li><strong>Mac:</strong> Download VS Code from <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">https://code.visualstudio.com/</a> and then <a href="https://www.youtube.com/watch?v=Qw5qjRNlC-Y" target="_blank" rel="noopener">Set it up for C++</a></li>
    </ul>

    <h3 id="basic-problem-solving" className="flex items-center">
      <Wrench className="w-5 h-5 mr-2" />
      Basic Problem Solving
    </h3>
    <ul>
      <li><strong>Your first problem on Codeforces:</strong> <a href="https://codeforces.com/problemset/problem/4/A" target="_blank" rel="noopener">Everyone's First Problem</a></li>
      <li><strong>More problems from CodeForces:</strong>
        <ul>
          <li><a href="https://codeforces.com/problemset/problem/1772/A" target="_blank" rel="noopener">CF - A+B?</a></li>
          <li><a href="https://codeforces.com/problemset/problem/47/A" target="_blank" rel="noopener">CF - Triangular Numbers</a></li>
          <li><a href="https://codeforces.com/problemset/problem/1883/A" target="_blank" rel="noopener">CF - Morning</a></li>
        </ul>
      </li>
      <li><strong>Your first problem on CSES:</strong> <a href="https://cses.fi/problemset/task/1068/" target="_blank" rel="noopener">Problem 1</a></li>
      <li><strong>Your first problem on SPOJ:</strong> <a href="https://www.spoj.com/problems/TEST/" target="_blank" rel="noopener">Problem TEST</a></li>
    </ul>

    <h3 id="time-complexity" className="flex items-center">
      <Clock className="w-5 h-5 mr-2" />
      Time Complexity
    </h3>
    <p><strong>Expected time:</strong> 40 - 50 minutes</p>
    <ul>
      <li><a href="https://codeaccepted.wordpress.com/category/theory/" target="_blank" rel="noopener">Why you need to know about it</a></li>
      <li><a href="https://cses.fi/book/book.pdf#page=27" target="_blank" rel="noopener">CPH Ch 2</a></li>
      <li><a href="https://www.youtube.com/watch?v=zUUkiEllHG0" target="_blank" rel="noopener">Watch this for more examples</a></li>
    </ul>
    <p><strong>Solve these in O(n):</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1083" target="_blank" rel="noopener">CSES : Missing Number</a></li>
      <li><a href="https://www.codechef.com/problems/MAGICHF" target="_blank" rel="noopener">CodeChef - Magician versus Chef</a></li>
      <li><a href="https://cses.fi/problemset/task/1094" target="_blank" rel="noopener">CSES : Increasing Array</a></li>
      <li><a href="https://cses.fi/problemset/task/1070" target="_blank" rel="noopener">CSES : Permutations</a></li>
    </ul>

    <h3 id="intro-to-stl" className="flex items-center">
      <BookOpen className="w-5 h-5 mr-2" />
      Intro to STL
    </h3>
    <p><strong>Expected time:</strong> 40 - 60 minutes</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=RRVYpIET_RU" target="_blank" rel="noopener">Complete C++ STL in 1 Video | Time Complexity and Notes</a> Watch till 35:57.</li>
      <li><a href="https://abhiarrathore.medium.com/the-magic-of-c-stl-standard-template-library-e910f43379ea" target="_blank" rel="noopener">The Complete Practical Guide to C++ STL</a></li>
    </ul>

    <h4>Basic Array / Vectors Problems</h4>
    <ul>
      <li><a href="https://codeforces.com/problemset/problem/231/A" target="_blank" rel="noopener">CF - Team</a></li>
      <li><a href="https://codeforces.com/problemset/problem/181/A" target="_blank" rel="noopener">CF - Series of Crimes</a></li>
      <li><a href="https://codeforces.com/problemset/problem/263/A" target="_blank" rel="noopener">CF - Beautiful Matrix</a></li>
      <li><a href="https://codeforces.com/problemset/problem/469/A" target="_blank" rel="noopener">CF - I Wanna Be the Guy</a></li>
      <li><a href="https://codeforces.com/problemset/problem/157/A" target="_blank" rel="noopener">CF - Game Outcome</a></li>
    </ul>

    <h4>Basic String Problems</h4>
    <ul>
      <li>Your intro to strings: <a href="https://www.programiz.com/cpp-programming/strings" target="_blank" rel="noopener">C++ Strings (With Examples)</a></li>
      <li><a href="https://codeforces.com/problemset/problem/236/A" target="_blank" rel="noopener">CF - Boy or Girl</a></li>
      <li><a href="https://codeforces.com/problemset/problem/202/A" target="_blank" rel="noopener">CF - LLPS</a></li>
      <li><a href="https://www.spoj.com/problems/ONP/" target="_blank" rel="noopener">SPOJ.com - Transform the Expression</a></li>
      <li><a href="https://codeforces.com/problemset/problem/172/A" target="_blank" rel="noopener">CF - Phone Code</a></li>
    </ul>

    <h3 id="sorting">🔄 Sorting</h3>
    <p><strong>Expected time:</strong> 2 - 2.5 hours</p>
    <ul>
      <li><a href="https://cses.fi/book/book.pdf#page=35" target="_blank" rel="noopener">CPH page 25</a> Read Chapter 3 from 'Competitive Programmer's Handout'</li>
      <li><a href="https://leetcodethehardway.com/tutorials/category/sorting" target="_blank" rel="noopener">Sorting Algorithms | LeetCode The Hard Way</a> (optional)</li>
      <li><a href="https://csacademy.com/lesson/sorting" target="_blank" rel="noopener">Tutorial with Visualisation</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1084" target="_blank" rel="noopener">CSES : Apartments</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1857/C" target="_blank" rel="noopener">CF - Assembly via Minimums</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1955/B" target="_blank" rel="noopener">CF - Progressive Square</a></li>
      <li><a href="https://codeforces.com/contest/1971/problem/G" target="_blank" rel="noopener">CF - XOUR</a></li>
      <li><a href="https://cses.fi/problemset/task/2216" target="_blank" rel="noopener">CSES : Collecting Numbers</a></li>
      <li><a href="https://cses.fi/problemset/task/1630" target="_blank" rel="noopener">CSES : Tasks and Deadlines</a></li>
    </ul>

    <h3 id="binary-search">🔍 Binary Search</h3>
    <p><strong>Expected time:</strong> 40 - 60 minutes</p>
    <ul>
      <li><a href="https://csacademy.com/lesson/binary_search" target="_blank" rel="noopener">Tutorial with Visualisation</a></li>
      <li><a href="https://codeaccepted.wordpress.com/2014/01/18/binary-search-and-its-relatives/" target="_blank" rel="noopener">Binary Search | Code Accepted</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://codeforces.com/edu/course/2/lesson/6/1/practice/contest/283911/problem/A" target="_blank" rel="noopener">ITMO - First Implementation</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1973/B" target="_blank" rel="noopener">CF - Cat, Fox and the Lonely Array</a></li>
      <li><a href="https://codeforces.com/edu/course/2/lesson/6/2/practice/contest/283932/problem/E" target="_blank" rel="noopener">ITMO : Application on real numbers</a></li>
      <li><a href="https://cses.fi/problemset/task/1085" target="_blank" rel="noopener">CSES - Array Division</a> (Minmax concept)</li>
      <li><a href="https://codeforces.com/contest/1201/problem/C" target="_blank" rel="noopener">CF - Maximum Median</a></li>
    </ul>

    <h3 id="bit-operations">⚡ Bit Operations</h3>
    <p><strong>Expected time:</strong> 1 - 1.5 hours</p>
    <ul>
      <li><a href="https://leetcodethehardway.com/tutorials/math/bit-manipulation" target="_blank" rel="noopener">Bit Manipulation | LeetCode The Hard Way</a></li>
      <li><a href="https://usaco.guide/CPH.pdf#page=105" target="_blank" rel="noopener">CPH Bit Manipulation</a> (extra)</li>
      <li><a href="https://cp-algorithms.com/algebra/bit-manipulation.html" target="_blank" rel="noopener">Bit manipulation - CP Algorithms</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://codeforces.com/problemset/problem/579/A" target="_blank" rel="noopener">CF - Raising Bacteria</a></li>
      <li><a href="https://vjudge.net/problem/CodeForces-258A" target="_blank" rel="noopener">Virtual Judge - Little Elephant and Bits</a></li>
      <li><a href="https://vjudge.net/problem/HackerRank-maximizing-xor" target="_blank" rel="noopener">Virtual Judge - Maximizing Xor</a></li>
      <li><a href="https://codeforces.com/problemset/problem/550/B" target="_blank" rel="noopener">CF - Preparing Olympiad</a></li>
      <li><a href="https://vjudge.net/problem/AtCoder-abc171_e" target="_blank" rel="noopener">Virtual Judge - Red Scarf</a></li>
    </ul>

    <h3 id="number-theory">🔢 Primary Number Theory</h3>
    <p><strong>Expected time:</strong> 1 - 1.5 hours</p>
    <ul>
      <li><a href="https://darrenyao.com/usacobook/cpp.pdf#page=68" target="_blank" rel="noopener">Elementary Number Theory</a></li>
      <li><a href="https://codeaccepted.wordpress.com/2014/02/15/output-the-answer-modulo-109-7/" target="_blank" rel="noopener">"Output the answer modulo 10^9 + 7" | Code Accepted</a></li>
      <li><a href="https://codeforces.com/blog/entry/72527" target="_blank" rel="noopener">[Blog] Modular Arithmetic for Beginners - Codeforces</a></li>
    </ul>

    <h4>Binary Exponentiation</h4>
    <p><strong>Expected time:</strong> 20 - 30 minutes</p>
    <ul>
      <li><a href="https://codeaccepted.wordpress.com/2014/06/01/algorithm-11-binary-exponentiation/" target="_blank" rel="noopener">Binary Exponentiation | Code Accepted</a></li>
      <li><a href="https://algorithmclear.blog/blog/binary-exponentiation" target="_blank" rel="noopener">Binary exponentiation | AlgorithmClear Blog</a></li>
      <li><a href="https://medium.com/geekculture/binary-exponentiation-faster-way-to-calculate-pow-x-n-python-52bf4fcf42d1" target="_blank" rel="noopener">Binary Exponentiation - Faster way to calculate Pow(x,n)</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1617/" target="_blank" rel="noopener">CSES : Bit Strings</a></li>
      <li><a href="https://cses.fi/problemset/task/1095" target="_blank" rel="noopener">CSES : Exponentiation</a></li>
      <li><a href="https://www.spoj.com/problems/LOCKER/" target="_blank" rel="noopener">SPOJ.com - Magic of the locker</a></li>
    </ul>

    <h3 id="recursion">🔄 Recursion</h3>
    <p><strong>Expected time:</strong> 1.5 - 2 hours</p>
    <ul>
      <li><a href="https://www.programiz.com/cpp-programming/recursion" target="_blank" rel="noopener">C++ Recursion (With Example)</a></li>
      <li>The classic recursion problem: <a href="https://www.tutorialspoint.com/data_structures_algorithms/tower_of_hanoi.htm" target="_blank" rel="noopener">Tower of hanoi</a> or <a href="https://youtu.be/rf6uf3jNjbo?si=miZPq2VZdqe2jgvh" target="_blank" rel="noopener">Video</a></li>
      <li><a href="https://www.hackerearth.com/practice/basic-programming/recursion/recursion-and-backtracking/tutorial/" target="_blank" rel="noopener">Recursion and Backtracking Tutorial</a></li>
    </ul>
    <p><strong>Basic Recursion problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1068" target="_blank" rel="noopener">CSES : Weird Algorithm</a></li>
      <li><a href="https://leetcode.com/problems/elimination-game/description/" target="_blank" rel="noopener">CSES : Elimination Game</a></li>
      <li><a href="https://cses.fi/problemset/task/1623" target="_blank" rel="noopener">CSES : Apple Division</a></li>
      <li><a href="https://cses.fi/problemset/task/1622" target="_blank" rel="noopener">CSES : Creating Strings</a> - Try generating all possible permutations using recursion</li>
    </ul>

    <h3 id="complete-search">🔍 Complete Search</h3>
    <p><strong>Expected time:</strong> 1.5 - 2 hours</p>
    <ul>
      <li><a href="https://usaco.guide/CPH.pdf#page=57" target="_blank" rel="noopener">CPH ch 5</a></li>
      <li><a href="https://codeaccepted.wordpress.com/2014/01/14/algorithm-4-bit-masking/" target="_blank" rel="noopener">Bit Masking | Code Accepted</a></li>
      <li><a href="https://codeaccepted.wordpress.com/2014/02/04/algorithm-6-backtracking/" target="_blank" rel="noopener">Backtracking | Code Accepted</a></li>
    </ul>
    <p><strong>Problems:</strong></p>
    <ul>
      <li><a href="https://cses.fi/problemset/task/1622" target="_blank" rel="noopener">Creating Strings</a> - try without using next_permutation() ;)</li>
      <li><a href="https://vjudge.net/problem/UVA-12455" target="_blank" rel="noopener">Virtual Judge - Bars</a></li>
      <li><a href="https://codeforces.com/group/gA8A93jony/contest/270592/problem/E" target="_blank" rel="noopener">CF - Creating Expression1</a></li>
      <li><a href="https://codeforces.com/problemset/problem/1869/B" target="_blank" rel="noopener">CF - 2D Traveling</a></li>
      <li><a href="https://usaco.org/index.php?page=viewproblem2&cpid=1276" target="_blank" rel="noopener">USACO - Air Cownditioning II</a></li>
      <li><a href="https://codeforces.com/contest/1553/problem/B" target="_blank" rel="noopener">CF - Reverse String</a></li>
    </ul>

    <div style={{ backgroundColor: '#1a1a2e', padding: '2rem', margin: '2rem 0', borderRadius: '12px', border: '1px solid #6366f1' }}>
      <h3 style={{ color: '#6366f1', marginBottom: '1rem' }} className="flex items-center">
        <Target className="w-5 h-5 mr-2" />
        Section 0 Complete!
      </h3>
      <p style={{ color: '#d1d5db', fontSize: '1.1rem' }}>
        You've now covered the fundamentals of Competitive Programming! You understand basic problem-solving, 
        time complexity, STL, sorting, binary search, bit operations, number theory, recursion, and complete search.
        Ready to move on to more advanced topics in Section 1!
      </p>
    </div>
  </div>
);

export default CPSection0; 