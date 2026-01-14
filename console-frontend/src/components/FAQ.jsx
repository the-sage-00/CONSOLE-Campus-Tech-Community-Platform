import { useState } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I join the Console community?",
      answer:
        "Join our Discord server or WhatsApp group to connect with fellow tech enthusiasts and stay updated with the latest events and opportunities."
    },
    {
      question: "Do you offer mentorship programs?",
      answer:
        "Yes! We have experienced mentors who can guide you in various tech domains including competitive programming, web development, and machine learning."
    },
    {
      question: "Can I contribute to Console projects?",
      answer:
        "Absolutely! We welcome contributions from the community. Check out our GitHub repositories and join our open-source initiatives."
    },
    {
      question: "What events do you organize?",
      answer:
        "We host hackathons, coding competitions, workshops, tech talks, and networking events throughout the year."
    },
    {
      question: "Is Console only for Computer Science students?",
      answer:
        "No! Console is open to all students passionate about technology, regardless of their academic background."
    },
    {
      question: "How can I stay updated with Console activities?",
      answer:
        "Follow us on social media, join our Discord server, and subscribe to our newsletter for regular updates."
    }
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Everything you need to know about Console
          </p>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowFAQ(!showFAQ)}
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-all w-full sm:w-auto"
            >
              {showFAQ ? "Hide FAQs" : "Show FAQs"}
            </button>
          </div>
        </div>

        {/* FAQ List */}
        {showFAQ && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className="bg-[#111]/80 border border-gray-800 rounded-xl p-4 sm:p-5 cursor-pointer transition-colors hover:border-[#FF3C5F]/50"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <h4 className="text-white font-medium text-sm sm:text-base md:text-lg">
                      {faq.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[#FFC22D]" : ""
                      }`}
                  />
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index
                      ? "max-h-40 mt-2 sm:mt-3 opacity-100"
                      : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
