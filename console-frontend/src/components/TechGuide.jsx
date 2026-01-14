import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Rocket, Zap, Target, Trophy, Lightbulb, TrendingUp, Download, ExternalLink,
  Code, GitBranch, Monitor, Globe, Calendar, MapPin, Users, MessageCircle,
  Smartphone, Mail, Bell, Github, BookOpen, FileText, Database, Cpu,
  Palette, Layers, Server, Cloud, Shield, Lock, Eye, Star, Award, Heart
} from 'lucide-react';
import SidebarNavbar from './SidebarNavbar';
import ScrollToTop from './ui/ScrollToTop';
// import Header from './Header';
import LandingFooter from './Footer';

const TechGuide = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const hackathons = [
    {
      name: 'Smart India Hackathon',
      location: 'Pan India',
      month: 'July',
      link: 'https://sih.gov.in',
      type: 'national',
      difficulty: 'beginner'
    },
    {
      name: 'Hack InOut',
      location: 'Devfolio',
      month: 'October',
      link: 'https://hackinout.co',
      type: 'online',
      difficulty: 'intermediate'
    },
    {
      name: 'Devfolio Hackathons',
      location: 'Online + College',
      month: 'Monthly',
      link: 'https://devfolio.co',
      type: 'online',
      difficulty: 'beginner'
    },
    {
      name: 'Junction Hackathon',
      location: 'Jaipur',
      month: 'Varies',
      link: '#',
      type: 'local',
      difficulty: 'beginner'
    },
    {
      name: 'InnoThrone',
      location: 'Tech Hub Jaipur',
      month: 'March',
      link: '#',
      type: 'local',
      difficulty: 'beginner'
    }
  ];

  const events = [
    {
      name: 'TechSparks',
      location: 'Bangalore',
      date: 'October 2024',
      type: 'conference',
      link: 'https://techsparks.com',
      description: 'India\'s largest startup-tech conference'
    },
    {
      name: 'DevFest Jaipur',
      location: 'Jaipur',
      date: 'November 2024',
      type: 'devconference',
      link: '#',
      description: 'Google Developer Group Jaipur annual event'
    },
    {
      name: 'TiECon Jaipur',
      location: 'Jaipur',
      date: 'December 2024',
      type: 'startup',
      link: '#',
      description: 'Startup ecosystem conference'
    },
    {
      name: 'PyCon India',
      location: 'Hyderabad',
      date: 'September 2024',
      type: 'conference',
      link: 'https://pycon.org',
      description: 'Python developers conference'
    }
  ];

  const explorationPlaces = [
    {
      name: 'Tech Incubation Center',
      whyVisit: 'Meet startups, learn entrepreneurship',
      location: 'Tech Campus'
    },
    {
      name: 'JECRC Foundation Events',
      whyVisit: 'Hackathons & innovation workshops',
      location: 'JECRC University'
    },
    {
      name: 'DevFests',
      whyVisit: 'Community developer events',
      location: 'Various locations'
    },
    {
      name: 'Startup Meetups',
      whyVisit: 'Network with entrepreneurs',
      location: 'Jaipur Tech Hub'
    }
  ];

  const filteredHackathons = activeFilter === 'all'
    ? hackathons
    : hackathons.filter(h => h.type === activeFilter || h.difficulty === activeFilter);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header /> */}
      <SidebarNavbar />
      <ScrollToTop />

      {/* Tech Guide Hero Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
              Tech Guide
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
              Welcome to your First-Year Tech Guide — everything you need to learn, build, and explore the world of tech, all in one place.
            </p>
            <button
              onClick={() => document.getElementById('toolkits').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-[#FF3C5F] to-[#FF7A30] hover:from-[#FF2A4F] hover:to-[#FF6A20] text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl shadow-2xl hover:shadow-[#FF3C5F]/25 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-center">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 mr-3" />
                Start Exploring
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Essential Tools & Platforms */}
      <section id="toolkits" className="py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-[#FF3C5F] to-[#FF7A30] bg-clip-text text-transparent group hover:scale-105 transition-transform duration-300">
            <Code className="w-8 h-8 mr-3 inline group-hover:animate-pulse" />
            Essential Tools & Platforms
          </h2>

          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {/* VS Code */}
            <div className="group bg-black border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl hover:shadow-[#FF3C5F]/20 transition-all duration-500 transform hover:scale-[1.02] hover:border-[#FF3C5F]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
                <div className="text-4xl md:text-6xl text-center md:text-left group-hover:scale-110 transition-transform duration-300">
                  <img src="/vscode_logo.png" className='w-16 h-16' alt="vscode logo" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FF7A30] transition-all duration-300">Visual Studio Code (VS Code)</h3>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">What is VS Code?</h4>
                    <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      Visual Studio Code is a free, open-source code editor developed by Microsoft. It's like a super-powered
                      text editor specifically designed for writing code. Think of it as your digital workshop where you'll
                      spend most of your time as a developer.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300">Why is it Important?</h4>
                    <ul className="text-gray-300 space-y-2 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      <li className="group-hover:translate-x-2 transition-transform duration-300">• <strong>Industry Standard:</strong> Used by 70%+ of developers worldwide</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-75">• <strong>Extensible:</strong> Thousands of extensions for any programming language</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-100">• <strong>Intelligent:</strong> Built-in IntelliSense for code completion and error detection</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-125">• <strong>Integrated Terminal:</strong> Run commands without leaving the editor</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-150">• <strong>Git Integration:</strong> Built-in version control features</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-175">• <strong>Free & Cross-platform:</strong> Works on Windows, Mac, and Linux</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-r from-[#FF3C5F] to-[#FF7A30] hover:from-[#FF2A4F] hover:to-[#FF6A20] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-sm md:text-base text-center shadow-lg hover:shadow-[#FF3C5F]/25 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A30] to-[#FFC22D] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <Download className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                        Download VS Code
                      </div>
                    </a>
                    <a href="https://www.youtube.com/watch?v=VqCgcpAypFQ" target="_blank" rel="noopener noreferrer" className="group bg-gray-700 hover:bg-gray-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-sm md:text-base text-center shadow-lg hover:shadow-gray-500/25 border border-gray-600 hover:border-gray-500">
                      <div className="flex items-center justify-center">
                        <Monitor className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                        Watch Tutorial
                      </div>
                    </a>
                    <a href="https://code.visualstudio.com/docs/getstarted/tips-and-tricks" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-r from-[#FF7A30] to-[#FFC22D] hover:from-[#FF6A20] hover:to-[#FFB21D] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-sm md:text-base text-center shadow-lg hover:shadow-[#FF7A30]/25 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFC22D] to-[#FF3C5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                        Tips & Tricks
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Git & GitHub */}
            <div className="group bg-black border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl hover:shadow-[#FF7A30]/20 transition-all duration-500 transform hover:scale-[1.02] hover:border-[#FF7A30]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A30]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
                <div className="text-4xl md:text-6xl text-center md:text-left group-hover:scale-110 transition-transform duration-300">
                  <GitBranch className="w-16 h-16 md:w-20 md:h-20 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF7A30] group-hover:to-[#FFC22D] transition-all duration-300">Git & GitHub</h3>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">What are Git & GitHub?</h4>
                    <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      <strong>Git</strong> is a version control system that tracks changes in your code. Think of it as a time machine
                      for your projects - you can go back to any previous version. <strong>GitHub</strong> is a web platform that
                      hosts Git repositories and enables collaboration between developers worldwide.
                    </p>
                    <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      <strong>Simple Analogy:</strong> Git is like taking snapshots of your work, and GitHub is like a photo album
                      where you can share these snapshots with others and collaborate on projects.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300">Why are they Important?</h4>
                    <ul className="text-gray-300 space-y-2 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      <li className="group-hover:translate-x-2 transition-transform duration-300">• <strong>Version Control:</strong> Never lose your work - track every change</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-75">• <strong>Collaboration:</strong> Work with teams on the same project</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-100">• <strong>Portfolio:</strong> Showcase your projects to employers</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-125">• <strong>Open Source:</strong> Contribute to projects used by millions</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-150">• <strong>Industry Standard:</strong> Every company uses Git</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-175">• <strong>Learning:</strong> Study code from experienced developers</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FFC22D] group-hover:text-[#FF3C5F] transition-colors duration-300">Essential Git Commands:</h4>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-xs md:text-sm group-hover:border-[#FF7A30]/50 group-hover:bg-gray-800/50 transition-all duration-300">
                      <div className="text-gray-300 mb-2 group-hover:text-gray-200 transition-colors duration-300"><span className="text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">git init</span> - Start a new repository</div>
                      <div className="text-gray-300 mb-2 group-hover:text-gray-200 transition-colors duration-300"><span className="text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">git clone</span> - Copy a repository</div>
                      <div className="text-gray-300 mb-2 group-hover:text-gray-200 transition-colors duration-300"><span className="text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">git add</span> - Stage changes</div>
                      <div className="text-gray-300 mb-2 group-hover:text-gray-200 transition-colors duration-300"><span className="text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">git commit</span> - Save changes</div>
                      <div className="text-gray-300 mb-2 group-hover:text-gray-200 transition-colors duration-300"><span className="text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">git push</span> - Upload to GitHub</div>
                      <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300"><span className="text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">git pull</span> - Download updates</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="group bg-gray-800 hover:bg-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-sm md:text-base text-center shadow-lg hover:shadow-gray-500/25 border border-gray-600 hover:border-gray-500">
                      <div className="flex items-center justify-center">
                        <Github className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                        Join GitHub
                      </div>
                    </a>
                    <a href="https://www.youtube.com/watch?v=RGOj5yH7evk" target="_blank" rel="noopener noreferrer" className="group bg-gray-700 hover:bg-gray-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-sm md:text-base text-center shadow-lg hover:shadow-gray-500/25 border border-gray-600 hover:border-gray-500">
                      <div className="flex items-center justify-center">
                        <Monitor className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                        Git Tutorial
                      </div>
                    </a>
                    <a href="https://docs.github.com/en/get-started/quickstart/hello-world" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-r from-[#FF7A30] to-[#FFC22D] hover:from-[#FF6A20] hover:to-[#FFB21D] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 text-sm md:text-base text-center shadow-lg hover:shadow-[#FF7A30]/25 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FFC22D] to-[#FF3C5F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                        GitHub Guide
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Coding Platforms */}
            <div className="group bg-black border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl hover:shadow-[#FFC22D]/20 transition-all duration-500 transform hover:scale-[1.02] hover:border-[#FFC22D]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFC22D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 relative z-10">
                <div className="text-4xl md:text-6xl text-center md:text-left flex justify-center md:justify-start group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-16 h-16 md:w-20 md:h-20 text-[#FFC22D] group-hover:text-[#FF3C5F] transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFC22D] group-hover:to-[#FF3C5F] transition-all duration-300">Coding Practice Platforms</h3>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">What are Coding Platforms?</h4>
                    <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      Coding platforms are websites where you can practice programming, solve problems, and improve your
                      coding skills. They offer structured learning paths, real-world problems, and a community of
                      developers to learn from.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300">Why are they Important?</h4>
                    <ul className="text-gray-300 space-y-2 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                      <li className="group-hover:translate-x-2 transition-transform duration-300">• <strong>Practice Makes Perfect:</strong> Regular coding practice improves problem-solving skills</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-75">• <strong>Interview Preparation:</strong> Most tech companies use similar problems in interviews</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-100">• <strong>Skill Assessment:</strong> Track your progress and identify areas for improvement</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-125">• <strong>Community Learning:</strong> Learn from solutions and discussions</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-150">• <strong>Real-world Problems:</strong> Solve actual problems faced by companies</li>
                      <li className="group-hover:translate-x-2 transition-transform duration-300 delay-175">• <strong>Portfolio Building:</strong> Showcase your problem-solving abilities</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#FFC22D] group-hover:text-[#FF3C5F] transition-colors duration-300">Top Platforms for Different Goals:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-black border border-gray-800 rounded-lg p-4 group-hover:border-[#FFC22D]/50 group-hover:bg-gray-800/30 transition-all duration-300">
                        <h5 className="font-bold text-[#FFC22D] mb-2 text-sm md:text-base flex items-center group-hover:text-[#FF3C5F] transition-colors duration-300">
                          <Target className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Interview Preparation
                        </h5>
                        <p className="text-gray-300 text-xs md:text-sm mb-2 group-hover:text-gray-200 transition-colors duration-300">LeetCode, HackerRank</p>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Focus on DSA and system design</p>
                      </div>
                      <div className="bg-black border border-gray-800 rounded-lg p-4 group-hover:border-[#FF3C5F]/50 group-hover:bg-gray-800/30 transition-all duration-300">
                        <h5 className="font-bold text-[#FF3C5F] mb-2 text-sm md:text-base flex items-center group-hover:text-[#FF7A30] transition-colors duration-300">
                          <Trophy className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Competitive Programming
                        </h5>
                        <p className="text-gray-300 text-xs md:text-sm mb-2 group-hover:text-gray-200 transition-colors duration-300">Codeforces, CodeChef</p>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Speed and algorithm optimization</p>
                      </div>
                      <div className="bg-black border border-gray-800 rounded-lg p-4 group-hover:border-[#FF7A30]/50 group-hover:bg-gray-800/30 transition-all duration-300">
                        <h5 className="font-bold text-[#FF7A30] mb-2 text-sm md:text-base flex items-center group-hover:text-[#FFC22D] transition-colors duration-300">
                          <Globe className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Web Development
                        </h5>
                        <p className="text-gray-300 text-xs md:text-sm mb-2 group-hover:text-gray-200 transition-colors duration-300">FreeCodeCamp, Codedamn</p>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Project-based learning</p>
                      </div>
                      <div className="bg-black border border-gray-800 rounded-lg p-4 group-hover:border-[#FFC22D]/50 group-hover:bg-gray-800/30 transition-all duration-300">
                        <h5 className="font-bold text-[#FFC22D] mb-2 text-sm md:text-base flex items-center group-hover:text-[#FF3C5F] transition-colors duration-300">
                          <BookOpen className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                          Learning & Practice
                        </h5>
                        <p className="text-gray-300 text-xs md:text-sm mb-2 group-hover:text-gray-200 transition-colors duration-300">HackerEarth, HackerRank</p>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">Comprehensive tutorials</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                    <a
                      href="https://leetcode.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <img
                        src="/LeetCode_Logo.png"
                        className="w-8 h-8 bg-black rounded-md transition-transform duration-300 "
                        alt="leetcode logo"
                      />
                      <span className="transition-colors duration-300 group-hover:text-yellow-400">LeetCode (DSA)</span>
                    </a>

                    <a
                      href="https://codeforces.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <img
                        src="/codeforces_logo.png"
                        className="w-8 h-9 bg-black rounded-md transition-transform duration-300 "
                        alt="codeforces logo"
                      />
                      <span className="transition-colors duration-300 group-hover:text-blue-400">CodeForces (CP)</span>
                    </a>

                    <a
                      href="https://www.freecodecamp.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <img
                        src="/freecodecamp_logo.png"
                        className="w-8 h-8 p-1 bg-black rounded-md transition-transform duration-300 "
                        alt="free code camp logo"
                      />
                      <span className="transition-colors duration-300 group-hover:text-green-400">FreeCodeCamp</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Different Paths */}
      <section className="py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-[#FF7A30] to-[#FFC22D] bg-clip-text text-transparent group hover:scale-105 transition-transform duration-300">
            <Zap className="w-4 h-4 mr-2 inline group-hover:animate-pulse" />
            Understanding Different Paths
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="group bg-black border border-gray-800 rounded-xl p-6 text-center shadow-2xl hover:shadow-[#FF3C5F]/20 transition-all duration-500 transform hover:scale-105 hover:border-[#FF3C5F]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-16 h-16 md:w-20 md:h-20 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FF7A30] transition-all duration-300">Competitive Programming</h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">Fast logic solving under time pressure. Platforms like Codeforces and CodeChef.</p>
                <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <p className="group-hover:translate-x-1 transition-transform duration-300">• Time-based challenges</p>
                  <p className="group-hover:translate-x-1 transition-transform duration-300 delay-75">• Algorithm optimization</p>
                  <p className="group-hover:translate-x-1 transition-transform duration-300 delay-100">• Problem-solving speed</p>
                </div>
              </div>
            </div>

            <div className="group bg-black border border-gray-800 rounded-xl p-6 text-center shadow-2xl hover:shadow-[#FF7A30]/20 transition-all duration-500 transform hover:scale-105 hover:border-[#FF7A30]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A30]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Database className="w-16 h-16 md:w-20 md:h-20 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF7A30] group-hover:to-[#FFC22D] transition-all duration-300">Data Structures & Algorithms</h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">Structured thinking and coding. Platforms like LeetCode and HackerRank.</p>
                <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <p className="group-hover:translate-x-1 transition-transform duration-300">• Systematic problem solving</p>
                  <p className="group-hover:translate-x-1 transition-transform duration-300 delay-75">• Interview preparation</p>
                  <p className="group-hover:translate-x-1 transition-transform duration-300 delay-100">• Core CS concepts</p>
                </div>
              </div>
            </div>

            <div className="group bg-black border border-gray-800 rounded-xl p-6 text-center shadow-2xl hover:shadow-[#FFC22D]/20 transition-all duration-500 transform hover:scale-105 hover:border-[#FFC22D]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFC22D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-4xl md:text-5xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-16 h-16 md:w-20 md:h-20 text-[#FFC22D] group-hover:text-[#FF3C5F] transition-colors duration-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FFC22D] group-hover:to-[#FF3C5F] transition-all duration-300">Development</h3>
                <p className="text-gray-300 mb-4 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">Building real-world projects. Web, mobile, and machine learning applications.</p>
                <div className="text-xs md:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  <p className="group-hover:translate-x-1 transition-transform duration-300">• Project-based learning</p>
                  <p className="group-hover:translate-x-1 transition-transform duration-300 delay-75">• Real-world applications</p>
                  <p className="group-hover:translate-x-1 transition-transform duration-300 delay-100">• Portfolio building</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <div className="group bg-black border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto shadow-2xl hover:shadow-[#FF3C5F]/20 transition-all duration-500 transform hover:scale-[1.02] hover:border-[#FF3C5F]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#FF3C5F] flex items-center justify-center group-hover:text-[#FF7A30] transition-colors duration-300">
                  <Lightbulb className="w-6 h-6 mr-2 group-hover:animate-pulse" />
                  Recommendation
                </h3>
                <p className="text-base md:text-lg text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Start with DSA to build a strong foundation, then move to development to build real projects.
                  Competitive programming can be pursued alongside for interview preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons */}
      <section className="py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-[#FF3C5F] to-[#FF7A30] bg-clip-text text-transparent group hover:scale-105 transition-transform duration-300">
            <Rocket className="w-5 h-5 mr-2 inline group-hover:animate-pulse" />
            Hackathons – The Game-Changer
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-8 md:mb-12">
            <div className="group">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FF7A30] transition-all duration-300">What are Hackathons?</h3>
              <p className="text-gray-300 mb-6 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                Hackathons are intense coding events where teams work together to build innovative solutions
                to real-world problems in a limited time (usually 24-48 hours).
              </p>

              <h4 className="text-lg md:text-xl font-bold mb-3 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">Why Attend?</h4>
              <ul className="text-gray-300 space-y-2 mb-6 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                <li className="group-hover:translate-x-2 transition-transform duration-300">• Learn new technologies quickly</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-75">• Network with like-minded developers</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-100">• Build your portfolio</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-125">• Win prizes and recognition</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-150">• Get mentorship from experts</li>
              </ul>

              <h4 className="text-lg md:text-xl font-bold mb-3 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300">How to Participate:</h4>
              <ol className="text-gray-300 space-y-2 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                <li className="group-hover:translate-x-2 transition-transform duration-300">1. Find a hackathon (check the list below)</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-75">2. Form a team or join existing one</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-100">3. Register and attend orientation</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-125">4. Build your project</li>
                <li className="group-hover:translate-x-2 transition-transform duration-300 delay-150">5. Present and demo your solution</li>
              </ol>
            </div>

          
          </div>
        </div>
      </section>

      {/* Startup x Tech */}
      <section className="py-12 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent group hover:scale-105 transition-transform duration-300">
            <Rocket className="w-8 h-8 mr-3 inline group-hover:animate-pulse" />
            Startup x Tech Connection
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="group bg-black border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl hover:shadow-[#FF3C5F]/20 transition-all duration-500 transform hover:scale-[1.02] hover:border-[#FF3C5F]/50 overflow-hidden relative">
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FF7A30] transition-all duration-300">How Startups Are Built Around Tech</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <Rocket className="w-12 h-12 md:w-16 md:h-16 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold mb-2 text-[#FF3C5F] group-hover:text-[#FF7A30] transition-colors duration-300">Hackathons</h4>
                    <p className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">Generate innovative ideas and build MVPs</p>
                  </div>
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <Cpu className="w-12 h-12 md:w-16 md:h-16 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold mb-2 text-[#FF7A30] group-hover:text-[#FFC22D] transition-colors duration-300">Coding Skills</h4>
                    <p className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">Essential fuel for building tech startups</p>
                  </div>
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl md:text-4xl mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-12 h-12 md:w-16 md:h-16 group-hover:text-[#FFC22D] group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold mb-2 text-[#FFC22D] group-hover:text-[#FF3C5F] transition-colors duration-300">MVP Development</h4>
                    <p className="text-gray-300 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">Turn ideas into working prototypes</p>
                  </div>
                </div>

                <h4 className="text-lg md:text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF7A30] group-hover:to-[#FFC22D] transition-all duration-300">Key Events for Startup Enthusiasts:</h4>
                <ul className="text-gray-300 space-y-2 text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                  <li className="group-hover:translate-x-2 transition-transform duration-300">• Startup Mahakumbh - India's largest startup festival</li>
                  <li className="group-hover:translate-x-2 transition-transform duration-300 delay-75">• TiECon - Global startup ecosystem conference</li>
                  <li className="group-hover:translate-x-2 transition-transform duration-300 delay-100">• InnoThrone - Local innovation showcase</li>
                  <li className="group-hover:translate-x-2 transition-transform duration-300 delay-125">• DevFests - Community-driven tech events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>




      <LandingFooter />
    </div>
  );
};

export default TechGuide;