import React from 'react';

const CPPWeek5 = () => (
  <div>
    <h2 id="week-5">🔄 Week 5: Revise & Recapitulate</h2>
    
    <p>This week is dedicated to reviewing and practicing everything you've learned so far. Consolidate your knowledge through hands-on coding and problem-solving.</p>

    <h3 id="revision-topics">📋 Revision Topics</h3>
    
    <div className="revision-checklist">
      <h4>✅ Week 1 Review: Introduction & Basics</h4>
      <ul>
        <li>Basic C++ program structure</li>
        <li>Variables and data types</li>
        <li>Input/output operations</li>
        <li>Comments and documentation</li>
      </ul>

      <h4>✅ Week 2 Review: Operators & Flow Control</h4>
      <ul>
        <li>All types of operators (arithmetic, relational, logical, bitwise)</li>
        <li>If-else statements and nested conditions</li>
        <li>Switch-case statements</li>
        <li>For, while, and do-while loops</li>
        <li>Break and continue statements</li>
      </ul>

      <h4>✅ Week 3 Review: Pointers, Arrays & Data Types</h4>
      <ul>
        <li>Pointer basics and arithmetic</li>
        <li>Array operations and manipulation</li>
        <li>String handling</li>
        <li>Structures, unions, and enums</li>
      </ul>

      <h4>✅ Week 4 Review: Functions & Recursion</h4>
      <ul>
        <li>Function declaration and definition</li>
        <li>Call by value vs call by reference</li>
        <li>Inline functions and default parameters</li>
        <li>Recursion and recursive algorithms</li>
        <li>Function overloading</li>
      </ul>
    </div>

    <h3 id="important-note">⚠️ Important Note</h3>
    <div className="alert alert-warning">
      <h4>🚨 Just Watching Tutorials Won't Help - Real Coding is Must!</h4>
      <p>Programming is a practical skill. You must write code, make mistakes, debug, and solve problems to truly learn. Theory alone won't make you a programmer!</p>
    </div>

    <h3 id="practice-problems">🧩 Practice Problems</h3>
    
    <div className="problems-section">
      <h4>🎯 Essential Programming Problems:</h4>
      
      <ol>
        <li>
          <strong>Check If Number Even Or Odd</strong>
          <p><em>Follow Up:</em> Could you solve this question without using the arithmetic operator?</p>
        </li>
        
        <li>
          <strong>Sum Of Digits</strong>
          <p>Calculate the sum of all digits in a given number</p>
        </li>
        
        <li>
          <strong>Reverse Digits</strong>
          <p>Reverse the digits of a given number</p>
        </li>
        
        <li>
          <strong>Check If an Year is Leap Year or Not</strong>
          <p>Implement the logic for leap year calculation</p>
        </li>
        
        <li>
          <strong>Check if a Number is Prime or Not</strong>
          <p>Implement efficient prime number checking</p>
        </li>
        
        <li>
          <strong>Factorial of a Number</strong>
          <p>Implement both iterative and recursive solutions</p>
        </li>
        
        <li>
          <strong>Check If Number is a Palindrome or Not</strong>
          <p>Verify if a number reads the same forwards and backwards</p>
        </li>
        
        <li>
          <strong>Largest Element In An Array</strong>
          <p>Find the maximum element in an array</p>
        </li>
        
        <li>
          <strong>Check If String is Palindrome or Not</strong>
          <p>Verify if a string reads the same forwards and backwards</p>
        </li>
      </ol>
    </div>

    <h3 id="practice-approach">🎓 How to Practice</h3>
    
    <div className="practice-guidelines">
      <h4>📝 Step-by-Step Approach:</h4>
      <ol>
        <li><strong>Understand the Problem:</strong> Read the problem statement carefully</li>
        <li><strong>Plan Your Solution:</strong> Think about the algorithm before coding</li>
        <li><strong>Write the Code:</strong> Implement your solution step by step</li>
        <li><strong>Test Your Code:</strong> Run it with different test cases</li>
        <li><strong>Debug if Needed:</strong> Fix any errors or logical issues</li>
        <li><strong>Optimize:</strong> Think about better approaches</li>
      </ol>
    </div>

    <h3 id="additional-challenges">🏆 Additional Challenges</h3>
    
    <div className="challenges-section">
      <h4>🔥 Bonus Problems (Try if you finish the essentials):</h4>
      <ul>
        <li>Implement a simple calculator with menu</li>
        <li>Create a student grade management system using structures</li>
        <li>Write a program to sort an array using different algorithms</li>
        <li>Implement basic string functions (length, copy, concatenate)</li>
        <li>Create a number guessing game</li>
        <li>Find GCD and LCM of two numbers</li>
        <li>Check if a string contains only digits</li>
        <li>Count vowels and consonants in a string</li>
      </ul>
    </div>

    <div className="alert alert-success">
      <h4>💡 Tips for Success:</h4>
      <ul>
        <li>Don't rush through problems - understand each solution thoroughly</li>
        <li>Try to solve problems without looking at solutions first</li>
        <li>Practice writing code on paper to improve thinking skills</li>
        <li>Revisit any topics you find difficult</li>
        <li>Join coding communities and discuss problems with peers</li>
        <li>Keep a coding journal to track your progress</li>
      </ul>
    </div>
  </div>
);

export default CPPWeek5;
