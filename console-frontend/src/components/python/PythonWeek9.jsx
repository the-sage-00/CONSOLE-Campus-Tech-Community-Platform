import React from 'react';

const PythonWeek9 = () => (
  <div>
    <h2 id="week-9">🎯 Week 9: Final Project</h2>
    
    <p>Apply all your learned Python skills to build a complete project based on your Week 8 specialization choice.</p>

    <h3 id="project-selection">Choose Your Final Project</h3>
    
    <div className="alert alert-info">
      <p><strong>Select ONE project based on your Week 8 specialization:</strong></p>
    </div>

    <h3 id="web-development-capstone">Web Development Capstone: Personal Task Manager</h3>
    
    <h4>Project Requirements</h4>
    <ul>
      <li><strong>User Interface:</strong> Clean, intuitive task management interface</li>
      <li><strong>Data Persistence:</strong> File storage or simple database integration</li>
      <li><strong>Task Features:</strong> Create, edit, delete, and mark tasks complete</li>
      <li><strong>Categories:</strong> Organize tasks by categories or priorities</li>
      <li><strong>Search & Filter:</strong> Find tasks quickly with search functionality</li>
      <li><strong>Responsive Design:</strong> Works on both desktop and mobile devices</li>
      <li><strong>User Authentication:</strong> Basic login system (optional but recommended)</li>
    </ul>

    <div className="code-example">
      <h4>Web Project Structure Example:</h4>
      <pre><code>{`task_manager/
├── app.py                 # Main Flask application
├── config.py              # Configuration settings
├── models.py              # Data models and database operations
├── forms.py               # WTForms for form handling
├── requirements.txt       # Project dependencies
├── static/
│   ├── css/
│   │   └── style.css      # Custom styles
│   ├── js/
│   │   └── main.js        # JavaScript functionality
│   └── images/
├── templates/
│   ├── base.html          # Base template
│   ├── index.html         # Main dashboard
│   ├── login.html         # User login
│   ├── task_form.html     # Add/edit task form
│   └── profile.html       # User profile
├── data/
│   └── tasks.json         # JSON file storage
└── tests/
    └── test_app.py        # Unit tests

# Key Features to Implement:
# 1. CRUD Operations (Create, Read, Update, Delete)
# 2. User Sessions and Authentication
# 3. Data Validation and Error Handling
# 4. Responsive Web Design
# 5. Search and Filtering
# 6. Categories and Priorities
# 7. Due Date Management
# 8. Task Statistics Dashboard`}</code></pre>
    </div>

    <h4>Implementation Steps</h4>
    <ol>
      <li><strong>Setup:</strong> Create project structure and virtual environment</li>
      <li><strong>Basic Routes:</strong> Implement core Flask routes and templates</li>
      <li><strong>Data Layer:</strong> Create task management with JSON file storage</li>
      <li><strong>Forms:</strong> Add task creation and editing forms</li>
      <li><strong>Styling:</strong> Apply CSS and make responsive design</li>
      <li><strong>Features:</strong> Add search, categories, and due dates</li>
      <li><strong>Testing:</strong> Test all functionality and fix bugs</li>
      <li><strong>Documentation:</strong> Write README and code comments</li>
    </ol>

    <h3 id="data-science-capstone">Data Science Capstone: Personal Finance Dashboard</h3>
    
    <h4>Project Requirements</h4>
    <ul>
      <li><strong>Data Import:</strong> Read financial data from CSV files</li>
      <li><strong>Data Processing:</strong> Clean and transform financial data</li>
      <li><strong>Analysis:</strong> Calculate spending patterns and trends</li>
      <li><strong>Visualizations:</strong> Create charts showing financial insights</li>
      <li><strong>Reports:</strong> Generate monthly and yearly spending reports</li>
      <li><strong>Budget Tracking:</strong> Compare actual spending to budgets</li>
      <li><strong>Recommendations:</strong> Provide financial advice based on data</li>
      <li><strong>Export:</strong> Save processed data and visualizations</li>
    </ul>

    <div className="code-example">
      <h4>Data Science Project Structure Example:</h4>
      <pre><code>{`finance_dashboard/
├── main.py                # Main application entry point
├── data_processor.py      # Data cleaning and processing
├── analyzer.py            # Financial analysis functions
├── visualizer.py          # Chart and graph generation
├── report_generator.py    # Report creation functions
├── config.py              # Configuration settings
├── requirements.txt       # Project dependencies
├── data/
│   ├── raw/
│   │   ├── transactions.csv
│   │   ├── budgets.csv
│   │   └── categories.csv
│   ├── processed/
│   │   └── clean_data.csv
│   └── exports/
│       ├── monthly_reports/
│       └── visualizations/
├── notebooks/
│   ├── data_exploration.ipynb
│   └── analysis.ipynb
├── templates/             # HTML templates if web interface
└── tests/
    └── test_analyzer.py

# Key Features to Implement:
# 1. CSV Data Import and Validation
# 2. Data Cleaning and Preprocessing
# 3. Spending Category Analysis
# 4. Trend Analysis and Forecasting
# 5. Budget vs Actual Comparison
# 6. Interactive Visualizations
# 7. Automated Report Generation
# 8. Financial Health Scoring`}</code></pre>
    </div>

    <div className="code-example">
      <h4>Sample Data Analysis Code:</h4>
      <pre><code>{`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

class FinanceDashboard:
    def __init__(self, transactions_file):
        self.df = pd.read_csv(transactions_file)
        self.clean_data()
    
    def clean_data(self):
        # Convert date column to datetime
        self.df['Date'] = pd.to_datetime(self.df['Date'])
        
        # Clean amount column
        self.df['Amount'] = pd.to_numeric(self.df['Amount'], errors='coerce')
        
        # Remove invalid rows
        self.df = self.df.dropna()
        
        # Add derived columns
        self.df['Month'] = self.df['Date'].dt.to_period('M')
        self.df['Year'] = self.df['Date'].dt.year
    
    def monthly_spending(self):
        monthly = self.df.groupby('Month')['Amount'].sum().reset_index()
        return monthly
    
    def category_analysis(self):
        category_spending = self.df.groupby('Category')['Amount'].sum().sort_values(ascending=False)
        return category_spending
    
    def create_visualizations(self):
        # Monthly spending trend
        plt.figure(figsize=(15, 10))
        
        plt.subplot(2, 2, 1)
        monthly_data = self.monthly_spending()
        plt.plot(monthly_data['Month'].astype(str), monthly_data['Amount'])
        plt.title('Monthly Spending Trend')
        plt.xticks(rotation=45)
        
        # Category breakdown
        plt.subplot(2, 2, 2)
        category_data = self.category_analysis()
        plt.pie(category_data.values, labels=category_data.index, autopct='%1.1f%%')
        plt.title('Spending by Category')
        
        # Weekly spending heatmap
        plt.subplot(2, 2, 3)
        self.df['DayOfWeek'] = self.df['Date'].dt.day_name()
        self.df['Week'] = self.df['Date'].dt.isocalendar().week
        heatmap_data = self.df.pivot_table(values='Amount', index='Week', columns='DayOfWeek', aggfunc='sum')
        sns.heatmap(heatmap_data, annot=True, fmt='.0f', cmap='Reds')
        plt.title('Spending Heatmap by Week and Day')
        
        # Top spending days
        plt.subplot(2, 2, 4)
        daily_spending = self.df.groupby('Date')['Amount'].sum().nlargest(10)
        daily_spending.plot(kind='bar')
        plt.title('Top 10 Spending Days')
        plt.xticks(rotation=45)
        
        plt.tight_layout()
        plt.savefig('data/exports/visualizations/finance_dashboard.png')
        plt.show()
    
    def generate_report(self):
        report = {
            'total_spending': self.df['Amount'].sum(),
            'average_transaction': self.df['Amount'].mean(),
            'transaction_count': len(self.df),
            'top_category': self.category_analysis().index[0],
            'highest_spending_day': self.df.loc[self.df['Amount'].idxmax(), 'Date'],
            'monthly_average': self.monthly_spending()['Amount'].mean()
        }
        
        return report

# Usage
dashboard = FinanceDashboard('data/raw/transactions.csv')
dashboard.create_visualizations()
report = dashboard.generate_report()
print("Financial Summary:", report)`}</code></pre>
    </div>

    <h4>Implementation Steps</h4>
    <ol>
      <li><strong>Setup:</strong> Create project structure and install required packages</li>
      <li><strong>Data Import:</strong> Load and explore your financial data</li>
      <li><strong>Data Cleaning:</strong> Handle missing values and data inconsistencies</li>
      <li><strong>Analysis:</strong> Implement core financial analysis functions</li>
      <li><strong>Visualizations:</strong> Create meaningful charts and graphs</li>
      <li><strong>Reports:</strong> Build automated report generation</li>
      <li><strong>Dashboard:</strong> Create interactive dashboard (optional)</li>
      <li><strong>Documentation:</strong> Write comprehensive project documentation</li>
    </ol>

    <h3 id="project-requirements">General Project Requirements</h3>
    
    <div className="alert alert-warning">
      <h4>📋 All Projects Must Include:</h4>
      <ul>
        <li><strong>Clean Code:</strong> Well-commented, readable, and organized code</li>
        <li><strong>Error Handling:</strong> Proper exception handling and validation</li>
        <li><strong>Documentation:</strong> README file with setup and usage instructions</li>
        <li><strong>Version Control:</strong> Git repository with meaningful commit messages</li>
        <li><strong>Testing:</strong> At least basic testing of core functionality</li>
        <li><strong>Dependencies:</strong> requirements.txt file with all dependencies</li>
        <li><strong>Demo:</strong> Working demonstration of all features</li>
      </ul>
    </div>

    <h3 id="submission-guidelines">Project Submission Guidelines</h3>
    
    <ol>
      <li><strong>Code Quality:</strong> Follow Python best practices and PEP 8 style guide</li>
      <li><strong>Functionality:</strong> All features should work as intended</li>
      <li><strong>Documentation:</strong> Include detailed README with:
        <ul>
          <li>Project description and objectives</li>
          <li>Installation and setup instructions</li>
          <li>Usage examples and screenshots</li>
          <li>Feature list and technical details</li>
          <li>Future improvement ideas</li>
        </ul>
      </li>
      <li><strong>Demonstration:</strong> Prepare a 5-10 minute demo showing:
        <ul>
          <li>Key features and functionality</li>
          <li>Code structure and organization</li>
          <li>Challenges faced and solutions implemented</li>
          <li>What you learned during development</li>
        </ul>
      </li>
    </ol>

    <h3 id="week9-goals">Week 9 Goals</h3>
    <p>Successfully complete and demonstrate a full-featured Python application that showcases all skills learned throughout the 9-week program.</p>

    <div className="alert alert-success">
      <h4>🎉 Congratulations!</h4>
      <p>By completing this project, you will have demonstrated proficiency in:</p>
      <ul>
        <li>Python fundamentals and advanced concepts</li>
        <li>Data structures and algorithms</li>
        <li>Object-oriented programming</li>
        <li>File handling and data processing</li>
        <li>Error handling and debugging</li>
        <li>Package management and project organization</li>
        <li>Framework usage (Flask or Pandas)</li>
        <li>Real-world application development</li>
      </ul>
      <p><strong>You're now ready to tackle more advanced Python projects and continue your programming journey!</strong></p>
    </div>
  </div>
);

export default PythonWeek9;
