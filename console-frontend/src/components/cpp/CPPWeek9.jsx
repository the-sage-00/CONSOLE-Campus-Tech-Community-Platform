import React from 'react';

const CPPWeek9 = () => (
  <div>
    <h2 id="week-9">📚 Week 9: Standard Template Library (STL) In C++</h2>
    
    <p>The Standard Template Library (STL) is a powerful library of C++ template classes providing general-purpose data structures and algorithms. This week covers the essential STL components.</p>

    <h3 id="stl-basics">🎯 Basics of STL</h3>
    
    <p>STL consists of three main components:</p>
    <ul>
      <li><strong>Containers:</strong> Data structures like vector, list, map, set, etc.</li>
      <li><strong>Algorithms:</strong> Functions for searching, sorting, manipulating data</li>
      <li><strong>Iterators:</strong> Objects that point to elements in containers</li>
    </ul>

    <h4>💡 Why use STL?</h4>
    <ul>
      <li>Pre-tested and optimized implementations</li>
      <li>Consistent interface across different containers</li>
      <li>Generic programming with templates</li>
      <li>Improved code reusability and maintainability</li>
    </ul>

    <h3 id="containers">📦 Containers In C++ STL</h3>
    
    <p>STL provides various container types:</p>
    
    <h4>🔄 Sequence Containers:</h4>
    <ul>
      <li><code>vector</code> - Dynamic array</li>
      <li><code>list</code> - Doubly linked list</li>
      <li><code>deque</code> - Double-ended queue</li>
      <li><code>array</code> - Fixed-size array</li>
    </ul>

    <h4>🗂️ Associative Containers:</h4>
    <ul>
      <li><code>set</code> - Unique sorted elements</li>
      <li><code>map</code> - Key-value pairs (sorted by key)</li>
      <li><code>multiset</code> - Allows duplicate sorted elements</li>
      <li><code>multimap</code> - Allows duplicate keys</li>
    </ul>

    <h4>🔧 Container Adaptors:</h4>
    <ul>
      <li><code>stack</code> - LIFO (Last In, First Out)</li>
      <li><code>queue</code> - FIFO (First In, First Out)</li>
      <li><code>priority_queue</code> - Priority-based queue</li>
    </ul>

    <h3 id="vectors">🚀 Vectors</h3>
    
    <p>Vectors are dynamic arrays that can resize themselves automatically.</p>
    
    <div className="code-example">
      <pre><code>{`#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Declaration and initialization
    vector<int> numbers;
    vector<int> scores = {95, 87, 92, 78, 85};
    
    // Adding elements
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    
    // Accessing elements
    cout << "First element: " << numbers[0] << endl;
    cout << "Size: " << numbers.size() << endl;
    
    // Iterating through vector
    cout << "All elements: ";
    for(int i = 0; i < numbers.size(); i++) {
        cout << numbers[i] << " ";
    }
    cout << endl;
    
    // Using range-based for loop (C++11)
    cout << "Using range-based loop: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Using iterators
    cout << "Using iterators: ";
    for(auto it = numbers.begin(); it != numbers.end(); ++it) {
        cout << *it << " ";
    }
    cout << endl;
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="maps">🗺️ Maps</h3>
    
    <p>Maps store key-value pairs in sorted order (by key).</p>
    
    <div className="code-example">
      <pre><code>{`#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    // Declaration and initialization
    map<string, int> studentGrades;
    
    // Adding elements
    studentGrades["Alice"] = 95;
    studentGrades["Bob"] = 87;
    studentGrades["Charlie"] = 92;
    
    // Another way to insert
    studentGrades.insert({"David", 88});
    studentGrades.insert(make_pair("Eve", 94));
    
    // Accessing elements
    cout << "Alice's grade: " << studentGrades["Alice"] << endl;
    
    // Check if key exists
    if(studentGrades.find("Bob") != studentGrades.end()) {
        cout << "Bob found with grade: " << studentGrades["Bob"] << endl;
    }
    
    // Iterating through map
    cout << "All student grades:" << endl;
    for(auto& pair : studentGrades) {
        cout << pair.first << ": " << pair.second << endl;
    }
    
    // Size and operations
    cout << "Number of students: " << studentGrades.size() << endl;
    
    // Erase element
    studentGrades.erase("Charlie");
    cout << "After removing Charlie: " << studentGrades.size() << endl;
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="lists">📋 Lists</h3>
    
    <p>Lists are doubly-linked lists that allow efficient insertion and deletion anywhere.</p>
    
    <div className="code-example">
      <pre><code>{`#include <iostream>
#include <list>
using namespace std;

int main() {
    // Declaration and initialization
    list<int> numbers = {10, 20, 30};
    
    // Adding elements
    numbers.push_back(40);  // Add at end
    numbers.push_front(5);  // Add at beginning
    
    // Insert at specific position
    auto it = numbers.begin();
    advance(it, 2);  // Move iterator to 3rd position
    numbers.insert(it, 15);
    
    // Display list
    cout << "List elements: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Remove elements
    numbers.remove(20);  // Remove all occurrences of 20
    numbers.pop_front(); // Remove first element
    numbers.pop_back();  // Remove last element
    
    cout << "After removals: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // List operations
    list<int> otherList = {100, 200};
    numbers.splice(numbers.begin(), otherList);  // Move all elements from otherList
    
    cout << "After splice: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    // Sort the list
    numbers.sort();
    cout << "After sorting: ";
    for(int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="functors">🔧 Functors</h3>
    
    <p>Functors (function objects) are classes that overload the function call operator ().</p>
    
    <div className="code-example">
      <pre><code>{`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Simple functor
class Square {
public:
    int operator()(int x) {
        return x * x;
    }
};

// Predicate functor
class IsEven {
public:
    bool operator()(int x) {
        return x % 2 == 0;
    }
};

// Comparison functor
class DescendingOrder {
public:
    bool operator()(int a, int b) {
        return a > b;
    }
};

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    
    // Using Square functor
    Square square;
    cout << "Square of 5: " << square(5) << endl;
    
    // Transform using functor
    vector<int> squares(numbers.size());
    transform(numbers.begin(), numbers.end(), squares.begin(), Square());
    
    cout << "Original: ";
    for(int num : numbers) cout << num << " ";
    cout << endl;
    
    cout << "Squares: ";
    for(int num : squares) cout << num << " ";
    cout << endl;
    
    // Using predicate functor with find_if
    auto it = find_if(numbers.begin(), numbers.end(), IsEven());
    if(it != numbers.end()) {
        cout << "First even number: " << *it << endl;
    }
    
    // Using comparison functor for sorting
    sort(numbers.begin(), numbers.end(), DescendingOrder());
    cout << "Descending order: ";
    for(int num : numbers) cout << num << " ";
    cout << endl;
    
    // Using lambda expressions (C++11) - modern alternative to functors
    auto isOdd = [](int x) { return x % 2 != 0; };
    auto oddCount = count_if(numbers.begin(), numbers.end(), isOdd);
    cout << "Number of odd elements: " << oddCount << endl;
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="stl-algorithms">⚙️ Common STL Algorithms</h3>
    
    <div className="code-example">
      <h4>Useful STL Algorithm Examples:</h4>
      <pre><code>{`#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> data = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3};
    
    // Sort
    sort(data.begin(), data.end());
    cout << "Sorted: ";
    for(int x : data) cout << x << " ";
    cout << endl;
    
    // Binary search (works on sorted data)
    bool found = binary_search(data.begin(), data.end(), 5);
    cout << "Is 5 present? " << (found ? "Yes" : "No") << endl;
    
    // Find
    auto it = find(data.begin(), data.end(), 9);
    if(it != data.end()) {
        cout << "Found 9 at position: " << distance(data.begin(), it) << endl;
    }
    
    // Count
    int count = count(data.begin(), data.end(), 1);
    cout << "Number of 1s: " << count << endl;
    
    // Min and Max
    auto minIt = min_element(data.begin(), data.end());
    auto maxIt = max_element(data.begin(), data.end());
    cout << "Min: " << *minIt << ", Max: " << *maxIt << endl;
    
    // Sum using accumulate
    int sum = accumulate(data.begin(), data.end(), 0);
    cout << "Sum: " << sum << endl;
    
    // Reverse
    reverse(data.begin(), data.end());
    cout << "Reversed: ";
    for(int x : data) cout << x << " ";
    cout << endl;
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry (Watch at 1.25x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=BZnYh6bD5NI" target="_blank" rel="noopener noreferrer">Introduction To C++ STL</a></li>
        <li><a href="https://www.youtube.com/watch?v=BZnYh6bD5NI" target="_blank" rel="noopener noreferrer">Containers In C++ STL</a></li>
        <li><a href="https://www.youtube.com/watch?v=BZnYh6bD5NI" target="_blank" rel="noopener noreferrer">Vectors In C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=BZnYh6bD5NI" target="_blank" rel="noopener noreferrer">List In C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=BZnYh6bD5NI" target="_blank" rel="noopener noreferrer">Map In C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=BZnYh6bD5NI" target="_blank" rel="noopener noreferrer">Functors In C++</a></li>
      </ul>
    </div>

    <div className="alert alert-success">
      <h4>🎉 Congratulations!</h4>
      <p>You've completed the 9-week C++ programming journey! You now have a solid foundation in C++ programming, from basic syntax to advanced OOP concepts and STL usage.</p>
      
      <h4>🚀 Next Steps:</h4>
      <ul>
        <li>Practice with competitive programming platforms (LeetCode, Codeforces)</li>
        <li>Build real-world projects using C++</li>
        <li>Explore advanced topics like template metaprogramming</li>
        <li>Learn about C++11/14/17/20 modern features</li>
        <li>Consider learning specialized libraries for your domain of interest</li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 FINAL TASKS:</h4>
      <ol>
        <li>Create a comprehensive program using vectors, maps, and lists</li>
        <li>Implement custom functors for different use cases</li>
        <li>Practice using STL algorithms for data manipulation</li>
        <li>Build a mini project combining all C++ concepts learned</li>
        <li>Create a contact management system using STL containers</li>
        <li>Implement a simple text processing utility using STL</li>
        <li>Review and practice all concepts from Week 1-9</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek9;
