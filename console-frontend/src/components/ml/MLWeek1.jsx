import React from 'react';

const MLWeek1 = () => (
  <div>
    <h2 id="week-1">🦝 Week 1 (Reviewing Python, introduction to numpy, pandas and matplotlib)</h2>
    <h3 id="day-1">👾 Day 1: How to differentiate Raccoons 🦝 from Red Pandas?</h3>
    <div style={{ textAlign: 'center' }}>
      <img src="https://qph.cf2.quoracdn.net/main-qimg-328f31347e8310f8b3d2aba0113b70b7-lq" alt="Image 4" width="600" style={{ margin: '1rem 0' }} />
    </div>
    <p>Let’s say you wish to automate the task to differentiate cute racoons 🦝 with red pandas. In order to understand how we can automate this, let’s see how little children learn to differentiate between 2 animals. A child prolly sees a raccoon 🦝, absolutely likes it and ask their parents which animal is this; he’s told that it’s a raccoon. The child remembers that an animal with a specific type of ears, particular color pattern and particular physical features is a raccoon. Then, next time he sees a racoon, he might or might not recognize her. If he does not recognize her, their parents tell that it’s a raccoon. The child then identifies patterns, corrects his previously incorrect pattern memory and remembers how a raccoon looks like. Similar iterations happen for a Red Panda.</p>
    <p>So, for automating this task, we can try to make the machine identify some patterns or features which are specific to pandas and raccoons; and whenever it makes a wrong prediction, change those patterns in a specific way that it now captures the correct patterns in it’s memory. In a very dumbed down language, this is what Machine Learning algorithms do, they iteratively run to LEARN a function via various optimization algorithms.</p>
    <p>One must have a broad understanding of what the subject is at hand. Machine learning is a wide field with various domains. It would be really helpful if one goes through a couple of YouTube videos and/or blogs to get a brief hang of it, and its importance.<br />
      <a href="https://www.youtube.com/watch?v=0yCJMt9Mx9c" target="_blank" rel="noopener noreferrer">This</a> video by TedEd is a must watch.<br />
      <a href="https://medium.com/@randylaosat/a-beginners-guide-to-machine-learning-dfadc19f6caf" target="_blank" rel="noopener noreferrer">This</a> blog is also an interesting read. It also cover the different types of machine learning algorithms you will face.<br />
      Another fun way to utilize ML:- <a href="https://www.youtube.com/watch?v=OeFujF6LdAM" target="_blank" rel="noopener noreferrer">the science behind lofi music</a>
    </p>
    <h3 id="day-2-3">👾 Day 2 & 3: Learn a programming language, duh!</h3>
    <p>There are many programming languages out there, of which only a few are suitable for ML, namely Python, R and Julia. We recommend any beginner start with Python. Why?</p>
    <p>For one, it provides a vast selection of libraries, namely NumPy, pandas, sklearn, TensorFlow, PyTorch, etc., which are super helpful and require little effort for Machine Learning and data science.</p>
    <p>Before starting, it is important to setup python in your device, using <a href="https://www.youtube.com/watch?v=bVdpoXj6RJU" target="_blank" rel="noopener noreferrer">this</a> as a reference.</p>
    <p>Learning python is not hard. Here are a few resources which will teach you about the language swiftly:-</p>
    <ul>
      <li><a href="https://medium.com/fintechexplained/everything-about-python-from-beginner-to-advance-level-227d52ef32d2" target="_blank" rel="noopener noreferrer">Medium Blog</a></li>
      <li><a href="https://www.youtube.com/watch?v=rfscVS0vtbw" target="_blank" rel="noopener noreferrer">YouTube Video by Free Code Camp</a></li>
    </ul>
    <p>In case you come across a weird syntax or want to find a solution to problem, the <a href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer">official documentation</a> is the best way to resolve the issues!</p>
    <h3 id="day-4">👾 Day 4: Start to get a hang of some of the inbuilt libraries like NumPy</h3>
    <p>Mathematics is the heart of Machine Learning, and one usually follows their heart to take absolutely silly decisions 🦝; but learning the prerequisite mathematics before ML is likely the best decision you can take in your ML journey. You will also get a taste of this statement from <em>Week 2</em>. Implementing various ML models, loss functions, and confusion matrix need math. Mathematics is thus the foundation of machine learning. Most of the mathematical tasks can be performed using NumPy.</p>
    <p>The best way to learn about libraries is via their official <a href="https://numpy.org/doc/" target="_blank" rel="noopener noreferrer">documentation</a>.</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=QUT1VHiLmmI" target="_blank" rel="noopener noreferrer">Video By Free Code Camp</a></li>
      <li><a href="https://www.youtube.com/watch?v=uRsE5WGiKWo" target="_blank" rel="noopener noreferrer">Numpy in 15 minutes</a></li>
    </ul>
    <h3 id="day-5">Day 5: Proceed by exploring the other library, Pandas</h3>
    <p>Data is what drives machine learning. Analyzing, visualizing, and leaning information is an essential step in the process. For this purpose, Panadas comes to the rescue!</p>
    <p>Pandas is an open-source python package built on top of Numpy and developed by Wes McKinney.</p>
    <p>Like NumPy, Pandas has official documentation, which you may refer to <a href="https://pandas.pydata.org/docs/" target="_blank" rel="noopener noreferrer">here</a>.<br /> Other resources are as follows:-</p>
    <ul>
      <li><a href="https://medium.com/mlpoint/pandas-for-machine-learning-53846bc9a98b#:~:text=Pandas%20is%20one%20of%20the%20tools%20in%20Machine%20Learning%20which,transforming%20and%20visualizing%20from%20data.&text=Pandas%20is%20an%20open%2Dsource,Numpy%20developed%20by%20Wes%20McKinney." target="_blank" rel="noopener noreferrer">Medium Blog by Paritosh Mahto</a></li>
      <li><a href="https://www.youtube.com/watch?v=tRKeLrwfUgU" target="_blank" rel="noopener noreferrer">Pandas in 15 minutes</a></li>
    </ul>
    <h3 id="day-6">👾 Day 6: Matplotlib - a powerful tool for visualization</h3>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/6mCjsk2/image.png" width="520" alt="Matplotlib Example" />
      <em>The average annual temperature above the industrial era around the globe</em>
    </div>
    <p>Both of the above figures show the same data. However, it is easier to visualize and observe patterns in the second image. (A scatter plot)</p>
    <p>Matlotlib is a powerful library that provides tools (histograms, scatter plots, pie charts, and much more) to make sense of data.</p>
    <p>The best source to refer to is the <a href="https://matplotlib.org/stable/index.html" target="_blank" rel="noopener noreferrer">documentation</a> in case of discrepancies.</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=VFsRLjSc8GA" target="_blank" rel="noopener noreferrer">Code With Harry</a></li>
      <li><a href="https://www.youtube.com/watch?v=3Xc3CA655Y4" target="_blank" rel="noopener noreferrer">Free Code Camp</a></li>
    </ul>
    <h3 id="day-7">👾 Day 7: Play around in Kaggle</h3>
    <p>Use this day as a practice field, to utilize all your skills you learnt. Head over to <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer">Kaggle</a> and download any dataset you like. Apply the skills you procured and analyze trends in different data sets.<br />Here is a brief walkthrough of the UI. <a href="https://docs.google.com/document/d/18zGKJEnq-ln1GkidD7Ueudm5iJOsHsMrhdHC7cTlAZc/edit?usp=sharing" target="_blank" rel="noopener noreferrer">All about Kaggle</a></p>
  </div>
);

export default MLWeek1; 