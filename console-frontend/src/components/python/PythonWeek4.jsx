import React from 'react';

const PythonWeek4 = () => (
  <div>
    <h2 id="week-4">⚙️ Week 4: Advanced Functions & Modules</h2>
    
    <p>Learn advanced function concepts, modules, packages, and file I/O operations to organize and structure your code effectively.</p>

    <h3 id="advanced-functions">Advanced Function Concepts</h3>
    
    <ul>
      <li><strong>Scope and Namespaces:</strong> Local, enclosing, global, built-in scopes</li>
      <li><strong>Closures:</strong> Functions that remember enclosing scope</li>
      <li><strong>Higher-Order Functions:</strong> Functions that take/return other functions</li>
      <li><strong>Function Decorators:</strong> Basic decorator syntax and usage (@decorator)</li>
      <li><strong>Recursive Functions:</strong> Functions that call themselves</li>
      <li><strong>Lambda Functions:</strong> Anonymous functions for simple operations</li>
    </ul>

    <div className="code-example">
      <h4>Advanced Function Examples:</h4>
      <pre><code>{`# Decorators
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done!"

# Closures
def make_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

# Recursion
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`}</code></pre>
    </div>

    <h3 id="modules-packages">Modules and Packages</h3>
    
    <ul>
      <li><strong>Creating Modules:</strong> Writing reusable Python files</li>
      <li><strong>Import Statements:</strong> import, from...import, import...as</li>
      <li><strong>Module Search Path:</strong> How Python finds modules</li>
      <li><strong>__name__ Variable:</strong> Understanding if __name__ == "__main__"</li>
      <li><strong>Packages:</strong> Organizing modules in directories with __init__.py</li>
      <li><strong>Standard Library:</strong> math, random, datetime, os, sys, json, csv</li>
    </ul>

    <div className="code-example">
      <h4>Module and Package Examples:</h4>
      <pre><code>{`# math_utils.py - Custom module
def add(a, b):
    """Add two numbers"""
    return a + b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

PI = 3.14159

if __name__ == "__main__":
    print("Testing math_utils module")
    print(add(2, 3))

# Using the module
import math_utils
from math_utils import add, PI
import math_utils as mu

result = math_utils.add(5, 3)
pi_value = PI

# Standard library usage
import math
import random
import datetime

print(math.sqrt(16))
print(random.randint(1, 10))
print(datetime.datetime.now())`}</code></pre>
    </div>

    <h3 id="file-io">File Input/Output Operations</h3>
    
    <ul>
      <li><strong>File Opening:</strong> Different modes (r, w, a, r+)</li>
      <li><strong>Reading Files:</strong> read(), readline(), readlines() methods</li>
      <li><strong>Writing Files:</strong> write() and writelines() methods</li>
      <li><strong>Context Managers:</strong> Using with statement for safe file handling</li>
      <li><strong>File Paths:</strong> Working with pathlib for cross-platform paths</li>
      <li><strong>CSV Operations:</strong> Reading and writing structured data</li>
    </ul>

    <div className="code-example">
      <h4>File I/O Examples:</h4>
      <pre><code>{`# File operations with context manager
with open('data.txt', 'w') as file:
    file.write('Hello, World!\\n')
    file.write('Python is awesome!')

with open('data.txt', 'r') as file:
    content = file.read()
    print(content)

# CSV operations
import csv

# Writing CSV
data = [
    ['Name', 'Age', 'City'],
    ['Alice', 25, 'New York'],
    ['Bob', 30, 'San Francisco']
]

with open('people.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(data)

# Reading CSV
with open('people.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        print(row)

# JSON operations
import json

data = {'name': 'Alice', 'age': 25, 'city': 'New York'}

with open('data.json', 'w') as jsonfile:
    json.dump(data, jsonfile)`}</code></pre>
    </div>

    <h3 id="week4-goals">Week 4 Goals</h3>
    <p>Create modular programs with proper file organization and basic error handling.</p>

    <div className="alert alert-info">
      <h4>🎯 PRACTICE TASKS:</h4>
      <ol>
        <li>Create a utility module with common functions and import it</li>
        <li>Build a file-based data storage system for a simple application</li>
        <li>Write a CSV data processor that reads, modifies, and saves data</li>
        <li>Create a decorator that logs function calls and execution time</li>
        <li>Build a recursive function to traverse directory structures</li>
        <li>Practice using standard library modules for different tasks</li>
      </ol>
    </div>
  </div>
);

export default PythonWeek4;
