import React from 'react';

const PythonWeek3 = () => (
  <div>
    <h2 id="week-3">📊 Week 3: Data Structures</h2>
    
    <p>This week focuses on Python's built-in data structures: lists, tuples, sets, and dictionaries. You'll learn to effectively manage and manipulate different types of data collections.</p>

    <h3 id="lists">Lists - Dynamic Arrays</h3>
    
    <ul>
      <li><strong>Creation Methods:</strong> [], list(), basic list comprehensions</li>
      <li><strong>Indexing and Slicing:</strong> Positive/negative indices, [start:end:step]</li>
      <li><strong>Essential Methods:</strong> append(), extend(), insert(), remove(), pop()</li>
      <li><strong>List Operations:</strong> Concatenation, repetition, membership testing</li>
      <li><strong>Sorting and Ordering:</strong> sort(), reverse(), sorted() function</li>
      <li><strong>Nested Lists:</strong> Multi-dimensional data structures</li>
    </ul>
        <div className="resources-section">
      <h4>📚 Useful Resources:</h4>
      <ul>
        <li><a href="https://docs.python.org/3/tutorial/datastructures.html" target="_blank" rel="noopener noreferrer">Python Data Structures</a></li>
        <li><a href="https://realpython.com/python-lists-tuples/" target="_blank" rel="noopener noreferrer">Lists and Tuples - Real Python</a></li>
        <li><a href="https://realpython.com/python-sets/" target="_blank" rel="noopener noreferrer">Python Sets - Real Python</a></li>
        <li><a href="https://realpython.com/python-dicts/" target="_blank" rel="noopener noreferrer">Python Dictionaries - Real Python</a></li>
      </ul>
    </div>


    <div className="code-example">
      <h4>List Examples:</h4>
      <pre><code>{`# List creation and basic operations
fruits = ['apple', 'banana', 'orange']
numbers = list(range(1, 6))  # [1, 2, 3, 4, 5]

# List methods
fruits.append('grape')
fruits.insert(1, 'mango')
fruits.remove('banana')
last_fruit = fruits.pop()

# List slicing
print(fruits[0])      # First element
print(fruits[-1])     # Last element
print(fruits[1:3])    # Elements from index 1 to 2
print(fruits[::-1])   # Reverse the list

# List comprehensions
squares = [x**2 for x in range(1, 6)]
evens = [x for x in range(1, 11) if x % 2 == 0]

# Nested lists
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[1][2])   # Access element at row 1, column 2`}</code></pre>
    </div>

    <h3 id="tuples">Tuples - Immutable Sequences</h3>
    
    <ul>
      <li><strong>Immutable Nature:</strong> Cannot be modified after creation</li>
      <li><strong>Creation Syntax:</strong> (), tuple(), single element tuples</li>
      <li><strong>Use Cases:</strong> Coordinates, database records, function returns</li>
      <li><strong>Tuple Methods:</strong> count(), index() functions</li>
      <li><strong>Tuple Unpacking:</strong> Assigning elements to variables</li>
      <li><strong>Named Tuples:</strong> Introduction to collections.namedtuple</li>
    </ul>

    <div className="code-example">
      <h4>Tuple Examples:</h4>
      <pre><code>{`# Tuple creation
coordinates = (10, 20)
colors = ('red', 'green', 'blue')
single_item = (42,)  # Note the comma for single-item tuple

# Tuple unpacking
x, y = coordinates
r, g, b = colors

# Tuple methods
numbers = (1, 2, 3, 2, 4, 2)
print(numbers.count(2))  # Count occurrences of 2
print(numbers.index(3))  # Find index of first occurrence of 3

# Using tuples for multiple return values
def get_student_info():
    return "Alice", 20, "Computer Science"

name, age, major = get_student_info()

# Named tuples
from collections import namedtuple
Student = namedtuple('Student', ['name', 'age', 'major'])
student1 = Student('Bob', 22, 'Mathematics')
print(student1.name)  # Access by name instead of index`}</code></pre>
    </div>

    <h3 id="sets">Sets - Unique Collections</h3>
    
    <ul>
      <li><strong>Unique Elements:</strong> Automatic duplicate removal</li>
      <li><strong>Creation Methods:</strong> {}, set(), basic set comprehensions</li>
      <li><strong>Set Operations:</strong> Union (|), intersection (&), difference (-)</li>
      <li><strong>Set Methods:</strong> add(), remove(), discard(), update()</li>
      <li><strong>Mathematical Operations:</strong> Symmetric difference, subset testing</li>
      <li><strong>Use Cases:</strong> Membership testing, removing duplicates</li>
    </ul>

    <div className="code-example">
      <h4>Set Examples:</h4>
      <pre><code>{`# Set creation
fruits = {'apple', 'banana', 'orange'}
numbers = set([1, 2, 3, 4, 5])

# Adding and removing elements
fruits.add('grape')
fruits.remove('banana')  # Raises error if not found
fruits.discard('kiwi')   # No error if not found

# Set operations
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

union = set1 | set2           # {1, 2, 3, 4, 5, 6}
intersection = set1 & set2    # {3, 4}
difference = set1 - set2      # {1, 2}
symmetric_diff = set1 ^ set2  # {1, 2, 5, 6}

# Removing duplicates from list
numbers_with_dups = [1, 2, 2, 3, 3, 3, 4]
unique_numbers = list(set(numbers_with_dups))

# Set comprehensions
even_squares = {x**2 for x in range(10) if x % 2 == 0}`}</code></pre>
    </div>

    <h3 id="dictionaries">Dictionaries - Key-Value Mapping</h3>
    
    <ul>
      <li><strong>Key-Value Pairs:</strong> Efficient data mapping</li>
      <li><strong>Creation Methods:</strong> {}, dict(), basic dictionary comprehensions</li>
      <li><strong>Accessing Data:</strong> Using keys, get() method for safe access</li>
      <li><strong>Dictionary Methods:</strong> keys(), values(), items(), update(), pop()</li>
      <li><strong>Nested Dictionaries:</strong> Complex data structures</li>
      <li><strong>Dictionary Views:</strong> Understanding dynamic views</li>
    </ul>

    <div className="code-example">
      <h4>Dictionary Examples:</h4>
      <pre><code>{`# Dictionary creation
student = {'name': 'Alice', 'age': 20, 'major': 'CS'}
grades = dict(math=90, english=85, science=92)

# Accessing dictionary data
print(student['name'])           # Direct access
print(student.get('age', 0))     # Safe access with default
print(student.get('gpa', 0.0))   # Returns 0.0 if key not found

# Dictionary methods
print(student.keys())    # dict_keys(['name', 'age', 'major'])
print(student.values())  # dict_values(['Alice', 20, 'CS'])
print(student.items())   # dict_items([('name', 'Alice'), ...])

# Adding and updating
student['gpa'] = 3.8
student.update({'year': 2, 'credits': 45})

# Dictionary comprehensions
squares = {x: x**2 for x in range(1, 6)}
word_lengths = {word: len(word) for word in ['python', 'java', 'javascript']}

# Nested dictionaries
students = {
    'alice': {'age': 20, 'major': 'CS', 'gpa': 3.8},
    'bob': {'age': 22, 'major': 'Math', 'gpa': 3.6}
}

# Iterating through dictionaries
for name, info in students.items():
    print(f"{name}: {info['major']}, GPA: {info['gpa']}")`}</code></pre>
    </div>

    <h3 id="data-structure-selection">Data Structure Selection</h3>
    
    <ul>
      <li><strong>When to Use Each:</strong> Performance and use case considerations</li>
      <li><strong>Memory Efficiency:</strong> Understanding space complexity</li>
      <li><strong>Common Patterns:</strong> Choosing appropriate data structures for problems</li>
    </ul>

    <div className="code-example">
      <h4>Data Structure Comparison:</h4>
      <pre><code>{`# Performance comparison and use cases

# Use Lists when:
# - You need ordered, mutable sequences
# - You need to access elements by index
shopping_list = ['milk', 'eggs', 'bread']

# Use Tuples when:
# - You need immutable sequences
# - You're returning multiple values from functions
coordinates = (latitude, longitude)

# Use Sets when:
# - You need unique elements
# - You need fast membership testing
unique_visitors = {'user1', 'user2', 'user3'}

# Use Dictionaries when:
# - You need key-value mappings
# - You need fast lookups by key
user_profiles = {'user1': {'name': 'Alice', 'age': 25}}

# Common patterns
def analyze_text(text):
    # Count word frequencies using dictionary
    word_count = {}
    words = text.lower().split()
    
    for word in words:
        word_count[word] = word_count.get(word, 0) + 1
    
    # Get unique words using set
    unique_words = set(words)
    
    # Return results as tuple
    return len(words), len(unique_words), word_count`}</code></pre>
    </div>

    <h3 id="week3-goals">Week 3 Goals</h3>
    <p>Build programs that effectively manage and manipulate different types of data collections.</p>

    <div className="alert alert-info">
      <h4>🎯 PRACTICE TASKS:</h4>
      <ol>
        <li>Create a student grade management system using dictionaries</li>
        <li>Build a program that finds common elements between multiple lists using sets</li>
        <li>Write a text analyzer that counts word frequencies</li>
        <li>Create a shopping cart system with add, remove, and total calculation</li>
        <li>Build a simple contact book using nested dictionaries</li>
        <li>Practice list comprehensions and dictionary comprehensions</li>
      </ol>
    </div>

  </div>
);

export default PythonWeek3;
