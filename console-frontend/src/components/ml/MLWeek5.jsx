import React from 'react';

const MLWeek5 = () => (
  <div>
    <h2 id="week-5">🦝 Week 5 (Unsupervised Learning: Clustering and Dimensionality Reduction)</h2>
    
    <p>This week we'll explore unsupervised learning algorithms that find patterns in data without labeled outputs. We'll focus on clustering algorithms and dimensionality reduction techniques.</p>

    <h3 id="day-1">👾 Day 1: Introduction to Unsupervised Learning</h3>
    <p>Unsupervised learning is a type of machine learning where the algorithm finds patterns in data without being given explicit labels or target variables. The goal is to discover hidden structures in the data.</p>
    
    <h4>🐼 Types of Unsupervised Learning</h4>
    <ul>
      <li><strong>Clustering:</strong> Grouping similar data points together</li>
      <li><strong>Dimensionality Reduction:</strong> Reducing the number of features while preserving important information</li>
      <li><strong>Association Rule Learning:</strong> Finding relationships between variables</li>
      <li><strong>Anomaly Detection:</strong> Identifying unusual data points</li>
    </ul>
    
    <h4>🐼 Applications</h4>
    <ul>
      <li>Customer segmentation</li>
      <li>Image compression</li>
      <li>Market basket analysis</li>
      <li>Fraud detection</li>
      <li>Data preprocessing</li>
    </ul>

    <h3 id="day-2">👾 Day 2: K-Means Clustering</h3>
    <p>K-Means is one of the most popular clustering algorithms. It works by iteratively assigning data points to the nearest cluster center and updating the cluster centers.</p>
    
    <h4>🐼 Algorithm Steps</h4>
    <ol>
      <li>Choose K cluster centers randomly</li>
      <li>Assign each data point to the nearest cluster center</li>
      <li>Update cluster centers by computing the mean of all points in each cluster</li>
      <li>Repeat steps 2-3 until convergence</li>
    </ol>
    
    <h4>🐼 Objective Function</h4>
    <p>The goal is to minimize the within-cluster sum of squares (WCSS):</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      J = Σ Σ ||x_i - μ_k||²
    </p>
    
    <p>where μ_k is the centroid of cluster k.</p>
    
    <h4>🐼 Choosing K</h4>
    <p>Methods for choosing the optimal number of clusters:</p>
    <ul>
      <li><strong>Elbow Method:</strong> Plot WCSS vs K and look for the "elbow"</li>
      <li><strong>Silhouette Analysis:</strong> Measure how similar a point is to its own cluster vs other clusters</li>
      <li><strong>Gap Statistic:</strong> Compare the gap between expected and observed WCSS</li>
    </ul>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Simple and fast</li>
      <li>Scales well to large datasets</li>
      <li>Guarantees convergence</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Requires specifying K</li>
      <li>Sensitive to initial cluster centers</li>
      <li>Assumes spherical clusters</li>
      <li>May converge to local optima</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=4b5d3muPQmA" target="_blank" rel="noopener noreferrer">this</a> video for an intuitive explanation</li>
      <li>Read <a href="https://towardsdatascience.com/k-means-clustering-algorithm-applications-evaluation-methods-and-drawbacks-aa03e644b48a" target="_blank" rel="noopener noreferrer">this</a> comprehensive article</li>
      <li>Implement K-Means from scratch</li>
      <li>Use scikit-learn's KMeans</li>
    </ul>

    <h3 id="day-3">👾 Day 3: Hierarchical Clustering</h3>
    <p>Hierarchical clustering builds a tree-like structure (dendrogram) of clusters by either merging smaller clusters (agglomerative) or splitting larger clusters (divisive).</p>
    
    <h4>🐼 Agglomerative Clustering</h4>
    <p>This is the most common approach:</p>
    <ol>
      <li>Start with each data point as its own cluster</li>
      <li>Find the two closest clusters</li>
      <li>Merge them into a new cluster</li>
      <li>Repeat until all points are in one cluster</li>
    </ol>
    
    <h4>🐼 Linkage Methods</h4>
    <p>Different ways to measure distance between clusters:</p>
    <ul>
      <li><strong>Single Linkage:</strong> Minimum distance between any two points in different clusters</li>
      <li><strong>Complete Linkage:</strong> Maximum distance between any two points in different clusters</li>
      <li><strong>Average Linkage:</strong> Average distance between all pairs of points in different clusters</li>
      <li><strong>Ward's Method:</strong> Minimizes the increase in within-cluster variance</li>
    </ul>
    
    <h4>🐼 Dendrogram</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/VqKJ8MZ/image.png" width="400" alt="Dendrogram Example" />
      <em>Hierarchical Clustering Dendrogram</em>
    </div>
    
    <p>A dendrogram shows the hierarchical relationship between clusters. The height of each merge represents the distance between the clusters being merged.</p>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>No need to specify number of clusters beforehand</li>
      <li>Produces a hierarchy that can be visualized</li>
      <li>Works well with different cluster shapes</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Computationally expensive O(n²)</li>
      <li>Sensitive to noise and outliers</li>
      <li>Once a merge is made, it cannot be undone</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=7xHsRkOdVwo" target="_blank" rel="noopener noreferrer">this</a> video</li>
      <li>Read <a href="https://towardsdatascience.com/hierarchical-clustering-explained-e59b13846da8" target="_blank" rel="noopener noreferrer">this</a> article</li>
      <li>Implement hierarchical clustering using scikit-learn</li>
    </ul>

    <h3 id="day-4">👾 Day 4: DBSCAN and Other Clustering Algorithms</h3>
    <p>Today we'll explore DBSCAN and other advanced clustering algorithms that can handle different cluster shapes and densities.</p>
    
    <h4>🐼 DBSCAN (Density-Based Spatial Clustering of Applications with Noise)</h4>
    <p>DBSCAN groups together points that are closely packed while marking points in low-density regions as outliers.</p>
    
    <h4>🐼 Key Concepts</h4>
    <ul>
      <li><strong>Epsilon (ε):</strong> Maximum distance between two points to be considered neighbors</li>
      <li><strong>MinPts:</strong> Minimum number of points required to form a dense region</li>
      <li><strong>Core Point:</strong> Point with at least MinPts neighbors within ε distance</li>
      <li><strong>Border Point:</strong> Point that is reachable from a core point but is not a core point itself</li>
      <li><strong>Noise Point:</strong> Point that is neither a core point nor a border point</li>
    </ul>
    
    <h4>🐼 Algorithm Steps</h4>
    <ol>
      <li>Randomly select an unvisited point</li>
      <li>Find all points within ε distance (neighbors)</li>
      <li>If the point has at least MinPts neighbors, it's a core point</li>
      <li>Expand the cluster by adding all reachable points</li>
      <li>Repeat until all points are visited</li>
    </ol>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Can find clusters of arbitrary shapes</li>
      <li>Handles noise and outliers well</li>
      <li>No need to specify number of clusters</li>
      <li>Works well with clusters of different densities</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Sensitive to parameters ε and MinPts</li>
      <li>May not work well with clusters of varying densities</li>
      <li>Can be slow for large datasets</li>
    </ul>
    
    <h4>🐼 Other Clustering Algorithms</h4>
    <ul>
      <li><strong>Mean Shift:</strong> Finds clusters by iteratively shifting points toward the mean of nearby points</li>
      <li><strong>Spectral Clustering:</strong> Uses eigenvalues of similarity matrix to perform dimensionality reduction before clustering</li>
      <li><strong>Gaussian Mixture Models (GMM):</strong> Assumes data comes from a mixture of Gaussian distributions</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=2eULHdOfWw8" target="_blank" rel="noopener noreferrer">this</a> video on DBSCAN</li>
      <li>Read <a href="https://towardsdatascience.com/dbscan-algorithm-complete-guide-and-application-with-python-scikit-learn-d690cbae4c5d" target="_blank" rel="noopener noreferrer">this</a> article</li>
      <li>Compare different clustering algorithms on the same dataset</li>
    </ul>

    <h3 id="day-5">👾 Day 5: Principal Component Analysis (PCA)</h3>
    <p>PCA is a dimensionality reduction technique that transforms data into a new coordinate system where the greatest variance lies on the first coordinate (first principal component).</p>
    
    <h4>🐼 Intuition</h4>
    <p>PCA finds the directions (principal components) along which the data varies the most. These directions are orthogonal to each other and capture the maximum variance in the data.</p>
    
    <h4>🐼 Mathematical Foundation</h4>
    <p>PCA involves:</p>
    <ol>
      <li>Standardizing the data (mean=0, variance=1)</li>
      <li>Computing the covariance matrix</li>
      <li>Finding eigalues and eigenvectors of the covariance matrix</li>
      <li>Sorting eigenvectors by eigenvalues (descending)</li>
      <li>Projecting data onto the top k eigenvectors</li>
    </ol>
    
    <h4>🐼 Explained Variance</h4>
    <p>The proportion of variance explained by each principal component is given by:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      Explained Variance Ratio = λ_i / Σλ_j
    </p>
    
    <p>where λ_i is the eigenvalue of the i-th principal component.</p>
    
    <h4>🐼 Choosing Number of Components</h4>
    <ul>
      <li><strong>Scree Plot:</strong> Plot eigenvalues and look for the "elbow"</li>
      <li><strong>Cumulative Explained Variance:</strong> Choose enough components to explain desired variance (e.g., 95%)</li>
      <li><strong>Kaiser Criterion:</strong> Keep components with eigenvalues &gt; 1</li>
    </ul>
    
    <h4>🐼 Applications</h4>
    <ul>
      <li>Data visualization (reduce to 2D/3D)</li>
      <li>Noise reduction</li>
      <li>Feature extraction</li>
      <li>Speeding up machine learning algorithms</li>
    </ul>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Reduces dimensionality while preserving variance</li>
      <li>Removes multicollinearity</li>
      <li>Can improve model performance</li>
      <li>Helps with visualization</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>May lose important information</li>
      <li>Results can be hard to interpret</li>
      <li>Sensitive to scaling</li>
      <li>Assumes linear relationships</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=HMOI_lkzW08" target="_blank" rel="noopener noreferrer">this</a> video for an intuitive explanation</li>
      <li>Read <a href="https://towardsdatascience.com/pca-using-python-scikit-learn-e653f8989e60" target="_blank" rel="noopener noreferrer">this</a> article</li>
      <li>Implement PCA from scratch</li>
      <li>Use scikit-learn's PCA</li>
    </ul>

    <h3 id="day-6">👾 Day 6: t-SNE and Other Dimensionality Reduction Techniques</h3>
    <p>Today we'll explore t-SNE and other advanced dimensionality reduction techniques that are particularly useful for visualization.</p>
    
    <h4>🐼 t-SNE (t-Distributed Stochastic Neighbor Embedding)</h4>
    <p>t-SNE is a non-linear dimensionality reduction technique that is particularly well-suited for embedding high-dimensional data in a low-dimensional space for visualization.</p>
    
    <h4>🐼 How t-SNE Works</h4>
    <ol>
      <li>Computes pairwise similarities between data points in high-dimensional space</li>
      <li>Defines a similar distribution over points in the low-dimensional space</li>
      <li>Minimizes the Kullback-Leibler divergence between the two distributions</li>
    </ol>
    
    <h4>🐼 Key Parameters</h4>
    <ul>
      <li><strong>Perplexity:</strong> Controls the balance between local and global structure (typically 5-50)</li>
      <li><strong>Learning Rate:</strong> Controls the step size in gradient descent</li>
      <li><strong>Number of Iterations:</strong> More iterations generally give better results</li>
    </ul>
    
    <h4>🐼 Advantages and Disadvantages</h4>
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Excellent for visualization</li>
      <li>Preserves local structure well</li>
      <li>Can reveal clusters and patterns</li>
    </ul>
    
    <p><strong>Disadvantages:</strong></p>
    <ul>
      <li>Computationally expensive</li>
      <li>Non-deterministic (different runs give different results)</li>
      <li>Doesn't preserve global structure well</li>
      <li>Cannot be used for new data points</li>
    </ul>
    
    <h4>🐼 Other Techniques</h4>
    <ul>
      <li><strong>UMAP (Uniform Manifold Approximation and Projection):</strong> Faster alternative to t-SNE that preserves both local and global structure</li>
      <li><strong>Isomap:</strong> Extends MDS to non-linear manifolds</li>
      <li><strong>LLE (Locally Linear Embedding):</strong> Preserves local neighborhood relationships</li>
      <li><strong>Autoencoders:</strong> Neural network-based dimensionality reduction</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=NEaUSP4YerM" target="_blank" rel="noopener noreferrer">this</a> video on t-SNE</li>
      <li>Read <a href="https://distill.pub/2016/misread-tsne/" target="_blank" rel="noopener noreferrer">this</a> article on how to use t-SNE effectively</li>
      <li>Compare PCA, t-SNE, and UMAP on the same dataset</li>
    </ul>

    <h3 id="day-7">👾 Day 7: Practical Applications and Projects</h3>
    <p>Today we'll apply the unsupervised learning techniques we've learned to real-world problems.</p>
    
    <h4>🐼 Customer Segmentation</h4>
    <p>Use clustering to segment customers based on their behavior and characteristics:</p>
    <ul>
      <li>Use K-Means or DBSCAN to group customers</li>
      <li>Analyze characteristics of each segment</li>
      <li>Develop targeted marketing strategies</li>
    </ul>
    
    <h4>🐼 Image Compression</h4>
    <p>Use PCA to compress images while preserving important features:</p>
    <ul>
      <li>Reshape image into a matrix</li>
      <li>Apply PCA to reduce dimensions</li>
      <li>Reconstruct image from principal components</li>
      <li>Compare original vs compressed image quality</li>
    </ul>
    
    <h4>🐼 Anomaly Detection</h4>
    <p>Use clustering to detect unusual patterns:</p>
    <ul>
      <li>Cluster normal data points</li>
      <li>Identify points that don't belong to any cluster</li>
      <li>Use distance-based methods to detect outliers</li>
    </ul>
    
    <h4>🐼 Data Visualization</h4>
    <p>Use dimensionality reduction to visualize high-dimensional data:</p>
    <ul>
      <li>Apply t-SNE to visualize clusters</li>
      <li>Use PCA for initial exploration</li>
      <li>Compare different visualization techniques</li>
    </ul>
    
    <h4>🐼 Project Ideas</h4>
    <ul>
      <li>Analyze a dataset of your choice using multiple clustering algorithms</li>
      <li>Create a recommendation system using collaborative filtering</li>
      <li>Build an image clustering system</li>
      <li>Develop a text clustering system for document organization</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Explore <a href="https://scikit-learn.org/stable/modules/clustering.html" target="_blank" rel="noopener noreferrer">scikit-learn clustering documentation</a></li>
      <li>Check out <a href="https://scikit-learn.org/stable/modules/decomposition.html" target="_blank" rel="noopener noreferrer">decomposition techniques</a></li>
      <li>Practice with <a href="https://www.kaggle.com/datasets" target="_blank" rel="noopener noreferrer">Kaggle datasets</a></li>
    </ul>
  </div>
);

export default MLWeek5; 