import React from 'react';

const CPPWeek4 = () => (
  <div>
    <h2 id="week-4">🔧 Week 4: Functions, Recursion & Function Overloading</h2>
    
    <p>Functions are the building blocks of modular programming. This week focuses on creating reusable code through functions, understanding recursion, and function overloading.</p>

    <h3 id="function-basics">📝 Function Prototype & Functions</h3>
    <p>Functions help organize code into reusable blocks. A function declaration tells the compiler about the function's name, return type, and parameters.</p>
    
    <div className="code-example">
      <h4>Function Declaration & Definition:</h4>
      <pre><code>{`// Function prototype
int add(int a, int b);

// Function definition
int add(int a, int b) {
    return a + b;
}

// Function call
int main() {
    int result = add(5, 3);
    cout << "Sum: " << result << endl;
    return 0;
}`}</code></pre>
    </div>

    <h3 id="call-methods">🔄 Call By Value & Call By Reference</h3>
    
    <h4>📥 Call By Value</h4>
    <p>A copy of the actual parameter is passed to the function. Changes made inside the function don't affect the original variable.</p>
    
    <div className="code-example">
      <pre><code>{`void callByValue(int x) {
    x = 100;  // Only changes local copy
    cout << "Inside function: " << x << endl;
}

int main() {
    int num = 50;
    callByValue(num);
    cout << "Original value: " << num << endl;  // Still 50
    return 0;
}`}</code></pre>
    </div>

    <h4>📤 Call By Reference</h4>
    <p>The actual address of the parameter is passed. Changes made inside the function affect the original variable.</p>
    
    <div className="code-example">
      <pre><code>{`void callByReference(int &x) {
    x = 100;  // Changes original variable
    cout << "Inside function: " << x << endl;
}

int main() {
    int num = 50;
    callByReference(num);
    cout << "Original value: " << num << endl;  // Now 100
    return 0;
}`}</code></pre>
    </div>

    <h3 id="special-functions">⚡ Inline Functions & Default Arguments</h3>
    
    <h4>🏃 Inline Functions</h4>
    <p>Inline functions are expanded at compile-time rather than being called, reducing function call overhead.</p>
    
    <div className="code-example">
      <pre><code>{`inline int square(int x) {
    return x * x;
}

int main() {
    cout << "Square of 5: " << square(5) << endl;
    return 0;
}`}</code></pre>
    </div>

    <h4>🎯 Default Arguments</h4>
    <p>You can specify default values for function parameters, making some arguments optional.</p>
    
    <div className="code-example">
      <pre><code>{`int multiply(int a, int b = 1, int c = 1) {
    return a * b * c;
}

int main() {
    cout << multiply(5) << endl;      // 5 * 1 * 1 = 5
    cout << multiply(5, 2) << endl;   // 5 * 2 * 1 = 10
    cout << multiply(5, 2, 3) << endl; // 5 * 2 * 3 = 30
    return 0;
}`}</code></pre>
    </div>

    <h3 id="recursion">🔁 Recursion & Recursive Functions</h3>
    <p>Recursion is when a function calls itself. It's useful for solving problems that can be broken down into similar subproblems.</p>
    
    <div className="code-example">
      <h4>Factorial Example:</h4>
      <pre><code>{`int factorial(int n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}

int main() {
    cout << "5! = " << factorial(5) << endl;  // Output: 120
    return 0;
}`}</code></pre>
    </div>

    <div className="code-example">
      <h4>Fibonacci Example:</h4>
      <pre><code>{`int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "10th Fibonacci number: " << fibonacci(10) << endl;
    return 0;
}`}</code></pre>
    </div>

    <h3 id="overloading">🎭 Function Overloading</h3>
    <p>Function overloading allows multiple functions with the same name but different parameters (number, type, or order).</p>
    
    <div className="code-example">
      <pre><code>{`// Different number of parameters
int add(int a, int b) {
    return a + b;
}

int add(int a, int b, int c) {
    return a + b + c;
}

// Different parameter types
double add(double a, double b) {
    return a + b;
}

int main() {
    cout << add(2, 3) << endl;        // Calls first function
    cout << add(1, 2, 3) << endl;     // Calls second function
    cout << add(2.5, 3.7) << endl;    // Calls third function
    return 0;
}`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry:</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=wnlHmGwvpgM" target="_blank" rel="noopener noreferrer">Function Prototype & Functions</a></li>
        <li><a href="https://www.youtube.com/watch?v=7vfU9hFMNJg" target="_blank" rel="noopener noreferrer">Function Call By Value & Call By Reference</a></li>
        <li><a href="https://www.youtube.com/watch?v=Vp8-eqpBddQ" target="_blank" rel="noopener noreferrer">Inline Functions & Default Parameters</a></li>
        <li><a href="https://www.youtube.com/watch?v=fkBgmtqOdJU" target="_blank" rel="noopener noreferrer">Recursion & Recursive Functions</a></li>
        <li><a href="https://www.youtube.com/watch?v=GJLxwkoQ4VE" target="_blank" rel="noopener noreferrer">Function Overloading</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Create a simple calculator using functions for each operation</li>
        <li>Demonstrate the difference between call by value and call by reference</li>
        <li>Write inline functions for common mathematical operations</li>
        <li>Create functions with default parameters for a greeting system</li>
        <li>Implement recursive solutions for factorial, Fibonacci, and power calculations</li>
        <li>Practice function overloading with different data types</li>
        <li>Create a menu-driven program using multiple overloaded functions</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek4;
