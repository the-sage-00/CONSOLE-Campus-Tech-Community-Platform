import React, { useState } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const ContactCard = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-[260px] h-[320px] [perspective:1000px] cursor-pointer font-sans"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute pt-1 w-full h-full flex flex-col justify-center items-center shadow-[#ff3c5f]/60 shadow-lg border-2 border-[#FF3C5F] rounded-xl [backface-visibility:hidden] bg-gradient-to-tr from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] text-white">
          <img
            src="/core.webp"
            alt="Logo"
            className="rounded-xl border-b-2 border-black/50 absolute top-0  w-full h-[85%]  object-fill drop-shadow-lg "
          />
          <span className=" absolute font-bold text-2xl bottom-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                CORE TEAM
                </span>
          <span className=" absolute bottom-1 text-xs text-gray-400">Tap to know more</span>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full flex flex-col justify-between items-center shadow-lg shadow-[#ff7a30]/50 border-2 border-[#FF7A30] rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] text-white p-4">
          {/* Roles */}
          <div className="flex flex-col gap-2 mt-3">
            <span className="px-3 py-1 bg-black/30 backdrop-blur-md text-blue-400 text-xs rounded-full border border-gray-600 hover:border-[#FF3C5F] hover:bg-[#FF3C5F]/20 transition-all duration-300">
              #Mern Stack Developer
            </span>
            <span className="px-3 py-1 bg-black/30 text-blue-400 text-xs rounded-full border border-gray-600 hover:border-[#FF7A30] hover:bg-[#FF7A30]/20 transition-all duration-300">
              #Competitive Programmer
            </span>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 w-full">
            <div className="font-bold text-xl">
              <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                  CSE
                </span><br/>
              <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                  2nd year
                </span>
            </div>
            <a
              href="mailto:console.committee@gmail.com"
              className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition group"
            >
              <Mail className="w-4 h-4 text-[#FF7A30] group-hover:scale-110 group-hover:animate-pulse" />
              <span className="truncate hover:font-semibold text-orange-400">
                console.committee@gmail.com
              </span>
            </a>
            <a
              href="tel:123456789"
              className="flex hover:font-semibold items-center gap-3 text-sm text-blue-400 hover:text-blue-600 transition group"
            >
              <Phone className="w-4 h-4 text-[#FF7A30] group-hover:scale-110 group-hover:animate-pulse" />
              <span>123456789</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mb-2">
            <SocialIcon
              href="https://linkedin.com/company/console"
              gradient="from-blue-700 to-blue-400"
              icon={<Linkedin className="w-5 h-5 text-white" />}
              shadowColor="#1DA1F2"
            />
            <SocialIcon
              href="https://github.com/console"
              gradient="from-[#333] to-[#555]"
              icon={<Github className="w-5 h-5 text-white" />}
              shadowColor="#444"
            />
            <SocialIcon
              href="https://instagram.com/console"
              gradient="from-pink-600 to-[#FF7A30]"
              icon={<Instagram className="w-5 h-5 text-white" />}
              shadowColor="#FF3C5F"
            />
            <SocialIcon
              href="https://wa.me/yourphonenumber"
              gradient="from-[#25D366] to-[#128C7E]"
              icon={<FaWhatsapp className="w-5 h-5 text-white" />}
              shadowColor="#25D366"
            />
            <SocialIcon
              href="https://twitter.com/console"
              gradient="from-[#1DA1F2] to-[#0D8DDC]"
              icon={<Twitter className="w-5 h-5 text-white" />}
              shadowColor="#1DA1F2"
            />
            {/* <SocialIcon
              href="https://discord.com"
              gradient="from-[#5865F2] to-[#404EED]"
              icon={<FaDiscord className="w-5 h-5 text-white" />}
              shadowColor="#5865F2"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable social icon button
const SocialIcon = ({ href, gradient, icon, shadowColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-xl shadow-black/50 hover:shadow-2xl active:scale-95`}
    style={{ boxShadow: `0 4px 10px ${shadowColor}55` }}
  >
    {icon}
  </a>
);

export default ContactCard;
