import React from 'react';

const PythonWeek7 = () => (
  <div>
    <h2 id="week-7">📦 Week 7: Package Management & Professional Setup</h2>
    
    <p>Learn professional Python development practices including virtual environments, package management, project organization, and development tools.</p>

    <h3 id="virtual-environments">Virtual Environments</h3>
    
    <ul>
      <li><strong>Why Virtual Environments:</strong> Dependency isolation importance</li>
      <li><strong>venv Module:</strong> Built-in virtual environment creation</li>
      <li><strong>Environment Activation:</strong> Activating and deactivating environments</li>
      <li><strong>Project Structure:</strong> Organizing projects with virtual environments</li>
      <li><strong>Best Practices:</strong> One environment per project rule</li>
    </ul>

    <div className="code-example">
      <h4>Virtual Environment Commands:</h4>
      <pre><code>{`# Create virtual environment
python -m venv myproject_env

# Activate virtual environment (Windows)
myproject_env\\Scripts\\activate

# Activate virtual environment (macOS/Linux)
source myproject_env/bin/activate

# Deactivate virtual environment
deactivate

# Check installed packages
pip list

# Install packages in virtual environment
pip install requests pandas flask`}</code></pre>
    </div>

    <h3 id="package-management">Package Management with pip</h3>
    
    <ul>
      <li><strong>Installing Packages:</strong> pip install command and options</li>
      <li><strong>Requirements Files:</strong> Creating and using requirements.txt</li>
      <li><strong>Version Management:</strong> Specifying package versions</li>
      <li><strong>Package Information:</strong> Using pip show and pip list</li>
      <li><strong>Upgrading Packages:</strong> Keeping dependencies updated</li>
      <li><strong>Uninstalling:</strong> Clean removal of packages</li>
    </ul>

    <div className="code-example">
      <h4>Package Management Examples:</h4>
      <pre><code>{`# Install specific versions
pip install requests==2.28.0
pip install pandas>=1.4.0
pip install flask~=2.0.0

# Create requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Example requirements.txt content:
# requests==2.28.0
# pandas==1.4.3
# flask==2.2.2
# python-dotenv==0.19.2

# Show package information
pip show requests

# List outdated packages
pip list --outdated

# Upgrade packages
pip install --upgrade requests`}</code></pre>
    </div>

    <h3 id="project-organization">Project Organization</h3>
    
    <ul>
      <li><strong>Directory Structure:</strong> Standard Python project layout</li>
      <li><strong>Configuration Files:</strong> setup.py, setup.cfg, pyproject.toml basics</li>
      <li><strong>README Files:</strong> Writing effective project documentation</li>
      <li><strong>.gitignore:</strong> Excluding unnecessary files from version control</li>
      <li><strong>Version Control:</strong> Basic Git integration for Python projects</li>
    </ul>

    <div className="code-example">
      <h4>Standard Project Structure:</h4>
      <pre><code>{`myproject/
├── README.md
├── requirements.txt
├── setup.py
├── .gitignore
├── .env
├── myproject/
│   ├── __init__.py
│   ├── main.py
│   ├── utils.py
│   └── config.py
├── tests/
│   ├── __init__.py
│   ├── test_main.py
│   └── test_utils.py
├── docs/
└── data/

# Sample .gitignore for Python
__pycache__/
*.py[cod]
*$py.class
*.so
.env
venv/
env/
*.egg-info/
.pytest_cache/
.coverage

# Sample setup.py
from setuptools import setup, find_packages

setup(
    name="myproject",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "requests>=2.28.0",
        "pandas>=1.4.0",
    ],
    author="Your Name",
    author_email="your.email@example.com",
    description="A brief description of your project",
)`}</code></pre>
    </div>

    <h3 id="development-tools">Development Tools Introduction</h3>
    
    <ul>
      <li><strong>Code Editors:</strong> VS Code, PyCharm configuration for Python</li>
      <li><strong>Code Formatting:</strong> Introduction to Black formatter</li>
      <li><strong>Linting:</strong> Basic code quality with flake8 or similar</li>
      <li><strong>Documentation:</strong> Writing docstrings and basic documentation</li>
    </ul>

    <div className="code-example">
      <h4>Development Tools Usage:</h4>
      <pre><code>{`# Install development tools
pip install black flake8 pytest

# Format code with Black
black myproject/

# Lint code with flake8
flake8 myproject/

# Example of well-documented code
def calculate_average(numbers):
    """
    Calculate the average of a list of numbers.
    
    Args:
        numbers (list): A list of numeric values
        
    Returns:
        float: The average of the input numbers
        
    Raises:
        ValueError: If the input list is empty
        TypeError: If the input contains non-numeric values
        
    Example:
        >>> calculate_average([1, 2, 3, 4, 5])
        3.0
    """
    if not numbers:
        raise ValueError("Cannot calculate average of empty list")
    
    if not all(isinstance(x, (int, float)) for x in numbers):
        raise TypeError("All elements must be numeric")
    
    return sum(numbers) / len(numbers)`}</code></pre>
    </div>

    <h3 id="popular-packages">Popular Third-Party Packages</h3>
    
    <ul>
      <li><strong>requests:</strong> HTTP library for web requests</li>
      <li><strong>datetime:</strong> Advanced date/time manipulation</li>
      <li><strong>collections:</strong> Specialized data structures</li>
      <li><strong>itertools:</strong> Advanced iteration tools</li>
      <li><strong>pathlib:</strong> Modern path handling</li>
    </ul>

    <div className="code-example">
      <h4>Popular Package Examples:</h4>
      <pre><code>{`# requests for HTTP operations
import requests

response = requests.get('https://api.github.com/users/octocat')
if response.status_code == 200:
    user_data = response.json()
    print(user_data['name'])

# collections for specialized data structures
from collections import defaultdict, Counter

# defaultdict - no KeyError for missing keys
word_count = defaultdict(int)
text = "hello world hello"
for word in text.split():
    word_count[word] += 1

# Counter - count elements automatically
letters = Counter("hello world")
print(letters.most_common(3))

# itertools for advanced iteration
from itertools import combinations, cycle

# Generate combinations
for combo in combinations(['A', 'B', 'C', 'D'], 2):
    print(combo)

# pathlib for modern path handling
from pathlib import Path

project_dir = Path(__file__).parent
data_dir = project_dir / "data"
data_dir.mkdir(exist_ok=True)

for file_path in data_dir.glob("*.txt"):
    print(file_path.name)`}</code></pre>
    </div>

    <h3 id="week7-goals">Week 7 Goals</h3>
    <p>Set up professional Python development environment with proper package management.</p>

    <div className="alert alert-info">
      <h4>🎯 PRACTICE TASKS:</h4>
      <ol>
        <li>Create a new project with virtual environment and proper structure</li>
        <li>Build a web scraper using requests and organize it professionally</li>
        <li>Create a data analysis project with pandas and proper documentation</li>
        <li>Set up automated code formatting and linting for a project</li>
        <li>Practice creating and managing requirements.txt files</li>
      </ol>
    </div>
  </div>
);

export default PythonWeek7;
