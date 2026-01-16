import React from 'react';
import { Linkedin, Instagram, ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandingFooter from './Footer';

const AboutDeveloper = () => {
  const navigate = useNavigate();

  // Ensure assets from public/ resolve correctly even when app is deployed under a subpath
  const withBase = (path) => {
    const base = import.meta.env.BASE_URL || '/';
    const cleaned = String(path || '').replace(/^\/+/, '');
    return `${base}${cleaned}`;
  };

  const developers = [
    {
      id: 1,
      name: "Rishi Kataria",
      role: "Full Stack Developer & Project Lead",
      avatar: "/team/rishi.jpg",
      instagram: "https://www.instagram.com/_the_sage_00",
      linkedin: "https://www.linkedin.com/in/rishi-kataria-14998331b",
      theme: {
        gradient: "from-cyan-500 via-blue-500 to-purple-500",
        text: "text-cyan-200",
        badge: "bg-cyan-400/10 border border-cyan-300/30 text-cyan-100",
        socialBg: "bg-cyan-500/20 hover:bg-cyan-500/30"
      }
    },
    {
      id: 2,
      name: "Amit Kumar",
      role: "Full Stack Developer & DevOps Expert",
      avatar: "/team/amit.jpg",
      instagram: "https://www.instagram.com/amit_.6217",
      linkedin: "https://linkedin.com/in/amit6217",
      theme: {
        gradient: "from-violet-500 via-fuchsia-500 to-rose-500",
        text: "text-fuchsia-200",
        badge: "bg-fuchsia-500/10 border border-fuchsia-300/30 text-fuchsia-100",
        socialBg: "bg-fuchsia-500/20 hover:bg-fuchsia-500/30"
      }
    },
    {
      id: 3,
      name: "Shivam pareek",
      role: "Backend Developer & API Expert",
      avatar: "/team/shivam1.jpg",
      instagram: "https://www.instagram.com/pareek01",
      linkedin: "https://www.linkedin.com/in/shivam-pareek-047819346",
      theme: {
        gradient: "from-emerald-400 via-lime-400 to-amber-400",
        text: "text-emerald-200",
        badge: "bg-emerald-500/10 border border-emerald-300/30 text-emerald-100",
        socialBg: "bg-emerald-500/20 hover:bg-emerald-500/30"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-[#FF3C5F] rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-[#FF7A30] rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-[#FFC22D] rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back</span>
          </button>

          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                Meet Developers of Console
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The brilliant minds behind website of Console - building the future of tech community platforms
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Team Cards - "uiverse" style overlay cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {developers.map((developer) => (
            <div key={developer.id} className={`group rounded-[32px] bg-gradient-to-br ${developer.theme.gradient} p-[2px]`}>
              <div
                className="h-full rounded-[28px] bg-black/75 backdrop-blur-xl p-8 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-2"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <img
                    src={withBase(developer.avatar)}
                    alt={developer.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.45)]"
                    onError={(e) => { e.currentTarget.src = withBase('logo.png'); }}
                  />
                </div>

                {/* Name & Role */}
                <div className="text-center space-y-3">
                  {/* <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-gray-500">
                    <Sparkles className={`w-4 h-4 ${developer.theme.text}`} />
                    <span>console.dev</span>
                  </div> */}
                  <h3 className={`text-2xl font-extrabold bg-gradient-to-r ${developer.theme.gradient} bg-clip-text text-transparent`}>
                    {developer.name}
                  </h3>
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase ${developer.theme.badge}`}>
                    {developer.role}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-10 flex items-center justify-center gap-4">
                  <a
                    href={developer.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/15 text-white transition-all duration-300 ${developer.theme.socialBg}`}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={developer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/15 text-white transition-all duration-300 ${developer.theme.socialBg}`}
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default AboutDeveloper;
