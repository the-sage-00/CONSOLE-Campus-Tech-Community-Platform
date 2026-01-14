import React from 'react';

const MLWeek3 = () => (
  <div>
    <h2 id="week-3">🦝 Week 3 (EDA, Cross Validation, Regularizations)</h2>
    
    <p>This week, we shall deviate a bit from Machine Learning Algorithms and learn about various techniques which help in making <strong>ML Pipelines</strong> more effective and improve the accuracy of the models. These include, but are not limited to <strong>Exploratory Data Analysis, preprocessing techniques, Cross Validation and Regularizations</strong>.</p>

    <h3 id="day-1">👾 Day 1: Exploratory Data Analysis (EDA)</h3>
    <p>Lets first understand the purpose of EDA in ML. The purpose of EDA as the name suggests is to understand the datasets, getting to know what useful comes out from it. Discovering patterns, spotting anomalies etc are also its part. It becomes very essential to do EDA For better understanding lets go through the articles below.</p>
    <ul>
      <li><a href="https://www.ibm.com/topics/exploratory-data-analysis" target="_blank" rel="noopener noreferrer">https://www.ibm.com/topics/exploratory-data-analysis</a></li>
      <li><a href="https://www.analyticsvidhya.com/blog/2021/08/exploratory-data-analysis-and-visualization-techniques-in-data-science/" target="_blank" rel="noopener noreferrer">https://www.analyticsvidhya.com/blog/2021/08/exploratory-data-analysis-and-visualization-techniques-in-data-science/</a></li>
      <li><a href="https://www.youtube.com/watch?v=QiqZliDXCCg" target="_blank" rel="noopener noreferrer">This</a> video goes well with the first link.</li>
      <li>Finally see <a href="https://www.analyticsvidhya.com/blog/2021/08/how-to-perform-exploratory-data-analysis-a-guide-for-beginners/" target="_blank" rel="noopener noreferrer">this</a> to understand how to do EDA. For Practice you can surely try doing EDA on datasets available on Kaggle.</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Visualizing things with Seaborn</h3>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/r3DkcqK/image.png" width="600" alt="Seaborn Plots" />
      <em>Seaborn Plots</em>
    </div>

    <p>Seaborn is a robust Python library designed for data visualization, built on top of Matplotlib. It offers a high-level interface for creating visually appealing and informative statistical graphics, making it an ideal tool for exploratory data analysis (EDA). With Seaborn, you can generate complex visualizations with minimal code, allowing you to focus more on deriving insights from the data rather than on coding details. The library includes built-in themes and color palettes that enhance the visual quality of your plots effortlessly.</p>
    <p>Seaborn simplifies the creation of common plot types such as histograms, bar charts, box plots, and scatter plots, while also providing advanced visualization options like pair plots, heatmaps, and violin plots. These advanced techniques are particularly useful for uncovering relationships and patterns within the data. Seamlessly integrating with Pandas data structures, Seaborn makes it easy to visualize data frames directly. Overall, Seaborn is an essential tool for data scientists and analysts, significantly improving their ability to understand and communicate data insights effectively.</p>
    <p>The best source for learning about a python library is always its official Documentation. <a href="https://seaborn.pydata.org/" target="_blank" rel="noopener noreferrer">Here</a> is its link. Sometimes it may feel complicated and difficult to directly learn from the documentation. To ease the process. First go through the below links and for further learning, doubts or assistance refer to the documentation.</p>
    <ul>
      <li><a href="https://www.geeksforgeeks.org/introduction-to-seaborn-python/" target="_blank" rel="noopener noreferrer">https://www.geeksforgeeks.org/introduction-to-seaborn-python/</a></li>
      <li>You can see <a href="https://www.datacamp.com/tutorial/seaborn-python-tutorial" target="_blank" rel="noopener noreferrer">this</a> or <a href="https://elitedatascience.com/python-seaborn-tutorial" target="_blank" rel="noopener noreferrer">this</a> whichever seems better to you. These are tutorials for Seaborn.</li>
      <li>If looking for a youtube tutorial <a href="https://www.youtube.com/watch?v=6GUZXDef2U0" target="_blank" rel="noopener noreferrer">this</a> may help. When you are done and confident you can surely try applying your learnt skills on kaggle datasets.</li>
    </ul>

    <h3 id="day-3">👾 Day 3: Data Preprocessing</h3>
    <p>Data preprocessing involves transforming raw data into a format suitable for analysis and modeling. This step is crucial as it improves the quality of data and enhances the performance of machine learning models. More then just quality and performance, it is sometimes necessary to preprocess data so that we can feed it in machine learning pipeline or else errors pop around while running the code. Important practices under Data Preprocessing include</p>
    <ul>
      <li>Handling Missing Values: Missing data can introduce bias and reduce the accuracy of your machine learning models. Ignoring missing values can lead to misleading results because most algorithms are not designed to handle them. Properly addressing missing values ensures the integrity of your dataset and enhances the performance of your models. Follow <a href="https://www.analyticsvidhya.com/blog/2021/10/handling-missing-value/" target="_blank" rel="noopener noreferrer">this</a> to understand how to do it.</li>
      <li>Data Transformation: Most machine learning algorithms require numerical input. Categorical data needs to be converted into a numerical format to be processed by these algorithms. Encoding categorical variables allows the model to interpret and learn from the data correctly. For intro go through <a href="https://medium.com/aiskunks/categorical-data-encoding-techniques-d6296697a40f" target="_blank" rel="noopener noreferrer">this</a>. Then you should read <a href="https://www.geeksforgeeks.org/data-transformation-in-machine-learning/#google_vignette" target="_blank" rel="noopener noreferrer">this</a>. Make sure to go through hyperlinks in the content of second link. Refer to <a href="https://colab.research.google.com/drive/1sGtczOnHr0VEpy5vrwyZPLyhrRU09VB4?usp=sharing" target="_blank" rel="noopener noreferrer">this</a> notebook as well in order to get a hands on overview of how data preprocessing and feature engineering is done while working on a real dataset.</li>
    </ul>

    <h3 id="day-4">👾 Day 4: Statistical Measures</h3>
    <p>There are a few tools and statistical measures which are extremely important evaluating the accuracy and performance of machine learning model. Today we shall discuss about these measures.</p>
    <p>🐼 <a href="https://www.youtube.com/watch?v=Kdsp6soqA7o&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=3" target="_blank" rel="noopener noreferrer">Confusion Matrix</a><br />
    🐼 <a href="https://www.youtube.com/watch?v=vP06aMoz4v8&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=6" target="_blank" rel="noopener noreferrer">Sensitivity and Specificity</a><br />
    🐼 <a href="https://www.youtube.com/watch?v=EuBBz3bI-aA&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=6" target="_blank" rel="noopener noreferrer">Bias and Variance</a><br />
    Bias and Variance are 2 particularly important metrics, used often in model evaluation and referred to multiple times throughout this roadmap, so I'd recommend you to go through the following resources as well for a better understanding:</p>
    <ul>
      <li><a href="https://medium.com/@theDrewDag/finding-the-right-balance-between-bias-and-variance-in-machine-learning-750b188cb9d6" target="_blank" rel="noopener noreferrer">https://medium.com/@theDrewDag/finding-the-right-balance-between-bias-and-variance-in-machine-learning-750b188cb9d6</a></li>
      <li><a href="https://towardsdatascience.com/understanding-the-bias-variance-tradeoff-165e6942b229" target="_blank" rel="noopener noreferrer">https://towardsdatascience.com/understanding-the-bias-variance-tradeoff-165e6942b229</a></li>
    </ul>
    <p>If you don't understand certain sections, don't worry! You'll eventually develop an understanding as we progress through this journey.<br />
    🐼 <a href="https://towardsdatascience.com/precision-and-recall-a-comprehensive-guide-with-practical-examples-71d614e3fc43/" target="_blank" rel="noopener noreferrer">Precision, Recall and F1 Score</a><br />
    🐼 <a href="https://www.youtube.com/watch?v=4jRBRDbJemM&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=8" target="_blank" rel="noopener noreferrer">ROC and AUC</a><br />
    🐼 <a href="https://www.youtube.com/watch?v=YtebGVx-Fxw&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=11" target="_blank" rel="noopener noreferrer">Entropy</a><br />
    🐼 <a href="https://www.youtube.com/watch?v=eJIp_mgVLwE&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=12" target="_blank" rel="noopener noreferrer">Mutual Information</a><br />
    🐼 <a href="https://www.youtube.com/watch?v=ARfXDSkQf1Y&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=18" target="_blank" rel="noopener noreferrer">Odds</a> and <a href="https://www.youtube.com/watch?v=8nm0G-1uJzA&list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF&index=18" target="_blank" rel="noopener noreferrer">Log Odds</a></p>
    <p>You can also go through the following articles for understanding more metrics:</p>
    <ul>
      <li><a href="https://www.analyticsvidhya.com/blog/2019/08/11-important-model-evaluation-error-metrics/" target="_blank" rel="noopener noreferrer">12 Eval Metrics for ML</a></li>
      <li><a href="https://machinelearningmastery.com/how-to-choose-loss-functions-when-training-deep-learning-neural-networks/" target="_blank" rel="noopener noreferrer">How to Choose Loss Functions</a></li>
      <li><a href="https://towardsdatascience.com/intuition-behind-log-loss-score-4e0c9979680a" target="_blank" rel="noopener noreferrer">Intuition Behind Log Loss Score</a></li>
      <li><a href="https://www.aporia.com/learn/understanding-binary-cross-entropy-and-log-loss-for-effective-model-monitoring/" target="_blank" rel="noopener noreferrer">Binary Cross Entropy and Log Loss</a></li>
    </ul>

    <h3 id="day-5">👾 Day 5: Data Splits and Cross Validation</h3>
    <p>Every Model has to be trained on some data and to evaluate how well it captures the generalized pattern, it is to be evaluate using an unexplored data. The train data is used for training, and test data is used for testing the model. But what will you do if the model performs well on the training data but pathetically on the test data. Such a situation is called Overfitting wherein the model captures the patterns of the training data points very well, but the general pattern is not recognized. To prevent this, we can use the "validation" data set. The splitting of data into the train, validation and test datasets is called the train validation test split.</p>
    <p>This split helps assess how well a machine learning model will generalize to new, unseen data. It also prevents overfitting, where a model performs well on the training data but fails to generalize to new instances. By using a validation set, practitioners can iteratively adjust the model's parameters to achieve better performance on unseen data. More on this later. On the basis of the need this split can be an 80-10-10, 70-15-15 or 60-20-20 split (usually a larger training set is preferred).</p>
    <p>There are certain values (formally called, parameters) for instance the batch size or step size in the case of linear regression which need to be manually set by the user before the training of the model. Such parameters are called Hyperparameters, and it is important to set them in such a manner that the model generalizes. The process of evaluating such values is called Hyperparameter tuning and is done via Cross Validation and iterative sampling. Cross Validation requires using the Validation Dataset to continuously validate the model during and select the best values of Hyperparameters.</p>
    <p>Watch <a href="https://www.youtube.com/watch?v=bq4LytNAjjM" target="_blank" rel="noopener noreferrer">this</a> video to understand the theory behind hyper parameter tuning using cross validation, and <a href="https://www.youtube.com/watch?v=ATnZmBxIvmQ" target="_blank" rel="noopener noreferrer">this</a> for implementing Cross Validation and Grid Search via SciKitLearn.</p>
    <p>Iterative Sampling for <a href="https://machinelearningmastery.com/scikit-optimize-for-hyperparameter-tuning-in-machine-learning/" target="_blank" rel="noopener noreferrer">Hyperparameter tuning</a> can be done via various methods like Grid Search (Just brute forcing your way through all the values. This is very expensive in terms of time and might miss out certain values in case of continuous values since we'd need to have some step size), Randomized Search (Might be faster, but way more inefficient because as the name suggests, it's random) and Bayesian Optimization.</p>
    <p>Bayesian Optimization uses Bayes Theorem, Surrogate Functions and Gaussian Regression in order to predict the next best parameter value. It is fairly easy to implement via <a href="https://scikit-learn.org/stable/modules/grid_search.html" target="_blank" rel="noopener noreferrer">SciKitLearn</a>, but completely understanding the mathematics behind it might be pretty complex and can be skipped at this point. But for the stats and math enthusiasts, you can refer <a href="https://towardsdatascience.com/a-conceptual-explanation-of-bayesian-model-based-hyperparameter-optimization-for-machine-learning-b8172278050f" target="_blank" rel="noopener noreferrer">this</a> article for understanding the theory and <a href="https://machinelearningmastery.com/what-is-bayesian-optimization/" target="_blank" rel="noopener noreferrer">this</a> for implementing it from scratch.</p>
    <p>Bonus: Go through <a href="https://www.youtube.com/watch?v=rjbkWSTjHzM&list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU&index=8" target="_blank" rel="noopener noreferrer">CS229 lecture 8</a> on Data Splits, Models & Cross-Validation</p>

    <h3 id="day-6">👾 Day 6: Regularization</h3>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/LxSgCTk/image.png" width="500" alt="Under-fitting and Over-fitting" />
      <em>Under-fitting and Over-fitting</em>
    </div>
    <p>Yesterday we learnt about overfitting and why it is bad for any Machine Learning model. To solve this problem, let's ask the question as to why overfitting occurs? Because it gives too much importance to the training data points and tries to fit a curve which passes through all the points. So, we need to reduce the importance given to these exact points and account for some sort of variance as well. This can be done by by adding a penalty term to the loss function, discouraging the model from assigning too much importance to individual features or coefficients. This technique is called Regularization.</p>
    <p>There primarily exist 3 types of regularizations: Lasso (L1), Ridge (L2) and Elastic Net (L1-L2) regularizations. The only difference amongst them is what kind of penalty term is added.</p>
    <p><a href="https://www.geeksforgeeks.org/regularization-in-machine-learning/" target="_blank" rel="noopener noreferrer">This</a> is a great article which would provide you a pretext (Bias, Variance, Overfitting, Underfitting) as well as explain the penalty terms of different types of regularizations.</p>
    <p>Now go back to the Linear Regression Model you built from scratch and try to incorporate these 3 regularizations (separately, obviously) in the model. Train them and compare the accuracies. Try to tune the regularization based hyperparameters using Bayesian Optimization and Cross Validation. What conclusion do you draw from the results and comparisons? Is the change in accuracy significant and in the positive direction? Why or why not?</p>

    <h3 id="day-7">👾 Day 7: Bonus and Revision</h3>
    <p>Week 4 will actively use the fundamentals covered in Week 2, so I'd recommend you to go through your notes and revise gradient descent and linear algebra. If you're confident with these topics, you can cover these bonus topics from <a href="https://www.youtube.com/watch?v=het9HFqo1TQ" target="_blank" rel="noopener noreferrer">the second lecture of Stanford CS229</a>. I've explained these topics in brevity for introduction, but <strong>I recommend you to go through the lecture for understanding.</strong></p>

    <h4>🐼 Locally Weighted Regression</h4>
    <p>If a target(output)-feature relationship is non linear, in that case linear regression produces low accuracy score because it can only capture linear relationships. One workaround could be manually adding a feature that is related non linearly with the initial feature (for instance, x^n). As you'd remember, this is called feature engineering and helps a lot in capturing non linearities. But the issue is that this requires a huge amount of EDA and the feature created might not be very accurate because this is a manual procedure. Hence, for these kinds of problems, we use locally weighted regression.</p>
    <p>In Locally weighted regression, if we want to predict the target (output value) for a given set of features (input vector), we try to fit our weights to minimize a loss function which a weighted loss function. This weight is determined by the proximity of a point to the given input vector. Since we are giving more weight to proximate point and the weight is exponential in nature with respect to distance, the likelihood of accuracy is less. Such type of learning algorithm is called a Parametric learning algorithm because the time required to make the prediction is proportional to the size of the training data.</p>
  </div>
);

export default MLWeek3; 