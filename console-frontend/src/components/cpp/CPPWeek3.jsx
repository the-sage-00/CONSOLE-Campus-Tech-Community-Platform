import React from 'react';

const CPPWeek3 = () => (
  <div>
    <h2 id="week-3">🎯 Week 3: Pointers, Arrays & User Defined Data Types</h2>
    
    <p>This week covers advanced data handling concepts including pointers, arrays, and user-defined data types. These are fundamental concepts for memory management and data organization.</p>

    <h3 id="pointers">👉 Pointer Basics & Pointer Arithmetic</h3>
    <p>Pointers are variables that store memory addresses of other variables. They provide powerful ways to manipulate memory directly.</p>
    
    <div className="code-example">
      <h4>Basic Pointer Example:</h4>
      <pre><code>{`int x = 42;
int* ptr = &x;  // ptr stores address of x
cout << "Value of x: " << x << endl;
cout << "Address of x: " << &x << endl;
cout << "Value in ptr: " << ptr << endl;
cout << "Value pointed by ptr: " << *ptr << endl;`}</code></pre>
    </div>

    <p><strong>Pointer Arithmetic:</strong></p>
    <ul>
      <li><code>ptr++</code> - Move to next memory location</li>
      <li><code>ptr--</code> - Move to previous memory location</li>
      <li><code>ptr + n</code> - Move n positions forward</li>
      <li><code>ptr - n</code> - Move n positions backward</li>
    </ul>

    <h3 id="arrays">📊 Arrays</h3>
    <p>Arrays are collections of elements of the same data type stored in contiguous memory locations.</p>
    
    <div className="code-example">
      <h4>Array Declaration and Usage:</h4>
      <pre><code>{`// Declaration
int numbers[5] = {10, 20, 30, 40, 50};

// Accessing elements
cout << "First element: " << numbers[0] << endl;
cout << "Third element: " << numbers[2] << endl;

// Looping through array
for(int i = 0; i < 5; i++) {
    cout << "Element " << i << ": " << numbers[i] << endl;
}`}</code></pre>
    </div>

    <h3 id="strings">📝 Char Arrays & Strings</h3>
    <p>Character arrays and strings are used to handle text data in C++.</p>
    
    <div className="code-example">
      <h4>Character Arrays vs Strings:</h4>
      <pre><code>{`// Character array
char name[20] = "John";
cout << "Name: " << name << endl;

// C++ string (recommended)
#include <string>
string fullName = "John Doe";
cout << "Full Name: " << fullName << endl;
cout << "Length: " << fullName.length() << endl;`}</code></pre>
    </div>

    <h3 id="user-defined">🏗️ Structure, Union & Enums</h3>
    
    <h4>📋 Structures</h4>
    <p>Structures allow you to group different data types together.</p>
    
    <div className="code-example">
      <pre><code>{`struct Student {
    string name;
    int roll_no;
    float marks;
};

// Usage
Student s1;
s1.name = "Alice";
s1.roll_no = 101;
s1.marks = 95.5;

cout << "Name: " << s1.name << endl;
cout << "Roll No: " << s1.roll_no << endl;
cout << "Marks: " << s1.marks << endl;`}</code></pre>
    </div>

    <h4>🔗 Unions</h4>
    <p>Unions allow different data types to share the same memory location.</p>
    
    <div className="code-example">
      <pre><code>{`union Data {
    int integer;
    float decimal;
    char character;
};

Data data;
data.integer = 42;
cout << "Integer: " << data.integer << endl;`}</code></pre>
    </div>

    <h4>📝 Enums</h4>
    <p>Enumerations define a set of named constants.</p>
    
    <div className="code-example">
      <pre><code>{`enum Color {
    RED,
    GREEN,
    BLUE
};

Color favoriteColor = BLUE;
cout << "Favorite color code: " << favoriteColor << endl;`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry:</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=W0aE-w61Cb8" target="_blank" rel="noopener noreferrer">Pointers In C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=DhTbMjGNfJQ" target="_blank" rel="noopener noreferrer">Arrays & Pointer Arithmetic</a></li>
        <li><a href="https://www.youtube.com/watch?v=3lY65NcK-QQ" target="_blank" rel="noopener noreferrer">Struct, Union & Enum</a></li>
      </ul>
      
      <h4>🎥 Code Help:</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=h2LGTzQXzJU" target="_blank" rel="noopener noreferrer">Strings In C++ (Watch up to 30:04 Only)</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Create a program demonstrating pointer basics and pointer arithmetic</li>
        <li>Write a program to find the largest element in an array</li>
        <li>Implement string operations like length, concatenation, and comparison</li>
        <li>Create a Student structure and perform operations on student data</li>
        <li>Demonstrate the difference between structure and union with examples</li>
        <li>Use enums to create a simple menu system</li>
        <li>Practice array operations like sorting and searching</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek3;
