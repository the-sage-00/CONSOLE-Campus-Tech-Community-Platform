import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavbar from './SidebarNavbar';
import { Github, Twitter, Linkedin, Instagram, Rocket, Lightbulb, Trophy, BookOpen, FolderOpen, Globe, Brain, Zap, Link, Shield, ChevronLeft, ChevronRight } from 'lucide-react'; // <-- Add ChevronLeft, ChevronRight
import LetterGlitch from './ui/letterGlitchBackground';
import BlurText from './ui/text/BlurText';
import SplitText from './ui/text/SplitText';
import GradientText from './ui/text/GradientText';
import FAQSection from './FAQ';
import LandingFooter from './Footer';
import dsaSheetsData from './data/dsaSheets.json'; // <-- Add this import at the top

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dsaSheets, setDsaSheets] = useState([]);

  useEffect(() => {
    // Simulate async loading (could be fetch if hosted elsewhere)
    setDsaSheets(dsaSheetsData);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resources.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resources.length) % resources.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleAnimationComplete = () => {
    // no-op
  };

  const resources = [
    {
      id: 1,
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript, React, and Node.js",
      category: "web",
      icon: "Globe",
      color: "from-[#FF3C5F] to-[#FF7A30]",
      images: [
        '/web.jpeg',
        '/web.jpg',
        '/web.png',
        '/web.webp'
      ]
    },
    {
      id: 2,
      title: "Machine Learning",
      description: "Learn AI, ML algorithms, and data science",
      category: "ml",
      icon: "Brain",
      color: "from-[#FF7A30] to-[#FFC22D]",
      images: [
        '/ml.jpeg',
        '/ml.jpg',
        '/ml.png',
        '/ml.webp'
      ]
    },
    {
      id: 3,
      title: "Competitive Programming",
      description: "Master DSA and problem-solving skills",
      category: "cp",
      icon: "Zap",
      color: "from-[#FFC22D] to-[#FF3C5F]",
      images: [
        '/cp.jpeg',
        '/cp.jpg',
        '/cp.png',
        '/cp.webp'
      ]
    },
    {
      id: 4,
      title: "Web3 & Blockchain",
      description: "Explore decentralized applications and smart contracts",
      category: "web3",
      icon: "Link",
      color: "from-[#FF3C5F] to-[#FFC22D]",
      images: [
        '/web3.jpeg',
        '/web3.jpg',
        '/web3.png',
        '/web3.webp'
      ]
    },
    {
      id: 5,
      title: "Information Security",
      description: "Learn cybersecurity, ethical hacking, and network security",
      category: "infosec",
      icon: "Shield",
      color: "from-[#FF7A30] to-[#FF3C5F]",
      images: [
        '/info.avif',
        '/infosec.jpg',
        '/infosec.png',
        '/infosec.webp'
      ]
    }
  ];

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === activeCategory);

  // Scroll-triggered animations for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    const cards = document.querySelectorAll('.scroll-animation-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // --- Automatic Slider ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % resources.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [resources.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <SidebarNavbar />


      {/* Main Content */}
      <div className="pt-20">

        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden">
          {/* LetterGlitch Background */}
          <div className="absolute  w-full h-full">
            <img src="/main.jpg" alt="Hero Background" className="w-full h-full object-cover object-center opacity-50" />
          </div>
          {/* Dark overlay for readability */}
          <div className="absolute " />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 h-[70vh] flex flex-col items-center justify-center text-center">
              <div className="text-5xl md:text-7xl font-bold mb-6">

                <div className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">

                  <SplitText
                    text="CONSOLE"
                    splitType="chars"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                    gradient="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent"
                  />

                </div>


                <GradientText
                  colors={["#FF3C5F", "#FFC22D"]}
                  animationSpeed={25}
                  showBorder={false}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  Tech Community
                </GradientText>
              </div>
              <div className="text-xl text-white md:text-2xl text-center max-w-3xl mx-auto leading-relaxed">

                <BlurText
                  text="One Terminal Infinite Possibilities"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-xl sm:text-xl md:text-2xl lg:text-3xl backdrop-blur-sm mb-8"
                />

              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

              {/* Card 1 */}
              {/* Card 1 - Leaderboard */}
              <a
                href="/leaderboard"
                className="group relative bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-800/50 hover:border-[#FF3C5F]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF3C5F]/20 overflow-hidden scroll-animation-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/10 to-[#FFC22D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF3C5F] to-[#FF7A30] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-[#FF3C5F] transition-colors duration-300">
                    Leaderboard
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Track top performers and see where you stand among peers.
                  </p>
                </div>
              </a>

              {/* Card 2 - Tech Guide */}
              <a
                href="/tech-guide"
                className="group relative bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-800/50 hover:border-[#FF7A30]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF7A30]/20 overflow-hidden scroll-animation-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A30]/10 to-[#FFC22D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FF7A30] to-[#FFC22D] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-[#FF7A30] transition-colors duration-300">
                    Tech Guide
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Explore guides, tutorials, and tips for mastering new technologies.
                  </p>
                </div>
              </a>

              {/* Card 3 - Resources */}
              <a
                href="/resources"
                className="group relative bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-800/50 hover:border-[#FFC22D]/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FFC22D]/20 overflow-hidden scroll-animation-card"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC22D]/10 to-[#FF3C5F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC22D] to-[#FF3C5F] rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-[#FFC22D] transition-colors duration-300">
                    Resources
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Access a curated collection of tools, docs, and helpful links.
                  </p>
                </div>
              </a>

            </div>
          </div>
        </section>



        {/* Learning Resources Slider */}
        <section className="relative py-4 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                  Learning Resources
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore our comprehensive learning paths designed for tech enthusiasts
              </p>
            </div>

            {/* Premium Hero Slider */}
            <div className="relative h-[500px] md:h-[600px] max-w-full mb-16 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 shadow-2xl group">

              {/* --- Arrow Navigation Buttons --- */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/70 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md opacity-60 hover:opacity-100"
                style={{ pointerEvents: 'auto' }}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white/70 hover:text-white p-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md opacity-60 hover:opacity-100"
                style={{ pointerEvents: 'auto' }}
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Background Image for current resource */}
              <img
                src={resources[currentSlide].images[0]}
                data-fallback-idx="0"
                alt={`${resources[currentSlide].title} background`}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-90 transition-opacity duration-1000"
                onError={(e) => {
                  const list = resources[currentSlide].images;
                  const currentIdx = Number(e.currentTarget.getAttribute('data-fallback-idx') || '0');
                  if (currentIdx < list.length - 1) {
                    const nextIdx = currentIdx + 1;
                    e.currentTarget.setAttribute('data-fallback-idx', String(nextIdx));
                    e.currentTarget.src = list[nextIdx];
                  }
                }}
              />

              {/* Multi-layer gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Animated background patterns */}
              <div className="absolute inset-0 opacity-15">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,60,95,0.4),transparent_40%)] animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,194,45,0.3),transparent_40%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-2 h-2 bg-[#FF3C5F] rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-40 right-32 w-1 h-1 bg-[#FF7A30] rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-[#FFC22D] rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 right-20 w-1 h-1 bg-[#FF3C5F] rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }}></div>
              </div>

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-2xl px-16">
                  {/* Icon with premium effects */}
                  <div className="mb-8 group">
                    <div className="relative">
                      {(() => {
                        const IconComponent = eval(resources[currentSlide].icon);
                        return <IconComponent className="w-12 h-12 md:w-24 md:h-24 text-white group-hover:scale-125 transition-all duration-700 drop-shadow-2xl" />;
                      })()}
                      {/* Multi-layer icon glow effects */}
                      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-[#FF3C5F]/30 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-[#FFC22D]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>

                  {/* Title with premium styling */}
                  <h3
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 sm:mb-8 leading-tight drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  >
                    <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                      {resources[currentSlide].title}
                    </span>
                  </h3>

                  {/* Description with premium typography */}
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-10 leading-relaxed max-w-xl drop-shadow-xl font-medium">
                    {resources[currentSlide].description}
                  </p>

                  {/* Premium CTA button */}
                  <button
                    onClick={() => navigate('/resources')}
                    className={`relative w-full sm:w-auto bg-gradient-to-r ${resources[currentSlide].color} text-white mb-3 px-4 py-2 sm:px-8 sm:py-3 md:px-12 md:py-6 rounded-2xl sm:rounded-3xl font-semibold sm:font-bold text-base sm:text-lg shadow-xl hover:shadow-[#FF3C5F]/60 transform hover:scale-105 sm:hover:scale-110 transition-all duration-700 overflow-hidden group border border-white/20`}
                  >
                    {/* Multi-layer button effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:translate-x-full"></div>

                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Explore Now</span>
                      <span className="flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300 leading-none">
                        <i className="fa-solid fa-arrow-right text-sm sm:text-base"></i>
                      </span>
                    </span>

                  </button>

                </div>
              </div>



              {/* Premium Dot Indicators */}
              <div className="absolute bottom-[clamp(1.5rem,4vw,2.5rem)] left-1/2 transform -translate-x-1/2 flex gap-[clamp(0.75rem,2vw,1.5rem)]">
                {resources.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`group relative transition-all duration-700 ${index === currentSlide ? 'scale-[1.3]' : 'scale-100'
                      }`}
                  >
                    <div
                      className={`w-[clamp(0.5rem,1.2vw,1.25rem)] h-[clamp(0.5rem,1.2vw,1.25rem)] rounded-full transition-all duration-700 ${index === currentSlide
                        ? 'bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] shadow-xl shadow-[#FF3C5F]/60'
                        : 'bg-gray-400/50 hover:bg-gray-300/70 hover:scale-110'
                        }`}
                    ></div>

                    {/* Multi-layer active indicator glow */}
                    {index === currentSlide && (
                      <>
                        <div className="absolute inset-0 w-[clamp(0.4rem,1vw,1rem)] h-[clamp(0.4rem,1vw,1rem)] bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full blur-md opacity-60 animate-pulse"></div>
                        <div
                          className="absolute inset-0 w-[clamp(0.4rem,1vw,1rem)] h-[clamp(0.4rem,1vw,1rem)] bg-gradient-to-r from-[#FFC22D] to-[#FF3C5F] rounded-full blur-lg opacity-30 animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        ></div>
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Enhanced Progress bar */}
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[clamp(0.25rem,0.6vw,0.5rem)] bg-gray-800/50">
                <div
                  className="h-full bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] transition-all duration-700 ease-out shadow-lg"
                  style={{
                    width: `${((currentSlide + 1) / resources.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Slide counter */}
              <div className="absolute top-[clamp(0.75rem,2vw,2rem)] right-[clamp(0.75rem,2vw,2rem)] 
  bg-black/60 backdrop-blur-sm text-white px-[clamp(0.5rem,1.5vw,1rem)] 
  py-[clamp(0.25rem,0.8vw,0.5rem)] rounded-full border border-white/20 
  text-[clamp(0.75rem,1.5vw,1rem)] font-medium">
                {currentSlide + 1} / {resources.length}
              </div>

            </div>

          </div>
        </section>

        <section className="relative py-20 overflow-hidden hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 border border-[#FF3C5F] rounded-full animate-ping"></div>
              <div className="absolute top-20 right-20 w-16 h-16 border border-[#FF7A30] rounded-full animate-pulse"></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-[#FFC22D] rounded-full animate-bounce"></div>
            </div>

            {/* Main Content of */}
            <div className="relative z-10 text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                  Ready to Compete?
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
                Join thousands of developers competing across multiple platforms
              </p>
            </div>


            {/* Animated Code Snippets Container */}
            <div className="relative mb-12">
              {/* Central Image with Enhanced Styling */}
              <div className="relative mx-auto max-w-4xl">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800/50">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/10 via-transparent to-[#FFC22D]/10 z-10"></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] opacity-20 animate-pulse"></div>

                  {/* Main Image */}
                  <img
                    src="/back.jpg"
                    alt="Competitive Programming"
                    className="w-full h-[400px] md:h-[500px] object-cover relative z-20"
                  />

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-30"></div>

                  {/* Floating Stats */}
                  <div className="absolute top-6 left-6 z-40 opacity-50 text-base hidden sm:block">
                    <span className="text-[#FF7A30]">while</span> (<span className="text-white">true</span>) {'{'}
                    <br />
                    <span className="text-gray-400 ml-4">eat</span>(<span className="text-[#FFC22D]">'🍕'</span>);
                    <br />
                    <span className="text-gray-400 ml-4">code</span>(<span className="text-[#FFC22D]">'💻'</span>);
                    <br />
                    <span className="text-gray-400 ml-4">sleep</span>(<span className="text-white">0</span>);
                    <br />
                    <span className="text-gray-400 ml-4">// repeat until legendary 🚀</span>
                    <br />
                    {'}'}
                  </div>

                  <div className="absolute top-6 right-6 z-40 opacity-50 text-base hidden sm:block">
                    <span className="text-[#FF3C5F]">function</span> <span className="text-white">solveProblem</span><span className="text-blue-500">()</span> {'{'}
                    <br />
                    <span className="text-gray-400 ml-4">// Think outside the box</span> <br />
                    <span className="text-gray-400 ml-4">// Stay Consistent</span>
                    <br />
                    <span className="text-gray-400 ml-4">return</span> <span className="text-[#FFC22D]">'success'</span>;
                    <br />
                    {'}'}
                  </div>

                  <div className="absolute bottom-6 left-6 z-40 opacity-50 text-base hidden sm:block">
                    <span className="text-[#FFC22D]">class</span> <span className="text-white">Developer</span> {'{'}
                    <br />
                    <span className="text-gray-400 ml-4">constructor</span>() {'{'}
                    <br />
                    <span className="text-gray-400 ml-8">this.skills =</span> <span className="text-[#FF3C5F]">[]</span>;
                    <br />
                    <span className="text-gray-400 ml-8">this.passion =</span> <span className="text-[#FFC22D]">'infinite'</span>;
                    <br />
                    <span className="text-gray-400 ml-4">{'}'}</span>
                    <br />
                    <span>{'}'}</span>
                  </div>

                  <div className="absolute bottom-6 right-6 z-40 opacity-50 text-base hidden sm:block">
                    <span className="text-[#FF3C5F]">const</span> <span className="text-white">goals</span> = [
                    <br />
                    <span className="text-gray-400 ml-4 text-[#FFC22D]">'Master DSA'</span>,
                    <br />
                    <span className="text-gray-400 ml-4 text-[#FFC22D]">'Build Projects'</span>,
                    <br />
                    <span className="text-gray-400 ml-4 text-[#FFC22D]">'Win Competitions'</span>
                    <br />
                    ];
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Leaderboard Preview */}
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800/50 shadow-xl">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl mb-3 flex justify-center">
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-[#FFC22D]" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight">
                  <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                    Competitive Programming
                  </span>
                  <br />
                  <span className="text-white">Leaderboard</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
                  Track your progress across Codeforces and LeetCode
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 scroll-stagger max-w-5xl mx-auto">

                {/* Card 1 */}
                <div className="group relative w-full bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-lg rounded-2xl p-5 sm:p-6 border border-gray-700/40 hover:border-[#FF3C5F]/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF3C5F]/20 overflow-hidden scroll-animation-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF3C5F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex items-center justify-center mb-3 sm:mb-4">
                    <div className="group-hover:scale-110 group-hover:animate-pulse transition-all duration-500">
                      <img
                        src="/codeforces_logo.png"
                        alt="Codeforces Logo"
                        className="w-10 h-10 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#FF3C5F] mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FF7A30] transition-all duration-500">
                      100+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                      Active Users
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1.5 h-1.5 bg-[#FF3C5F] rounded-full animate-bounce"></div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative w-full bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-lg rounded-2xl p-5 sm:p-6 border border-gray-700/40 hover:border-[#FF7A30]/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF7A30]/20 overflow-hidden scroll-animation-card">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A30]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-center justify-center mb-3 sm:mb-4">
                    <div className="group-hover:scale-110 group-hover:animate-pulse transition-all duration-500">
                      <img
                        src="/LeetCode_Logo.png"
                        alt="LeetCode Logo"
                        className="w-10 h-10 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#FF7A30] mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF7A30] group-hover:to-[#FFC22D] transition-all duration-500">
                      100+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                      Active Users
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1.5 h-1.5 bg-[#FF7A30] rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="text-center">
                <button
                  onClick={() => navigate('/leaderboard')}
                  className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-[#FF3C5F]/25 transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
                >
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  View Full Leaderboard
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* DSA Sheets Section */}
        <section className="relative py-12 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                Master DSA with Top Sheets
              </h2>
              <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
                Curated problem-solving sheets from industry experts to boost your competitive programming skills
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dsaSheets.map((sheet) => {
                const Icon = { Brain, Zap, Trophy, Globe }[sheet.icon];
                return (
                  <div
                    key={sheet.id}
                    className={`group relative bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-5 border border-gray-800/50 ${sheet.hoverBorder} transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden dsa-card-hover dsa-card-entrance`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${sheet.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${sheet.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-white group-hover:text-[#FF3C5F] transition-colors duration-300">
                        {sheet.title}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        {sheet.description}
                      </p>
                      <a
                        href={sheet.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${sheet.gradient} text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg dsa-button-hover text-sm`}
                      >
                        <Link className="w-3 h-3 mr-2" />
                        {sheet.button}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FAQSection />
        {/* Footer */}
        <LandingFooter />

      </div>
    </div>
  );
};


export default LandingPage;
