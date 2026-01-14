import React from 'react';

const WebWeek3 = () => (
  <div>
    <h2 id="week-3">🔧 Week 3 (Backend)</h2>
    
    <p>Now that you know about the frontend, let's start working on actual functional websites with a server.</p>
    
    <p>Here we have provided 3 pathways. One through Go another through Node and finally one with Python(Django). While Golang being fast & scalable is mostly used for developing microservices softwares and cloud computing, on the other hand, Python providing for a huge number of libraries & community support is mostly used for AI,ML and data analysis and since most people starting with webdev are already familiar with JS Node provides a quick transition into backend without the hassle of learning a completely new language. You should learn any one of them right now, but after you are done with the roadmap, you are suggested to come back and go-through the alternative pathway too.</p>

    <h3 id="go-pathway">🚀 THE GO PATHWAY</h3>
    
    <h4 id="go-day-1">👾 Day 1: Intro to Go</h4>
    <p><strong>Intro to Go</strong></p>
    <p>First we'll learn the basics of Golang for developing our entire backend from scratch. Go is a language created by google and is one of the best choices to create scalable backends.</p>
    
    <ul>
      <li><a href="https://www.youtube.com/watch?v=446E-r0rXHI" target="_blank" rel="noopener noreferrer">What is Go?</a></li>
      <li><a href="https://go.dev/tour/list" target="_blank" rel="noopener noreferrer">Go tutorial</a> (suggested to complete till "More types: structs, slices, and maps" for now)</li>
    </ul>
    
    <p><strong>NOTE:</strong> To learn the backend, what's better than starting a project. From now onwards, we will follow the book "Let's Go" by Alex Edwards which is a step-by-step guide to create your first web-application(a Snippetbox- which lets people paste and share snippets of text) in Golang from scratch.</p>
    
    <ul>
      <li><a href="https://drive.google.com/drive/folders/1lbDldlXYxUPTAOciiyivg9qswzRPFsQk?usp=share_link" target="_blank" rel="noopener noreferrer"><strong>Book is available here</strong></a></li>
      <li><a href="https://pkg.go.dev/std" target="_blank" rel="noopener noreferrer">Go documentation</a></li>
    </ul>

    <h4 id="go-day-2-3">👾 Day 2 & 3: Foundations</h4>
    <p><strong>Foundations</strong></p>
    <p>We will follow chapter-2 from the Let's Go book. It will guide you right from installing Go on your system.</p>
    
    <p><strong>Note:</strong> In case you are already familiar with the VS Code environment, you can continue it as your Go IDE, else you are strongly suggested to <a href="https://www.jetbrains.com/go/download/#section=windows" target="_blank" rel="noopener noreferrer">download Goland</a> as your IDE. You can use an educational licence to access it.</p>
    
    <p>Then this book will help you to go through the basics of web-applications and then implement how to route requests to multiple, custom HTTP headers.</p>
    
    <p>Then, you will learn how to integrate HTML pages and various features of frontend like CSS, javascripts that you learnt in previous weeks in this project.</p>
    
    <p><strong>Suggestion:</strong> Write the code (even though it's hard to understand) rather than just Ctrl + C/V.</p>
    
    <p>Then we will cover chapter-3 of this book. This chapter is a bit small and the major concepts it covers are Dependency Injections and error handling.</p>

    <h4 id="go-day-4">👾 Day 4: Databasing</h4>
    <p><strong>Databasing</strong></p>
    <p>We will cover chapter-4 of this book. Databasing is one of the major parts of creating web-applications. But first lets see <a href="https://www.ramotion.com/blog/database-in-web-app-development/#:~:text=The%20database%20stores%20information%20about,data%20structures%20with%20minimal%20effort." target="_blank" rel="noopener noreferrer">what they are and why are they important</a>. This chapter helps you go through an implementation of MySQL database.</p>

    <h4 id="go-day-5">👾 Day 5: Displaying dynamic HTML templates</h4>
    <p><strong>Displaying dynamic HTML templates</strong></p>
    <p>We will cover chapter-5 of this book. This portion will help you implement displaying HTML pages using the dynamic data from our MySQL database created above.</p>

    <h4 id="go-day-6">👾 Day 6: Middlewares and RESTful routing</h4>
    <p><strong>Middlewares and RESTful routing</strong></p>
    <p>We will cover chapter-6 and 7 of this book. This part of the book will provide you with an explained implementation of <a href="https://www.youtube.com/watch?v=1oWPUpMheGk" target="_blank" rel="noopener noreferrer">Middlewares and REST APIs</a> through routers.</p>

    <h4 id="go-day-7">👾 Day 7: Form processing and Testing</h4>
    <p><strong>Form processing and Testing</strong></p>
    <p>We will cover chapter-8 and 13 of this book.</p>
    
    <p>Chapter-8 helps you to implement how to process, parse and then store the data(upon validation) as entered by the user on your website.</p>
    
    <p><em>Upon completing this chapter, you would have created your own website from scratch.</em></p>
    
    <p><strong>Note:</strong> In case you are interested to learn the whole deployment of the web application, you may go through chapters 9 - 12 which basically help you improve your web application by displaying flash messages to users, and security improvements to the website.</p>
    
    <p>Now having made your website, the next important aspect of creating any web-application is its <strong>testing</strong>. Chapter -13 will provide you with the basic syntaxes to creating tests to the components/services you have added to your website.</p>

    <h3 id="node-pathway">⚡ THE NODE PATHWAY</h3>
    
    <h4 id="node-day-1">👾 Day 1: Intro to Node</h4>
    <p><strong>Intro to Node</strong></p>
    <p>The <a href="https://nodejs.org/en/about/" target="_blank" rel="noopener noreferrer">Node.js website</a> describes it as an asynchronous event driven JavaScript runtime, designed to build scalable network applications. So, at its most basic level, Node allows you to run JavaScript code on a machine such as your local computer or a server without having to go through a web browser. To facilitate this, Node has some added functionality that is not found in browser-based JavaScript, such as the ability to read and write local files, create http connections and listen to network requests.</p>
    
    <p>To gain more knowledge about backend you can go through this short article on <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps" target="_blank" rel="noopener noreferrer">MDN</a></p>

    <h4 id="node-day-2-3">👾 Day 2 & 3: Foundations</h4>
    <p><strong>Foundations</strong></p>
    <p>We will begin by installing Node on our systems which can be done from the <a href="https://nodejs.org/en/download/package-manager" target="_blank" rel="noopener noreferrer">official site</a>. Now we are gonna cover the basic topics that you need to go thoroughly before working on the great websites you dream about making. We are linking the official <a href="https://nodejs.org/en/learn" target="_blank" rel="noopener noreferrer">Node.js docs</a> which might be a bit confusing for people going through docs for the first time but dont worry it will help you out in the long run and you can always ask your doubts in the pclub discord server.</p>
    
    <h5>Getting Started</h5>
    <ul>
      <li><a href="https://nodejs.org/en/learn/command-line/run-nodejs-scripts-from-the-command-line" target="_blank" rel="noopener noreferrer">How to run Node.js scripts from the terminal.</a></li>
      <li><a href="https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs" target="_blank" rel="noopener noreferrer">.env files</a></li>
    </ul>
    
    <h5>HTTP Module</h5>
    <ul>
      <li>Learn <a href="https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-web-server/node-make-http-requests.en.md" target="_blank" rel="noopener noreferrer">how to make HTTP requests</a> and Node's <a href="https://nodejs.org/api/http.html" target="_blank" rel="noopener noreferrer">http module</a></li>
    </ul>
    
    <h5>File System</h5>
    <ul>
      <li>We will now learn about how to <a href="https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs" target="_blank" rel="noopener noreferrer">read</a> and <a href="https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs" target="_blank" rel="noopener noreferrer">write</a> files with Node.js and the <a href="https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-modules/node-module-fs.en.md" target="_blank" rel="noopener noreferrer">fs module</a></li>
    </ul>
    
    <h5>Events</h5>
    <ul>
      <li>Now we will go through the <a href="https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-modules/node-module-events.en.md" target="_blank" rel="noopener noreferrer">Node events module</a> and <a href="https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter" target="_blank" rel="noopener noreferrer">Event Emitter</a></li>
    </ul>

    <h4 id="node-day-4">👾 Day 4: Databasing</h4>
    <p><strong>Databasing</strong></p>
    <p>We will now cover storing data for our website. Storing data locally has limitations so we are gonna learn one of the most popular databases MongoDB. MongoDB is a NoSQL database. We are gonna cover SQL and NoSQL database at a later stage for now we just need to know that MongoDB is what everyone is doing right now. To get started with MongoDB go through the <a href="https://learn.mongodb.com/learning-paths/introduction-to-mongodb" target="_blank" rel="noopener noreferrer">MongoDB University "Introduction to MongoDB" course.</a></p>

    <h4 id="node-day-5">👾 Day 5: Introduction To Express</h4>
    <p><strong>Introduction To Express</strong></p>
    <p>Finally we begin with the the most popular framework for building a backend in JS : EXPRESS. Go through the entire <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction" target="_blank" rel="noopener noreferrer">MDN documentation on Node.js</a> It is long but going through it will give you a idea what all you can do with express.</p>
    
    <h5>Templating Engine</h5>
    <p>A templating engine is a tool that allows you to insert variables and logic into your views. For instance, you could have a header that updates with the actual user's name once they've logged in, something that is not possible with plain HTML. Now there are two popular options you could go through : <a href="https://pugjs.org/" target="_blank" rel="noopener noreferrer">Pug</a> which has a learning curve and is quite different than regular HTML and <a href="https://ejs.co/" target="_blank" rel="noopener noreferrer">EJS</a> which is a lot more closer to HTML if you are comfortable with it.</p>
    
    <h5>Middleware</h5>
    <p>A middleware is just a plain JavaScript function that Express will call for you between the time it receives a network request and the time it fires off a response (i.e. it's a function that sits in the middle). You will eventually be using several of these functions that will run in a specific sequence for every request. For example, you might have a logger (that prints details of the request to the console), an authenticator (that checks to see if the user is logged in, or otherwise has permission to access whatever they're requesting) and a static-file server (if the user is requesting a static file then it will send it to them). You can read more about <a href="http://expressjs.com/en/guide/using-middleware.html" target="_blank" rel="noopener noreferrer">middlewares here</a></p>
    
    <p><strong>NOTE</strong><br/>While going through the resources you should also go through the <a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website" target="_blank" rel="noopener noreferrer">MDN tutorial on express</a></p>

    <h4 id="node-day-6">👾 Day 6: CRUD and MVC</h4>
    <p><strong>CRUD and MVC</strong></p>
    <p>CRUD stands for: Create, Read, Update and Delete. These are the four basic functions that you will be building into your database driven apps. If you are designing a CRUD interface that means that users can expect to be able to do these 4 things to items in the database (providing they have the appropriate permissions of course). Of course, this is a concept and not some sort of rule that must be followed. You may not want to allow users to do all of these actions, or you may want to limit which users can do what at any given time.</p>
    
    <p>MVC is another common concept in web development and also something that is likely to come up in an interview question. MVC stands for Model, View, Controller and refers to the architecture of your code.</p>
    
    <ul>
      <li>Models are the basic building blocks of your database. So for every type of entry in your DB (book, author, etc. in our Library Project), you'll create a model that will hold the details of that type of entry. Models define the types of information that get used by your views and controllers.</li>
      <li>Views are, of course, the component that generates the UI for your application. In our case, we've selected a templating engine that uses data supplied by a controller to display the desired information.</li>
      <li>Controllers are the components that decide what view to display and what information is going to be put into it.</li>
    </ul>
    
    <p>Go through this resource to get a better understanding of <a href="https://www.freecodecamp.org/news/simplified-explanation-to-mvc-5d307796df30/" target="_blank" rel="noopener noreferrer">MVC</a></p>

    <h4 id="node-day-7">👾 Day 7: Authentication and Testing</h4>
    <p><strong>Authentication and Testing</strong></p>
    <p>Creating users and allowing them to log in and out of your web apps is a crucial functionality that we are finally ready to learn! There is quite a bit of setup involved here, but thankfully none of it is too tricky. You'll be up and running in no time! In this lesson, we're going to be using <a href="https://www.passportjs.org/" target="_blank" rel="noopener noreferrer">passportJS</a>, an excellent middleware to handle our authentication and sessions for us. Follow this <a href="https://www.theodinproject.com/lessons/nodejs-authentication-basics" target="_blank" rel="noopener noreferrer">tutorial here</a> to get a better idea of authentication.</p>
    
    <p>Testing is one of the most important parts of webdev that usually most people overlook. We are gonna cover the basics of testing that will get you started on this path. Follow along this <a href="https://www.theodinproject.com/lessons/nodejs-testing-routes-and-controllers" target="_blank" rel="noopener noreferrer">tutorial</a> to get a hang of it.</p>

    <h3 id="django-pathway">🐍 THE DJANGO(PYTHON) PATHWAY</h3>
    
    <p>Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. That's why we are providing an alternate pathway for the backend.</p>
    
    <h4 id="django-day-1">👾 Day 1: Basics of Python and Django</h4>
    <p><strong>Basics of Python and Django</strong></p>
    <p>Let's first start learning the <a href="https://www.youtube.com/watch?v=kqtD5dpn9C8" target="_blank" rel="noopener noreferrer">basics of Python</a>. You can implement them using Google Colab in case you have not installed Jupyter notebook.</p>
    
    <p><strong>Note:</strong> In case you are already familiar with the basics of Python, you can skip this part and go ahead.</p>
    
    <p>Now let's <a href="https://www.youtube.com/watch?v=HBE4K1Xu9us" target="_blank" rel="noopener noreferrer">install Django</a> on your dabbas and go through a <a href="https://docs.djangoproject.com/en/4.1/intro/overview/" target="_blank" rel="noopener noreferrer">quick overview</a> of the functionality of Django.</p>
    
    <p>(You are suggested to use a virtual environment to build your projects in Django, as this will make your code less error prone with version updates of Django and other packages. You can use the "virtualenv" package for this purpose)</p>
    
    <p><strong>In case of any doubts while going through any of the implementations of the above book, it's suggested to go through the</strong> <a href="https://docs.djangoproject.com/en/4.1/" target="_blank" rel="noopener noreferrer"><strong>Django documentation</strong></a><strong>.</strong></p>

    <h4 id="django-day-2">👾 Day 2: Learning Django</h4>
    <p><strong>Learning Django</strong></p>
    <p>Now we will follow <a href="https://www.dj4e.com/lessons" target="_blank" rel="noopener noreferrer">this website</a> on our journey of learning Django. Its videos are <a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y" target="_blank" rel="noopener noreferrer">compiled here</a>.</p>
    
    <p><strong>Note:</strong> Code while you watch the video and attempt to create some of your own versions.</p>
    
    <p>We will cover the basics of a web application server and HTTP protocols. Watch <a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=424s" target="_blank" rel="noopener noreferrer">this video</a>(00:07:04-01:17:39) for the same.</p>
    
    <p>Since we have already covered HTML and CSS before, we won't be covering them here again.</p>
    
    <p>Additionally, you might see some of the open-source <a href="https://github.com/csev/dj4e-samples" target="_blank" rel="noopener noreferrer">django sample codes</a> available on this github repo and analyse them.</p>

    <h4 id="django-day-3">👾 Day 3: Databasing</h4>
    <p><strong>Databasing</strong></p>
    <p>Databasing is one of the major parts of creating web-applications. But first lets see <a href="https://www.ramotion.com/blog/database-in-web-app-development/#:~:text=The%20database%20stores%20information%20about,data%20structures%20with%20minimal%20effort." target="_blank" rel="noopener noreferrer">what they are and why are they important</a> (in case you haven't gone through the Go pathway).</p>
    
    <p>Watch <a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=13313s" target="_blank" rel="noopener noreferrer">this video</a>(03:41:53-05:25:09) to see their implementation in Django.</p>

    <h4 id="django-day-4">👾 Day 4: Generating HTML forms & dynamic routes</h4>
    <p><strong>Generating HTML forms & dynamic routes</strong></p>
    <p>We will learn now about Routes, rendering HTML templates in Django and HTTP requests. Then we build dynamic HTML forms and protect our applications from CSRF.</p>
    
    <p>Watch <a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=19509s" target="_blank" rel="noopener noreferrer">this video</a>(05:25:09 - 07:29:09) to see their implementation in Django.</p>

    <h4 id="django-day-5">👾 Day 5: Data Modelling & Authentication</h4>
    <p><strong>Data Modelling & Authentication</strong></p>
    <p>We will learn about cookies and sessions, data modelling, and user authentication and its interaction with our application.</p>
    
    <p>Then we learn about the use of Form objects in Django and how they simplify our work.</p>
    
    <p>Watch <a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=26949s" target="_blank" rel="noopener noreferrer">this video</a>(07:29:09 - 09:13:20) to see their implementation in Django.</p>
    
    <p><strong>Note:</strong> Though there are walkthroughs of sample codes present in the video, you are suggested to first analyse the relevant sample codes on your own from <a href="https://github.com/csev/dj4e-samples" target="_blank" rel="noopener noreferrer">Day-2 link</a> as a small exercise on each day.</p>

    <h4 id="django-day-6">👾 Day 6: Owned Objects, JS & jQuery</h4>
    <p><strong>Owned Objects, JS & jQuery</strong></p>
    <p>We will first learn about how objects are marked as owned (<a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=38198s" target="_blank" rel="noopener noreferrer">video</a>: 10:36:38 - 11:05:58), and then take a quick look through OOP in Java-Script(<a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=49265s" target="_blank" rel="noopener noreferrer">video</a>: 13:41:05 - 13:58:37), and then take a go-through to jQuery library(<a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=53827s" target="_blank" rel="noopener noreferrer">video</a>: 14:57:07 - 15:49:29)to use it for manipulations of Data Browser Model(a sample walkthrough is also added).</p>
    
    <p>Then we learn about JSON(<a href="https://www.youtube.com/watch?v=o0XbHvKxw7Y&t=58226s" target="_blank" rel="noopener noreferrer">video</a>: 16:10:26 - 16:40:34)which is used as a syntax to exchange data between the running code on the server and the browser.</p>

    <h4 id="django-day-7">👾 Day 7: Project time!</h4>
    <p><strong>Project time!</strong></p>
    <p>Now having seen most of the things about Django and having gone through multiple sample codes, it is strongly recommended that you make your own backend without following any tutorial. You could try to create the backend of some PClub IITK websites (perhaps <a href="https://search.pclub.in/" target="_blank" rel="noopener noreferrer">Student Search IITK</a>).</p>
  </div>
);

export default WebWeek3; 