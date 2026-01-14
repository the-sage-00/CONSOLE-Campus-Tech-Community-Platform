import React from 'react';
import './Roadmap.css';

const AIMLRoadmap = () => {
  return (
    <div className="roadmap-container">
      <h1 id="roadmap-to-ai-ml">Roadmap to AI/ML</h1>

      <section>
        <h3 id="what-is-ai-ml">What is AI/ML?</h3>
        <p>Artificial Intelligence (AI) and Machine Learning (ML) are technologies that enable computers to learn and make decisions without being explicitly programmed. AI focuses on creating intelligent systems that can perform tasks that typically require human intelligence, while ML is a subset of AI that focuses on algorithms and statistical models that enable computers to improve their performance on a specific task through experience.</p>
      </section>

      <section>
        <h3 id="why-learn-ai-ml">Why learn AI/ML?</h3>
        <p>AI/ML is transforming every industry from healthcare to finance, from transportation to entertainment. Learning AI/ML opens up exciting career opportunities and allows you to work on cutting-edge technologies that are shaping the future. Whether you want to build intelligent applications, work in data science, or contribute to research, AI/ML skills are becoming increasingly valuable in today's tech landscape.</p>
        <p><em>Note:</em> In case of any doubts while going through this roadmap, You can post your query on the AI/ML Channel on the discord server of Console Tech Community.</p>
      </section>

      <section>
        <h2 id="week-1basics">Week 1(Python & Mathematics)</h2>
        <p>Let's start with the fundamentals. This week you'll learn Python programming and the essential mathematical concepts that form the foundation of AI/ML.</p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Day Number</th>
                <th>Resources</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Day 1</td>
                <td><strong>Python Basics</strong><br /><br />Start with Python fundamentals as it's the most popular language for AI/ML.<br /><br /><a href="https://www.youtube.com/watch?v=kqtD5dpn9C8" target="_blank" rel="noopener noreferrer">Python for Beginners</a><br /><br /><a href="https://www.w3schools.com/python/" target="_blank" rel="noopener noreferrer">Python Tutorial</a><br /><br />Focus on: Variables, Data Types, Control Structures, Functions, and Object-Oriented Programming.</td>
              </tr>
              <tr>
                <td>Day 2</td>
                <td><strong>Python Libraries</strong><br /><br />Learn essential Python libraries for data science and AI.<br /><br /><a href="https://numpy.org/doc/stable/user/quickstart.html" target="_blank" rel="noopener noreferrer">NumPy Tutorial</a><br /><br /><a href="https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html" target="_blank" rel="noopener noreferrer">Pandas Tutorial</a><br /><br />Practice with: Arrays, DataFrames, Data manipulation, and basic operations.</td>
              </tr>
              <tr>
                <td>Day 3</td>
                <td><strong>Mathematics Fundamentals</strong><br /><br />Linear Algebra is crucial for understanding ML algorithms.<br /><br /><a href="https://www.youtube.com/watch?v=J7DzL2_Na80" target="_blank" rel="noopener noreferrer">Linear Algebra for Machine Learning</a><br /><br />Topics: Vectors, Matrices, Eigenvalues, Eigenvectors, and Matrix operations.</td>
              </tr>
              <tr>
                <td>Day 4</td>
                <td><strong>Statistics & Probability</strong><br /><br />Statistical concepts are fundamental to ML.<br /><br /><a href="https://www.youtube.com/watch?v=xxpc-HPKN28" target="_blank" rel="noopener noreferrer">Statistics for Data Science</a><br /><br />Topics: Probability distributions, Hypothesis testing, Confidence intervals, and Correlation.</td>
              </tr>
              <tr>
                <td>Day 5</td>
                <td><strong>Data Visualization</strong><br /><br />Learn to visualize data effectively.<br /><br /><a href="https://matplotlib.org/stable/tutorials/index.html" target="_blank" rel="noopener noreferrer">Matplotlib Tutorial</a><br /><br /><a href="https://seaborn.pydata.org/tutorial.html" target="_blank" rel="noopener noreferrer">Seaborn Tutorial</a><br /><br />Practice creating: Histograms, Scatter plots, Box plots, and Heatmaps.</td>
              </tr>
              <tr>
                <td>Day 6</td>
                <td><strong>Data Preprocessing</strong><br /><br />Learn to clean and prepare data for ML models.<br /><br /><a href="https://scikit-learn.org/stable/modules/preprocessing.html" target="_blank" rel="noopener noreferrer">Scikit-learn Preprocessing</a><br /><br />Topics: Handling missing values, Feature scaling, Encoding categorical variables, and Feature selection.</td>
              </tr>
              <tr>
                <td>Day 7</td>
                <td><strong>Mini Project</strong><br /><br />Apply what you've learned by working on a small data analysis project.<br /><br />Choose a dataset from <a href="https://www.kaggle.com/datasets" target="_blank" rel="noopener noreferrer">Kaggle</a> and perform exploratory data analysis.<br /><br />Create visualizations and write a summary of your findings.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Make sure to practice coding every day and work on the mini project before moving to the next week. Building a strong foundation is crucial for success in AI/ML!</p>
      </section>

      <section>
        <h2 id="week-2machine-learning">Week 2(Machine Learning Basics)</h2>
        <p>Now let's dive into the core concepts of Machine Learning and understand different types of learning algorithms.</p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Day Number</th>
                <th>Resources</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Day 1</td>
                <td><strong>Introduction to Machine Learning</strong><br /><br />Understand what Machine Learning is and its types.<br /><br /><a href="https://www.youtube.com/watch?v=KNAWp2S3w94" target="_blank" rel="noopener noreferrer">Machine Learning Basics</a><br /><br />Topics: Supervised vs Unsupervised Learning, Training vs Testing data, and Model evaluation.</td>
              </tr>
              <tr>
                <td>Day 2</td>
                <td><strong>Linear Regression</strong><br /><br />Start with the simplest ML algorithm.<br /><br /><a href="https://www.youtube.com/watch?v=wYPUhge9w5c" target="_blank" rel="noopener noreferrer">Linear Regression Tutorial</a><br /><br />Practice implementing linear regression using scikit-learn and understand concepts like cost function and gradient descent.</td>
              </tr>
              <tr>
                <td>Day 3</td>
                <td><strong>Logistic Regression</strong><br /><br />Learn classification with logistic regression.<br /><br /><a href="https://www.youtube.com/watch?v=7qJ7GksOXoA" target="_blank" rel="noopener noreferrer">Logistic Regression Explained</a><br /><br />Topics: Binary classification, Sigmoid function, and Decision boundaries.</td>
              </tr>
              <tr>
                <td>Day 4</td>
                <td><strong>Decision Trees</strong><br /><br />Understand tree-based algorithms.<br /><br /><a href="https://www.youtube.com/watch?v=7VeUPuFGJHk" target="_blank" rel="noopener noreferrer">Decision Trees Tutorial</a><br /><br />Learn about: Information gain, Gini impurity, and Tree pruning.</td>
              </tr>
              <tr>
                <td>Day 5</td>
                <td><strong>Random Forest</strong><br /><br />Explore ensemble methods.<br /><br /><a href="https://www.youtube.com/watch?v=J4Wdy0Wc_xQ" target="_blank" rel="noopener noreferrer">Random Forest Algorithm</a><br /><br />Topics: Bagging, Feature importance, and Hyperparameter tuning.</td>
              </tr>
              <tr>
                <td>Day 6</td>
                <td><strong>Support Vector Machines</strong><br /><br />Learn about SVMs for classification.<br /><br /><a href="https://www.youtube.com/watch?v=efR1C6CvhmE" target="_blank" rel="noopener noreferrer">SVM Tutorial</a><br /><br />Concepts: Kernel functions, Margin, and Support vectors.</td>
              </tr>
              <tr>
                <td>Day 7</td>
                <td><strong>Model Evaluation</strong><br /><br />Learn how to evaluate ML models properly.<br /><br /><a href="https://scikit-learn.org/stable/modules/model_evaluation.html" target="_blank" rel="noopener noreferrer">Model Evaluation Guide</a><br /><br />Metrics: Accuracy, Precision, Recall, F1-score, and ROC curves.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Practice implementing each algorithm on different datasets. Understanding the theory and being able to implement it are both important!</p>
      </section>

      <section>
        <h2 id="week-3deep-learning">Week 3(Deep Learning)</h2>
        <p>Now let's explore the exciting world of Deep Learning and Neural Networks.</p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Day Number</th>
                <th>Resources</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Day 1</td>
                <td><strong>Neural Networks Basics</strong><br /><br />Understand the fundamentals of neural networks.<br /><br /><a href="https://www.youtube.com/watch?v=aircAruvnKk" target="_blank" rel="noopener noreferrer">Neural Networks Explained</a><br /><br />Topics: Neurons, Activation functions, Forward propagation, and Backpropagation.</td>
              </tr>
              <tr>
                <td>Day 2</td>
                <td><strong>TensorFlow/Keras</strong><br /><br />Learn to build neural networks with TensorFlow.<br /><br /><a href="https://www.tensorflow.org/tutorials" target="_blank" rel="noopener noreferrer">TensorFlow Tutorials</a><br /><br />Practice building simple neural networks and understanding the API.</td>
              </tr>
              <tr>
                <td>Day 3</td>
                <td><strong>Convolutional Neural Networks</strong><br /><br />Learn CNNs for image processing.<br /><br /><a href="https://www.youtube.com/watch?v=FTr3n7uBIuE" target="_blank" rel="noopener noreferrer">CNN Tutorial</a><br /><br />Concepts: Convolution, Pooling, and Feature maps.</td>
              </tr>
              <tr>
                <td>Day 4</td>
                <td><strong>Recurrent Neural Networks</strong><br /><br />Understand RNNs for sequential data.<br /><br /><a href="https://www.youtube.com/watch?v=UNmqTiOnRfg" target="_blank" rel="noopener noreferrer">RNN and LSTM Tutorial</a><br /><br />Topics: LSTM, GRU, and Sequence modeling.</td>
              </tr>
              <tr>
                <td>Day 5</td>
                <td><strong>Transfer Learning</strong><br /><br />Learn to use pre-trained models.<br /><br /><a href="https://www.tensorflow.org/tutorials/images/transfer_learning" target="_blank" rel="noopener noreferrer">Transfer Learning Guide</a><br /><br />Practice fine-tuning models like VGG, ResNet, and Inception.</td>
              </tr>
              <tr>
                <td>Day 6</td>
                <td><strong>Natural Language Processing</strong><br /><br />Introduction to NLP with deep learning.<br /><br /><a href="https://www.youtube.com/watch?v=8rXD5-xhemo" target="_blank" rel="noopener noreferrer">NLP with Deep Learning</a><br /><br />Topics: Word embeddings, Text preprocessing, and Sentiment analysis.</td>
              </tr>
              <tr>
                <td>Day 7</td>
                <td><strong>Project: Image Classification</strong><br /><br />Build a complete image classification project.<br /><br />Use a dataset like CIFAR-10 or MNIST and implement a CNN to classify images.<br /><br />Focus on: Data preprocessing, Model architecture, Training, and Evaluation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>Deep Learning requires significant computational resources. Consider using Google Colab or Kaggle Notebooks for free GPU access.</p>
      </section>

      <section>
        <h2 id="week-4advanced-topics">Week 4(Advanced Topics)</h2>
        <p>Explore advanced AI/ML concepts and specialized applications.</p>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Day Number</th>
                <th>Resources</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Day 1</td>
                <td><strong>Computer Vision</strong><br /><br />Advanced image processing and computer vision.<br /><br /><a href="https://opencv-python-tutroals.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">OpenCV Tutorial</a><br /><br />Topics: Image processing, Object detection, and Face recognition.</td>
              </tr>
              <tr>
                <td>Day 2</td>
                <td><strong>Reinforcement Learning</strong><br /><br />Introduction to RL concepts.<br /><br /><a href="https://www.youtube.com/watch?v=JgvyzIkgxF0" target="_blank" rel="noopener noreferrer">Reinforcement Learning Basics</a><br /><br />Concepts: Q-learning, Policy gradients, and Environment interaction.</td>
              </tr>
              <tr>
                <td>Day 3</td>
                <td><strong>Generative Adversarial Networks</strong><br /><br />Learn about GANs for generating data.<br /><br /><a href="https://www.youtube.com/watch?v=Sw9r8CL98N0" target="_blank" rel="noopener noreferrer">GAN Tutorial</a><br /><br />Practice: Generating images, text, and other creative content.</td>
              </tr>
              <tr>
                <td>Day 4</td>
                <td><strong>Model Deployment</strong><br /><br />Learn to deploy ML models in production.<br /><br /><a href="https://www.tensorflow.org/tfx" target="_blank" rel="noopener noreferrer">TensorFlow Serving</a><br /><br />Topics: Model serialization, API development, and Cloud deployment.</td>
              </tr>
              <tr>
                <td>Day 5</td>
                <td><strong>MLOps</strong><br /><br />Machine Learning Operations and best practices.<br /><br /><a href="https://mlops.community/" target="_blank" rel="noopener noreferrer">MLOps Community</a><br /><br />Focus on: Model versioning, Monitoring, and Continuous integration.</td>
              </tr>
              <tr>
                <td>Day 6</td>
                <td><strong>Ethics in AI</strong><br /><br />Understanding the ethical implications of AI.<br /><br /><a href="https://www.youtube.com/watch?v=7Pq-S557XQU" target="_blank" rel="noopener noreferrer">AI Ethics</a><br /><br />Topics: Bias, Fairness, Transparency, and Responsible AI development.</td>
              </tr>
              <tr>
                <td>Day 7</td>
                <td><strong>Capstone Project</strong><br /><br />Build a comprehensive AI/ML project.<br /><br />Choose a domain: Computer Vision, NLP, or Recommendation Systems.<br /><br />Implement a complete solution from data collection to deployment.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>This week focuses on specialized topics. Choose areas that interest you most and dive deeper into those specific domains.</p>
      </section>

      <section>
        <h2>Extra Resources</h2>
        <p>Here are additional resources to help you continue your AI/ML journey:</p>
        <ul>
          <li><a href="https://www.coursera.org/learn/machine-learning" target="_blank" rel="noopener noreferrer">Machine Learning Course by Andrew Ng</a></li>
          <li><a href="https://www.fast.ai/" target="_blank" rel="noopener noreferrer">Fast.ai - Practical Deep Learning</a></li>
          <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer">Kaggle Learn - Interactive Tutorials</a></li>
          <li><a href="https://paperswithcode.com/" target="_blank" rel="noopener noreferrer">Papers With Code - Latest Research</a></li>
          <li><a href="https://www.youtube.com/c/3blue1brown" target="_blank" rel="noopener noreferrer">3Blue1Brown - Mathematical Intuition</a></li>
          <li><a href="https://www.youtube.com/c/StatQuestwithJoshStarmer" target="_blank" rel="noopener noreferrer">StatQuest - Statistical Concepts</a></li>
        </ul>
      </section>

      <section>
        <h2>What's Next?</h2>
        <p>Congratulations on completing the AI/ML roadmap! Here are some directions you can explore next:</p>
        <ul>
          <li><strong>Specialization:</strong> Choose a specific domain like Computer Vision, NLP, or Robotics</li>
          <li><strong>Research:</strong> Read research papers and contribute to open-source projects</li>
          <li><strong>Competitions:</strong> Participate in Kaggle competitions to improve your skills</li>
          <li><strong>Industry Projects:</strong> Work on real-world problems and build a portfolio</li>
          <li><strong>Advanced Topics:</strong> Explore topics like Transformers, BERT, and Large Language Models</li>
        </ul>
        <p>Remember, AI/ML is a rapidly evolving field. Stay updated with the latest developments and continue learning!</p>
      </section>

      <section>
        <h2>Contributors -</h2>
        <ul>
          <li>Escape Tech Community Team</li>
        </ul>
      </section>
    </div>
  );
};

export default AIMLRoadmap; 