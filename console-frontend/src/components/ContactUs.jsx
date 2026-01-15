import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNavbar from './SidebarNavbar';
import ScrollToTop from './ui/ScrollToTop';
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Instagram, Globe } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [];

  const contacts = [
    { name: 'Bhavya', branch: 'CSE', email: 'bhav8175@gmail.com', instagram: 'mindfullbhav', linkedin: 'https://www.linkedin.com/in/bhavya-singhal-20ba6232b/', discord: 'bhav8175' },
    { name: 'Parth Gandhi', branch: 'CSE', email: 'parthgandhi625@gmail.com', instagram: 'parthgandhi_22', linkedin: 'https://www.linkedin.com/in/parth-gandhi-641320324/', discord: 'parthgandhi_22' },
    { name: 'Rishi Kataria', branch: 'CSE', email: 'sainirishi2023@gmail.com', instagram: '_the_sage_00', linkedin: 'https://www.linkedin.com/in/rishi-kataria', discord: 'the_sage_00' },
    { name: 'Raghunandan', branch: 'CSE', email: 'raghunandanjhawar1234@gmail.com', instagram: 'its_me_raghunandan', linkedin: 'http://linkedin.com/in/raghunandan-jhanwar-555137329', discord: '' },
    { name: 'Shivam Pareek', branch: 'CSE', email: 'shivamvdn2005@gmail.com', instagram: 'pareeks01', linkedin: 'https://www.linkedin.com/in/shivam-pareek-047819346', discord: 'ShibbuDaDon' },
    { name: 'Sujal Maurya', branch: 'CSE', email: 'sujalmaurya08@gmail.com', instagram: 'maurya_925', linkedin: 'https://www.linkedin.com/in/sujal-maurya/', discord: 'sujal25' },
    { name: 'Shivam Jat', branch: 'CSE', email: 'shivamjat531@gmail.com', instagram: 'shivamjat.07', linkedin: 'shivamjat', discord: 'Shivamjat07' },
    { name: 'Yuvraj', branch: 'Civil', email: 'work.yuvrajsv@gmail.com', instagram: 'l.yu.v', linkedin: 'https://linkedin.com/in/yuvraj-singh-verma', discord: '' },
    { name: 'Neel Shah', branch: 'AIDE', email: 'neelsshah2006@gmail.com', instagram: 'neelsshah2006', linkedin: 'neelsshah2006', discord: 'neelshah4806' },
    { name: 'Shubham', branch: 'Mech', email: 'shubhamsinghstrides@gmail.com', instagram: 'the.odd.shub', linkedin: 'https://www.linkedin.com/in/shubham-singh-bb9146316/', discord: 'knight.shub' },
    { name: 'Amit Kumar', branch: 'CSE', email: '6217amitkumar@gmail.com', instagram: 'amit_.6217', linkedin: 'https://www.linkedin.com/in/amit6217', discord: 'amit_6217' },
    { name: 'Mahek Patel', branch: 'CSE', email: 'pjmahek2006@gmail.com', instagram: 'mahek.fr_', linkedin: 'https://www.linkedin.com/in/mahek-patel-580404307', discord: 'mahek19patel' },
    { name: 'Rashi Jangid', branch: 'Civil', email: 'rashiarvind10@gmail.com', instagram: 'jangidrashi10', linkedin: 'https://www.linkedin.com/in/rashi-jangid-47849a221', discord: 'rashi_jangid_' },
    { name: 'Mridul', branch: 'Civil', email: 'mridultrivedi318@gmail.com', instagram: '', linkedin: 'https://www.linkedin.com/in/mridul-trivedi-129b4337a/', discord: 'mridul_t_3' },
    { name: 'Prashant', branch: 'ECE', email: 'prashantchaudhary7353@gmail.com', instagram: '', linkedin: 'https://www.linkedin.com/in/prashant-chaudhary-147912320/', discord: 'prashantchaudhary8090' },
    { name: 'Krrish Sharma', branch: 'Meta', email: 'krish56b1@gmail.com', instagram: '', linkedin: 'https://www.linkedin.com/in/krish-sharma1165', discord: 'krish_sharma1165' },
    { name: 'Ritesh Singh', branch: 'Chemical', email: 'ummeshchandrasingh1998@gmail.com', instagram: 'riteshrks16', linkedin: 'https://www.linkedin.com/in/ritesh-kumar-singh-188b9a255', discord: 'ritehrks' },
    { name: 'Abhinav Singh', branch: 'CSE', email: 'abhinav.6111q@gmail.com', instagram: 'abh19av_s', linkedin: 'https://www.linkedin.com/in/abhinav-singh-3a0863322', discord: '' },
    { name: 'Siddhi Agarwal', branch: 'CSE', email: 'siddhinonuagarwal@gmail.com', instagram: 'siddhii.agarwal', linkedin: '', discord: '' },
  ];

  const buildLinkedIn = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    return `https://www.linkedin.com/in/${value}`;
  };

  const buildInstagram = (handle) => {
    if (!handle || handle === '#') return '';
    if (handle.startsWith('http')) return handle;
    return `https://instagram.com/${handle}`;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 bg-black"></div>
      <SidebarNavbar />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-16 md:pt-24 pb-10 md:pb-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 sm:mb-8 leading-tight group">
              <span className="bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] bg-clip-text text-transparent group-hover:scale-105 transition-all duration-500">
                Let's Connect
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed group hover:text-white transition-all duration-500 px-2">
              Ready to join the future of tech? We're here to help you grow and succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <section className="py-10 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
              Meet Team Console
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate developers and tech enthusiasts building the future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((m, idx) => {
              // Special styling for top 3
              const isTop3 = idx < 3;
              const borderGradient = idx === 0
                ? 'from-yellow-400 via-yellow-500 to-yellow-600'
                : idx === 1
                  ? 'from-gray-300 via-gray-400 to-gray-500'
                  : idx === 2
                    ? 'from-orange-400 via-orange-500 to-orange-600'
                    : 'from-gray-700 to-gray-800';

              const bgGradient = idx === 0
                ? 'from-yellow-900/20 to-yellow-800/10'
                : idx === 1
                  ? 'from-gray-800/20 to-gray-700/10'
                  : idx === 2
                    ? 'from-orange-900/20 to-orange-800/10'
                    : 'from-gray-900/40 to-black/40';

              return (
                <div
                  key={idx}
                  className={`group relative bg-gradient-to-br ${bgGradient} backdrop-blur-md rounded-2xl p-6 border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isTop3 ? `border-transparent bg-gradient-to-br ${bgGradient}` : 'border-gray-800 hover:border-gray-700'
                    }`}
                  style={isTop3 ? {
                    background: `linear-gradient(135deg, ${idx === 0 ? 'rgba(234, 179, 8, 0.1)' : idx === 1 ? 'rgba(156, 163, 175, 0.1)' : 'rgba(249, 115, 22, 0.1)'
                      }, rgba(0, 0, 0, 0.4))`,
                    borderImage: `linear-gradient(135deg, ${idx === 0 ? '#fbbf24, #f59e0b' : idx === 1 ? '#d1d5db, #9ca3af' : '#fb923c, #f97316'
                      }) 1`
                  } : {}}
                >
                  {/* Top 3 Badge */}
                  {isTop3 && (
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-900 border-2 flex items-center justify-center shadow-lg"
                      style={{
                        borderColor: idx === 0 ? '#fbbf24' : idx === 1 ? '#d1d5db' : '#fb923c'
                      }}
                    >
                      <span className="text-2xl">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                      </span>
                    </div>
                  )}

                  {/* Name & Branch */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF3C5F] group-hover:to-[#FFC22D] transition-all duration-300">
                      {m.name}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-700/50 text-gray-300 border border-gray-600">
                      {m.branch}
                    </span>
                  </div>

                  {/* Email */}
                  <a
                    href={`mailto:${m.email}`}
                    className="block text-sm text-gray-400 hover:text-white transition-colors mb-4 truncate"
                  >
                    {m.email}
                  </a>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* LinkedIn */}
                    {buildLinkedIn(m.linkedin) && (
                      <a
                        href={buildLinkedIn(m.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-gray-800/50 hover:bg-blue-600 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-110"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}

                    {/* Instagram */}
                    {buildInstagram(m.instagram) && (
                      <a
                        href={buildInstagram(m.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-110"
                        title="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}

                    {/* Discord */}
                    {m.discord && (
                      <div
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-xs text-gray-300 group-hover:border-indigo-500 transition-all duration-300"
                        title={m.discord}
                      >
                        <SiDiscord className="w-4 h-4 text-indigo-400" />
                        <span className="truncate max-w-[120px]">{m.discord}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-14 sm:mb-20">
        <div className="relative bg-black/80 backdrop-blur-md border border-gray-800/50 rounded-3xl p-6 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
            Reach out to any of the team members above. We typically respond within a day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
