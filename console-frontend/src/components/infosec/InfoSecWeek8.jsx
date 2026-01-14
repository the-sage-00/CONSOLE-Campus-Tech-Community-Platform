import React from 'react';

const InfoSecWeek8 = () => (
  <div>
    <h2 id="week-8">🔍 Week 8: OSINT</h2>

    <h3 id="day-1">👾 Day 1: Introduction to OSINT</h3>
    <p><strong>OSINT</strong>: Open source intelligence is the collection and analysis of data gathered from open sources like social media, news articles, company websites etc. to produce actionable intelligence.</p>
    
    <p>Cyber criminals use OSINT to collect information on a target before attacking; also, OSINT can be used to help guess a user's password.</p>
    
    <h4>🐼 Sock Puppets</h4>
    <p>Sock puppets, also known as research accounts, are online fictitious identities used to conceal the true identity of the OSINT investigator and to gain access to information that requires an account to access. Sock puppets are also created to isolate OSINT research, ensuring a separation between the personal and work lives of OSINT investigators.</p>
    
    <p>This is <strong>OPTIONAL</strong> at introduction level, but a good practice!</p>
    
    <p>How to create effective sock puppet, check:</p>
    <ul>
      <li><a href="https://web.archive.org/web/20210307173507/https://jakecreps.com/sock-puppets/" target="_blank" rel="noopener noreferrer">https://web.archive.org/web/20210307173507/https://jakecreps.com/sock-puppets/</a></li>
      <li><a href="https://www.secjuice.com/the-art-of-the-sock-osint-humint/" target="_blank" rel="noopener noreferrer">Art of the sock</a></li>
      <li><a href="https://www.reddit.com/r/OSINT/comments/dp70jr/my_process_for_setting_up_anonymous_sockpuppet/" target="_blank" rel="noopener noreferrer">https://www.reddit.com/r/OSINT/comments/dp70jr/my_process_for_setting_up_anonymous_sockpuppet/</a></li>
    </ul>
    
    <h4>🐼 Some Tools:</h4>
    <ul>
      <li>Fake Name Generator: <a href="https://www.fakenamegenerator.com/" target="_blank" rel="noopener noreferrer">https://www.fakenamegenerator.com/</a></li>
      <li>AI Generated face images: <a href="https://www.thispersondoesnotexist.com/" target="_blank" rel="noopener noreferrer">https://www.thispersondoesnotexist.com/</a></li>
    </ul>

    <h3 id="day-2">👾 Day 2: Search Engines</h3>
    <h4>🐼 Search Engines</h4>
    <ul>
      <li><a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">Google</a>
        <ul>
          <li><a href="https://www.google.com/advanced_search" target="_blank" rel="noopener noreferrer">Advanced Google Search</a></li>
          <li><a href="http://www.googleguide.com/print/adv_op_ref.pdf" target="_blank" rel="noopener noreferrer">Search Guide</a></li>
        </ul>
      </li>
      <li><a href="https://yandex.com/" target="_blank" rel="noopener noreferrer">Yandex</a></li>
      <li><a href="http://www.baidu.com/" target="_blank" rel="noopener noreferrer">Baidu</a></li>
      <li><a href="https://duckduckgo.com/" target="_blank" rel="noopener noreferrer">DuckDuckGo</a></li>
      <li><a href="https://www.bing.com/" target="_blank" rel="noopener noreferrer">Bing</a></li>
    </ul>
    
    <p>Another <strong>important tool</strong> that is used in a lot of investigations is <a href="https://wayback-api.archive.org/" target="_blank" rel="noopener noreferrer">https://wayback-api.archive.org/</a>. It allows the user to go "back in time" to see how websites looked in the past.</p>
    
    <h4>🐼 Image OSINT</h4>
    <p>Have an Image and need to gather information about it? Has it been posted anywhere before? What other similar images are on the internet?</p>
    
    <p>Tools:</p>
    <ul>
      <li><a href="https://images.google.com/" target="_blank" rel="noopener noreferrer">Google Image Search</a></li>
      <li><a href="https://yandex.com/images/" target="_blank" rel="noopener noreferrer">Yandex Image Search</a></li>
      <li><a href="https://tineye.com/" target="_blank" rel="noopener noreferrer">Tinyeye Image Search</a></li>
    </ul>
    
    <p>Example OSINT on street art: <a href="https://www.secjuice.com/street-art-in-osint-investigations/" target="_blank" rel="noopener noreferrer">https://www.secjuice.com/street-art-in-osint-investigations/</a></p>

    <h3 id="day-3">👾 Day 3: Geolocation OSINT</h3>
    <p><strong>Geolocation OSINT</strong></p>
    
    <p>Have to figure out where in the world you may be, using a photo of that location!</p>
    
    <p>Tools:</p>
    <ul>
      <li><a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps</a> (another useful tool that it provides is the <strong>Streetview</strong>)</li>
      <li><a href="https://www.earthcam.com/" target="_blank" rel="noopener noreferrer">EarthCam</a>: Webcams from around the world</li>
      <li><a href="https://www.n2yo.com/" target="_blank" rel="noopener noreferrer">N2YO</a>: Satellite Tracker</li>
      <li><a href="https://www.geoguessr.com/" target="_blank" rel="noopener noreferrer">Geoguessr</a>: browser-based geography game in which players are tasked to guess locations from Google Street View imagery.</li>
      <li><a href="https://www.plonkit.net/guide" target="_blank" rel="noopener noreferrer">PlonkIt</a>: Very detailed guide to Geoguessing.</li>
    </ul>

    <h3 id="day-4">👾 Day 4: Social Media OSINT</h3>
    <p><strong>Social Media OSINT</strong></p>
    
    <h4>🐼 Twitter</h4>
    <ul>
      <li><a href="https://twitter.com/search-advanced" target="_blank" rel="noopener noreferrer">Twitter Advanced Search</a></li>
      <li><a href="https://foller.me/" target="_blank" rel="noopener noreferrer">https://foller.me/</a></li>
      <li><a href="https://tinfoleak.com/" target="_blank" rel="noopener noreferrer">https://tinfoleak.com/</a></li>
      <li><a href="https://www.twitonomy.com/" target="_blank" rel="noopener noreferrer">https://www.twitonomy.com/</a></li>
    </ul>
    
    <h4>🐼 Facebook</h4>
    <ul>
      <li><a href="https://intelx.io/tools?tab=facebook" target="_blank" rel="noopener noreferrer">https://intelx.io/tools?tab=facebook</a></li>
      <li><a href="https://www.sowsearch.info/" target="_blank" rel="noopener noreferrer">https://www.sowsearch.info/</a></li>
    </ul>
    
    <h4>🐼 Instagram</h4>
    <ul>
      <li><a href="https://www.picuki.com/" target="_blank" rel="noopener noreferrer">https://www.picuki.com/</a></li>
    </ul>
    
    <h4>🐼 Discord</h4>
    <ul>
      <li><a href="https://discordbee.com/" target="_blank" rel="noopener noreferrer">https://discordbee.com/</a></li>
      <li>More tools: <a href="https://github.com/Dutchosintguy/OSINT-Discord-resources" target="_blank" rel="noopener noreferrer">https://github.com/Dutchosintguy/OSINT-Discord-resources</a></li>
    </ul>
    
    <h4>🐼 Reddit</h4>
    <ul>
      <li><a href="https://www.secjuice.com/reddit-osint-techniques/" target="_blank" rel="noopener noreferrer">https://www.secjuice.com/reddit-osint-techniques/</a></li>
      <li><a href="https://rdddeck.com/" target="_blank" rel="noopener noreferrer">https://rdddeck.com/</a></li>
    </ul>
    
    <h4>🐼 Github OSINT</h4>
    <ul>
      <li><a href="https://justingarrison.com/blog/2021-07-11-github-url-hacks/" target="_blank" rel="noopener noreferrer">https://justingarrison.com/blog/2021-07-11-github-url-hacks/</a></li>
    </ul>
    
    <p>Other than these, Google Search and Wayback Machine are your best mates!</p>

    <h3 id="day-5">👾 Day 5: Email, Password, and Username OSINT</h3>
    <h4>🐼 Email and Password OSINT</h4>
    <p>Tools:</p>
    <ul>
      <li><a href="https://dehashed.com/" target="_blank" rel="noopener noreferrer">https://dehashed.com/</a></li>
      <li><a href="https://phonebook.cz/" target="_blank" rel="noopener noreferrer">https://phonebook.cz/</a></li>
      <li><a href="https://thatsthem.com/reverse-email-lookup" target="_blank" rel="noopener noreferrer">https://thatsthem.com/reverse-email-lookup</a></li>
      <li><a href="https://www.voilanorbert.com/" target="_blank" rel="noopener noreferrer">https://www.voilanorbert.com/</a></li>
      <li><a href="https://www.hudsonrock.com/threat-intelligence-cybercrime-tools" target="_blank" rel="noopener noreferrer">https://www.hudsonrock.com/threat-intelligence-cybercrime-tools</a></li>
      <li><a href="https://leakcheck.io/" target="_blank" rel="noopener noreferrer">https://leakcheck.io/</a></li>
      <li><a href="https://snusbase.com/" target="_blank" rel="noopener noreferrer">https://snusbase.com/</a></li>
    </ul>
    
    <h4>🐼 Username OSINT</h4>
    <ul>
      <li><a href="https://namechk.com/" target="_blank" rel="noopener noreferrer">https://namechk.com/</a></li>
      <li><a href="https://whatsmyname.app/" target="_blank" rel="noopener noreferrer">https://whatsmyname.app/</a></li>
    </ul>
    
    <h4>🐼 People OSINT</h4>
    <ul>
      <li><a href="https://www.whitepages.com/" target="_blank" rel="noopener noreferrer">https://www.whitepages.com/</a></li>
      <li><a href="https://www.truecaller.com/" target="_blank" rel="noopener noreferrer">https://www.truecaller.com/</a></li>
      <li><a href="https://webmii.com/" target="_blank" rel="noopener noreferrer">https://webmii.com/</a></li>
    </ul>

    <h3 id="day-6">👾 Day 6: PGP Keys, Cryptocurrency, and Dark Web</h3>
    <h4>🐼 PGP keys OSINT</h4>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=64OrnwmcUOg" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=64OrnwmcUOg</a></li>
      <li><a href="https://pgp.mit.edu/" target="_blank" rel="noopener noreferrer">MIT PGP Public Key Server</a></li>
    </ul>
    
    <h4>🐼 Cryptocurrency OSINT</h4>
    <ul>
      <li><a href="https://etherscan.io/" target="_blank" rel="noopener noreferrer">Etherscan</a></li>
      <li><a href="https://etherchain.org/" target="_blank" rel="noopener noreferrer">Etherchain</a></li>
      <li><a href="https://www.blockchain.com/" target="_blank" rel="noopener noreferrer">Blockchain explorer</a></li>
      <li><a href="https://www.nyckel.com/nft-finder/?" target="_blank" rel="noopener noreferrer">NFT Finder</a></li>
    </ul>
    
    <h4>🐼 Dark Web</h4>
    <ul>
      <li><a href="https://ahmia.fi/" target="_blank" rel="noopener noreferrer">https://ahmia.fi/</a></li>
      <li><a href="https://dark.fail/" target="_blank" rel="noopener noreferrer">https://dark.fail/</a></li>
      <li>More Resources: <a href="https://www.osintcombine.com/post/dark-web-searching" target="_blank" rel="noopener noreferrer">https://www.osintcombine.com/post/dark-web-searching</a></li>
    </ul>
    
    <h4>🐼 Wireless Network OSINT</h4>
    <ul>
      <li><a href="https://wigle.net/" target="_blank" rel="noopener noreferrer">https://wigle.net/</a></li>
    </ul>

    <h3 id="day-7">👾 Day 7: Practice Challenges</h3>
    <p>Try some of the following challenges:</p>
    <ul>
      <li><a href="https://tryhackme.com/room/sakura" target="_blank" rel="noopener noreferrer">Sakura Room (TryHackMe)</a></li>
      <li><a href="https://tryhackme.com/room/ohsint" target="_blank" rel="noopener noreferrer">OhSINT room (TryHackMe)</a></li>
      <li><a href="https://tryhackme.com/r/room/somesint" target="_blank" rel="noopener noreferrer">SoMeSINT room (TryHackMe)</a></li>
      <li><a href="https://gralhix.com/list-of-osint-exercises/" target="_blank" rel="noopener noreferrer">https://gralhix.com/list-of-osint-exercises/</a></li>
      <li><a href="https://quiz.sector035.nl/" target="_blank" rel="noopener noreferrer">https://quiz.sector035.nl/</a></li>
    </ul>
  </div>
);

export default InfoSecWeek8; 