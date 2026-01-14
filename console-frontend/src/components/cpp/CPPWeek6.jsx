import React from 'react';

const CPPWeek6 = () => (
  <div>
    <h2 id="week-6">🏗️ Week 6: Object-Oriented Programming (OOP) – Part 1</h2>
    
    <p>Welcome to Object-Oriented Programming! This week introduces you to the fundamental concepts of OOP, which is a programming paradigm based on objects and classes.</p>

    <h3 id="oop-basics">🎯 Basics of OOP</h3>
    
    <p>Object-Oriented Programming is based on four main principles:</p>
    <ul>
      <li><strong>Encapsulation:</strong> Bundling data and methods together</li>
      <li><strong>Inheritance:</strong> Creating new classes based on existing ones</li>
      <li><strong>Polymorphism:</strong> One interface, multiple implementations</li>
      <li><strong>Abstraction:</strong> Hiding complex implementation details</li>
    </ul>

    <h3 id="classes-objects">📦 Classes, Objects & Access Modifiers</h3>
    
    <h4>🏛️ Classes</h4>
    <p>A class is a blueprint or template for creating objects. It defines the properties and behaviors that objects of that type will have.</p>
    
    <div className="code-example">
      <h4>Basic Class Example:</h4>
      <pre><code>{`class Student {
private:
    string name;
    int roll_no;
    float marks;

public:
    void setData(string n, int r, float m) {
        name = n;
        roll_no = r;
        marks = m;
    }
    
    void displayData() {
        cout << "Name: " << name << endl;
        cout << "Roll No: " << roll_no << endl;
        cout << "Marks: " << marks << endl;
    }
};`}</code></pre>
    </div>

    <h4>🎭 Objects</h4>
    <p>An object is an instance of a class. When you create an object, you allocate memory for it.</p>
    
    <div className="code-example">
      <pre><code>{`int main() {
    Student s1;  // Creating object
    s1.setData("Alice", 101, 95.5);
    s1.displayData();
    return 0;
}`}</code></pre>
    </div>

    <h4>🔒 Access Modifiers</h4>
    <p>Access modifiers control the visibility and accessibility of class members:</p>
    
    <ul>
      <li><strong>Public:</strong> Accessible from anywhere</li>
      <li><strong>Private:</strong> Accessible only within the same class</li>
      <li><strong>Protected:</strong> Accessible within the class and its derived classes</li>
    </ul>

    <h3 id="methods-nesting">🔧 Methods & Nesting of Member Functions</h3>
    
    <p>Member functions can call other member functions within the same class. This is called nesting of member functions.</p>
    
    <div className="code-example">
      <pre><code>{`class Calculator {
private:
    int a, b;

public:
    void setValues(int x, int y) {
        a = x;
        b = y;
    }
    
    int add() {
        return a + b;
    }
    
    void displayResult() {
        setValues(10, 20);  // Calling another member function
        cout << "Sum: " << add() << endl;  // Calling another member function
    }
};`}</code></pre>
    </div>

    <h3 id="this-pointer">👆 "this" Pointer in C++</h3>
    
    <p>The <code>this</code> pointer is an implicit pointer that points to the current object. It's useful when you need to refer to the current object explicitly.</p>
    
    <div className="code-example">
      <pre><code>{`class Person {
private:
    string name;
    int age;

public:
    void setData(string name, int age) {
        this->name = name;  // Using 'this' to avoid naming conflict
        this->age = age;
    }
    
    Person* getPointer() {
        return this;  // Returning pointer to current object
    }
    
    void displayData() {
        cout << "Name: " << this->name << endl;
        cout << "Age: " << this->age << endl;
    }
};`}</code></pre>
    </div>

    <h3 id="static-members">⚡ Static Data Members & Methods</h3>
    
    <p>Static members belong to the class rather than to any specific object. They are shared among all objects of the class.</p>
    
    <div className="code-example">
      <pre><code>{`class Counter {
private:
    static int count;  // Static data member
    int id;

public:
    Counter() {
        count++;  // Increment count for each object
        id = count;
    }
    
    static int getCount() {  // Static member function
        return count;
    }
    
    void displayId() {
        cout << "Object ID: " << id << endl;
    }
};

// Definition of static member outside class
int Counter::count = 0;

int main() {
    Counter c1, c2, c3;
    cout << "Total objects created: " << Counter::getCount() << endl;
    return 0;
}`}</code></pre>
    </div>

    <h3 id="array-of-objects">📚 Array of Objects & Object as Parameter</h3>
    
    <div className="code-example">
      <h4>Array of Objects:</h4>
      <pre><code>{`int main() {
    Student students[3];  // Array of objects
    
    students[0].setData("Alice", 101, 95.5);
    students[1].setData("Bob", 102, 87.2);
    students[2].setData("Charlie", 103, 92.8);
    
    for(int i = 0; i < 3; i++) {
        students[i].displayData();
        cout << "---" << endl;
    }
    return 0;
}`}</code></pre>
    </div>

    <div className="code-example">
      <h4>Object as Parameter:</h4>
      <pre><code>{`void compareStudents(Student s1, Student s2) {
    // Function that takes objects as parameters
    cout << "Comparing two students..." << endl;
}

int main() {
    Student alice, bob;
    alice.setData("Alice", 101, 95.5);
    bob.setData("Bob", 102, 87.2);
    
    compareStudents(alice, bob);  // Passing objects as arguments
    return 0;
}`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry (Watch at 1.25x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=j8nAHeVKL08" target="_blank" rel="noopener noreferrer">OOP in C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=c-ojuXx0EL4" target="_blank" rel="noopener noreferrer">Classes & Access Modifiers</a></li>
        <li><a href="https://www.youtube.com/watch?v=9K5ptu5XWmY" target="_blank" rel="noopener noreferrer">Nesting Of Member Functions</a></li>
        <li><a href="https://www.youtube.com/watch?v=Z_FGTCynpjs" target="_blank" rel="noopener noreferrer">Objects In C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=tSaGBdc4fzE" target="_blank" rel="noopener noreferrer">this pointer in C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=7c4DLXBBhSY" target="_blank" rel="noopener noreferrer">Static Data Members & Methods In OOP</a></li>
        <li><a href="https://www.youtube.com/watch?v=O7GvZN7dz1g" target="_blank" rel="noopener noreferrer">Array Of Objects & Object as a parameter</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Create a simple Book class with private data members and public methods</li>
        <li>Implement a class with static members to count total objects created</li>
        <li>Practice using the 'this' pointer in different scenarios</li>
        <li>Create an array of objects and perform operations on them</li>
        <li>Write functions that take objects as parameters</li>
        <li>Experiment with different access modifiers and understand their behavior</li>
        <li>Create a class hierarchy showing encapsulation principles</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek6;
