import React from 'react';

const InfoSecWeek3 = () => (
  <div>
    <h2 id="week-3">🌐 Week 3: Cyber Security and Web Exploitation</h2>
    
    <p>Now after getting all your fundamentals cleared, let's dive into cyber security and its applications. This week will mainly focus on learning web exploitation. After the end of this week, you will be able to penetrate some loosely built websites and might even find bugs on IITK websites as well ?!</p>

    <h3 id="day-1">👾 Day 1: Web Exploitation and HTML</h3>
    <p>What is <strong>Web Exploitation</strong> and what does it cover?</p>
    
    <p><a href="https://www.opensourceforu.com/2012/03/cyber-attacks-explained-web-exploitation/" target="_blank" rel="noopener noreferrer">https://www.opensourceforu.com/2012/03/cyber-attacks-explained-web-exploitation/</a></p>
    
    <p>Now let's start learning languages such as HTML and JS which build up the client side of the web application. On the client side, HTML gives structure to the web application while JS gives logical code of how we can interact with it.</p>
    
    <p>Learn <strong>HTML</strong> from - <a href="https://www.youtube.com/playlist?list=PLr6-GrHUlVf_ZNmuQSXdS197Oyr1L9sPB" target="_blank" rel="noopener noreferrer">HTML playlist</a></p>
    
    <p>Watching till 20 should be fine for now.</p>

    <h3 id="day-2">👾 Day 2: JavaScript and Developer Tools</h3>
    <p>Do a crash course in <strong>JS</strong> - <a href="https://www.youtube.com/watch?v=hdI2bqOjy3c" target="_blank" rel="noopener noreferrer">JS crash course</a></p>
    
    <p>MDN web doc reference for JS - <a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics" target="_blank" rel="noopener noreferrer">JS</a></p>
    
    <p>You will find MDN webdocs a great information source on how the web works. Also go through this video:</p>
    
    <p><a href="https://youtu.be/FTeE3OrTNoA?t=120" target="_blank" rel="noopener noreferrer">Hacker101 - JavaScript for Hackers (Created by @STÖK)</a></p>
    
    <p>Learn <strong>Fetch API</strong> from this crash course <a href="https://www.youtube.com/watch?v=Oive66jrwBs&t=0s" target="_blank" rel="noopener noreferrer">Fetch API</a> and from the MDN web docs - <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" target="_blank" rel="noopener noreferrer">Fetch API - MDN Web Docs</a></p>
    
    <p>Also try to learn the terms that you find new in the MDN web docs.</p>
    
    <p>An important tool for web exploitation is the developer tools that almost all browsers provide. Here is a crash course on it - <a href="https://www.youtube.com/watch?v=gTVpBbFWry8" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=gTVpBbFWry8</a></p>

    <h3 id="day-3">👾 Day 3: SQL and PHP</h3>
    <p><strong>SQL</strong> is the language for querying data from databases and that is where all information is stored. So a knowledge of SQL is important in interfering with these queries - <a href="https://sqlzoo.net/wiki/SQL_Tutorial" target="_blank" rel="noopener noreferrer">SQL tutorial</a>.</p>
    
    <p><strong>PHP</strong> is a server-side scripting language and a lot of old web applications are still using them.</p>
    
    <p>Crash Course on PHP - <a href="https://youtu.be/6mO1UA1r-6Q" target="_blank" rel="noopener noreferrer">PHP Crash Course for beginners - 2020</a></p>
    
    <p>Refer to PHP docs - <a href="https://www.php.net/manual/en/" target="_blank" rel="noopener noreferrer">PHP docs</a></p>

    <h3 id="day-4">👾 Day 4: XSS and SQL Injection</h3>
    <p>Now after spending the last two days solely learning, now let's try to apply our knowledge and that's how you actually learn hacking!</p>
    
    <p>Here you can <strong>apply your knowledge of JS</strong> - <a href="https://www.hackthissite.org/missions/javascript/" target="_blank" rel="noopener noreferrer">HTS</a></p>
    
    <p>Go to the JavaScript challenges and try to solve all of them.</p>
    
    <p><strong>XSS attacks</strong> are a type of injection attack in which a vulnerable website is manipulated so as to send malicious scripts to some other client's browser - <a href="https://owasp.org/www-community/attacks/xss/" target="_blank" rel="noopener noreferrer">XSS attacks</a></p>
    
    <p>Here is a game where you can try XSS attacks yourselves - <a href="https://xss-game.appspot.com/" target="_blank" rel="noopener noreferrer">XSS game</a></p>
    
    <p>Often to exploit reflected XSS one would need a https endpoint which is provided by online websites like <a href="https://pipedream.com/requestbin" target="_blank" rel="noopener noreferrer">RequestBin</a></p>
    
    <p>Another popular attack vector is <strong>SQL injection</strong> where the SQL queries that get data out of databases are interfered to take out data without proper authentication - <a href="https://www.hacksplaining.com/prevention/sql-injection" target="_blank" rel="noopener noreferrer">SQL injection</a></p>

    <h3 id="day-5">👾 Day 5: OWASP Top-10 and BurpSuite</h3>
    <p><strong>OWASP Top-10</strong> lists the top-10 web application vulnerabilities in the present day so this is a must know information for people into web security - <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer">OWASP Top-10</a></p>
    
    <p><a href="https://youtu.be/xGecBCc3lEk" target="_blank" rel="noopener noreferrer">The TOP 10 VULNERABILITIES In Web Applications In 2022 - OWASP Top 10 Explained</a></p>
    
    <p><strong>BurpSuite</strong> is another handy tool for web exploitation. You can intercept and manipulate the requests sent from your browser and many more things! - <a href="https://linuxhint.com/burpsuite_tutorial_beginners/" target="_blank" rel="noopener noreferrer">BurpSuite</a></p>
    
    <p><a href="https://youtu.be/G3hpAeoZ4ek" target="_blank" rel="noopener noreferrer">Burpsuite Basics (FREE Community Edition)</a></p>
    
    <p><strong>DVWA</strong> (Damn Vulnerable Web Application) will let you discover various vulnerabilities and bugs on a MySQL+PHP-based web application.</p>
    
    <p>First of all run the web application in a dockerized environment - <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noopener noreferrer">Installing Docker</a> + <a href="https://hub.docker.com/r/vulnerables/web-dvwa/" target="_blank" rel="noopener noreferrer">DVWA docker image</a> <a href="https://www.youtube.com/playlist?list=PLHUKi1UlEgOJLPSFZaFKMoexpM6qhOb4Q" target="_blank" rel="noopener noreferrer">DVWA solutions</a></p>
    
    <p>This is not to be done completely in a day but you should go on doing it at your own pace.</p>

    <h3 id="day-6">👾 Day 6: Brute Forcing</h3>
    <p><strong>Brute Forcing Web app authentication.</strong></p>
    
    <p><strong>Web app authentication forms are easy targets for exploitation</strong></p>
    
    <p><strong>Using either <a href="https://portswigger.net/support/using-burp-to-brute-force-a-login-page" target="_blank" rel="noopener noreferrer">BurpSuit</a> or perhaps a more preferable method using <a href="https://www.freecodecamp.org/news/how-to-use-hydra-pentesting-tutorial/" target="_blank" rel="noopener noreferrer">Hydra</a>.</strong></p>

    <h3 id="day-7">👾 Day 7: Practice Challenges</h3>
    <p>Now getting better in web exploitation or any other application of cyber security is only through practice. Try solving the <strong>OTW Natas</strong> challenges - <a href="https://overthewire.org/wargames/natas/" target="_blank" rel="noopener noreferrer">Natas</a> and solving various web-exploitation CTF challenges on picoCTF - <a href="https://play.picoctf.org/practice" target="_blank" rel="noopener noreferrer">picoCTF</a>.</p>
    
    <p>Have a look at <a href="https://fareedfauzi.gitbook.io/ctf-checklist-for-beginner/web" target="_blank" rel="noopener noreferrer">CTF checklists</a> to help you through these challenges.</p>
    
    <p>Also you may find this liveoverflow playlist really informative - <a href="https://www.youtube.com/playlist?list=PLhixgUqwRTjx2BmNF5-GddyqZcizwLLGP" target="_blank" rel="noopener noreferrer">Web Exploitation</a></p>
    
    <div className="alert alert-info">
      <p><strong>Remember:</strong> Whenever stuck remember Google Is Your Best Friend</p>
    </div>
  </div>
);

export default InfoSecWeek3; 