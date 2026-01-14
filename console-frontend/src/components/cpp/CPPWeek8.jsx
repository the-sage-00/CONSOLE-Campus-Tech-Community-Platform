import React from 'react';

const CPPWeek8 = () => (
  <div>
    <h2 id="week-8">🎭 Week 8: Object-Oriented Programming (OOP) – Part 3</h2>
    
    <p>This week explores advanced OOP concepts including inheritance, polymorphism, virtual functions, and memory management techniques.</p>

    <h3 id="inheritance">🧬 Inheritance (Single, Multiple, Multilevel)</h3>
    
    <p>Inheritance allows a class to acquire properties and behaviors from another class, promoting code reusability.</p>

    <h4>📝 Single Inheritance</h4>
    <p>A derived class inherits from a single base class.</p>
    
    <div className="code-example">
      <pre><code>{`class Animal {  // Base class
protected:
    string name;
    int age;

public:
    Animal(string n, int a) {
        name = n;
        age = a;
    }
    
    void eat() {
        cout << name << " is eating." << endl;
    }
};

class Dog : public Animal {  // Derived class
private:
    string breed;

public:
    Dog(string n, int a, string b) : Animal(n, a) {
        breed = b;
    }
    
    void bark() {
        cout << name << " is barking!" << endl;
    }
    
    void displayInfo() {
        cout << "Name: " << name << ", Age: " << age << ", Breed: " << breed << endl;
    }
};`}</code></pre>
    </div>

    <h4>🔗 Multiple Inheritance</h4>
    <p>A derived class inherits from multiple base classes.</p>
    
    <div className="code-example">
      <pre><code>{`class Flyable {
public:
    void fly() {
        cout << "Flying in the sky!" << endl;
    }
};

class Swimmable {
public:
    void swim() {
        cout << "Swimming in water!" << endl;
    }
};

class Duck : public Animal, public Flyable, public Swimmable {
public:
    Duck(string n, int a) : Animal(n, a) {}
    
    void displayAbilities() {
        eat();   // From Animal
        fly();   // From Flyable
        swim();  // From Swimmable
    }
};`}</code></pre>
    </div>

    <h4>🏗️ Multilevel Inheritance</h4>
    <p>A derived class inherits from another derived class, forming a chain.</p>
    
    <div className="code-example">
      <pre><code>{`class Vehicle {  // Base class
protected:
    string brand;
    int year;

public:
    Vehicle(string b, int y) : brand(b), year(y) {}
    void start() { cout << "Vehicle started!" << endl; }
};

class Car : public Vehicle {  // Derived from Vehicle
protected:
    int doors;

public:
    Car(string b, int y, int d) : Vehicle(b, y), doors(d) {}
    void drive() { cout << "Car is driving!" << endl; }
};

class SportsCar : public Car {  // Derived from Car
private:
    int maxSpeed;

public:
    SportsCar(string b, int y, int d, int speed) 
        : Car(b, y, d), maxSpeed(speed) {}
    
    void turboMode() {
        cout << "Turbo mode activated! Max speed: " << maxSpeed << " mph" << endl;
    }
};`}</code></pre>
    </div>

    <h3 id="polymorphism">🎯 Polymorphism (Compile-Time, Run-Time)</h3>
    
    <p>Polymorphism allows objects of different types to be treated as objects of a common base type.</p>

    <h4>⏱️ Compile-Time Polymorphism (Function Overloading)</h4>
    <div className="code-example">
      <pre><code>{`class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
    
    double add(double a, double b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
};`}</code></pre>
    </div>

    <h4>🏃 Run-Time Polymorphism (Virtual Functions)</h4>
    <div className="code-example">
      <pre><code>{`class Shape {  // Base class
public:
    virtual void draw() {  // Virtual function
        cout << "Drawing a shape" << endl;
    }
    
    virtual double area() = 0;  // Pure virtual function
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}
    
    void draw() override {  // Override base class method
        cout << "Drawing a circle" << endl;
    }
    
    double area() override {
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double length, width;

public:
    Rectangle(double l, double w) : length(l), width(w) {}
    
    void draw() override {
        cout << "Drawing a rectangle" << endl;
    }
    
    double area() override {
        return length * width;
    }
};`}</code></pre>
    </div>

    <h3 id="virtual-base-class">🏛️ Virtual Base Class</h3>
    
    <p>Virtual base classes solve the diamond problem in multiple inheritance.</p>
    
    <div className="code-example">
      <pre><code>{`class Animal {  // Base class
public:
    void eat() {
        cout << "Animal is eating" << endl;
    }
};

class Mammal : virtual public Animal {  // Virtual inheritance
public:
    void breathe() {
        cout << "Mammal is breathing" << endl;
    }
};

class Bird : virtual public Animal {  // Virtual inheritance
public:
    void fly() {
        cout << "Bird is flying" << endl;
    }
};

class Bat : public Mammal, public Bird {  // Multiple inheritance
public:
    void echolocate() {
        cout << "Bat uses echolocation" << endl;
        eat();  // No ambiguity due to virtual base class
    }
};`}</code></pre>
    </div>

    <h3 id="initialization-list">📝 Initialization List</h3>
    
    <p>Initialization lists provide an efficient way to initialize member variables, especially for const members and references.</p>
    
    <div className="code-example">
      <pre><code>{`class Student {
private:
    const int studentId;  // const member
    string& name;         // reference member
    int age;

public:
    // Using initialization list
    Student(int id, string& n, int a) : studentId(id), name(n), age(a) {
        // Constructor body (can be empty or contain additional logic)
        cout << "Student created with ID: " << studentId << endl;
    }
    
    void displayInfo() {
        cout << "ID: " << studentId << ", Name: " << name << ", Age: " << age << endl;
    }
};`}</code></pre>
    </div>

    <h3 id="new-delete">💾 "new" and "delete" Keywords</h3>
    
    <p>Dynamic memory allocation and deallocation in C++.</p>
    
    <div className="code-example">
      <pre><code>{`class DynamicStudent {
private:
    string name;
    int* grades;
    int numGrades;

public:
    DynamicStudent(string n, int num) : name(n), numGrades(num) {
        grades = new int[numGrades];  // Dynamic allocation
        for(int i = 0; i < numGrades; i++) {
            grades[i] = 0;
        }
    }
    
    ~DynamicStudent() {
        delete[] grades;  // Free allocated memory
        cout << "Memory deallocated for " << name << endl;
    }
    
    void setGrade(int index, int grade) {
        if(index >= 0 && index < numGrades) {
            grades[index] = grade;
        }
    }
    
    void displayGrades() {
        cout << name << "'s grades: ";
        for(int i = 0; i < numGrades; i++) {
            cout << grades[i] << " ";
        }
        cout << endl;
    }
};

int main() {
    DynamicStudent* student = new DynamicStudent("Alice", 5);  // Dynamic object creation
    student->setGrade(0, 95);
    student->displayGrades();
    delete student;  // Don't forget to delete!
    return 0;
}`}</code></pre>
    </div>

    <h3 id="virtual-functions">🎭 Virtual Functions</h3>
    
    <p>Virtual functions enable runtime polymorphism and allow derived classes to override base class methods.</p>
    
    <div className="code-example">
      <pre><code>{`class Employee {
protected:
    string name;
    double baseSalary;

public:
    Employee(string n, double salary) : name(n), baseSalary(salary) {}
    
    virtual double calculateSalary() {  // Virtual function
        return baseSalary;
    }
    
    virtual void displayInfo() {  // Virtual function
        cout << "Employee: " << name << ", Salary: $" << calculateSalary() << endl;
    }
    
    virtual ~Employee() {}  // Virtual destructor
};

class Manager : public Employee {
private:
    double bonus;

public:
    Manager(string n, double salary, double b) : Employee(n, salary), bonus(b) {}
    
    double calculateSalary() override {  // Override virtual function
        return baseSalary + bonus;
    }
    
    void displayInfo() override {
        cout << "Manager: " << name << ", Salary: $" << calculateSalary() << endl;
    }
};

// Polymorphic behavior
void printEmployeeInfo(Employee* emp) {
    emp->displayInfo();  // Calls appropriate derived class method
}

int main() {
    Employee* emp1 = new Employee("John", 50000);
    Employee* emp2 = new Manager("Sarah", 70000, 10000);
    
    printEmployeeInfo(emp1);  // Calls Employee::displayInfo()
    printEmployeeInfo(emp2);  // Calls Manager::displayInfo()
    
    delete emp1;
    delete emp2;
    return 0;
}`}</code></pre>
    </div>

    <h3 id="resources">📚 Resources</h3>
    <div className="resources-section">
      <h4>🎥 CodeWithHarry (Watch at 1.25x speed):</h4>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Inheritance Part 1</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Inheritance Part 2</a></li>
        <li><a href="https://www.youtube.com/watch?v=jTmPJOSPqbQ" target="_blank" rel="noopener noreferrer">Single Inheritance</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Use Of Protected Access Modifier</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Multi-Level Inheritance Part 1</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Multi-Level Inheritance Part 2</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Virtual Base Class Part 1</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Virtual Base Class Part 2</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Constructor In Derived Class Part 1</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Constructor In Derived Class Part 2</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Initialisation List in Constructors</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">"new" & "delete" keywords</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Pointers to Objects</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Polymorphism</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Virtual Functions Part 1</a></li>
        <li><a href="https://www.youtube.com/watch?v=4IaXKYTHGVs" target="_blank" rel="noopener noreferrer">Virtual Functions Part 2</a></li>
      </ul>
    </div>

    <div className="alert alert-info">
      <h4>🎯 TASKS:</h4>
      <ol>
        <li>Create examples of single, multiple, and multilevel inheritance</li>
        <li>Implement virtual base classes to resolve diamond problem</li>
        <li>Practice using initialization lists in constructors</li>
        <li>Create classes using dynamic memory allocation with new/delete</li>
        <li>Implement virtual functions and demonstrate polymorphism</li>
        <li>Build a complete inheritance hierarchy with virtual functions</li>
        <li>Create abstract base classes with pure virtual functions</li>
      </ol>
    </div>
  </div>
);

export default CPPWeek8;
