import React from 'react';

const PythonWeek2 = () => (
  <div>
    <h2 id="week-2">🔄 Week 2: Control Flow & Functions</h2>
    
    <p>This week focuses on building program logic through conditional statements, loops, and functions. You'll learn to create programs with complex decision-making capabilities and reusable code structures.</p>

    <h3 id="conditional-statements">Conditional Statements</h3>
    
    <p><strong>Core Concepts:</strong></p>
    <ul>
      <li><strong>if Statements:</strong> Basic conditional execution</li>
      <li><strong>elif Chains:</strong> Multiple condition checking</li>
      <li><strong>else Clause:</strong> Default condition handling</li>
      <li><strong>Logical Operators:</strong> and, or, not for complex conditions</li>
      <li><strong>Comparison Operators:</strong> ==, !=, &lt;, &gt;, &lt;=, &gt;=, in, is</li>
      <li><strong>Nested Conditionals:</strong> Conditional statements within others</li>
      <li><strong>Ternary Operator:</strong> Compact if-else expressions</li>
    </ul>
        <div className="resources-section">
      <h4>📚 Useful Resources:</h4>
      <ul>
        <li><a href="https://docs.python.org/3/tutorial/controlflow.html" target="_blank" rel="noopener noreferrer">Python Control Flow</a></li>
        <li><a href="https://realpython.com/python-functions/" target="_blank" rel="noopener noreferrer">Python Functions - Real Python</a></li>
        <li><a href="https://docs.python.org/3/library/functions.html" target="_blank" rel="noopener noreferrer">Built-in Functions Documentation</a></li>
      </ul>
    </div>


    <div className="code-example">
      <h4>Conditional Statements Examples:</h4>
      <pre><code>{`# Basic if-elif-else structure
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Logical operators
username = "admin"
password = "secret123"

if username == "admin" and password == "secret123":
    print("Access granted")
else:
    print("Access denied")

# Ternary operator (compact if-else)
status = "adult" if age >= 18 else "minor"

# Nested conditions
weather = "sunny"
temperature = 75

if weather == "sunny":
    if temperature > 70:
        print("Perfect day for outdoor activities!")
    else:
        print("Sunny but a bit cool")
else:
    print("Maybe stay indoors")`}</code></pre>
    </div>

    <h3 id="loop-structures">Loop Structures</h3>
    
    <p><strong>Loop Types:</strong></p>
    <ul>
      <li><strong>for Loops:</strong> Iterating over sequences (lists, strings, ranges)</li>
      <li><strong>while Loops:</strong> Condition-based repetition</li>
      <li><strong>range() Function:</strong> Generating number sequences</li>
      <li><strong>Loop Control Statements:</strong>
        <ul>
          <li><strong>break:</strong> Exit loop early</li>
          <li><strong>continue:</strong> Skip current iteration</li>
          <li><strong>pass:</strong> Placeholder statement</li>
        </ul>
      </li>
      <li><strong>Nested Loops:</strong> Loops within loops</li>
      <li><strong>Loop with else:</strong> else clause execution conditions</li>
    </ul>

    <div className="code-example">
      <h4>Loop Examples:</h4>
      <pre><code>{`# For loop with range
for i in range(5):
    print(f"Iteration {i}")

# For loop with string
name = "Python"
for char in name:
    print(char)

# For loop with list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# While loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Loop control statements
for i in range(10):
    if i == 3:
        continue    # Skip iteration when i is 3
    if i == 7:
        break      # Exit loop when i is 7
    print(i)

# Nested loops - multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i*j}")

# Loop with else (executes if loop completes normally)
for i in range(5):
    print(i)
else:
    print("Loop completed successfully")`}</code></pre>
    </div>

    <h3 id="functions-fundamentals">Functions Fundamentals</h3>
    
    <p><strong>Function Concepts:</strong></p>
    <ul>
      <li><strong>Function Definition:</strong> Using def keyword and proper structure</li>
      <li><strong>Parameters and Arguments:</strong> Positional, keyword, and default parameters</li>
      <li><strong>Return Statement:</strong> Returning values and multiple returns</li>
      <li><strong>Variable Arguments:</strong> *args and **kwargs usage</li>
      <li><strong>Scope:</strong> Local vs global variables, global and nonlocal keywords</li>
      <li><strong>Docstrings:</strong> Function documentation best practices</li>
    </ul>

    <div className="code-example">
      <h4>Function Examples:</h4>
      <pre><code>{`# Basic function definition
def greet(name):
    """Function to greet a person"""
    return f"Hello, {name}!"

# Function with default parameters
def introduce(name, age=25, city="Unknown"):
    return f"My name is {name}, I'm {age} years old from {city}"

# Function with multiple return values
def get_name_age():
    return "Alice", 30

# Function with variable arguments
def sum_numbers(*args):
    """Sum any number of arguments"""
    total = 0
    for num in args:
        total += num
    return total

# Function with keyword arguments
def create_profile(**kwargs):
    """Create user profile from keyword arguments"""
    profile = {}
    for key, value in kwargs.items():
        profile[key] = value
    return profile

# Usage examples
print(greet("Python"))
print(introduce("Bob", city="New York"))

name, age = get_name_age()
print(f"Name: {name}, Age: {age}")

print(sum_numbers(1, 2, 3, 4, 5))
profile = create_profile(name="Charlie", age=28, occupation="Developer")
print(profile)

# Local vs Global scope
global_var = "I'm global"

def scope_example():
    local_var = "I'm local"
    global global_var
    global_var = "Modified global"
    print(local_var)

scope_example()
print(global_var)`}</code></pre>
    </div>

    <h3 id="built-in-functions">Built-in Functions</h3>
    
    <p><strong>Essential Functions:</strong></p>
    <ul>
      <li><strong>Essential Functions:</strong> len(), type(), str(), int(), float()</li>
      <li><strong>Mathematical Functions:</strong> abs(), round(), min(), max(), sum()</li>
      <li><strong>Iteration Functions:</strong> range(), enumerate(), zip()</li>
      <li><strong>Utility Functions:</strong> help(), dir(), vars()</li>
      <li><strong>Lambda Functions:</strong> Basic anonymous function syntax</li>
    </ul>

    <div className="code-example">
      <h4>Built-in Functions Examples:</h4>
      <pre><code>{`# Mathematical functions
numbers = [1, 5, 3, 9, 2]
print(f"Length: {len(numbers)}")
print(f"Sum: {sum(numbers)}")
print(f"Min: {min(numbers)}")
print(f"Max: {max(numbers)}")

# Round and absolute values
print(f"Round 3.7: {round(3.7)}")
print(f"Absolute -5: {abs(-5)}")

# Enumerate and zip
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

for index, name in enumerate(names):
    print(f"{index}: {name}")

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")

# Lambda functions
square = lambda x: x ** 2
add = lambda x, y: x + y

print(square(5))
print(add(3, 7))

# Using lambda with map and filter
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))

print(f"Squared: {squared}")
print(f"Even numbers: {evens}")`}</code></pre>
    </div>

    <h3 id="week2-goals">Week 2 Goals</h3>
    <p>Build programs with complex logic, user interaction, and function-based organization.</p>

    <div className="alert alert-info">
      <h4>🎯 PRACTICE TASKS:</h4>
      <ol>
        <li>Create a number guessing game using loops and conditionals</li>
        <li>Build a simple calculator using functions for each operation</li>
        <li>Write a program that finds prime numbers using nested loops</li>
        <li>Create a grade calculator that uses multiple functions</li>
        <li>Build a menu-driven program with while loops and user input</li>
        <li>Practice using lambda functions with map(), filter(), and sort()</li>
      </ol>
    </div>

  </div>
);

export default PythonWeek2;
