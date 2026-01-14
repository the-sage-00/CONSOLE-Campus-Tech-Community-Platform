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
    { name: 'Raghunandan', branch: 'CSE', email: 'raghunandanjhawar1234@gmail.com', instagram: 'its_me_raghunandan', linkedin: 'http://linkedin.com/in/raghunandan-jhanwar-555137329', discord: '' },
    { name: 'Shivam pareek', branch: 'CSE', email: 'shivamvdn2005@gmail.com', instagram: 'pareeks01', linkedin: 'https://www.linkedin.com/in/shivam-pareek-047819346', discord: 'ShibbuDaDon' },
    { name: 'Sujal Maurya', branch: 'CSE', email: 'sujalmaurya08@gmail.com', instagram: 'maurya_925', linkedin: 'https://www.linkedin.com/in/sujal-maurya/', discord: 'sujal25' },
    { name: 'Shivam jat', branch: 'CSE', email: 'shivamjat531@gmail.com', instagram: 'shivamjat.07', linkedin: 'shivamjat', discord: 'Shivamjat07' },
    { name: 'Yuvraj', branch: 'Civil', email: 'work.yuvrajsv@gmail.com', instagram: 'l.yu.v', linkedin: 'https://linkedin.com/in/yuvraj-singh-verma', discord: '' },
    { name: 'Neel Shah', branch: 'AIDE', email: 'neelsshah2006@gmail.com', instagram: 'neelsshah2006', linkedin: 'neelsshah2006', discord: 'neelshah4806' },
    { name: 'Shubham', branch: 'Mech', email: 'shubhamsinghstrides@gmail.com', instagram: 'the.odd.shub', linkedin: 'https://www.linkedin.com/in/shubham-singh-bb9146316/', discord: 'knight.shub' },
    { name: 'Amit kumar', branch: 'CSE', email: '6217amitkumar@gmail.com', instagram: 'amit_.6217', linkedin: 'https://www.linkedin.com/in/amit6217', discord: 'amit_6217' },
    { name: 'Mahek Patel', branch: 'CSE', email: 'pjmahek2006@gmail.com', instagram: 'mahek.fr_', linkedin: 'https://www.linkedin.com/in/mahek-patel-580404307', discord: 'mahek19patel' },
    { name: 'Rishi kataria', branch: 'CSE', email: 'sainirishi2023@gmial.com', instagram: '_the_sage_00', linkedin: '', discord: '' },
    { name: 'Rashi Jangid', branch: 'Civil', email: 'rashiarvind10@gmail.com', instagram: 'jangidrashi10', linkedin: 'https://www.linkedin.com/in/rashi-jangid-47849a221', discord: 'rashi_jangid_' },
    { name: 'Mridul', branch: 'Civil', email: 'mridultrivedi318@gmail.com', instagram: '', linkedin: 'https://www.linkedin.com/in/mridul-trivedi-129b4337a/', discord: 'mridul_t_3' },
    { name: 'Prashant', branch: 'ECE', email: 'prashantchaudhary7353@gmail.com', instagram: '', linkedin: 'https://www.linkedin.com/in/prashant-chaudhary-147912320/', discord: 'prashantchaudhary8090' },
    { name: 'krrish sharma', branch: 'meta', email: 'krish56b1@gmail.com', instagram: '', linkedin: 'https://www.linkedin.com/in/krish-sharma1165', discord: 'krish_sharma1165' },
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

      {/* Contacts Simple List */}
      <section className="py-10 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
              Contact Team console
            </h2>
          </div>

          <div className="divide-y divide-gray-800 rounded-2xl border border-gray-800 overflow-hidden">
            {contacts.map((m, idx) => (
              <div
                key={idx}
                className="group grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-4 p-4 sm:p-6 bg-black/60 hover:bg-black/70 transition-all duration-300 hover:translate-y-[-1px]"
              >
                {/* Name + Branch */}
                <div className="flex flex-col text-center md:text-left">
                  <div className="text-white font-bold text-lg">{m.name}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-wide">
                    {m.branch}
                  </div>

                  {/* Mobile: Icons under name */}
                  <div className="mt-3 flex md:hidden justify-center gap-3 flex-wrap">
                    {/* Mail */}
                    <a
                      href={`mailto:${m.email}`}
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>

                    {/* LinkedIn */}
                    {buildLinkedIn(m.linkedin) && (
                      <a
                        href={buildLinkedIn(m.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
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
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}

                    {/* Discord */}
                    {m.discord && (
                      <a
                        href={`https://discord.com/users/${m.discord}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                      >
                        <SiDiscord className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Desktop: Email in middle */}
                <div className="hidden md:block text-center break-words">
                  <a
                    href={`mailto:${m.email}`}
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    {m.email}
                  </a>
                </div>

                {/* Desktop: Icons on right */}
                <div className="hidden md:flex items-center justify-end gap-3">
                  {buildLinkedIn(m.linkedin) && (
                    <a
                      href={buildLinkedIn(m.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {buildInstagram(m.instagram) && (
                    <a
                      href={buildInstagram(m.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {m.discord && (
                    <span
                      title={m.discord}
                      className="px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300 flex items-center gap-2 group-hover:border-gray-500 transition-colors break-all"
                    >
                      <SiDiscord className="w-4 h-4" /> {m.discord}
                    </span>
                  )}
                </div>
              </div>
            ))}
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
