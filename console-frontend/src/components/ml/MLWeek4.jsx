import React from 'react';

const MLWeek4 = () => (
  <div>
    <h2 id="week-4">🦝 Week 4 (Logistic Regression, Naive Bayes, Decision Trees)</h2>
    
    <h3 id="day-1">👾 Day 1: Logistic Regression</h3>
    <p>Logistic Regression is a supervised learning algorithm used for binary classification problems. Despite its name, it's a classification algorithm, not a regression algorithm. It uses a logistic function to model the probability of a certain class or event occurring.</p>
    
    <h4>🐼 Why not Linear Regression for Classification?</h4>
    <p>Linear regression is not suitable for classification problems because:</p>
    <ul>
      <li>It can predict values outside the [0,1] range, which doesn't make sense for probabilities</li>
      <li>It assumes a linear relationship between features and target, which may not hold for classification</li>
      <li>It's sensitive to outliers</li>
    </ul>
    
    <h4>🐼 Sigmoid Function</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/VqKJ8MZ/image.png" width="400" alt="Sigmoid Function" />
      <em>Sigmoid Function</em>
    </div>
    
    <p>The sigmoid function (also called logistic function) is defined as:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      σ(z) = 1 / (1 + e^(-z))
    </p>
    
    <p>This function maps any real number to a value between 0 and 1, making it perfect for representing probabilities.</p>
    
    <h4>🐼 Hypothesis Function</h4>
    <p>In logistic regression, the hypothesis function is:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      h(x) = σ(θ^T x) = 1 / (1 + e^(-θ^T x))
    </p>
    
    <p>where θ are the parameters and x are the features.</p>
    
    <h4>🐼 Cost Function</h4>
    <p>The cost function for logistic regression is the log loss (cross-entropy loss):</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      J(θ) = -(1/m) * Σ[y^(i) * log(h(x^(i))) + (1-y^(i)) * log(1-h(x^(i)))]
    </p>
    
    <p>This function penalizes wrong predictions more heavily than linear regression's mean squared error.</p>
    
    <h4>🐼 Gradient Descent Update Rule</h4>
    <p>The gradient descent update rule for logistic regression is:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      θ_j := θ_j - α * (1/m) * Σ(h(x^(i)) - y^(i)) * x_j^(i)
    </p>
    
    <p>This looks similar to linear regression, but the hypothesis function is different.</p>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=7qJ7GksOXoA" target="_blank" rel="noopener noreferrer">this</a> video for an intuitive explanation</li>
      <li>Read <a href="https://towardsdatascience.com/logistic-regression-detailed-overview-46c4da4303bc" target="_blank" rel="noopener noreferrer">this</a> comprehensive article</li>
      <li>Implement logistic regression from scratch using <a href="https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data" target="_blank" rel="noopener noreferrer">this</a> dataset</li>
      <li>Compare your implementation with scikit-learn's LogisticRegression</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Naive Bayes</h3>
    <p>Naive Bayes is a probabilistic classifier based on Bayes' theorem with an assumption of conditional independence between features. Despite its simplicity, it often performs surprisingly well and is widely used in text classification, spam filtering, and medical diagnosis.</p>
    
    <h4>🐼 Bayes' Theorem</h4>
    <p>Bayes' theorem states:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      P(A|B) = P(B|A) * P(A) / P(B)
    </p>
    
    <p>In the context of classification:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      P(Class|Features) = P(Features|Class) * P(Class) / P(Features)
    </p>
    
    <h4>🐼 Naive Assumption</h4>
    <p>The "naive" assumption is that all features are conditionally independent given the class:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      P(Features|Class) = P(f1|Class) * P(f2|Class) * ... * P(fn|Class)
    </p>
    
    <p>This assumption is rarely true in practice, but it simplifies calculations and often works well.</p>
    
    <h4>🐼 Types of Naive Bayes</h4>
    <ul>
      <li><strong>Gaussian Naive Bayes:</strong> Assumes features follow a normal distribution</li>
      <li><strong>Multinomial Naive Bayes:</strong> Used for discrete count data (e.g., text classification)</li>
      <li><strong>Bernoulli Naive Bayes:</strong> Used for binary features</li>
    </ul>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Simple and fast to train and predict</li>
      <li>Works well with small datasets</li>
      <li>Handles missing values well</li>
      <li>Performs well in text classification</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Assumes feature independence (often violated)</li>
      <li>May not capture complex relationships</li>
      <li>Sensitive to feature scaling</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=O2L2Uv9pdDA" target="_blank" rel="noopener noreferrer">this</a> video for a clear explanation</li>
      <li>Read <a href="https://towardsdatascience.com/naive-bayes-classifier-81d512f50a7c" target="_blank" rel="noopener noreferrer">this</a> article</li>
      <li>Implement Naive Bayes for text classification using <a href="https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews" target="_blank" rel="noopener noreferrer">IMDB reviews</a></li>
    </ul>

    <h3 id="day-3">👾 Day 3: Decision Trees</h3>
    <p>Decision trees are a non-parametric supervised learning method used for classification and regression. They work by recursively splitting the data based on feature values to create a tree-like structure that can be used for prediction.</p>
    
    <h4>🐼 Tree Structure</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/9vK8JQZ/image.png" width="500" alt="Decision Tree Structure" />
      <em>Decision Tree Structure</em>
    </div>
    
    <p>A decision tree consists of:</p>
    <ul>
      <li><strong>Root node:</strong> The topmost node representing the entire dataset</li>
      <li><strong>Internal nodes:</strong> Nodes that split the data based on a feature</li>
      <li><strong>Leaf nodes:</strong> Terminal nodes that contain the final predictions</li>
      <li><strong>Branches:</strong> Connections between nodes representing decision rules</li>
    </ul>
    
    <h4>🐼 Splitting Criteria</h4>
    <p>For classification, common splitting criteria include:</p>
    <ul>
      <li><strong>Gini Index:</strong> Measures impurity of a node</li>
      <li><strong>Entropy:</strong> Measures information content</li>
      <li><strong>Information Gain:</strong> Reduction in entropy after splitting</li>
    </ul>
    
    <p>For regression, common splitting criteria include:</p>
    <ul>
      <li><strong>Mean Squared Error (MSE):</strong> Average squared difference between predicted and actual values</li>
      <li><strong>Mean Absolute Error (MAE):</strong> Average absolute difference between predicted and actual values</li>
    </ul>
    
    <h4>🐼 Gini Index</h4>
    <p>The Gini index is defined as:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      Gini = 1 - Σ(p_i^2)
    </p>
    
    <p>where p_i is the probability of class i in the node.</p>
    
    <h4>🐼 Information Gain</h4>
    <p>Information gain is the reduction in entropy after splitting:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      IG = Entropy(parent) - Σ(|S_v|/|S|) * Entropy(S_v)
    </p>
    
    <p>where S_v is the subset of data for value v of the feature.</p>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Easy to understand and interpret</li>
      <li>Can handle both numerical and categorical data</li>
      <li>Requires little data preprocessing</li>
      <li>Can capture non-linear relationships</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Prone to overfitting</li>
      <li>Can be unstable (small changes in data can lead to very different trees)</li>
      <li>May not generalize well</li>
      <li>Can create biased trees if some classes dominate</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=7VeUPuTJH54" target="_blank" rel="noopener noreferrer">this</a> video for an intuitive explanation</li>
      <li>Read <a href="https://towardsdatascience.com/decision-trees-in-machine-learning-641b9c4e8052" target="_blank" rel="noopener noreferrer">this</a> comprehensive article</li>
      <li>Implement decision trees from scratch</li>
      <li>Use scikit-learn's DecisionTreeClassifier and DecisionTreeRegressor</li>
    </ul>

    <h3 id="day-4">👾 Day 4: Ensemble Methods - Bagging and Random Forest</h3>
    <p>Ensemble methods combine multiple models to improve prediction accuracy and reduce overfitting. Today we'll focus on bagging and Random Forest.</p>
    
    <h4>🐼 Bagging (Bootstrap Aggregating)</h4>
    <p>Bagging works by:</p>
    <ol>
      <li>Creating multiple bootstrap samples from the training data</li>
      <li>Training a model on each bootstrap sample</li>
      <li>Combining predictions (usually by voting for classification, averaging for regression)</li>
    </ol>
    
    <p>Bootstrap sampling involves randomly sampling with replacement from the original dataset, creating datasets of the same size as the original.</p>
    
    <h4>🐼 Random Forest</h4>
    <p>Random Forest is an ensemble of decision trees that uses bagging with an additional randomization technique:</p>
    <ul>
      <li>Each tree is trained on a bootstrap sample of the data</li>
      <li>At each split, only a random subset of features is considered</li>
      <li>This reduces correlation between trees and improves generalization</li>
    </ul>
    
    <h4>🐼 Advantages of Random Forest</h4>
    <ul>
      <li>Reduces overfitting compared to single decision trees</li>
      <li>Handles missing values well</li>
      <li>Provides feature importance scores</li>
      <li>Works well with high-dimensional data</li>
      <li>Can handle both classification and regression</li>
    </ul>
    
    <h4>🐼 Feature Importance</h4>
    <p>Random Forest can provide feature importance scores by measuring how much the prediction error increases when a feature is randomly permuted.</p>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=J4Wdy0Wc_xQ" target="_blank" rel="noopener noreferrer">this</a> video on Random Forest</li>
      <li>Read <a href="https://towardsdatascience.com/understanding-random-forest-58381e0602d2" target="_blank" rel="noopener noreferrer">this</a> article</li>
      <li>Implement Random Forest using scikit-learn</li>
      <li>Compare performance with single decision trees</li>
    </ul>

    <h3 id="day-5">👾 Day 5: Ensemble Methods - Boosting</h3>
    <p>Boosting is another ensemble method that works by training models sequentially, where each model tries to correct the errors of the previous model.</p>
    
    <h4>🐼 AdaBoost (Adaptive Boosting)</h4>
    <p>AdaBoost works by:</p>
    <ol>
      <li>Training a weak learner (usually a decision stump) on the data</li>
      <li>Calculating the error and updating sample weights (increasing weights for misclassified samples)</li>
      <li>Training the next weak learner on the reweighted data</li>
      <li>Repeating until a stopping criterion is met</li>
      <li>Combining all weak learners with weighted voting</li>
    </ol>
    
    <h4>🐼 Gradient Boosting</h4>
    <p>Gradient Boosting works by:</p>
    <ol>
      <li>Training a weak learner to predict the residuals of the current model</li>
      <li>Adding this weak learner to the ensemble with a learning rate</li>
      <li>Repeating until a stopping criterion is met</li>
    </ol>
    
    <p>The key insight is that we're trying to fit the gradient of the loss function with respect to the current predictions.</p>
    
    <h4>🐼 XGBoost</h4>
    <p>XGBoost (Extreme Gradient Boosting) is an optimized implementation of gradient boosting that includes:</p>
    <ul>
      <li>Regularization to prevent overfitting</li>
      <li>Handling of missing values</li>
      <li>Built-in cross-validation</li>
      <li>Parallel processing</li>
    </ul>
    
    <h4>🐼 LightGBM</h4>
    <p>LightGBM is another gradient boosting framework that uses:</p>
    <ul>
      <li>Gradient-based one-side sampling (GOSS)</li>
      <li>Exclusive feature bundling (EFB)</li>
      <li>Leaf-wise tree growth</li>
    </ul>
    
    <p>These techniques make it faster and more memory-efficient than traditional gradient boosting.</p>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=LsK-xG1cLYA" target="_blank" rel="noopener noreferrer">this</a> video on AdaBoost</li>
      <li>Read <a href="https://towardsdatascience.com/understanding-gradient-boosting-machines-9be756fe96ab" target="_blank" rel="noopener noreferrer">this</a> article on Gradient Boosting</li>
      <li>Learn about <a href="https://xgboost.readthedocs.io/en/latest/tutorials/model.html" target="_blank" rel="noopener noreferrer">XGBoost</a></li>
      <li>Explore <a href="https://lightgbm.readthedocs.io/en/latest/" target="_blank" rel="noopener noreferrer">LightGBM</a></li>
    </ul>

    <h3 id="day-6">👾 Day 6: Support Vector Machines (SVM)</h3>
    <p>Support Vector Machines are powerful supervised learning algorithms used for classification, regression, and outlier detection. They work by finding the optimal hyperplane that separates classes with the maximum margin.</p>
    
    <h4>🐼 Linear SVM</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/0jZ8Q9M/image.png" width="400" alt="Linear SVM" />
      <em>Linear SVM with Maximum Margin</em>
    </div>
    
    <p>For linearly separable data, SVM finds the hyperplane that maximizes the margin between classes. The margin is the distance between the hyperplane and the nearest data points from each class (support vectors).</p>
    
    <h4>🐼 Soft Margin SVM</h4>
    <p>When data is not perfectly linearly separable, we use soft margin SVM, which allows some misclassifications by introducing slack variables. The objective function becomes:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      min (1/2)||w||² + C Σξ_i
    </p>
    
    <p>where C is the regularization parameter and ξ_i are slack variables.</p>
    
    <h4>🐼 Kernel Trick</h4>
    <p>For non-linearly separable data, SVM uses the kernel trick to map data to a higher-dimensional space where it becomes linearly separable. Common kernels include:</p>
    <ul>
      <li><strong>Linear:</strong> K(x, y) = x^T y</li>
      <li><strong>Polynomial:</strong> K(x, y) = (γx^T y + r)^d</li>
      <li><strong>RBF (Gaussian):</strong> K(x, y) = exp(-γ||x - y||²)</li>
      <li><strong>Sigmoid:</strong> K(x, y) = tanh(γx^T y + r)</li>
    </ul>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Effective in high-dimensional spaces</li>
      <li>Memory efficient (uses support vectors only)</li>
      <li>Versatile (different kernels for different data types)</li>
      <li>Works well with small datasets</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Sensitive to feature scaling</li>
      <li>Doesn't provide probability estimates directly</li>
      <li>Can be slow for large datasets</li>
      <li>Requires careful parameter tuning</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=efR1C6CvhmE" target="_blank" rel="noopener noreferrer">this</a> video for an intuitive explanation</li>
      <li>Read <a href="https://towardsdatascience.com/support-vector-machine-introduction-to-machine-learning-algorithms-934a444fca47" target="_blank" rel="noopener noreferrer">this</a> comprehensive article</li>
      <li>Implement SVM using scikit-learn</li>
      <li>Experiment with different kernels and parameters</li>
    </ul>

    <h3 id="day-7">👾 Day 7: Model Evaluation and Comparison</h3>
    <p>Today we'll compare the performance of all the algorithms we've learned so far and understand when to use each one.</p>
    
    <h4>🐼 Algorithm Comparison</h4>
    <table style={{ width: '100%', borderCollapse: 'collapse', margin: '1rem 0' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #6366f1', padding: '0.5rem', backgroundColor: '#6366f1', color: '#fff' }}>Algorithm</th>
          <th style={{ border: '1px solid #6366f1', padding: '0.5rem', backgroundColor: '#6366f1', color: '#fff' }}>Pros</th>
          <th style={{ border: '1px solid #6366f1', padding: '0.5rem', backgroundColor: '#6366f1', color: '#fff' }}>Cons</th>
          <th style={{ border: '1px solid #6366f1', padding: '0.5rem', backgroundColor: '#6366f1', color: '#fff' }}>Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Logistic Regression</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Simple, interpretable, fast</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Linear relationships only</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Binary classification, baseline models</td>
        </tr>
        <tr style={{ backgroundColor: '#20202a' }}>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Naive Bayes</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Fast, works with small data</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Feature independence assumption</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Text classification, spam detection</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Decision Trees</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Interpretable, handles mixed data</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Prone to overfitting</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Exploratory analysis, feature importance</td>
        </tr>
        <tr style={{ backgroundColor: '#20202a' }}>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Random Forest</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Robust, handles missing values</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Less interpretable</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>General purpose, high accuracy</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>SVM</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Effective in high dimensions</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Sensitive to scaling</td>
          <td style={{ border: '1px solid #23234a', padding: '0.5rem' }}>Small datasets, high-dimensional data</td>
        </tr>
      </tbody>
    </table>
    
    <h4>🐼 Practical Exercise</h4>
    <p>Choose a dataset (e.g., <a href="https://www.kaggle.com/datasets/uciml/breast-cancer-wisconsin-data" target="_blank" rel="noopener noreferrer">Breast Cancer Wisconsin</a> or <a href="https://www.kaggle.com/datasets/uciml/iris" target="_blank" rel="noopener noreferrer">Iris</a>) and:</p>
    <ol>
      <li>Implement all the algorithms we've learned</li>
      <li>Compare their performance using cross-validation</li>
      <li>Analyze which algorithm works best and why</li>
      <li>Try different hyperparameters and see how they affect performance</li>
    </ol>
    
    <h4>🐼 Next Steps</h4>
    <p>In the coming weeks, we'll explore:</p>
    <ul>
      <li>Unsupervised learning (clustering, dimensionality reduction)</li>
      <li>Neural networks and deep learning</li>
      <li>Advanced topics like reinforcement learning</li>
      <li>Real-world applications and projects</li>
    </ul>
  </div>
);

export default MLWeek4; 