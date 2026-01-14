import React from 'react';
import { Zap, Gamepad2, BookOpen } from 'lucide-react';

const Web3Week2 = () => (
  <div>
    <h2 id="week-2" className="flex items-center">
      <Zap className="w-6 h-6 mr-2" />
      Week 2: Ethereum and Smart Contracts
    </h2>
    
    <blockquote className="roadmap-quote">
      <p>"Although the Ethereum blockchain is a public blockchain, it is great to see private and consortium blockchains using the Ethereum code base actively under development." —Vitalik Buterin</p>
    </blockquote>
    
    <p>This week, you'll learn about Ethereum and Smart Contracts.</p>

    <h3 id="day-1-2" className="flex items-center">
      <Gamepad2 className="w-5 h-5 mr-2" />
      Day 1-2: Introduction to Ethereum
    </h3>
    <p>Ethereum is a <a href="https://en.wikipedia.org/wiki/Decentralization" target="_blank" rel="noopener noreferrer">decentralized</a>, <a href="https://en.wikipedia.org/wiki/Open-source_software" target="_blank" rel="noopener noreferrer">open-source</a> <a href="https://en.wikipedia.org/wiki/Blockchain" target="_blank" rel="noopener noreferrer">blockchain</a> with <a href="https://en.wikipedia.org/wiki/Smart_contract" target="_blank" rel="noopener noreferrer">smart contract</a> functionality.</p>
    
    <p>Smart contracts allow participants to transact with each other without a trusted central authority. A sender must sign transactions and spend Ether, Ethereum's native cryptocurrency, as a cost of processing transactions on the network.</p>
    
    <h4 className="flex items-center">
      <BookOpen className="w-4 h-4 mr-2" />
      Key Resources
    </h4>
    <ul>
      <li>Check this now: <a href="https://ethereum.org/en/developers/docs/intro-to-ethereum/" target="_blank" rel="noopener noreferrer">Intro to Ethereum | ethereum.org</a></li>
      <li><a href="https://www.youtube.com/watch?v=TDGq4aeevgY" target="_blank" rel="noopener noreferrer">Vitalik Buterin Describing Ethereum</a></li>
    </ul>
    
    <p>Ethereum was conceived in 2013 by programmer Vitalik Buterin when he released the Ethereum Whitepaper (<a href="https://ethereum.org/en/whitepaper/" target="_blank" rel="noopener noreferrer">Ethereum Whitepaper | ethereum.org</a>).</p>
    
    <p>In 2014, the development work began and was crowdfunded, and the network went live on 30th July 2015.</p>

    <h3 id="day-3" className="flex items-center">
      <Gamepad2 className="w-5 h-5 mr-2" />
      Day 3: The Merge
    </h3>
    <p>Ethereum currently runs on the Proof of Stake(PoS) consensus mechanism post "The Merge" which shifted Ethereum from Proof of Work(PoW) to Proof of Stake. The Merge was executed on 15th September 2022. Read more about the merge here: <a href="https://ethereum.org/en/upgrades/merge/#:~:text=by%20~99.95%25.-,What%20was%20The%20Merge%3F,be%20secured%20using%20staked%20ETH." target="_blank" rel="noopener noreferrer">The Merge | ethereum.org</a></p>

    <h3 id="day-4" className="flex items-center">
      <Gamepad2 className="w-5 h-5 mr-2" />
      Day 4: Smart Contracts
    </h3>
    <p>Smart contracts are the fundamental building blocks of <a href="https://ethereum.org/en/dapps/" target="_blank" rel="noopener noreferrer">Ethereum applications</a>.</p>
    
    <p>Nick Szabo coined the term "smart contract". In 1994, he wrote <a href="https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html" target="_blank" rel="noopener noreferrer">an introduction to the concept</a> and, in 1996, <a href="https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html" target="_blank" rel="noopener noreferrer">an exploration of what smart contracts could do</a>.</p>
    
    <p>Here is an interesting explanation of Smart Contracts by Vitalik Buterin:</p>
    
    <ul>
      <li><a href="https://www.youtube.com/watch?v=r0S4qIMf4Pg&ab_channel=TheBitcoin%26CryptoPodcastwithJeffKirdeikis" target="_blank" rel="noopener noreferrer">Smart Contracts - Vitalik Buterin</a></li>
    </ul>

    <h3 id="day-5" className="flex items-center">
      <Gamepad2 className="w-5 h-5 mr-2" />
      Day 5: Smart Contract Languages
    </h3>
    <p>Anyone can write a smart contract and deploy it to the network. You just need to learn how to code in a <a href="https://ethereum.org/en/developers/docs/smart-contracts/languages/" target="_blank" rel="noopener noreferrer">smart contract language</a> and have enough ETH to deploy your contract.</p>
    
    <p>Deploying a smart contract is technically a transaction, so you need to pay <a href="https://ethereum.org/en/developers/docs/gas/" target="_blank" rel="noopener noreferrer">Gas</a> in the same way you need to pay gas for a simple ETH transfer. However, gas costs for contract deployment are far higher.</p>
    
    <p>Ethereum has developer-friendly languages for writing smart contracts:</p>
    
    <ul>
      <li>Solidity</li>
      <li>Vyper</li>
    </ul>

    <h3 id="day-6" className="flex items-center">
      <Gamepad2 className="w-5 h-5 mr-2" />
      Day 6: Smart Contract Resources
    </h3>
    <p>Here are some resources to explore smart contracts more. Get your hands dirty and try to truly understand the essence of Smart Contracts and how they truly make the barebones of "Decentralised Networks".</p>
    
    <ul>
      <li><a href="https://ethereum.org/en/developers/docs/smart-contracts/" target="_blank" rel="noopener noreferrer">Smart Contracts | ethereum.org</a></li>
      <li><a href="https://blockgeeks.com/guides/smart-contracts/" target="_blank" rel="noopener noreferrer">Smart Contracts | Blockgeeks</a></li>
      <li><a href="https://www.ibm.com/in-en/topics/smart-contracts" target="_blank" rel="noopener noreferrer">Smart Contracts | IBM</a></li>
    </ul>

    <h3 id="day-7" className="flex items-center">
      <Gamepad2 className="w-5 h-5 mr-2" />
      Day 7: EVM and Oracles
    </h3>
    <p>Read about the Ethereum Virtual Machine:</p>
    
    <ul>
      <li><a href="https://ethereum.org/en/developers/docs/evm/" target="_blank" rel="noopener noreferrer">Ethereum Virtual Machine (EVM) | ethereum.org</a></li>
      <li><a href="https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6" target="_blank" rel="noopener noreferrer">Ethereum Virtual Machine (Solidity Documentation)</a></li>
    </ul>
    
    <p>Oracles provide Ethereum smart contracts with access to real-world data, unlocking more use-cases and greater value for users. Read more about them here:</p>
    
    <ul>
      <li><a href="https://ethereum.org/en/developers/docs/oracles/" target="_blank" rel="noopener noreferrer">Oracles - ethereum.org</a></li>
    </ul>
  </div>
);

export default Web3Week2; 