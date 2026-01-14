import React from 'react';

const InfoSecWeek7 = () => (
  <div>
    <h2 id="week-7">💻 Week 7: Binary Exploitation and Reverse Engineering</h2>
    
    <p>This week we'll be covering basic reverse engineering and binary exploitation. Before starting with this we recommend that you watch <a href="https://www.youtube.com/watch?v=75gBFiFtAb8" target="_blank" rel="noopener noreferrer">this video</a> to gain a basic understanding of what exactly you will be studying about.</p>

    <h3 id="day-1">👾 Day 1: Reverse Engineering Basics</h3>
    <p><strong>Reverse-engineering</strong> is the act of dismantling an object to see how it works. Here, we'll be dismantling the codes and applications.</p>
    
    <p><a href="https://docs.google.com/document/d/1kDLLi0rs76Vhkg7MpJs-LRanbmNUeJy6hsg9BuQFrJc/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><strong>Reverse Engineering Basics (click)</strong></a></p>
    
    <ul>
      <li>What is Reverse Engineering?</li>
      <li>Introduction to assembly - <a href="https://www.youtube.com/watch?v=4gwYkEK0gOk" target="_blank" rel="noopener noreferrer">intro</a>, <a href="https://www.youtube.com/watch?v=75gBFiFtAb8" target="_blank" rel="noopener noreferrer">x86 assembly</a></li>
      <li><a href="https://aticleworld.com/memory-layout-of-c-program/" target="_blank" rel="noopener noreferrer">Memory layout</a></li>
      <li><a href="https://www.youtube.com/watch?v=1GfMuBn6ZB0" target="_blank" rel="noopener noreferrer">Registers</a></li>
      <li>Assembly Instructions</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Ghidra</h3>
    <p><strong>Ghidra</strong> is a software reverse engineering framework that helps in analysing and reversing software binaries, decompiling a software binary and studying the source code underneath.</p>
    
    <ul>
      <li>Installing Ghidra <a href="https://github.com/dannyquist/re/blob/master/ghidra/ghidra-getting-started.md" target="_blank" rel="noopener noreferrer">Link</a> + <a href="https://htmlpreview.github.io/?https://github.com/NationalSecurityAgency/ghidra/blob/stable/GhidraDocs/InstallationGuide.html" target="_blank" rel="noopener noreferrer">Link</a></li>
      <li>Ghidra Getting started: <a href="https://www.youtube.com/watch?v=fTGTnrgjuGA&t=67s" target="_blank" rel="noopener noreferrer">Video</a> (Linux) OR <a href="https://ghidra-sre.org/GhidraGettingStartedVideo/GhidraGettingStartedVideo.mp4" target="_blank" rel="noopener noreferrer">Video</a> (Windows) OR <a href="https://www.youtube.com/watch?v=oTD_ki86c9I" target="_blank" rel="noopener noreferrer">Video</a></li>
    </ul>
    
    <p>This playlist will guide you on Reverse Engineering with Ghidra: <a href="https://www.youtube.com/playlist?list=PL_tws4AXg7auglkFo6ZRoWGXnWL0FHAEi" target="_blank" rel="noopener noreferrer">Playlist</a>.</p>

    <h3 id="day-3">👾 Day 3: Flareon Challenges</h3>
    <p>Some interesting challenges archive - <a href="https://github.com/fareedfauzi/Flare-On-Challenges/tree/master/Challenges" target="_blank" rel="noopener noreferrer">Flareon challenges</a></p>

    <h3 id="day-4-5-6">👾 Day 4, 5 & 6: Binary Exploitation</h3>
    <p><strong>Binary Exploitation</strong> - finding a vulnerability in the program and exploiting it to gain control of a shell or modifying the program's functions.</p>
    
    <p>Really <a href="https://www.youtube.com/playlist?list=PLhixgUqwRTjxglIswKp9mpkfPNfHkzyeN" target="_blank" rel="noopener noreferrer">good series</a> to understand how to actually perform binary exploitation.</p>
    
    <p>The <a href="https://guyinatuxedo.github.io/index.html" target="_blank" rel="noopener noreferrer">walkthrough</a> cover a lot of things, try to the chapters/challenges in following order: 1.4, 1.5, 1.6, 2.0, 2.1, 2.3, 2.4, 2.5, 2.8</p>
    
    <p>You can also try <strong>array indexing</strong> and <strong>bad seed</strong> sections if you are curious.</p>
    
    <p>Ever wondered why you use a format specifier in printf and not the variable directly like in python? Try out the <strong>Format String</strong> section.</p>

    <h3 id="day-7">👾 Day 7: Ropemporium</h3>
    <p>Now that you are familiar with buffer overflow and writing payload using pwntools, you can do <strong><a href="https://ropemporium.com/" target="_blank" rel="noopener noreferrer">Ropemporium</a></strong> challenges from 1 to 4.</p>

    <div className="alert alert-info">
      <h4>🐼 Additional Resources:</h4>
      <p>You can also try <a href="https://ir0nstone.gitbook.io/notes/types/stack/introduction" target="_blank" rel="noopener noreferrer">this book</a> which covers a lot of topics in a concise manner. If you get confident in the above mentioned topics, try <a href="https://microcorruption.com/" target="_blank" rel="noopener noreferrer">microcorruption</a>.</p>
    </div>
  </div>
);

export default InfoSecWeek7; 