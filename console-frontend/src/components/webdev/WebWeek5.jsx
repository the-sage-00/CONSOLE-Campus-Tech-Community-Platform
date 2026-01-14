import React from 'react';

const WebWeek5 = () => (
  <div>
    <h2 id="week-5">🚀 Week 5 (DevOps)</h2>
    
    <p>Now that you've made a website, how will you share it with the world? How will you maintain and monitor your website? This is where DevOps comes in!</p>

    <h3 id="day-1">👾 Day 1: Basics</h3>
    <p><strong>Basics</strong></p>
    
    <h4>🐼 Choosing an operating system</h4>
    <p>We know most of you come from a windows or a mac background but when it comes to development you gotta go for a LINUX or UNIX based operating system. There are a lot of options out there but the most popular ones are UBUNTU, DEBIAN, FEDORA, ARCH, etc. We are not suggesting just shifting from your previous OS, start by dual booting it onto your machine and then slowly make it your daily driver. To get started read this <a href="https://ledutokens.medium.com/get-started-with-linux-a-beginners-guide-9ba69b8be53c" target="_blank" rel="noopener noreferrer">article</a>.</p>
    
    <h4>🐼 Using a terminal</h4>
    <p>A terminal is simply a text-based interface to the computer, it is used to interact with your computer system via CLI (command line interface). Everything you want to do can be achieved using the terminal and to become a good developer you must learn to live in the terminal. <a href="https://ubuntu.com/tutorials/command-line-for-beginners#1-overview" target="_blank" rel="noopener noreferrer">Here's</a> a good article to get you started.</p>

    <h3 id="day-2">👾 Day 2: Git</h3>
    <p><strong>Git</strong></p>
    <p>Git is an important version control tool, it is used a lot in the industry. As a developer you must know how to use it.</p>
    
    <h4>🐼 Installation</h4>
    <p>Let's start by installing git:</p>
    <ul>
      <li>For windows, refer <a href="https://nerdschalk.com/how-to-install-and-use-git-on-windows-11/" target="_blank" rel="noopener noreferrer">here</a></li>
      <li>For Linux, refer <a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank" rel="noopener noreferrer">here</a></li>
    </ul>
    
    <p>Before starting, it is really helpful to get familiar with the terminal, <a href="https://www.youtube.com/watch?v=Zl7npywCB84" target="_blank" rel="noopener noreferrer">shell tutorial</a>. Most commands you see here will also work on windows powershell.</p>
    
    <p>You can learn more about here : <a href="https://www.youtube.com/watch?v=IHaTbJPdB-s" target="_blank" rel="noopener noreferrer">Git Video Tutorial</a>, <a href="https://jwiegley.github.io/git-from-the-bottom-up/" target="_blank" rel="noopener noreferrer">Blog on Git</a></p>
    
    <h4>🐼 Git + Github</h4>
    <p>Github is a platform where you can keep your code for the world to see! Is also used when multiple people have to contribute to a project.</p>
    
    <ul>
      <li><a href="https://ohshitgit.com/" target="_blank" rel="noopener noreferrer">What If you mess up?</a></li>
      <li>To get started with github, we suggest making an account with the IITK email id to avail the student pack, which comes with a lot of benefits. To learn about github, the official docs are a great place to start <a href="https://docs.github.com/en/get-started/quickstart/hello-world" target="_blank" rel="noopener noreferrer">Github Docs</a>.</li>
      <li>Also, to get started you need to set up an SSH key, follow <a href="https://www.youtube.com/watch?v=WgZIv5HI44o" target="_blank" rel="noopener noreferrer">this tutorial</a>.</li>
      <li>Learn more from here: <a href="https://www.youtube.com/watch?v=HkdAHXoRtos" target="_blank" rel="noopener noreferrer">Git + Github</a>, <a href="https://learngitbranching.js.org/" target="_blank" rel="noopener noreferrer">Learn git branching</a></li>
    </ul>

    <h3 id="day-3">👾 Day 3: Github Actions</h3>
    <p><strong>Github Actions</strong></p>
    <p>Now that you know about github, it is time to implement some CI/CD using github actions.</p>
    
    <h4>🐼 CI/CD Resources</h4>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=scEDHsr3APg&t=14s" target="_blank" rel="noopener noreferrer">What is CI/CD</a></li>
      <li><a href="https://youtu.be/5I37iVCDUTU" target="_blank" rel="noopener noreferrer">Workflow for a React App</a></li>
    </ul>

    <h3 id="day-4">👾 Day 4: Network Security and Protocols</h3>
    <p><strong>Network Security and Protocols</strong></p>
    <p>As a DevOps engineer you will need to understand the basics of networking protocols, how they work, and how they are used in the real world. To get you started, you should learn about:</p>
    
    <h4>🐼 Network Protocols</h4>
    <ul>
      <li><a href="https://www.geeksforgeeks.org/tcp-ip-model/" target="_blank" rel="noopener noreferrer">TCP/IP</a></li>
      <li><a href="https://www.geeksforgeeks.org/http-full-form/" target="_blank" rel="noopener noreferrer">HTTP</a></li>
      <li><a href="https://www.geeksforgeeks.org/explain-working-of-https/" target="_blank" rel="noopener noreferrer">HTTPS</a></li>
      <li><a href="https://www.geeksforgeeks.org/file-transfer-protocol-ftp-in-application-layer/" target="_blank" rel="noopener noreferrer">FTP</a></li>
      <li><a href="https://www.geeksforgeeks.org/introduction-to-sshsecure-shell-keys/" target="_blank" rel="noopener noreferrer">SSH</a></li>
      <li><a href="https://www.geeksforgeeks.org/simple-mail-transfer-protocol-smtp/" target="_blank" rel="noopener noreferrer">SMTP</a></li>
    </ul>
    
    <h4>🐼 Web Testing</h4>
    <p>Web testing is a software testing technique to test web applications or websites for finding errors and bugs. A web application must be tested properly before it goes to the end-users. Also, testing a web application does not only mean finding common bugs or errors but also testing the quality-related risks associated with the application. <a href="https://usersnap.com/blog/web-application-testing/" target="_blank" rel="noopener noreferrer">Here</a> is a good resource to get you started. Keep in mind testing is one of the most important aspects of web development and you will keep learning new methods of testing as go along.</p>

    <h3 id="day-5">👾 Day 5: Docker</h3>
    <p><strong>Docker</strong></p>
    <p>Docker is a tool for containerizing your applications so that they can run on any platform! It is one of the most important tools used in the industry as it saves a lot of time.</p>
    
    <h4>🐼 Docker Resources</h4>
    <ul>
      <li>Check : <a href="https://www.freecodecamp.org/news/what-is-docker-used-for-a-docker-container-tutorial-for-beginners/" target="_blank" rel="noopener noreferrer">What is Docker?</a></li>
      <li><a href="https://www.youtube.com/watch?v=pTFZFxd4hOI&t=27s" target="_blank" rel="noopener noreferrer">Docker Tutorial</a></li>
    </ul>

    <h3 id="day-6">👾 Day 6: Deployment</h3>
    <p><strong>Deployment</strong></p>
    <p>Now it's time to deploy your application to a server with everything we have learnt! DigitalOcean is a very good and economical service to do the same.</p>
    
    <h4>🐼 Deployment Guide</h4>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=JsOoUrII3EY" target="_blank" rel="noopener noreferrer">In Depth guide to deploy a webapp on DigitalOcean with docker and Github Actions</a></li>
    </ul>

    <h3 id="day-7">👾 Day 7: Kubernetes</h3>
    <p><strong>Kubernetes</strong></p>
    <p>Kubernetes is a service designed by Google which is used to manage and deploy multiple containers.</p>
    
    <h4>🐼 Kubernetes Resources</h4>
    <ul>
      <li><a href="https://kube.academy/" target="_blank" rel="noopener noreferrer">Kubernetes Academy</a></li>
    </ul>

    <div className="alert alert-info">
      <p><strong>Extra Resources:</strong> We have covered all the necessary resources needed to get you started on your journey as a web developer but there's still a lot more to go but don't worry. The best way to master all these concepts is to just practice and if you ever feel stuck feel free to contact us. We are providing a link of lists that would help you out a lot on your journey of mastering the web.</p>
      
      <ul>
        <li><a href="https://web-dev-resources.com/#/" target="_blank" rel="noopener noreferrer">Web Dev Resources 1</a></li>
        <li><a href="https://github.com/iamismile/web-dev-resources" target="_blank" rel="noopener noreferrer">Web Dev Resources 2</a></li>
        <li><a href="https://www.youtube.com/watch?v=K8YELRmUb5o&pp=ygUTbWVybiBmdWxsIHN0YWNrIGFwcA%3D%3D" target="_blank" rel="noopener noreferrer">Tutorial on MERN stack</a></li>
        <li><a href="https://www.youtube.com/watch?v=rHux0gMZ3Eg&pp=ygUPZGphbmdvIHR1dG9yaWFs" target="_blank" rel="noopener noreferrer">Tutorial on Django</a></li>
        <li><a href="https://muhammedcuma.medium.com/mastering-advanced-web-development-techniques-tools-and-best-practices-36376a949914" target="_blank" rel="noopener noreferrer">A few advanced practices</a></li>
        <li><a href="https://www.theodinproject.com/" target="_blank" rel="noopener noreferrer">The Odin Project</a> (Covers almost everything from the most basic to advanced stuff)</li>
      </ul>
      
      <p>One last thing that we want to leave you with is choosing the right database for your application. Database are one of the integral parts of your application and deciding on one can be a hassle as you move forward. <a href="https://www.geeksforgeeks.org/which-database-you-should-choose-for-web-developement/" target="_blank" rel="noopener noreferrer">Here</a> is a good article to read if you want to get an idea.</p>
    </div>

    <div className="alert alert-success">
      <h4>🐼 What's Next?</h4>
      <p>Now that we are familiar with both frontend and backend you can now start making websites and choose a stack to work with. We have given you a lot of options but there are still a lot more out there. The most popular stacks are MERN, MEAN, Ruby on Rails, GO+React and DJANGO.</p>
      
      <p>The world of development is vast and there is a lot to explore, this roadmap is in fact just a beginning in your development journey. If you are interested, we suggest you learn more about Next.js(briefly mentioned in week4), MongoDB(a NoSql database), firebase, APIs, Regular Expressions and PostGre(another SQL database, but much more advanced and prevalent in the industry).</p>
      
      <p>Web Development is a gateway to a lot of opportunities in Open Source. The huge benefit of contributing to open source is that you can network with other developers. This means that you'll meet new people and make friends, collaborate with other developers on projects, find mentors and have an opportunity to learn from each other. <a href="https://www.geeksforgeeks.org/best-open-source-programs-for-students-to-participate/amp/" target="_blank" rel="noopener noreferrer">Here</a> is a list of competitions for students. We wish you all the best for your journey in web development!</p>
    </div>
  </div>
);

export default WebWeek5; 