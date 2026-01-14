import React from 'react';

const PythonWeek5 = () => {
  const oopExample = `
class Student:
    # Class variable
    school = "Python University"
    
    def __init__(self, name, age, major):
        # Instance variables
        self.name = name
        self.age = age
        self.major = major
        self.gpa = 0.0
    
    def introduce(self):
        return f"Hi, I'm {self.name}, studying {self.major}"
    
    def update_gpa(self, new_gpa):
        self.gpa = new_gpa
    
    @classmethod
    def get_school(cls):
        return cls.school
    
    @staticmethod
    def is_adult(age):
        return age >= 18

# Creating objects
alice = Student("Alice", 20, "Computer Science")
bob = Student("Bob", 19, "Mathematics")

print(alice.introduce())
alice.update_gpa(3.8)
  `.trim();

  return (
    <div>
      <h2 id="week-5">🏗 Week 5: Object-Oriented Programming</h2>
      
      <p>Learn object-oriented programming concepts including classes, objects, inheritance, and encapsulation to design robust applications.</p>

      <h3 id="classes-objects">Classes and Objects Fundamentals</h3>
      
      <ul>
        <li><strong>Class Definition:</strong> Using class keyword and proper structure</li>
        <li><strong>Object Creation:</strong> Instantiating classes and creating instances</li>
        <li><strong>Attributes:</strong> Instance variables and class variables</li>
        <li><strong>Methods:</strong> Functions defined within classes</li>
        <li><strong>Constructor:</strong> __init__() method for object initialization</li>
        <li><strong>Instance vs Class Attributes:</strong> Understanding the differences</li>
      </ul>

      <div className="code-example">
        <h4>Class and Object Examples:</h4>
        <pre><code>{oopExample}</code></pre>
      </div>

      {/* You can do similar fixes for the other code examples */}
    </div>
  );
};

export default PythonWeek5;
