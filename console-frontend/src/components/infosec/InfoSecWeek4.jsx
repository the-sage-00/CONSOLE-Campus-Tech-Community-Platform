import React from 'react';

const InfoSecWeek4 = () => (
  <div>
    <h2 id="week-4">🔐 Week 4: Cryptography</h2>

    <h3 id="day-1">👾 Day 1: Introduction to Cryptography</h3>
    <p>Intro to <strong>Cryptography</strong> – refer <a href="https://docs.google.com/document/d/1zU-Yp7tQTTbbaXmVg2DIIyFojZfZ2QS4zvW0kdS80M8/edit#" target="_blank" rel="noopener noreferrer">doc</a></p>
    
    <p>The main idea behind cryptography is to transform data into form which can only be understood by intended targets. Even if someone interferes in between, the information remains secure</p>
    
    <p>There are many types of <strong>cryptography techniques</strong> some common ones are mentioned here:</p>
    
    <ul>
      <li><a href="https://code.tutsplus.com/tutorials/base-what-a-practical-introduction-to-base-encoding--net-27590" target="_blank" rel="noopener noreferrer">Base encoding</a></li>
      <li><a href="https://www.geeksforgeeks.org/vigenere-cipher/" target="_blank" rel="noopener noreferrer">Vigenere cipher</a></li>
      <li><a href="https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/" target="_blank" rel="noopener noreferrer">Caesar cipher</a></li>
      <li><a href="https://www.youtube.com/watch?v=D8tPkb98Fkk" target="_blank" rel="noopener noreferrer">Morse code</a></li>
      <li><a href="https://www.tutorialspoint.com/cryptography/cryptography_hash_functions.htm" target="_blank" rel="noopener noreferrer">Hashing Functions</a></li>
      <li><a href="https://www.javatpoint.com/symmetric-encryption-vs-asymmetric-encryption" target="_blank" rel="noopener noreferrer">Symmetric vs Asymmetric Encryption</a>: <a href="https://www.youtube.com/watch?v=ERp8420ucGs" target="_blank" rel="noopener noreferrer">Video</a></li>
    </ul>

    <h3 id="day-2">👾 Day 2: Practice and Tools</h3>
    <p>Let's do some <strong>practice</strong> on cryptography</p>
    
    <ul>
      <li><a href="https://overthewire.org/wargames/krypton/" target="_blank" rel="noopener noreferrer">OTW Krypton</a></li>
      <li><a href="https://play.picoctf.org/practice?category=2&page=1" target="_blank" rel="noopener noreferrer">Picoctf</a></li>
    </ul>
    
    <p>Some tools:</p>
    
    <ul>
      <li><a href="https://www.dcode.fr/" target="_blank" rel="noopener noreferrer">dcode</a></li>
      <li><a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener noreferrer">cyberchef</a></li>
      <li><a href="https://manansingh.github.io/Cryptolab-Offline/cryptolab.html" target="_blank" rel="noopener noreferrer">cryptolab</a></li>
      <li><a href="https://github.com/hellman/xortool" target="_blank" rel="noopener noreferrer">xortool</a></li>
      <li><a href="http://www.openwall.com/john/" target="_blank" rel="noopener noreferrer">John the Ripper</a></li>
      <li><a href="https://github.com/ciphey/ciphey" target="_blank" rel="noopener noreferrer">Ciphey</a></li>
    </ul>

    <h3 id="day-3">👾 Day 3: CryptoHack</h3>
    <p>To start with cryptography you can start with the following <a href="https://cryptohack.org" target="_blank" rel="noopener noreferrer">cryptohack</a> modules:</p>
    
    <ul>
      <li><a href="https://cryptohack.org/courses/intro/course_details/" target="_blank" rel="noopener noreferrer">Introduction to Cryptography</a></li>
      <li><a href="https://cryptohack.org/courses/modular/" target="_blank" rel="noopener noreferrer">Modular Arithmetic</a></li>
    </ul>

    <h3 id="day-4-5">👾 Day 4 & 5: Public Key Cryptography</h3>
    <p>Let us proceed to one of the more practical aspect of cryptography <a href="https://www.tutorialspoint.com/cryptography/public_key_encryption.htm" target="_blank" rel="noopener noreferrer">Public Key Cryptography</a></p>
    
    <ul>
      <li>These <a href="https://cryptohack.org/courses/public-key/" target="_blank" rel="noopener noreferrer">interactive exercises</a> are excellent for getting familiar with the different public key methods.</li>
      <li>Read some basic attacks on the RSA cryptosystem(Wiener's attack, Low public exponent attack, Partial key exposure, etc) For more attacks, check the RSA section of the following page:</li>
    </ul>
    
    <p><a href="https://github.com/jvdsn/crypto-attacks" target="_blank" rel="noopener noreferrer">https://github.com/jvdsn/crypto-attacks</a> and try googling the attack to know more about it.</p>

    <h3 id="day-6-7">👾 Day 6 & 7: Advanced Topics</h3>
    <p>Some more advanced topics in cryptography</p>
    
    <ul>
      <li><a href="https://cryptohack.org/courses/symmetric/" target="_blank" rel="noopener noreferrer">Symmetric Cryptography</a></li>
      <li><a href="https://cryptohack.org/courses/elliptic/" target="_blank" rel="noopener noreferrer">Elliptic Curve</a></li>
      <li>(optional) <a href="https://www.youtube.com/watch?v=6qD-T1gjtKw" target="_blank" rel="noopener noreferrer">Post Quantum Cryptography</a>, <a href="https://csrc.nist.gov/projects/post-quantum-cryptography/selected-algorithms-2022" target="_blank" rel="noopener noreferrer">selected algorithms</a>, <a href="https://cryptohack.org/challenges/post-quantum/" target="_blank" rel="noopener noreferrer">exercises from cryptohack</a></li>
    </ul>

    <div className="alert alert-info">
      <h4>🐼 Additional Practice:</h4>
      <p><em>You can try more challenges on <a href="https://cryptopals.com/" target="_blank" rel="noopener noreferrer">Cryptopals</a>, <a href="https://cryptohack.org/challenges/" target="_blank" rel="noopener noreferrer">cryptohack</a> & <a href="https://play.picoctf.org/practice?category=2&page=1" target="_blank" rel="noopener noreferrer">picoCTF</a>.</em></p>
    </div>
  </div>
);

export default InfoSecWeek4; 