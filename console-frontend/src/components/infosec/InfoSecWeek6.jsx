import React from 'react';

const InfoSecWeek6 = () => (
  <div>
    <h2 id="week-6">🔍 Week 6: Forensics</h2>

    <h3 id="day-1">👾 Day 1: Introduction to Forensics</h3>
    <p><strong>Forensics:</strong> The art of recovering the digital trail left on a computer. There are plenty of methods to find data which is seemingly deleted, not stored, or worse, covertly recorded.</p>
    
    <p><a href="https://youtu.be/HU_euJyxYB4" target="_blank" rel="noopener noreferrer"><strong>Metadata</strong></a>, often described as data about data, helps in understanding the history of a particular electronic file, including when the file was created, modified and accessed, among other information that can be used to describe the file.</p>
    
    <p><a href="https://en.wikipedia.org/wiki/List_of_file_signatures" target="_blank" rel="noopener noreferrer">File signatures</a>, or magic numbers, are unique byte sequences at the start of files that identify their format or type. They allow systems to recognize file types reliably, independent of file extensions. For example, PDFs start with 25 50 44 46 2D, and JPEGs start with FFD8. Magic numbers are essential for file verification, security, and data recovery.</p>
    
    <h4>🐼 Tools:</h4>
    <ul>
      <li><a href="https://linux.die.net/man/1/file" target="_blank" rel="noopener noreferrer">file</a> (usually pre-installed): used to determine file type</li>
      <li><a href="https://linux.die.net/man/1/strings" target="_blank" rel="noopener noreferrer">strings</a>: print the strings of printable characters in files.</li>
      <li><a href="https://github.com/ReFirmLabs/binwalk/wiki/Quick-Start-Guide" target="_blank" rel="noopener noreferrer">binwalk</a>: Analyze, reverse engineer, and extract firmware images.</li>
      <li><a href="https://linuxhandbook.com/xxd-command/" target="_blank" rel="noopener noreferrer">xxd</a>: creates a hex dump of a given file or standard input. It can also convert a hex dump back to its original binary form.</li>
      <li><a href="https://github.com/chipmunk-sm/HexEditor" target="_blank" rel="noopener noreferrer">Hexeditor</a> (alternatively <a href="http://hexed.it" target="_blank" rel="noopener noreferrer">hexed.it</a> or <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor" target="_blank" rel="noopener noreferrer">this</a>): Used to read and edit the actual data in files, particularly the file headers.</li>
      <li><a href="https://linux.die.net/man/1/exiftool" target="_blank" rel="noopener noreferrer">Exiftool</a>: Used to read and write meta information in files.</li>
      <li><a href="http://www.exiv2.org/manpage.html" target="_blank" rel="noopener noreferrer">Exiv2</a>: Image metadata manipulation tool.</li>
    </ul>

    <h3 id="day-2">👾 Day 2: Image Forensics</h3>
    <p><strong>Image Forensics</strong></p>
    
    <p>Watch this video for an intro to Image steganography: <a href="https://youtu.be/TWEXCYQKyDc?si=E1xghF7dZD2JrmiY" target="_blank" rel="noopener noreferrer">https://youtu.be/TWEXCYQKyDc?si=E1xghF7dZD2JrmiY</a></p>
    
    <p><a href="https://medium.com/@renantkn/lsb-steganography-hiding-a-message-in-the-pixels-of-an-image-4722a8567046" target="_blank" rel="noopener noreferrer">Least Significant Bit</a> steganography.</p>
    
    <h4>🐼 Tools:</h4>
    <ul>
      <li><a href="https://www.aperisolve.com/" target="_blank" rel="noopener noreferrer">Aperi'Solve</a>– A fully automated tool designed to run forensics analysis over a massive amount of images</li>
      <li><a href="https://github.com/StefanoDeVuono/steghide" target="_blank" rel="noopener noreferrer">Steghide</a> - Hide data in various kinds of images.</li>
      <li><a href="https://github.com/RickdeJager/stegseek" target="_blank" rel="noopener noreferrer">Stegseek</a> - fast steghide cracker that can be used to extract hidden data from files</li>
      <li><a href="https://github.com/zed-0xff/zsteg" target="_blank" rel="noopener noreferrer">Zsteg</a> - PNG/BMP analysis</li>
      <li><a href="https://github.com/GuidoBartoli/sherloq" target="_blank" rel="noopener noreferrer">sherloq</a></li>
    </ul>

    <h3 id="day-3">👾 Day 3: Beginner Challenges</h3>
    <p>Some Beginner Challenges:</p>
    <ul>
      <li>Challenge 1: <a href="https://play.picoctf.org/practice/challenge/186?page=1&search=infor" target="_blank" rel="noopener noreferrer">https://play.picoctf.org/practice/challenge/186?page=1&search=infor</a></li>
      <li>Challenge 2: <a href="https://play.picoctf.org/practice/challenge/423?category=4&page=1" target="_blank" rel="noopener noreferrer">https://play.picoctf.org/practice/challenge/423?category=4&page=1</a></li>
      <li>Challenge 3: <a href="https://drive.google.com/file/d/1kMcD5pWWbzCcz2kBA8ny5XKcsU1tEOk0/view?usp=sharing" target="_blank" rel="noopener noreferrer">https://drive.google.com/file/d/1kMcD5pWWbzCcz2kBA8ny5XKcsU1tEOk0/view?usp=sharing</a></li>
    </ul>

    <h3 id="day-4">👾 Day 4: Audio Forensics</h3>
    <p><strong>Audio Forensics</strong></p>
    
    <ul>
      <li><a href="http://sourceforge.net/projects/audacity/" target="_blank" rel="noopener noreferrer">Audacity</a> - Analyze sound files (mp3, m4a, whatever).</li>
      <li><a href="https://github.com/ragibson/Steganography#WavSteg" target="_blank" rel="noopener noreferrer">Wavsteg</a> - python3 tool that can hide data and files in wav files and can also extract data from wav files</li>
    </ul>
    
    <p>Audio Spectrograms: <a href="https://www.youtube.com/watch?v=rAGkm4pv44s" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=rAGkm4pv44s</a></p>
    
    <p><a href="https://www.sonicvisualiser.org/" target="_blank" rel="noopener noreferrer">This tool</a> can be used to manipulate and find data hidden in different channels of an Audio file.</p>
    
    <p><a href="https://kamransaifullah.medium.com/milkshake-stenography-challenge-solution-de046379bff5" target="_blank" rel="noopener noreferrer">Here</a> is a very simple example of the above tool in action.</p>
    
    <p>Morse Code: <a href="https://en.wikipedia.org/wiki/Morse_code" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Morse_code</a></p>
    
    <p>Conversion of Morse code from wav file: <a href="https://morsecode.world/international/decoder/audio-decoder-adaptive.html" target="_blank" rel="noopener noreferrer">https://morsecode.world/international/decoder/audio-decoder-adaptive.html</a></p>
    
    <p>DTMF: <a href="https://en.wikipedia.org/wiki/DTMF" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/DTMF</a></p>
    
    <p>A tool to extract keys being pressed in the DTMF tone can be extracted using <a href="https://github.com/ribt/dtmf-decoder" target="_blank" rel="noopener noreferrer">this tool</a>.</p>

    <h3 id="day-5">👾 Day 5: Memory Forensics</h3>
    <p><strong>Memory Forensics</strong></p>
    
    <p><a href="https://github.com/volatilityfoundation/volatility" target="_blank" rel="noopener noreferrer">Volatility</a> [ For python3: <a href="https://github.com/volatilityfoundation/volatility3" target="_blank" rel="noopener noreferrer">volatility3</a> ]- A very popular memory forensic tool a very good guide to using it is available here:</p>
    
    <p><a href="https://westoahu.hawaii.edu/cyber/forensics-weekly-executive-summmaries/memory-ctf-with-volatility-part-1/" target="_blank" rel="noopener noreferrer">Part 1</a> links to further parts can be found on the same website.</p>
    
    <p>Note: Volatility Framework had a major revision with Volatility3, multiple guides available on the internet still refer to the older version i.e. Volatility2. Keep that in mind :)</p>
    
    <ul>
      <li><a href="https://www.nirsoft.net/utils/offline_registry_view.html" target="_blank" rel="noopener noreferrer">OfflineRegistryView</a>: Tool for Windows that allows you to read offline Registry files from external drives.</li>
      <li><a href="http://extundelete.sourceforge.net/" target="_blank" rel="noopener noreferrer">Extundelete</a> - Used for recovering lost data from mountable images.</li>
      <li><a href="https://github.com/google/rekall" target="_blank" rel="noopener noreferrer">Rekall</a> – Memory Forensic Framework</li>
    </ul>
    
    <p>A good collection of all forensic tools can be seen <a href="https://forensics.wiki/" target="_blank" rel="noopener noreferrer">here</a></p>

    <h3 id="day-6">👾 Day 6: Other Tools</h3>
    <p><strong>Others</strong></p>
    
    <ul>
      <li><a href="https://www.kali.org/tools/stegsnow/" target="_blank" rel="noopener noreferrer">Stegsnow</a>: Program for concealing messages in text files by appending tabs and spaces on the end of lines, and for extracting messages from files containing hidden messages.</li>
      <li><a href="https://www.kali.org/tools/foremost/" target="_blank" rel="noopener noreferrer">foremost</a>: A tool for recovering files based on their headers, footers, and internal data structures.</li>
      <li>gimp: A tool for editing images</li>
      <li><a href="https://www.kali.org/tools/pdfcrack/" target="_blank" rel="noopener noreferrer">pdfcrack</a>: A tool for recovering PDF passwords.</li>
    </ul>

    <h3 id="day-7">👾 Day 7: Practice</h3>
    <p>Try more challenges from <a href="https://play.picoctf.org/practice?category=4&page=1" target="_blank" rel="noopener noreferrer">picoCTF</a>, I am sure you will learn more things.</p>
  </div>
);

export default InfoSecWeek6; 