import React from 'react';

const PythonWeek1 = () => (
  <div>
    <h2 id="week-1">🎯 Week 1: Python Foundations</h2>
    
    <p>Welcome to Python programming! This week, we'll cover the fundamental concepts that form the foundation of Python programming. You'll learn about environment setup, basic syntax, variables, data types, and type conversion.</p>

    <h3 id="environment-setup">Environment Setup & Getting Started</h3>
    
    <ul>
      <li><strong>Python Installation:</strong> Install Python 3.x from <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python.org Downloads</a></li>
      <li><strong>IDE Setup:</strong> Choose VS Code with Python extension OR PyCharm Community Edition</li>
      <li><strong>Python Shell:</strong> Learn to use REPL (Read-Eval-Print Loop) for testing</li>
      <li><strong>First Program:</strong> Write and run "Hello, World!" program</li>
    </ul>
    <div className="resources-section">
      <h4>📚 Useful Resources:</h4>
      <ul>
        <li><a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer">Official Python Tutorial</a></li>
        <li><a href="https://realpython.com/python-variables/" target="_blank" rel="noopener noreferrer">Python Variables - Real Python</a></li>
        <li><a href="https://www.w3schools.com/python/" target="_blank" rel="noopener noreferrer">W3Schools Python Tutorial</a></li>
        <li><a href="https://python.org" target="_blank" rel="noopener noreferrer">Interactive Python Roadmap</a></li>
      </ul>
    </div>

    <h3 id="basic-syntax">Basic Syntax Fundamentals</h3>
    
    <p><strong>Key Components:</strong></p>
    <ul>
      <li><strong>Comments:</strong> Single-line (#) and multi-line (''' or """) comments</li>
      <li><strong>Indentation:</strong> Python's unique whitespace-based syntax</li>
      <li><strong>Keywords:</strong> Reserved words (def, class, if, while, for, etc.)</li>
      <li><strong>Identifiers:</strong> Rules for naming variables, functions, and classes</li>
      <li><strong>Code Structure:</strong> Understanding Python program organization</li>
    </ul>

    <div className="code-example">
      <h4>Basic Python Program Structure:</h4>
      <pre><code>{`# This is a single-line comment
"""
This is a multi-line comment
Used for documentation
"""

# Basic Hello World Program
print("Hello, World!")

# Variables and basic operations
name = "Python"
version = 3.9
print(f"Welcome to {name} {version}!")`}</code></pre>
    </div>

    <h3 id="variables-data-types">Variables and Data Types</h3>
    
    <p><strong>Basic Data Types:</strong></p>
    <ul>
      <li><strong>Numbers:</strong> int, float, complex types</li>
      <li><strong>Strings:</strong> Text handling with quotes and string methods</li>
      <li><strong>Booleans:</strong> True/False values and boolean operations</li>
    </ul>

    <p><strong>Variable Management:</strong></p>
    <ul>
      <li><strong>Variable Assignment:</strong> Dynamic typing, multiple assignment, unpacking</li>
      <li><strong>Naming Conventions:</strong> snake_case for variables, PascalCase for classes</li>
      <li><strong>Memory Management:</strong> Basic understanding of object references</li>
    </ul>

    <div className="code-example">
      <h4>Variable and Data Type Examples:</h4>
      <pre><code>{`# Different data types
age = 25                    # Integer
height = 5.9               # Float
name = "Alice"             # String
is_student = True          # Boolean
complex_num = 3 + 4j       # Complex number

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# Variable naming conventions
user_name = "john_doe"     # snake_case for variables
MAX_SIZE = 100            # UPPER_CASE for constants

# Checking variable types
print(type(age))          # <class 'int'>
print(type(height))       # <class 'float'>
print(type(name))         # <class 'str'>`}</code></pre>
    </div>

    <h3 id="type-casting">Type Casting and Conversion</h3>
    
    <ul>
      <li><strong>Implicit Conversion:</strong> Automatic type conversion by Python</li>
      <li><strong>Explicit Conversion:</strong> Using int(), float(), str(), bool() functions</li>
      <li><strong>Type Checking:</strong> Using type() and isinstance() functions</li>
      <li><strong>Common Scenarios:</strong> String to number, number to string conversions</li>
    </ul>

    <div className="code-example">
      <h4>Type Conversion Examples:</h4>
      <pre><code>{`# Implicit conversion
x = 10        # int
y = 3.14      # float
result = x + y    # Automatically converts to float: 13.14

# Explicit conversion
age_str = "25"
age_int = int(age_str)        # String to integer
price = 19.99
price_str = str(price)        # Float to string

# Type checking
print(isinstance(age_int, int))    # True
print(type(price_str))            # <class 'str'>

# Safe conversion with error handling
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("Invalid input! Please enter a valid number.")`}</code></pre>
    </div>

    <h3 id="week1-goals">Week 1 Goals</h3>
    <p>Complete basic programs involving user input, calculations, and formatted output.</p>

    <div className="alert alert-info">
      <h4>🎯 PRACTICE TASKS:</h4>
      <ol>
        <li>Set up Python development environment (Python + VS Code/PyCharm)</li>
        <li>Write a program that declares variables of different data types and prints their values</li>
        <li>Create a simple calculator that takes two numbers and performs basic operations</li>
        <li>Write a program that takes user input and displays formatted output</li>
        <li>Practice type conversion between strings, integers, and floats</li>
        <li>Create a program that demonstrates variable naming conventions</li>
      </ol>
    </div>

  </div>
);

export default PythonWeek1;
