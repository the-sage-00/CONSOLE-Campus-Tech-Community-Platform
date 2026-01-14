import React from 'react';

const PythonWeek6 = () => {
  // Corrected BankAccount example
  const bankExample = `
# Custom exceptions
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Insufficient funds: {balance} < {amount}")

class BankAccount:
    def __init__(self, balance=0):
        self._balance = balance  # internal balance
    
    @property
    def balance(self):
        return self._balance
    
    def withdraw(self, amount):
        if amount > self._balance:
            raise InsufficientFundsError(self._balance, amount)
        self._balance -= amount
        return self._balance

# Using custom exceptions
try:
    account = BankAccount(100)
    print(f"Initial balance: {account.balance}")
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
  `.trim();

  const fileExample = `
import os
import tempfile
from pathlib import Path

# Working with paths
path = Path("data/files")
path.mkdir(parents=True, exist_ok=True)

# File processing with error handling
def process_file(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            for line_num, line in enumerate(file, 1):
                yield line_num, line.strip()
    except FileNotFoundError:
        print(f"File {filename} not found")
    except UnicodeDecodeError:
        print(f"Encoding error in file {filename}")

# Temporary files
with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
    temp_file.write("Temporary data")
    temp_filename = temp_file.name

# Directory operations
for root, dirs, files in os.walk("data"):
    print(f"Directory: {root}")
    for file in files:
        print(f"  File: {file}")
  `.trim();

  const serializationExample = `
import json
import csv
import pickle
import configparser

# JSON operations with error handling
def save_to_json(data, filename):
    try:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
    except (TypeError, ValueError) as e:
        print(f"JSON serialization error: {e}")

def load_from_json(filename):
    try:
        with open(filename, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File {filename} not found")
        return {}
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in {filename}: {e}")
        return {}

# Advanced CSV processing
class CSVProcessor:
    def __init__(self, filename):
        self.filename = filename
    
    def read_with_validation(self):
        try:
            with open(self.filename, 'r') as csvfile:
                reader = csv.DictReader(csvfile)
                for row_num, row in enumerate(reader, 2):
                    if self.validate_row(row):
                        yield row
                    else:
                        print(f"Invalid row {row_num}: {row}")
        except FileNotFoundError:
            print(f"CSV file {self.filename} not found")
    
    def validate_row(self, row):
        return all(value.strip() for value in row.values())

# Configuration file handling
config = configparser.ConfigParser()
config['DEFAULT'] = {
    'debug': 'False',
    'database_url': 'localhost'
}
config['development'] = {
    'debug': 'True',
    'database_url': 'dev.db'
}

with open('config.ini', 'w') as configfile:
    config.write(configfile)
  `.trim();

  const loggingExample = `
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'
)

logger = logging.getLogger(__name__)

def process_data(data):
    logger.info(f"Processing {len(data)} items")
    
    try:
        assert isinstance(data, list), "Data must be a list"
        assert len(data) > 0, "Data cannot be empty"
        
        results = []
        for item in data:
            if validate_item(item):
                results.append(process_item(item))
            else:
                logger.warning(f"Invalid item skipped: {item}")
        
        logger.info(f"Successfully processed {len(results)} items")
        return results
        
    except Exception as e:
        logger.error(f"Error processing data: {e}")
        raise

def validate_item(item):
    return isinstance(item, (int, float)) and item > 0
  `.trim();

  return (
    <div>
      <h2 id="week-6">🛡 Week 6: Error Handling & File Operations</h2>
      
      <p>Learn comprehensive exception handling, advanced file operations, data serialization, and defensive programming techniques.</p>

      <h3 id="exception-handling">Comprehensive Exception Handling</h3>
      <ul>
        <li><strong>Exception Types:</strong> Understanding built-in exception hierarchy</li>
        <li><strong>try-except-else-finally:</strong> Complete error handling structure</li>
        <li><strong>Multiple Exception Types:</strong> Catching different exceptions appropriately</li>
        <li><strong>Custom Exceptions:</strong> Creating user-defined exception classes</li>
        <li><strong>Exception Chaining:</strong> Preserving original exception information</li>
      </ul>
      <div className="code-example">
        <h4>BankAccount Exception Example:</h4>
        <pre><code>{bankExample}</code></pre>
      </div>

      <h3 id="advanced-file-operations">Advanced File Operations</h3>
      <ul>
        <li><strong>Text vs Binary Files:</strong> Understanding different file types</li>
        <li><strong>File Encoding:</strong> Handling different character encodings (UTF-8, etc.)</li>
        <li><strong>Large File Processing:</strong> Reading files efficiently</li>
        <li><strong>Directory Operations:</strong> Creating, listing, and managing directories</li>
        <li><strong>Temporary Files:</strong> Using tempfile module for temporary storage</li>
      </ul>
      <div className="code-example">
        <h4>Advanced File Operations:</h4>
        <pre><code>{fileExample}</code></pre>
      </div>

      <h3 id="data-serialization">Data Serialization</h3>
      <ul>
        <li><strong>JSON Processing:</strong> Reading and writing JSON data</li>
        <li><strong>CSV Handling:</strong> Advanced CSV operations with csv module</li>
        <li><strong>Pickle Module:</strong> Serializing Python objects</li>
        <li><strong>Configuration Files:</strong> Reading .ini and .conf files</li>
        <li><strong>Data Validation:</strong> Ensuring data integrity when reading files</li>
      </ul>
      <div className="code-example">
        <h4>Data Serialization Examples:</h4>
        <pre><code>{serializationExample}</code></pre>
      </div>

      <h3 id="logging-debugging">Logging and Debugging</h3>
      <ul>
        <li><strong>Logging Module:</strong> Basic logging configuration and usage</li>
        <li><strong>Debug Tools:</strong> Using Python debugger (pdb) basics</li>
        <li><strong>Error Messages:</strong> Writing informative error messages</li>
        <li><strong>Defensive Programming:</strong> Input validation and assertions</li>
      </ul>
      <div className="code-example">
        <h4>Logging Examples:</h4>
        <pre><code>{loggingExample}</code></pre>
      </div>

      <h3 id="week6-goals">Week 6 Goals</h3>
      <p>Build robust applications with comprehensive error handling and file processing capabilities.</p>

      <div className="alert alert-info">
        <h4>🎯 PRACTICE TASKS:</h4>
        <ol>
          <li>Build a file backup system with error handling</li>
          <li>Create a data validator that checks CSV files for integrity</li>
          <li>Build a configuration manager that handles different file formats</li>
          <li>Create a log analyzer that processes large log files</li>
          <li>Build a data migration tool with comprehensive error reporting</li>
        </ol>
      </div>
    </div>
  );
};

export default PythonWeek6;
