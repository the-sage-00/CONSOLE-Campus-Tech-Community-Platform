import React from 'react';

const CPPWeek2 = () => (
  <div>
    <h2 id="week-2">⚡ Week 2: Operators & Flow Control</h2>
    
    <p>This week focuses on operators and control flow statements that form the logic of your programs. You'll learn how to make decisions and repeat actions in your code.</p>

    <h3 id="operators">🔧 Operators in C++</h3>
    
    <h4>📊 Arithmetic Operators</h4>
    <p>Used for mathematical calculations:</p>
    <ul>
      <li><code>+</code> Addition</li>
      <li><code>-</code> Subtraction</li>
      <li><code>*</code> Multiplication</li>
      <li><code>/</code> Division</li>
      <li><code>%</code> Modulo (remainder)</li>
    </ul>

    <h4>🔍 Relational Operators</h4>
    <p>Used for comparisons:</p>
    <ul>
      <li><code>==</code> Equal to</li>
      <li><code>!=</code> Not equal to</li>
      <li><code>&gt;</code> Greater than</li>
      <li><code>&lt;</code> Less than</li>
      <li><code>&gt;=</code> Greater than or equal</li>
      <li><code>&lt;=</code> Less than or equal</li>
    </ul>

    <h4>🧮 Logical Operators</h4>
    <p>Used for logical operations:</p>
    <ul>
      <li><code>&&</code> Logical AND</li>
      <li><code>||</code> Logical OR</li>
      <li><code>!</code> Logical NOT</li>
    </ul>

    <h4>📝 Assignment Operators</h4>
    <p>Used to assign values:</p>
    <ul>
      <li><code>=</code> Simple assignment</li>
      <li><code>+=</code> Add and assign</li>
      <li><code>-=</code> Subtract and assign</li>
      <li><code>*=</code> Multiply and assign</li>
      <li><code>/=</code> Divide and assign</li>
    </ul>

    <h4>🔢 Bitwise Operators</h4>
    <p>Used for bit-level operations:</p>
    <ul>
      <li><code>&</code> Bitwise AND</li>
      <li><code>|</code> Bitwise OR</li>
      <li><code>^</code> Bitwise XOR</li>
      <li><code>~</code> Bitwise NOT</li>
      <li><code>&lt;&lt;</code> Left shift</li>
      <li><code>&gt;&gt;</code> Right shift</li>
    </ul>

    <h3 id="flow-control">🔄 Flow Control Statements</h3>

    <h4>❓ If-else Statements</h4>
    <div className="code-example">
      <pre><code>{`if (condition) {
    // code to execute if condition is true
} else if (another_condition) {
    // code for another condition
} else {
    // code if all conditions are false
}`}</code></pre>
    </div>

    <h4>🎛️ Switch-Case</h4>
    <div className="code-example">
      <pre><code>{`switch (variable) {
    case value1:
        // code for value1
        break;
    case value2:
        // code for value2
        break;
    default:
        // default code
        break;
}`}</code></pre>
    </div>

    <h4>🔁 Loops</h4>
    
    <p><strong>For Loop:</strong></p>
    <div className="code-example">
      <pre><code>{`for (int i = 0; i < 10; i++) {
    cout << i << " ";
}`}</code></pre>
    </div>

    <p><strong>While Loop:</strong></p>
    <div className="code-example">
      <pre><code>{`int i = 0;
while (i < 10) {
    cout << i << " ";
    i++;
}`}</code></pre>
    </div>

    <p><strong>Do-While Loop:</strong></p>
    <div className="code-example">
      <pre><code>{`int i = 0;
do {
    cout << i << " ";
    i++;
} while (i < 10);`}</code></pre>
    </div>

    <h4>⏹️ Break and Continue</h4>
    <ul>
      <li><code>break</code> - Exits the loop immediately</li>
      <li><code>continue</code> - Skips the current iteration and continues with the next</li>
    </ul>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry (Watch at 1.25x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=1w-HitNfFy8" target="_blank" rel="noopener noreferrer">Header Files & Operators</a></li>
        <li><a href="https://www.youtube.com/watch?v=t-G_6n6PZnA" target="_blank" rel="noopener noreferrer">Reference Variables & Type casting</a></li>
        <li><a href="https://www.youtube.com/watch?v=IgKOm6uR5Gw" target="_blank" rel="noopener noreferrer">Constants & Operator Precedence</a></li>
        <li><a href="https://www.youtube.com/watch?v=Zt8EfsOlF9U" target="_blank" rel="noopener noreferrer">If-else & Switch Case</a></li>
        <li><a href="https://www.youtube.com/watch?v=1t6P1_fYpUI" target="_blank" rel="noopener noreferrer">Loops</a></li>
        <li><a href="https://www.youtube.com/watch?v=KsYh5dLp4D4" target="_blank" rel="noopener noreferrer">Break & Continue</a></li>
      </ul>
      
      <h4>🎥 Apna College (Watch at 1.5x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=WR31ByTzAVQ" target="_blank" rel="noopener noreferrer">Bitwise Operator & Data Type Modifiers</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Create a calculator program using arithmetic operators</li>
        <li>Write a program to check if a number is even or odd using modulo operator</li>
        <li>Implement a grading system using if-else statements</li>
        <li>Create a menu-driven program using switch-case</li>
        <li>Use loops to print multiplication tables</li>
        <li>Practice using break and continue with examples</li>
        <li>Experiment with bitwise operators on different numbers</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek2;
