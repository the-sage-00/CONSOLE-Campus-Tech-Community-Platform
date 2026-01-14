import React from 'react';

const MLWeek2 = () => (
  <div>
    <h2 id="week-2">🦝 Week 2 (Basic Mathematics for ML, KNN, Linear Regression)</h2>
    
    <div style={{ backgroundColor: '#470101', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <p><strong>Note:</strong> I shall be constantly referring to Andrew NG's <a href="https://www.youtube.com/watch?v=jGwO_UgTS7I&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU" target="_blank" rel="noopener noreferrer">CS229 Course Lecture Videos</a>, for they are the gold standard in any introductory Machine Learning course. The <a href="https://cs229.stanford.edu/lectures-spring2022/main_notes.pdf" target="_blank" rel="noopener noreferrer">Lecture Notes</a> of these course are pretty well made and can be referred to when needed. For additional notes, assignments, problem sets etc, refer the <a href="https://cs229.stanford.edu/syllabus-autumn2018.html" target="_blank" rel="noopener noreferrer">course site</a>.</p>
    </div>

    <div style={{ backgroundColor: '#470101', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <p>Along with CS229, following are some great compilation of resources:</p>
      <ul>
        <li>This <a href="https://aman.ai/" target="_blank" rel="noopener noreferrer">website maintained by Aman Chadha</a> contains comprehensive notes of most of the important Stanford ML Courses, Important Research papers and AI Resource Compilations.</li>
        <li>YouTube channel <a href="https://www.youtube.com/@statquest" target="_blank" rel="noopener noreferrer">StatQuest by Josh Starmer</a> contains comprehensive tutorials on basic ML concepts, with great visualizations and intuition pumps.</li>
        <li>The Website of <a href="https://www.mariushobbhahn.com/aboutme/" target="_blank" rel="noopener noreferrer">Marius Hobbhahn</a> contains some really insightful blogs which go into the depths of mathematics behind ML.</li>
      </ul>
    </div>

    <h3 id="day-1">👾 Day 1: Descriptive Statistics</h3>
    <p>One must be comfortable with processing data using Python libraries. Before going further, let us recall some basic concepts of Maths and Statistics. Follow these resources:</p>
    <ul>
      <li>Mean, Variance, Standard Deviation – Read theory from the book, <em>Statistics, 11th Edition</em> by Robert S. Witte, sections 4.1 - 4.6.</li>
      <li>Gaussian Distribution – Read <a href="https://medium.com/analytics-vidhya/normal-distribution-and-machine-learning-ec9d3ca05070" target="_blank" rel="noopener noreferrer">this</a> blog.</li>
      <li>Correlation in Variables – Read theory from the book, <em>Statistics, 11th Edition</em> by Robert S. Witte, Chapter 6.</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Probability and Inferential Statistics</h3>
    <p>Knowledge of probability is always useful in ML algorithms. It might sound a bit of an overkill, but for the next two days, we will revise some concepts in probability. You can use your JEE Notes or cover theory from the book, <em>Statistics, 11th Edition</em> by Robert S. Witte, sections 8.7 - 8.10. Go through important theorems like Bayes' Theorem and Conditional Probability. Audit the Coursera Inferential Statistics <a href="https://www.coursera.org/learn/inferential-statistics-intro" target="_blank" rel="noopener noreferrer">Course</a> for free and complete Week 1 up to CLT and Sampling.</p>

    <h3 id="day-3">👾 Day 3: Inferential Statistics Continued</h3>
    <p>Complete the remaining portion of Week 1 and Week 2 of the Inferential Statistics course. You can also use the book, <em>Statistics, 11th Edition</em> by Robert S. Witte, as a reference.</p>

    <h3 id="day-4">👾 Day 4: Intro to ML and Classification using KNNs</h3>
    <p>The common problems you would attempt to solve using supervised machine learning can be categorized into either a regression or a classification one. For example, predicting the price of a house is a regression problem, while classifying an image as a dog or cat is a classification problem. When you are outputting a value (real number), it is a regression problem, while predicting a category (class) is a classification problem. For a better understanding, you can refer <a href="https://www.geeksforgeeks.org/ml-classification-vs-regression/" target="_blank" rel="noopener noreferrer">this</a> blogs on classification vs regression.</p>

    <h4>🐼 Classification of ML Models</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/B3K9q0h/image.png" width="600" alt="ML Algorithms Classifications" />
      <em>ML Algorithms Classifications</em>
    </div>

    <p>Apart from this classification, Machine Learning Algorithms can be broadly categorized into <strong>Supervised, Unsupervised, Semi-Supervised and Reinforcement Machine Learning</strong>.</p>
    <p>In <strong><em>supervised machine learning</em></strong>, labeled datasets are used to train algorithms to classify data or predict outcomes accurately. This means that the data provided to you have some kind of label or information attached, and this label is the value which the Algorithm has to learn to predict.</p>
    <p><strong><em>Unsupervised machine learning</em></strong>, uses machine learning algorithms to analyze and cluster unlabeled datasets. These algorithms discover hidden patterns or data groupings without the need for human intervention.</p>
    <p>As the name suggests, <strong><em>Semi Supervised learning</em></strong> lies somewhere between supervised and unsupervised learning. It uses a smaller labeled data set to guide classification and feature extraction from a larger, unlabeled data set.</p>
    <p><strong><em>Reinforcement Learning algorithms</em></strong> form policies and learn via trial and error. Whether the policy is correct or wrong is determined via positive or negative reinforcements provided to the agent on completion of certain tasks.</p>
    <p>For a better understanding of these classifications, refer to <a href="https://www.geeksforgeeks.org/types-of-machine-learning/" target="_blank" rel="noopener noreferrer">this</a> article by GfG.</p>

    <h4>🐼 K Nearest Neighbor Algorithm (KNN)</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/m9pP2gj/image.png" width="300" alt="KNN Algorithm" />
      <em>KNN Algorithm</em>
    </div>

    <p>KNNs are one of the first classification algorithms. Watch the first 5 videos of <a href="https://youtube.com/playlist?list=PLBv09BD7ez_68OwSB97WXyIOvvI5nqi-3" target="_blank" rel="noopener noreferrer">this</a> playlist to know more. This would be a good point to implement the KNN Algorithm on your own, only using NumPy, Pandas and MatPlotLib.</p>
    <p>Building algorithms from scratch is important, but using modules to implement algos is fast and convenient when an alteration in the algo is not required. Try to implement a KNN via SciKitLearn by following <a href="https://www.digitalocean.com/community/tutorials/k-nearest-neighbors-knn-in-python" target="_blank" rel="noopener noreferrer">this</a> tutorial.</p>

    <h3 id="day-5-6">👾 Day 5 and 6: Linear Regression and Gradient Descent</h3>
    
    <h4>🐼 Hypothesis Function</h4>
    <p>A hypothesis function was the function that our model is supposed to learn by looking at the training data. Once the model is trained, we are going to feed unseen data into hypothesis function and it is magically going to predict a correct (or nearly correct) answer! The hypothesis function is itself a function of the weights of the model. These are parameters associated with the input features that we can tweak to get the hypothesis closer to the ground truth.</p>

    <h4>🐼 Cost Functions</h4>
    <p>But how do we ascertain whether our hypothesis function is good enough? That's the job of the cost function. It gives us a measure of how poor or how wrong the hypothesis function is performing in comparison to the ground truth. It is a measure of average error over the whole dataset. You might also come across the term loss function, if the cost function is the average error over the dataset, then understand loss function as the error that the cost function averages for each individual example. You can have a look at some commonly used loss functions <a href="https://www.geeksforgeeks.org/ml-common-loss-functions/" target="_blank" rel="noopener noreferrer">here</a>.</p>

    <h4>🐼 Gradient Descent</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/M7JxNMK/image.png" width="400" alt="Gradient Descent" />
      <em>Gradient Descent</em>
    </div>

    <p>Gradient descent is simply an algorithm that optimizes the weights of the hypothesis function to minimize the cost function (i.e., to get closer to the actual output). Gradient Descent is used to minimize the objective function by updating the parameters (which are usually all the weights and biases of the neural network) in a direction of maximum descent.</p>

    <h4>🐼 Stochastic Gradient Descent</h4>
    <p>As opposed to Vanilla Gradient Descent, Stochastic Gradient Descent updates the parameters after evaluating the gradients for each training example. Hence, it updates the parameters before evaluating the gradient for other similar training examples in the dataset, so the training speed increases.</p>

    <h4>🐼 Mini Batch Gradient Descent</h4>
    <p>Mini Batch Gradient Descent tries to incorporate the best of both, Batch GD and SGD by dividing the training dataset into smaller batches and then updating the parameters after evaluation of gradients of the training samples in each mini-batch.</p>

    <h4>🐼 Linear Regression</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/L6CrbMs/image.png" width="300" alt="Linear Regression" />
      <em>Linear Regression</em>
    </div>

    <p>Go through <a href="https://towardsdatascience.com/linear-regression-detailed-view-ea73175f6e86" target="_blank" rel="noopener noreferrer">this</a> article on linear regression. For a deeper intuition, watch <a href="https://www.youtube.com/watch?v=1-OGRohmH2s" target="_blank" rel="noopener noreferrer">this</a> video. You can refer to <a href="https://www.youtube.com/watch?v=IHZwWFHWa-w&ab_channel=3Blue1Brown" target="_blank" rel="noopener noreferrer">this</a>, <a href="https://www.youtube.com/watch?v=sDv4f4s2SB8&ab_channel=StatQuestwithJoshStarmer" target="_blank" rel="noopener noreferrer">this</a> and <a href="https://www.youtube.com/watch?v=sDv4f4s2SB8&ab_channel=StatQuestwithJoshStarmer" target="_blank" rel="noopener noreferrer">this</a> for a better understanding of Gradient Descent.</p>
    <p>This would be a good time to program Linear Regression from scratch by only using Numpy, Pandas and MatPlotLib. Before that, in order to structure your code effectively, it is important to understand Object Oriented Programming, which you can learn from <a href="https://www.datacamp.com/tutorial/python-oop-tutorial" target="_blank" rel="noopener noreferrer">here</a>. Once you've gone through OOPs, you are ready to code your own linear regression model. Use <a href="https://www.kaggle.com/datasets/harrimansaragih/dummy-advertising-and-sales-data" target="_blank" rel="noopener noreferrer">this</a> dataset for training and testing the model.</p>
    <p>Follow <a href="https://www.dataspoof.info/post/everything-that-you-should-know-about-linear-regression-in-python/" target="_blank" rel="noopener noreferrer">this</a> article to understand the implementation using various libraries. If you are further interested, you may see <em>Statistics, 11th Edition</em> by Robert S. Witte, Chapter 7.</p>
    <p>For those who are curious to delve into the intricacies and maths behind LR and GS, you can watch <a href="https://youtu.be/4b4MUYve_U8?si=0baDG_bJF8gW_FeF" target="_blank" rel="noopener noreferrer">this</a> video by Andrew NG (Highly Recommended).</p>

    <h3 id="day-7">👾 Day 7: Preparation for Next Week</h3>
    <p>Towards the end of the week, let us revise some tools in linear algebra. <a href="https://www.freecodecamp.org/news/how-machine-learning-leverages-linear-algebra-to-optimize-model-trainingwhy-you-should-learn-the-fundamentals-of-linear-algebra/#:~:text=Linear%20Algebra%20is%20the%20mathematical,as%20vectors%2C%20matrices%20and%20tensors." target="_blank" rel="noopener noreferrer">This</a> has some motivation regarding the content. Revise Vectors, Dot Product, Outer Product of Matrices, Eigenvectors from MTH102 course lectures <a href="https://drive.google.com/drive/folders/1DfKwYNYUWB_ALvCRtScFKGAJw3j00v0f" target="_blank" rel="noopener noreferrer">here</a>. Revise some concepts on multivariable mathematics (MTH101) <a href="https://home.iitk.ac.in/~psraj/mth101/lecture_notes.html" target="_blank" rel="noopener noreferrer">here</a>.</p>
  </div>
);

export default MLWeek2; 