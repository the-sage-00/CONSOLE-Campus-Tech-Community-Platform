import React from 'react';

const MLWeek6 = () => (
  <div>
    <h2 id="week-6">🦝 Week 6 (Neural Networks and Deep Learning Fundamentals)</h2>
    
    <p>This week we'll dive into neural networks and deep learning, starting from the basics and building up to more complex architectures.</p>

    <h3 id="day-1">👾 Day 1: Introduction to Neural Networks</h3>
    <p>Neural networks are computational models inspired by biological neural networks in the brain. They consist of interconnected nodes (neurons) that process information and learn patterns from data.</p>
    
    <h4>🐼 Key Concepts</h4>
    <ul>
      <li><strong>Neurons:</strong> Basic computational units</li>
      <li><strong>Weights:</strong> Connection strengths between neurons</li>
      <li><strong>Bias:</strong> Additional parameter for flexibility</li>
      <li><strong>Activation Function:</strong> Non-linear transformation</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Multi-Layer Perceptrons (MLPs)</h3>
    <p>Multi-layer perceptrons are feedforward neural networks with one or more hidden layers between the input and output layers.</p>
    
    <h4>🐼 Architecture</h4>
    <ul>
      <li><strong>Input Layer:</strong> Receives the input features</li>
      <li><strong>Hidden Layers:</strong> Process the information</li>
      <li><strong>Output Layer:</strong> Produces the final prediction</li>
    </ul>

    <h3 id="day-3">👾 Day 3: Backpropagation</h3>
    <p>Backpropagation is the algorithm used to train neural networks by computing gradients of the loss function with respect to the network parameters.</p>
    
    <h4>🐼 Algorithm Steps</h4>
    <ol>
      <li>Forward pass: Compute predictions and loss</li>
      <li>Backward pass: Compute gradients from output to input</li>
      <li>Update parameters using gradient descent</li>
    </ol>

    <h3 id="day-4">👾 Day 4: Convolutional Neural Networks (CNNs)</h3>
    <p>CNNs are specialized neural networks designed for processing grid-like data, such as images.</p>
    
    <h4>🐼 Key Components</h4>
    <ul>
      <li><strong>Convolutional Layer:</strong> Applies filters to extract features</li>
      <li><strong>Pooling Layer:</strong> Reduces spatial dimensions</li>
      <li><strong>Fully Connected Layer:</strong> Final classification layer</li>
    </ul>

    <h3 id="day-5">👾 Day 5: Recurrent Neural Networks (RNNs)</h3>
    <p>RNNs are designed to process sequential data by maintaining hidden states.</p>
    
    <h4>🐼 Applications</h4>
    <ul>
      <li>Natural Language Processing</li>
      <li>Speech Recognition</li>
      <li>Machine Translation</li>
      <li>Time Series Prediction</li>
    </ul>

    <h3 id="day-7">👾 Day 7: Practical Deep Learning Projects</h3>
    <p>Today we'll apply our knowledge to practical deep learning projects.</p>
    
    <h4>🐼 Project Ideas</h4>
    <ul>
      <li><strong>Image Classification:</strong> Build a CNN to classify images</li>
      <li><strong>Text Classification:</strong> Build an RNN for text classification</li>
      <li><strong>Time Series Prediction:</strong> Build an RNN for forecasting</li>
      <li><strong>Transfer Learning:</strong> Use pre-trained models</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Follow <a href="https://pytorch.org/tutorials/" target="_blank" rel="noopener noreferrer">PyTorch tutorials</a></li>
      <li>Check out <a href="https://www.tensorflow.org/tutorials" target="_blank" rel="noopener noreferrer">TensorFlow tutorials</a></li>
      <li>Practice with <a href="https://www.kaggle.com/competitions" target="_blank" rel="noopener noreferrer">Kaggle competitions</a></li>
    </ul>
  </div>
);

export default MLWeek6; 