import React from 'react';

const CPPWeek7 = () => (
  <div>
    <h2 id="week-7">🔨 Week 7: Object-Oriented Programming (OOP) – Part 2</h2>
    
    <p>This week dives deeper into OOP concepts, focusing on constructors, destructors, and advanced object management techniques.</p>

    <h3 id="constructors">🏗️ Constructors - Default & Parameterized</h3>
    
    <p>Constructors are special member functions that are automatically called when an object is created. They initialize the object's data members.</p>

    <h4>🔧 Default Constructor</h4>
    <p>A constructor with no parameters, used for basic initialization.</p>
    
    <div className="code-example">
      <pre><code>{`class Student {
private:
    string name;
    int roll_no;
    float marks;

public:
    // Default Constructor
    Student() {
        name = "Unknown";
        roll_no = 0;
        marks = 0.0;
        cout << "Default constructor called" << endl;
    }
    
    void displayData() {
        cout << "Name: " << name << ", Roll: " << roll_no << ", Marks: " << marks << endl;
    }
};

int main() {
    Student s1;  // Default constructor called
    s1.displayData();
    return 0;
}`}</code></pre>
    </div>

    <h4>⚙️ Parameterized Constructor</h4>
    <p>A constructor that accepts parameters to initialize object with specific values.</p>
    
    <div className="code-example">
      <pre><code>{`class Student {
private:
    string name;
    int roll_no;
    float marks;

public:
    // Parameterized Constructor
    Student(string n, int r, float m) {
        name = n;
        roll_no = r;
        marks = m;
        cout << "Parameterized constructor called" << endl;
    }
    
    void displayData() {
        cout << "Name: " << name << ", Roll: " << roll_no << ", Marks: " << marks << endl;
    }
};

int main() {
    Student s1("Alice", 101, 95.5);  // Parameterized constructor called
    s1.displayData();
    return 0;
}`}</code></pre>
    </div>

    <h3 id="constructor-overloading">🎭 Constructor Overloading & Copy Constructor</h3>
    
    <h4>🔄 Constructor Overloading</h4>
    <p>Having multiple constructors with different parameter lists.</p>
    
    <div className="code-example">
      <pre><code>{`class Rectangle {
private:
    int length, width;

public:
    // Default Constructor
    Rectangle() {
        length = width = 1;
    }
    
    // Parameterized Constructor with 2 parameters
    Rectangle(int l, int w) {
        length = l;
        width = w;
    }
    
    // Parameterized Constructor with 1 parameter (square)
    Rectangle(int side) {
        length = width = side;
    }
    
    int area() {
        return length * width;
    }
};

int main() {
    Rectangle r1;           // Default constructor
    Rectangle r2(5, 3);     // 2-parameter constructor
    Rectangle r3(4);        // 1-parameter constructor (square)
    
    cout << "Areas: " << r1.area() << ", " << r2.area() << ", " << r3.area() << endl;
    return 0;
}`}</code></pre>
    </div>

    <h4>📋 Copy Constructor</h4>
    <p>A constructor that creates a new object as a copy of an existing object.</p>
    
    <div className="code-example">
      <pre><code>{`class Student {
private:
    string name;
    int roll_no;

public:
    // Parameterized Constructor
    Student(string n, int r) {
        name = n;
        roll_no = r;
    }
    
    // Copy Constructor
    Student(const Student &other) {
        name = other.name;
        roll_no = other.roll_no;
        cout << "Copy constructor called" << endl;
    }
    
    void displayData() {
        cout << "Name: " << name << ", Roll: " << roll_no << endl;
    }
};

int main() {
    Student s1("Alice", 101);
    Student s2 = s1;  // Copy constructor called
    Student s3(s1);   // Copy constructor called
    
    s2.displayData();
    return 0;
}`}</code></pre>
    </div>

    <h3 id="dynamic-initialization">⚡ Dynamic Initialisation of Objects</h3>
    
    <p>Objects can be initialized at runtime using values computed during program execution.</p>
    
    <div className="code-example">
      <pre><code>{`class BankAccount {
private:
    string account_no;
    double balance;

public:
    BankAccount(string acc, double bal) {
        account_no = acc;
        balance = bal;
    }
    
    void displayAccount() {
        cout << "Account: " << account_no << ", Balance: $" << balance << endl;
    }
};

int main() {
    string acc_num;
    double initial_balance;
    
    cout << "Enter account number: ";
    cin >> acc_num;
    
    cout << "Enter initial balance: ";
    cin >> initial_balance;
    
    // Dynamic initialization
    BankAccount account(acc_num, initial_balance);
    account.displayAccount();
    
    return 0;
}`}</code></pre>
    </div>

    <h3 id="destructor">💥 Destructor</h3>
    
    <p>Destructors are called automatically when an object goes out of scope or is explicitly deleted. They're used for cleanup operations.</p>
    
    <div className="code-example">
      <pre><code>{`class FileHandler {
private:
    string filename;

public:
    // Constructor
    FileHandler(string fname) {
        filename = fname;
        cout << "File " << filename << " opened" << endl;
    }
    
    // Destructor
    ~FileHandler() {
        cout << "File " << filename << " closed" << endl;
    }
    
    void processFile() {
        cout << "Processing " << filename << "..." << endl;
    }
};

int main() {
    {
        FileHandler fh("data.txt");  // Constructor called
        fh.processFile();
    }  // Destructor automatically called when object goes out of scope
    
    cout << "Back to main function" << endl;
    return 0;
}`}</code></pre>
    </div>

    <h3 id="copy-types">📄 Shallow Copy & Deep Copy</h3>
    
    <h4>🔍 Shallow Copy</h4>
    <p>Copies the values of all data members. For pointers, it copies the address, not the actual data.</p>
    
    <h4>🏗️ Deep Copy</h4>
    <p>Creates a new copy of dynamically allocated memory, ensuring complete independence between objects.</p>
    
    <div className="code-example">
      <h4>Deep Copy Example:</h4>
      <pre><code>{`class DynamicArray {
private:
    int* data;
    int size;

public:
    // Constructor
    DynamicArray(int s) {
        size = s;
        data = new int[size];
        for(int i = 0; i < size; i++) {
            data[i] = i + 1;
        }
    }
    
    // Deep Copy Constructor
    DynamicArray(const DynamicArray &other) {
        size = other.size;
        data = new int[size];  // Allocate new memory
        for(int i = 0; i < size; i++) {
            data[i] = other.data[i];  // Copy values
        }
    }
    
    // Destructor
    ~DynamicArray() {
        delete[] data;
        cout << "Memory deallocated" << endl;
    }
    
    void display() {
        for(int i = 0; i < size; i++) {
            cout << data[i] << " ";
        }
        cout << endl;
    }
};`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry (Watch at 1.25x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=bANf4BXqZiU" target="_blank" rel="noopener noreferrer">Constructors In C++</a></li>
        <li><a href="https://www.youtube.com/watch?v=XYEXUyI8XBU" target="_blank" rel="noopener noreferrer">Parameterized & Default Constructor</a></li>
        <li><a href="https://www.youtube.com/watch?v=I4EKMHdR96s" target="_blank" rel="noopener noreferrer">Constructor Overloading & Constructor With Default Arguments</a></li>
        <li><a href="https://www.youtube.com/watch?v=BdR7og5tXWY" target="_blank" rel="noopener noreferrer">Dynamic Initialisation Of Objects</a></li>
        <li><a href="https://www.youtube.com/watch?v=oBkOAFOUZ0I" target="_blank" rel="noopener noreferrer">Copy Constructor</a></li>
        <li><a href="https://www.youtube.com/watch?v=oBkOAFOUZ0I" target="_blank" rel="noopener noreferrer">Destructor</a></li>
      </ul>
      
      <h4>🎥 GeeksforGeeks:</h4>
      <ul>
        <li><a href="https://www.geeksforgeeks.org/shallow-copy-and-deep-copy-in-c/" target="_blank" rel="noopener noreferrer">Shallow Copy & Deep Copy</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Create a class with both default and parameterized constructors</li>
        <li>Implement constructor overloading for a Rectangle class</li>
        <li>Practice creating and using copy constructors</li>
        <li>Demonstrate dynamic initialization with user input</li>
        <li>Create classes that require destructors for cleanup</li>
        <li>Implement both shallow and deep copy examples</li>
        <li>Build a complete class with all constructor types and destructor</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek7;
