import React from 'react';

const Web3Week3 = () => (
  <div>
    <h2 id="week-3">💎 Week 3: Solidity</h2>
    
    <p>Now, having learnt about what smart contracts are and what they are capable of doing, the next thing that you should know is how do you write a smart contract.</p>
    
    <p>Solidity is an object-oriented, contract-oriented, high-level language for implementing smart contracts. Let's start learning solidity.</p>

    <h3 id="day-1">👾 Day 1: Object-Oriented Programming (OOP)</h3>
    <p>It is mentioned that solidity is an object-oriented language. No idea what that means?</p>
    
    <p>Well, simply speaking, everything around us is an object. The notion that everything is an object is the concept that underlies object-oriented programming, or OOP for short. These objects contain data, which we also refer to as attributes or properties, and methods. Objects can also interact with each other.</p>
    
    <h4>🐼 OOP Resources</h4>
    <ul>
      <li>To learn more about the concepts of OOP, you can refer to this <a href="https://www.devopsschool.com/blog/object-oriented-programming-oop-concept-simplified/" target="_blank" rel="noopener noreferrer">link</a></li>
    </ul>

    <h3 id="day-2">👾 Day 2: Solidity Basics</h3>
    <p>Now, we are good to go forward to learn about Solidity. It is influenced by C++, Python, and JavaScript and is designed to work on Ethereum, specifically the Ethereum Virtual Machine (EVM). Solidity is statically typed, and supports inheritance, libraries and complex user-defined types among other features.</p>
    
    <p>You will see it is possible to create contracts for voting, crowdfunding, blind auctions, multi-signature wallets and more using solidity. We aim to create and understand the implementations of such complex problems in the real world.</p>
    
    <h4>🐼 TutorialsPoint Solidity Tutorial</h4>
    <p>Moving on to references and tutorials for solidity, <a href="https://www.tutorialspoint.com/solidity/index.htm" target="_blank" rel="noopener noreferrer">TutorialsPoint</a> is a very nice source for learning the basics of solidity. You can skip the Environment setup part and follow the remaining basic part for a quick review of the syntax of solidity.</p>
    
    <p>These 3 are the most important parts of the basic tutorial, though:</p>
    
    <ol>
      <li>the different <a href="https://www.tutorialspoint.com/solidity/solidity_variables.htm" target="_blank" rel="noopener noreferrer">variable types</a> in solidity</li>
      <li><a href="https://www.tutorialspoint.com/solidity/solidity_variable_scope.htm" target="_blank" rel="noopener noreferrer">variable scope</a> in solidity</li>
      <li>some <a href="https://www.tutorialspoint.com/solidity/solidity_special_variables.htm" target="_blank" rel="noopener noreferrer">predefined variables</a> that are very important in solidity for various purposes (you might have seen a few of them in the remix samples)</li>
    </ol>
    
    <p>It is always advisable to make modular programs. So, next in line, we have <a href="https://www.tutorialspoint.com/solidity/solidity_functions.htm" target="_blank" rel="noopener noreferrer">functions</a>.</p>
    
    <p>Solidity has different types of functions, such as view functions that do not modify the state (any variable of the smart contract outside the function) and pure functions that do not read AND modify the state. These are mainly for security purposes and to ensure that unauthorized access to the state does not happen when it is not needed.</p>

    <h3 id="day-3">👾 Day 3: Solidity Continued</h3>
    <p>You can read about these <a href="https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm" target="_blank" rel="noopener noreferrer">Function modifiers</a> which are something new in solidity which isn't there in any language that I am aware of. It uses the symbol _; to act as a placeholder for another function, and another function gets inserted into that placeholder when some condition is met.</p>
    
    <p>Go through further topics in the <a href="https://www.tutorialspoint.com/solidity/index.htm" target="_blank" rel="noopener noreferrer">tutorial</a>. (after functions till error handling)</p>
    
    <p>To get familiar with the OOP concepts of solidity, read about <a href="https://www.tutorialspoint.com/solidity/solidity_contracts.htm" target="_blank" rel="noopener noreferrer">Contracts</a> (basically like classes), <a href="https://www.tutorialspoint.com/solidity/solidity_inheritance.htm" target="_blank" rel="noopener noreferrer">Inheritance</a> and <a href="https://www.tutorialspoint.com/solidity/solidity_constructors.htm" target="_blank" rel="noopener noreferrer">Constructors</a> in solidity.</p>

    <h3 id="day-4">👾 Day 4: Remix IDE</h3>
    <p>The best way to try out Solidity right now is using <a href="https://remix.ethereum.org/" target="_blank" rel="noopener noreferrer">Remix</a>. Remix is a web browser-based IDE that allows you to write Solidity smart contracts and then deploy and run the smart contracts.</p>
    
    <p>Now, try out whatever you learned from solidity tutorials in Remix.</p>

    <h3 id="day-5-7">👾 Day 5-7: Assignment</h3>
    <p>Now, you are familiar with solidity and remix. Here is one assignment you should try out to check if you have completely understood the topics. <a href="https://docs.google.com/document/d/1wCvzXhwPgOYUu13LM_OI_w4j--JaMdV-S3ElOATTnb0/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Assignment</a></p>

    <div className="alert alert-info">
      <p>If you prefer to do a step-by-step tutorial and search away on google and docs whenever a new term pops up, then follow this tutorial from <a href="https://www.dappuniversity.com/articles/solidity-tutorial" target="_blank" rel="noopener noreferrer">Dapp University</a>. However, please have a look at the above pages after you are done with it! <a href="https://docs.soliditylang.org/en/latest/" target="_blank" rel="noopener noreferrer">Solidity</a> is the official solidity documentation if you like to follow official docs.</p>
    </div>
  </div>
);

export default Web3Week3; 