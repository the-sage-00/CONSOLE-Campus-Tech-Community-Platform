import React from 'react';

const MLWeek7 = () => (
  <div>
    <h2 id="week-7">🦝 Week 7 (Advanced Deep Learning Topics)</h2>
    
    <p>This week we'll explore advanced deep learning topics including transformers, attention mechanisms, and modern architectures.</p>

    <h3 id="day-1">👾 Day 1: Attention Mechanisms</h3>
    <p>Attention mechanisms allow neural networks to focus on specific parts of the input when making predictions, similar to how humans pay attention to relevant information.</p>
    
    <h4>🐼 Why Attention?</h4>
    <p>Traditional RNNs and CNNs process all input equally, but attention allows the model to:</p>
    <ul>
      <li>Focus on relevant parts of the input</li>
      <li>Handle variable-length sequences better</li>
      <li>Improve interpretability</li>
      <li>Capture long-range dependencies</li>
    </ul>
    
    <h4>🐼 Attention Mechanism</h4>
    <p>The attention mechanism computes attention weights α_ij between query q_i and key k_j:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      α_ij = softmax(q_i^T k_j / √d_k)<br />
      output_i = Σ α_ij v_j
    </p>
    
    <p>where d_k is the dimension of the key vectors.</p>
    
    <h4>🐼 Types of Attention</h4>
    <ul>
      <li><strong>Self-Attention:</strong> Attention within the same sequence</li>
      <li><strong>Cross-Attention:</strong> Attention between different sequences</li>
      <li><strong>Multi-Head Attention:</strong> Multiple attention mechanisms in parallel</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=YtUX4IOq-nQ" target="_blank" rel="noopener noreferrer">this</a> video on attention</li>
      <li>Read <a href="https://distill.pub/2016/augmented-rnns/" target="_blank" rel="noopener noreferrer">this</a> article on attention</li>
      <li>Implement attention from scratch</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Transformers</h3>
    <p>Transformers are neural network architectures that use attention mechanisms as their primary building block, introduced in the "Attention Is All You Need" paper.</p>
    
    <h4>🐼 Transformer Architecture</h4>
    <div style={{ textAlign: 'center' }}>
      <img src="https://i.ibb.co/VqKJ8MZ/image.png" width="600" alt="Transformer Architecture" />
      <em>Transformer Architecture</em>
    </div>
    
    <p>The transformer consists of:</p>
    <ul>
      <li><strong>Encoder:</strong> Processes the input sequence</li>
      <li><strong>Decoder:</strong> Generates the output sequence</li>
      <li><strong>Multi-Head Attention:</strong> Multiple attention mechanisms</li>
      <li><strong>Feed-Forward Networks:</strong> Position-wise fully connected layers</li>
      <li><strong>Layer Normalization:</strong> Normalizes activations</li>
      <li><strong>Positional Encoding:</strong> Adds position information</li>
    </ul>
    
    <h4>🐼 Multi-Head Attention</h4>
    <p>Multi-head attention allows the model to attend to different positions and subspaces:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      MultiHead(Q,K,V) = Concat(head_1, ..., head_h)W^O<br />
      where head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
    </p>
    
    <h4>🐼 Positional Encoding</h4>
    <p>Since transformers don't have recurrence, positional encoding is added to give the model information about token positions:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      PE(pos, 2i) = sin(pos / 10000^(2i/d_model))<br />
      PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
    </p>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=U0s0f995w14" target="_blank" rel="noopener noreferrer">this</a> video on transformers</li>
      <li>Read the original <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">"Attention Is All You Need"</a> paper</li>
      <li>Implement a simple transformer</li>
    </ul>

    <h3 id="day-3">👾 Day 3: BERT and Pre-trained Language Models</h3>
    <p>BERT (Bidirectional Encoder Representations from Transformers) is a pre-trained language model that has revolutionized natural language processing.</p>
    
    <h4>🐼 BERT Architecture</h4>
    <p>BERT uses a transformer encoder architecture with:</p>
    <ul>
      <li><strong>Bidirectional Context:</strong> Can see both left and right context</li>
      <li><strong>Masked Language Modeling:</strong> Predicts masked tokens</li>
      <li><strong>Next Sentence Prediction:</strong> Predicts if two sentences follow each other</li>
    </ul>
    
    <h4>🐼 Pre-training Tasks</h4>
    <h5>Masked Language Modeling (MLM)</h5>
    <p>Randomly mask 15% of tokens and predict them:</p>
    <ul>
      <li>80% of the time: Replace with [MASK]</li>
      <li>10% of the time: Replace with random token</li>
      <li>10% of the time: Keep unchanged</li>
    </ul>
    
    <h5>Next Sentence Prediction (NSP)</h5>
    <p>Given two sentences A and B, predict if B follows A in the original text.</p>
    
    <h4>🐼 Fine-tuning</h4>
    <p>BERT can be fine-tuned for specific tasks:</p>
    <ul>
      <li><strong>Text Classification:</strong> Add classification head on top</li>
      <li><strong>Named Entity Recognition:</strong> Tag each token</li>
      <li><strong>Question Answering:</strong> Predict start and end positions</li>
    </ul>
    
    <h4>🐼 Other Pre-trained Models</h4>
    <ul>
      <li><strong>GPT (Generative Pre-trained Transformer):</strong> Unidirectional, good for text generation</li>
      <li><strong>RoBERTa:</strong> Improved BERT with better training</li>
      <li><strong>DistilBERT:</strong> Smaller, faster version of BERT</li>
      <li><strong>T5:</strong> Text-to-text transfer transformer</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Read the <a href="https://arxiv.org/abs/1810.04805" target="_blank" rel="noopener noreferrer">BERT paper</a></li>
      <li>Watch <a href="https://www.youtube.com/watch?v=xI0HHN5XKDo" target="_blank" rel="noopener noreferrer">this</a> video on BERT</li>
      <li>Use Hugging Face transformers library</li>
    </ul>

    <h3 id="day-4">👾 Day 4: Computer Vision with Transformers</h3>
    <p>Transformers have also been successfully applied to computer vision tasks, leading to architectures like Vision Transformer (ViT) and DETR.</p>
    
    <h4>🐼 Vision Transformer (ViT)</h4>
    <p>ViT applies transformers to image classification by:</p>
    <ol>
      <li>Dividing the image into patches</li>
      <li>Flattening each patch into a sequence</li>
      <li>Adding positional embeddings</li>
      <li>Processing with a transformer encoder</li>
      <li>Adding a classification head</li>
    </ol>
    
    <h4>🐼 DETR (DEtection TRansformer)</h4>
    <p>DETR uses transformers for object detection:</p>
    <ul>
      <li><strong>Backbone:</strong> CNN to extract features</li>
      <li><strong>Transformer Encoder-Decoder:</strong> Processes features</li>
      <li><strong>Object Queries:</strong> Learnable embeddings for objects</li>
      <li><strong>Bipartite Matching:</strong> Matches predictions to ground truth</li>
    </ul>
    
    <h4>🐼 Swin Transformer</h4>
    <p>Swin Transformer introduces hierarchical structure and shifted windows to make transformers more efficient for vision tasks.</p>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Read the <a href="https://arxiv.org/abs/2010.11929" target="_blank" rel="noopener noreferrer">ViT paper</a></li>
      <li>Read the <a href="https://arxiv.org/abs/2005.12872" target="_blank" rel="noopener noreferrer">DETR paper</a></li>
      <li>Implement ViT for image classification</li>
    </ul>

    <h3 id="day-5">👾 Day 5: Generative Models</h3>
    <p>Generative models learn to generate new data that resembles the training data. Today we'll explore GANs, VAEs, and diffusion models.</p>
    
    <h4>🐼 Generative Adversarial Networks (GANs)</h4>
    <p>GANs consist of two networks:</p>
    <ul>
      <li><strong>Generator:</strong> Creates fake data</li>
      <li><strong>Discriminator:</strong> Distinguishes real from fake data</li>
    </ul>
    
    <p>The objective function is:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      min_G max_D V(D,G) = E_x[log D(x)] + E_z[log(1-D(G(z)))]
    </p>
    
    <h4>🐼 Variational Autoencoders (VAEs)</h4>
    <p>VAEs learn a latent representation of the data and can generate new samples by sampling from the latent space.</p>
    
    <p>The VAE objective includes:</p>
    <ul>
      <li><strong>Reconstruction Loss:</strong> How well the decoder reconstructs the input</li>
      <li><strong>KL Divergence:</strong> How close the latent distribution is to a prior (usually normal)</li>
    </ul>
    
    <h4>🐼 Diffusion Models</h4>
    <p>Diffusion models gradually add noise to data and then learn to reverse the process:</p>
    <ol>
      <li><strong>Forward Process:</strong> Gradually add noise to data</li>
      <li><strong>Reverse Process:</strong> Learn to denoise step by step</li>
    </ol>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=Sw9r8CL98yA" target="_blank" rel="noopener noreferrer">this</a> video on GANs</li>
      <li>Read about <a href="https://arxiv.org/abs/2006.11239" target="_blank" rel="noopener noreferrer">DDPM</a> (Denoising Diffusion Probabilistic Models)</li>
      <li>Implement a simple GAN</li>
    </ul>

    <h3 id="day-6">👾 Day 6: Reinforcement Learning</h3>
    <p>Reinforcement learning is a type of machine learning where an agent learns to make decisions by interacting with an environment.</p>
    
    <h4>🐼 Key Concepts</h4>
    <ul>
      <li><strong>Agent:</strong> The learning entity</li>
      <li><strong>Environment:</strong> The world the agent interacts with</li>
      <li><strong>State:</strong> Current situation of the environment</li>
      <li><strong>Action:</strong> What the agent can do</li>
      <li><strong>Reward:</strong> Feedback from the environment</li>
      <li><strong>Policy:</strong> Strategy for choosing actions</li>
    </ul>
    
    <h4>🐼 Q-Learning</h4>
    <p>Q-learning learns the value of taking actions in states:</p>
    <p style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '1.1rem' }}>
      Q(s,a) = Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]
    </p>
    
    <p>where α is the learning rate and γ is the discount factor.</p>
    
    <h4>🐼 Deep Q-Networks (DQN)</h4>
    <p>DQN uses neural networks to approximate Q-values:</p>
    <ul>
      <li><strong>Experience Replay:</strong> Store and replay past experiences</li>
      <li><strong>Target Network:</strong> Separate network for computing targets</li>
      <li><strong>Gradient Clipping:</strong> Prevent exploding gradients</li>
    </ul>
    
    <h4>🐼 Policy Gradient Methods</h4>
    <p>Policy gradient methods directly optimize the policy:</p>
    <ul>
      <li><strong>REINFORCE:</strong> Monte Carlo policy gradient</li>
      <li><strong>Actor-Critic:</strong> Combines policy and value function</li>
      <li><strong>PPO:</strong> Proximal Policy Optimization</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Watch <a href="https://www.youtube.com/watch?v=2pWv7GOvuf0" target="_blank" rel="noopener noreferrer">this</a> video on RL</li>
      <li>Read <a href="https://spinningup.openai.com/en/latest/" target="_blank" rel="noopener noreferrer">Spinning Up in Deep RL</a></li>
      <li>Implement Q-learning for a simple environment</li>
    </ul>

    <h3 id="day-7">👾 Day 7: Advanced Topics and Future Directions</h3>
    <p>Today we'll explore cutting-edge topics and discuss the future of machine learning.</p>
    
    <h4>🐼 Multi-Modal Learning</h4>
    <p>Multi-modal learning combines different types of data (text, images, audio):</p>
    <ul>
      <li><strong>CLIP:</strong> Contrastive Language-Image Pre-training</li>
      <li><strong>DALL-E:</strong> Text-to-image generation</li>
      <li><strong>GPT-4V:</strong> Multi-modal GPT-4</li>
    </ul>
    
    <h4>🐼 Federated Learning</h4>
    <p>Federated learning allows training on decentralized data:</p>
    <ul>
      <li>Data stays on local devices</li>
      <li>Only model updates are shared</li>
      <li>Preserves privacy</li>
    </ul>
    
    <h4>🐼 Few-Shot Learning</h4>
    <p>Few-shot learning aims to learn from very few examples:</p>
    <ul>
      <li><strong>Meta-Learning:</strong> Learning to learn</li>
      <li><strong>Prototypical Networks:</strong> Compare to prototypes</li>
      <li><strong>Model-Agnostic Meta-Learning (MAML):</strong> Fast adaptation</li>
    </ul>
    
    <h4>🐼 Explainable AI</h4>
    <p>Making AI systems interpretable and trustworthy:</p>
    <ul>
      <li><strong>LIME:</strong> Local Interpretable Model-agnostic Explanations</li>
      <li><strong>SHAP:</strong> SHapley Additive exPlanations</li>
      <li><strong>Attention Visualization:</strong> Understanding what models focus on</li>
    </ul>
    
    <h4>🐼 Ethical AI</h4>
    <p>Important considerations for responsible AI development:</p>
    <ul>
      <li><strong>Bias and Fairness:</strong> Ensuring models don't discriminate</li>
      <li><strong>Privacy:</strong> Protecting user data</li>
      <li><strong>Transparency:</strong> Making decisions explainable</li>
      <li><strong>Accountability:</strong> Taking responsibility for AI decisions</li>
    </ul>
    
    <h4>🐼 Future Directions</h4>
    <ul>
      <li><strong>Large Language Models:</strong> GPT-4, Claude, and beyond</li>
      <li><strong>AI Agents:</strong> Autonomous systems that can plan and act</li>
      <li><strong>Neuromorphic Computing:</strong> Brain-inspired hardware</li>
      <li><strong>Quantum Machine Learning:</strong> Quantum algorithms for ML</li>
    </ul>
    
    <h4>🐼 Resources</h4>
    <ul>
      <li>Read <a href="https://arxiv.org/" target="_blank" rel="noopener noreferrer">latest papers</a> on arXiv</li>
      <li>Follow <a href="https://papers.nips.cc/" target="_blank" rel="noopener noreferrer">NeurIPS</a> and <a href="https://icml.cc/" target="_blank" rel="noopener noreferrer">ICML</a> conferences</li>
      <li>Join <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer">Kaggle</a> competitions</li>
      <li>Contribute to <a href="https://github.com/" target="_blank" rel="noopener noreferrer">open-source projects</a></li>
    </ul>
    
    <h4>🐼 Next Steps</h4>
    <p>Congratulations on completing this comprehensive machine learning roadmap! Here are some suggestions for continuing your journey:</p>
    <ul>
      <li>Build a portfolio of projects</li>
      <li>Participate in competitions and hackathons</li>
      <li>Read research papers regularly</li>
      <li>Contribute to the open-source community</li>
      <li>Stay updated with the latest developments</li>
      <li>Network with other ML practitioners</li>
    </ul>
  </div>
);

export default MLWeek7; 