import React from 'react';

const Web3Week5 = () => (
  <div>
    <h2 id="week-5">🚀 Week 5: DApps, NFTs, DeFi and more</h2>
    
    <p>After learning about the blockchain, the nodes, the consensus, all the major components of this technology and then frontend development, you'll start to wonder, "<em>What kind of applications can I develop using all this knowledge?</em>" The applications built on top of Blockchain are called Decentralised Applications, or DApps.</p>

    <h3 id="day-1">👾 Day 1: Introduction to DApps</h3>
    <p>Generally Dapps have:</p>
    <ol>
      <li>A standard Front-end built using JavaScript or frameworks/libraries like React, Vue, etc.</li>
      <li>A Solidity/Rust backend, built on top of the blockchain</li>
    </ol>
    
    <p>Check this: <a href="https://youtu.be/F50OrwV6Uk8" target="_blank" rel="noopener noreferrer">What is a dApp? Decentralized Application on the Blockchain</a></p>
    
    <p>Now moving on, as you guys know how to create Smart Contracts, you need a way to connect your DApp front-end with your local or remote Solidity backend, using anything from HTTP to Websockets. To do so you can choose between two JavaScript Libraries:</p>
    
    <h4>🐼 JavaScript Libraries</h4>
    <ol>
      <li><strong>Web3.js</strong> - web3.js is a collection of libraries that allow you to connect with a local or remote Ethereum node using HTTP, Websockets, and other communication protocols directly from your JavaScript Based front-end.</li>
      <li><strong>Ethers.js</strong> - Ethers.js is a lightweight JavaScript library used as an alternative to Web3.js to connect the JavaScript front-end with Smart Contacts.</li>
    </ol>
    
    <p>Check this: <a href="https://www.youtube.com/watch?v=t3wM5903ty0" target="_blank" rel="noopener noreferrer">Web3.js Intro · Web3.js · #1 Ethereum Blockchain Developer Crash Course</a></p>

    <h3 id="day-2">👾 Day 2: Web3.py Alternative</h3>
    <p>If you don't like JavaScript we have an alternative Web3.py - A Python library for interacting with Ethereum, inspired by Web3.js, many functions are similar.</p>
    
    <ul>
      <li><a href="https://www.dappuniversity.com/articles/web3-py-intro" target="_blank" rel="noopener noreferrer">Intro to Web3.py · Ethereum For Python Developers</a></li>
    </ul>

    <h3 id="day-3-4">👾 Day 3-4: Development Tools</h3>
    <p>Now that you guys know about the whole frontend-backend stuff and how to connect them with your Dapps, we will move on to more advanced tools that are actually used in doing an actual project.</p>
    
    <h4>🐼 Ganache</h4>
    <p>First, you need to know about <a href="https://www.tutorialspoint.com/ethereum/ethereum_ganache_for_blockchain.htm" target="_blank" rel="noopener noreferrer">Ganache</a>; it's like a local blockchain simulator that helps us deploy and test our blockchain/smart contract using its fake addresses and balance tokens. You might be thinking that we get similar things on Remix IDE, so what's the difference? The difference comes in when we have to deploy big projects where we will use Truffle, and Truffle works with Ganache. Moreover, as you know Solidity is not the only language used in blockchains, there are many other languages that work on Ganache but not on Remix.</p>
    
    <h4>🐼 Truffle Framework</h4>
    <p>Hope you got some idea about Ganache, because now we are moving onto Truffle; It basically provides a developing environment for big projects which need integration of frontend and your smart contract. (Don't mix these with cake types 😅)</p>
    
    <p>Advantage of all this is that using Ganache and Truffle will allow you to use your local editor like VS Code. (It's similar to making an actual app using frontend and backend) It is what you can deploy your contracts to when trying to make the miner's lives easier. You can plug front ends into back ends through localhost and all that good stuff.</p>
    
    <p>Here is a nice tutorial to install and run Truffle frameworks: <a href="https://trufflesuite.com/guides/pet-shop/" target="_blank" rel="noopener noreferrer">Truffle Guide</a></p>

    <h3 id="day-5">👾 Day 5: NFTs and DeFi</h3>
    <h4>🐼 Non-Fungible Tokens (NFTs)</h4>
    <p>Moving towards the end of this roadmap, let's explore NFTs short for Non Fungible Tokens; they represent ownership of digitally scarce goods such as pieces of art or collectibles. These tokens can be implemented on any smart contract based blockchains. It's like the owner of the token owns the information stored under the token, because they store this information (metadata), they can be sold and bought just like any other physical collectible. But does that mean there is a single unique NFT of a type? No, you might have seen or bought multiple copies of the same NFTs, it totally depends on the owner of the NFT on deciding the number of copies to exist, like an artwork which has multiple copies around the world. This is sort of a technical mistake. Technically nothing stops you from creating multiple NFTs pointing to the same metadata, NFTs that contain unauthorized copies of some copyright content etc.</p>
    
    <h4>🐼 Decentralized Finance (DeFi)</h4>
    <p>Enough about NFTs right? Now let's move to the most widely used purpose of a blockchain, its Digital Finance or DeFi. Blockchain technology has enabled permissionless networks that can be used by anyone, where built-in economic incentives ensure that network services can be maintained indefinitely without the aid of any individual company or central authority. Isn't it great? This means that there is no third party lurking around our transaction and we are no longer dependent on them to verify it. But there is a downside to everything; Volatility is one of them and also you have to maintain your own records for tax purposes. Regulations can vary from region to region.</p>
    
    <p>NFTs are also used in DeFi, they can be used as collateral while taking a digital loan.</p>
    
    <h4>🐼 Resources</h4>
    <p>Here are some cool blogs to better understand NFTs and DeFi:</p>
    
    <ul>
      <li><a href="https://www.simplilearn.com/tutorials/blockchain-tutorial/what-is-nft" target="_blank" rel="noopener noreferrer">What is NFT and How Does NFT Work? Everything You Need to Know</a></li>
      <li><a href="https://www.investopedia.com/decentralized-finance-defi-5113835#:~:text=Decentralized%20finance%2C%20or%20DeFi%2C%20uses,enables%20the%20development%20of%20applications" target="_blank" rel="noopener noreferrer">What Is Decentralized Finance (DeFi) and How Does It Work?</a></li>
    </ul>

    <h3 id="day-6-7">👾 Day 6-7: Projects and What's Next</h3>
    <p>Having completed this roadmap, we would recommend testing your newly developed skill using a self project.</p>
    
    <h4>🐼 Project Ideas</h4>
    <p>Some of the fascinating ideas to think about are:</p>
    
    <ol>
      <li>A Crowdfunding Platform using smart contracts- this would enable a safe way of funding, nowadays, the fundings get mixed or displaced, goes to someone else. Many problems like these would be tackled by this idea.</li>
      <li>Peer to Peer Ridesharing - think an app like Uber developed on blockchains.</li>
    </ol>
    
    <p>For beginners you can also try a To-Do List app powered by Ethereum smart contract. Here is a YouTube link for reference from <a href="https://www.youtube.com/watch?v=coQ5dg8wM2o" target="_blank" rel="noopener noreferrer">DApp university</a>.</p>
    
    <p>There is also a playlist of other projects by <a href="https://www.youtube.com/playlist?list=PLQbzkJk10-f5vKvZzA-wxH7BqTUI0K8Vr" target="_blank" rel="noopener noreferrer">Education Ecosystem</a> (Note these are in Node.js but as you know it's better to always learn along)</p>

    <div className="alert alert-success">
      <h4>🐼 What's Next?</h4>
      <p>To get a strong grasp on all the topics related to web3, try creating as many projects as you can. Also explore <a href="https://hardhat.org/" target="_blank" rel="noopener noreferrer">Hardhat</a> and <a href="https://www.alchemy.com/" target="_blank" rel="noopener noreferrer">Alchemy</a>.</p>
      
      <p>Technologists and journalists have described Web3 as a possible solution to concerns about the over-centralization of the web in a few "Big Tech" companies. Some have expressed the notion that Web3 could improve data security, scalability, and privacy beyond what is currently possible with Web 2.0 platforms. Some Web 2.0 companies, including Reddit and Discord, have explored incorporating Web3 technologies into their platforms.</p>
      
      <p>Therefore, there are a lot of opportunities in web3 as web3 projects are building infrastructure that matters, making way for traditional companies to join the fray.</p>
      
      <p>We wish you all the best for your journey ahead!</p>
    </div>

    <div className="alert alert-info">
      <h4>🐼 Contributors</h4>
      <ul>
        <li>Devansh Jain 9464327218</li>
        <li>Mohd Hamza 8795115039</li>
        <li>Geetika Gupta 9817323838</li>
        <li>Pratham Sahu 7619678791</li>
        <li>Divyansh Mittal 8851231264</li>
        <li>Shivam Mishra 8604397668</li>
      </ul>
    </div>
  </div>
);

export default Web3Week5; 