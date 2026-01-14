import React from 'react';

const CPPWeek1 = () => (
  <div>
    <h2 id="week-1">💻 Week 1: Introduction & Basics</h2>
    
    <p>Welcome to C++ programming! This week, we'll cover the fundamental concepts that form the foundation of C++ programming. You'll learn about the language structure, set up your development environment, and understand basic programming concepts.</p>

    <h3 id="day-1">🚀 Day 1: Introduction To C++</h3>
    <p>C++ is a powerful, general-purpose programming language that supports both procedural and object-oriented programming paradigms. It's widely used in system software, game development, embedded systems, and high-performance applications.</p>
    
    <p><strong>Key Points:</strong></p>
    <ul>
      <li>History and evolution of C++</li>
      <li>Applications of C++</li>
      <li>Advantages and features of C++</li>
      <li>Comparison with other languages</li>
    </ul>

    <h3 id="day-2">⚙️ Day 2: Setup IDE (Integrated Development Environment)</h3>
    <p>Setting up your development environment is crucial for a smooth programming experience. We recommend using <strong>Visual Studio Code</strong> with C++ extensions.</p>
    
    <p><strong>Installation Steps:</strong></p>
    <ol>
      <li>Download and install Visual Studio Code from <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">official website</a></li>
      <li>Install C/C++ Extension Pack</li>
      <li>Install a C++ compiler (MinGW for Windows, GCC for Linux/Mac)</li>
      <li>Configure your first C++ project</li>
    </ol>

    <h3 id="day-3">📝 Day 3: Learn Basic Structure Of C++</h3>
    <p>Understanding the basic structure of a C++ program is essential. Every C++ program follows a specific structure with headers, main function, and statements.</p>
    
    <div className="code-example">
      <h4>Basic C++ Program Structure:</h4>
      <pre><code>{`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`}</code></pre>
    </div>

    <h3 id="day-4">🔢 Day 4: Variables, Data Types</h3>
    <p>Variables are used to store data in memory. C++ supports various data types to handle different kinds of information.</p>
    
    <p><strong>Primary Data Types:</strong></p>
    <ul>
      <li><code>int</code> - Integer numbers</li>
      <li><code>float</code> - Single precision floating point</li>
      <li><code>double</code> - Double precision floating point</li>
      <li><code>char</code> - Single character</li>
      <li><code>bool</code> - Boolean (true/false)</li>
    </ul>

    <h3 id="day-5">📥📤 Day 5: Input & Output</h3>
    <p>Learn how to interact with users by taking input and displaying output using <code>cin</code> and <code>cout</code>.</p>
    
    <div className="code-example">
      <h4>Input/Output Example:</h4>
      <pre><code>{`#include <iostream>
using namespace std;

int main() {
    string name;
    int age;
    
    cout << "Enter your name: ";
    cin >> name;
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Hello " << name << ", you are " << age << " years old!" << endl;
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry (Watch at 1.25x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=yGB9jhsEsr8" target="_blank" rel="noopener noreferrer">Introduction To C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=H09qb5a_5ks" target="_blank" rel="noopener noreferrer">Basic Structure</a></li>
        <li><a href="https://www.youtube.com/watch?v=VGpcpsJ3_4w" target="_blank" rel="noopener noreferrer">Variables & Comments</a></li>
        <li><a href="https://www.youtube.com/watch?v=QY2bLJhKqjU" target="_blank" rel="noopener noreferrer">Data Types & Scope Of A Variable</a></li>
        <li><a href="https://www.youtube.com/watch?v=Y3a2vd4QYPw" target="_blank" rel="noopener noreferrer">Input & Output</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Set up VS Code with C++ extension and write your first "Hello World" program</li>
        <li>Create a program that declares variables of different data types and prints their values</li>
        <li>Write a program that takes user input for name and age, then displays a personalized message</li>
        <li>Experiment with different data types and observe their memory size using <code>sizeof()</code> operator</li>
        <li>Practice writing comments in your code (both single-line and multi-line)</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek1;
