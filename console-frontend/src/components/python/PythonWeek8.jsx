import React from 'react';

const PythonWeek8 = () => (
  <div>
    <h2 id="week-8">🌐 Week 8: Framework Introduction - Choose Your Path</h2>
    
    <p>Choose between web development with Flask or data science with Pandas to specialize your Python skills.</p>

    <h3 id="path-selection">Choose Your Specialization Path</h3>
    
    <div className="alert alert-info">
      <p><strong>Choose ONE path based on your interests:</strong></p>
      <ul>
        <li><strong>Path A:</strong> Web Development with Flask</li>
        <li><strong>Path B:</strong> Data Science with Pandas</li>
      </ul>
    </div>

    <h3 id="path-a-flask">Path A: Web Development with Flask</h3>
    
    <h4>Flask Fundamentals</h4>
    <ul>
      <li><strong>Framework Introduction:</strong> Understanding web frameworks</li>
      <li><strong>Flask Installation:</strong> Setting up Flask in virtual environment</li>
      <li><strong>Basic Application:</strong> Creating simple web server</li>
      <li><strong>Routing:</strong> URL patterns and view functions</li>
      <li><strong>Templates:</strong> HTML rendering with Jinja2</li>
      <li><strong>Static Files:</strong> Serving CSS, JavaScript, images</li>
      <li><strong>Forms:</strong> Handling user input and form processing</li>
    </ul>

    <div className="code-example">
      <h4>Flask Web Application Example:</h4>
      <pre><code>{`# app.py - Basic Flask Application
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Sample data
tasks = [
    {'id': 1, 'title': 'Learn Python', 'completed': True},
    {'id': 2, 'title': 'Build Web App', 'completed': False}
]

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    title = request.form.get('title')
    if title:
        new_id = max([task['id'] for task in tasks]) + 1
        tasks.append({
            'id': new_id,
            'title': title,
            'completed': False
        })
    return redirect(url_for('index'))

@app.route('/complete_task/<int:task_id>')
def complete_task(task_id):
    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = True
            break
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)

# templates/index.html
'''
<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
    <style>
        .completed { text-decoration: line-through; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Task Manager</h1>
        
        <form method="POST" action="/add_task">
            <input type="text" name="title" placeholder="Enter new task" required>
            <button type="submit">Add Task</button>
        </form>
        
        <ul>
        {% for task in tasks %}
            <li class="{{ 'completed' if task.completed else '' }}">
                {{ task.title }}
                {% if not task.completed %}
                    <a href="/complete_task/{{ task.id }}">Complete</a>
                {% endif %}
            </li>
        {% endfor %}
        </ul>
    </div>
</body>
</html>
'''`}</code></pre>
    </div>

    <h4>Web Development Concepts</h4>
    <ul>
      <li><strong>HTTP Protocol:</strong> GET, POST, PUT, DELETE methods</li>
      <li><strong>Web Architecture:</strong> Client-server model basics</li>
      <li><strong>HTML Basics:</strong> Structure for web interfaces</li>
      <li><strong>CSS Fundamentals:</strong> Basic styling for web pages</li>
      <li><strong>JavaScript Introduction:</strong> Client-side interactivity basics</li>
    </ul>

    <h3 id="path-b-data-science">Path B: Data Science with Pandas</h3>
    
    <h4>Data Science Fundamentals</h4>
    <ul>
      <li><strong>NumPy Basics:</strong> Arrays and numerical operations</li>
      <li><strong>Pandas Introduction:</strong> Data manipulation and analysis</li>
      <li><strong>Data Types:</strong> Series and DataFrame structures</li>
      <li><strong>Data Loading:</strong> Reading CSV, Excel, JSON files</li>
      <li><strong>Data Cleaning:</strong> Handling missing values and duplicates</li>
      <li><strong>Data Selection:</strong> Indexing, slicing, filtering data</li>
      <li><strong>Data Transformation:</strong> Applying functions and aggregations</li>
    </ul>

    <div className="code-example">
      <h4>Data Science with Pandas Example:</h4>
      <pre><code>{`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create sample dataset
np.random.seed(42)
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Age': [25, 30, 35, 28, 32],
    'Salary': [50000, 60000, 70000, 55000, 65000],
    'Department': ['IT', 'HR', 'IT', 'Finance', 'HR'],
    'Years_Experience': [2, 5, 8, 3, 6]
}

df = pd.DataFrame(data)

# Data exploration
print("Dataset Info:")
print(df.info())
print("\\nFirst 5 rows:")
print(df.head())

print("\\nBasic statistics:")
print(df.describe())

# Data filtering and selection
it_employees = df[df['Department'] == 'IT']
print("\\nIT Employees:")
print(it_employees)

# Group by analysis
dept_stats = df.groupby('Department').agg({
    'Salary': ['mean', 'count'],
    'Age': 'mean'
})
print("\\nDepartment Statistics:")
print(dept_stats)

# Data visualization
plt.figure(figsize=(10, 6))

plt.subplot(1, 2, 1)
df.groupby('Department')['Salary'].mean().plot(kind='bar')
plt.title('Average Salary by Department')
plt.ylabel('Salary')
plt.xticks(rotation=45)

plt.subplot(1, 2, 2)
plt.scatter(df['Years_Experience'], df['Salary'])
plt.title('Salary vs Experience')
plt.xlabel('Years of Experience')
plt.ylabel('Salary')

plt.tight_layout()
plt.show()

# Data manipulation
# Add new calculated column
df['Salary_per_year_exp'] = df['Salary'] / df['Years_Experience']

# Save processed data
df.to_csv('processed_employee_data.csv', index=False)
print("\\nData saved to processed_employee_data.csv")`}</code></pre>
    </div>

    <h4>Data Visualization</h4>
    <ul>
      <li><strong>Matplotlib Basics:</strong> Basic plotting and visualization</li>
      <li><strong>Plot Types:</strong> Line plots, bar charts, histograms, scatter plots</li>
      <li><strong>Customization:</strong> Titles, labels, legends, styling</li>
      <li><strong>Jupyter Notebooks:</strong> Interactive development environment</li>
    </ul>

    <h3 id="advanced-topics">Advanced Topics (Future Learning)</h3>
    
    <div className="alert alert-warning">
      <h4>🚀 Next Steps After Completing 9-Week Program:</h4>
      
      <h5>🌐 Advanced Web Development:</h5>
      <ul>
        <li>Django Framework: Full-featured web framework</li>
        <li>Database Integration: ORM and database management</li>
        <li>User Authentication: Login/logout systems</li>
        <li>REST APIs: Building web services</li>
        <li>Deployment: Production web application hosting</li>
      </ul>
      
      <h5>📊 Advanced Data Science:</h5>
      <ul>
        <li>Machine Learning: Scikit-learn library</li>
        <li>Statistical Analysis: Advanced statistical methods</li>
        <li>Big Data: Handling large datasets</li>
        <li>Deep Learning: Neural networks with TensorFlow/PyTorch</li>
      </ul>
      
      <h5>🔧 Other Specializations:</h5>
      <ul>
        <li>Desktop Applications: GUI development with tkinter/PyQt</li>
        <li>Game Development: Pygame for simple games</li>
        <li>Automation: Selenium for web automation</li>
        <li>DevOps: Docker, CI/CD, cloud deployment</li>
      </ul>
    </div>

    <h3 id="week8-goals">Week 8 Goals</h3>
    <p>Complete introduction to chosen specialization with basic project implementation.</p>

    <div className="alert alert-info">
      <h4>🎯 PRACTICE TASKS:</h4>
      
      <h5>For Flask Path:</h5>
      <ol>
        <li>Build a personal blog website with multiple pages</li>
        <li>Create a simple contact form that handles user submissions</li>
        <li>Add CSS styling and make your website responsive</li>
        <li>Implement basic user session management</li>
      </ol>
      
      <h5>For Data Science Path:</h5>
      <ol>
        <li>Analyze a real dataset from Kaggle or similar platform</li>
        <li>Create multiple visualizations to show data insights</li>
        <li>Perform data cleaning and preprocessing operations</li>
        <li>Build a simple data dashboard with key metrics</li>
      </ol>
    </div>
  </div>
);

export default PythonWeek8;
