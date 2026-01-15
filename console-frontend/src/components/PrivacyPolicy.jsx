import React from 'react';
import SidebarNavbar from './SidebarNavbar';
import LandingFooter from './Footer';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SidebarNavbar />
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-8">Last Updated: January 15, 2026</p>

        <div className="prose prose-lg prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              CONSOLE Campus Tech Community Platform ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              By accessing or using CONSOLE, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our platform.
            </p>
          </div>

          {/* Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">1.1 Personal Information</h3>
            <p className="text-gray-300 mb-3">We collect the following personal information when you create an account:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Name:</strong> Your full name for identification and personalization</li>
              <li><strong>Email Address:</strong> Institutional email for account creation and communication</li>
              <li><strong>Student/Employee ID:</strong> For verification and access control</li>
              <li><strong>Branch/Department:</strong> To categorize users and provide relevant content</li>
              <li><strong>Year of Study:</strong> For academic year-based features and leaderboards</li>
              <li><strong>Role:</strong> Student, Professor, or Administrator designation</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">1.2 Coding Platform Data</h3>
            <p className="text-gray-300 mb-3">With your explicit consent, we collect publicly available data from:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>LeetCode:</strong> Username, problems solved, contest ratings, submission history</li>
              <li><strong>CodeForces:</strong> Username, rating, rank, contest participation, problem statistics</li>
            </ul>
            <p className="text-sm text-gray-400 mt-3 italic">
              Note: We only access publicly available information from these platforms. We do not store your passwords or access private data.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">1.3 Attendance Data</h3>
            <p className="text-gray-300 mb-3">For students and professors, we collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Attendance records and timestamps</li>
              <li>Course enrollment information</li>
              <li>Session participation data</li>
              <li>Location data (if enabled for attendance verification)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">1.4 Usage Data</h3>
            <p className="text-gray-300 mb-3">We automatically collect certain information when you use our platform:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website addresses</li>
              <li>Date and time of access</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the collected information for the following purposes:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">2.1 Platform Functionality</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Create and manage user accounts</li>
              <li>Authenticate users and maintain secure sessions</li>
              <li>Display personalized dashboards and statistics</li>
              <li>Generate leaderboards and rankings</li>
              <li>Track and display coding progress</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">2.2 Educational Services</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Manage attendance tracking and reporting</li>
              <li>Facilitate course management and enrollment</li>
              <li>Enable professor-student interactions</li>
              <li>Provide academic performance insights</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">2.3 Communication</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Send account-related notifications and updates</li>
              <li>Respond to support requests and inquiries</li>
              <li>Notify about platform updates and new features</li>
              <li>Send security alerts and important announcements</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">2.4 Platform Improvement</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Analyze usage patterns to improve user experience</li>
              <li>Identify and fix technical issues</li>
              <li>Develop new features based on user needs</li>
              <li>Conduct research and analytics</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">3. Data Sharing and Disclosure</h2>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">3.1 Public Information</h3>
            <p className="text-gray-300 mb-3">The following information is publicly visible on leaderboards:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Name and student ID</li>
              <li>Branch and year of study</li>
              <li>LeetCode and CodeForces statistics</li>
              <li>Leaderboard rankings and scores</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">3.2 Within Institution</h3>
            <p className="text-gray-300 mb-3">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Professors:</strong> Attendance records and academic performance for enrolled courses</li>
              <li><strong>Administrators:</strong> Aggregated data for institutional reporting and analytics</li>
              <li><strong>Academic Staff:</strong> Information necessary for educational administration</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">3.3 Third-Party Services</h3>
            <p className="text-gray-300 mb-3">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Google OAuth:</strong> For secure authentication (governed by Google's Privacy Policy)</li>
              <li><strong>MongoDB Atlas:</strong> For secure data storage (governed by MongoDB's Privacy Policy)</li>
              <li><strong>Netlify/Render:</strong> For hosting and infrastructure (governed by their respective privacy policies)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">3.4 Legal Requirements</h3>
            <p className="text-gray-300">
              We may disclose your information if required by law, court order, or governmental regulation, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">4. Data Security</h2>
            <p className="text-gray-300 mb-4">We implement industry-standard security measures to protect your information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Encryption:</strong> All data transmission uses HTTPS/TLS encryption</li>
              <li><strong>Authentication:</strong> Secure OAuth 2.0 and JWT-based authentication</li>
              <li><strong>Access Control:</strong> Role-based access control (RBAC) to limit data access</li>
              <li><strong>Database Security:</strong> MongoDB encryption at rest and secure connections</li>
              <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability scans</li>
              <li><strong>Monitoring:</strong> Real-time monitoring for suspicious activities</li>
            </ul>
            <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-800/50 mt-4">
              <p className="text-sm text-gray-300">
                <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to improve our security measures.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">5. Your Privacy Rights</h2>
            <p className="text-gray-300 mb-4">You have the following rights regarding your personal information:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">5.1 Access and Portability</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Request a copy of your personal data</li>
              <li>Export your data in a machine-readable format</li>
              <li>View all information we have collected about you</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">5.2 Correction and Update</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Update your profile information at any time</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Modify your coding platform usernames</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">5.3 Deletion</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Request deletion of your account and associated data</li>
              <li>Remove specific information from your profile</li>
              <li>Opt-out of leaderboard participation</li>
            </ul>
            <p className="text-sm text-gray-400 mt-3 italic">
              Note: Some data may be retained for legal compliance, dispute resolution, or legitimate business purposes even after account deletion.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-300">5.4 Objection and Restriction</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Object to certain data processing activities</li>
              <li>Restrict how we use your information</li>
              <li>Withdraw consent for optional data collection</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Essential Cookies:</strong> Required for authentication and platform functionality</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics Cookies:</strong> Understand how users interact with our platform</li>
            </ul>
            <p className="text-gray-300 mt-4">
              You can control cookies through your browser settings. However, disabling essential cookies may affect platform functionality.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">7. Data Retention</h2>
            <p className="text-gray-300 mb-4">We retain your information for the following periods:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Active Accounts:</strong> Data retained while your account is active</li>
              <li><strong>Inactive Accounts:</strong> Deleted after 2 years of inactivity (with prior notice)</li>
              <li><strong>Attendance Records:</strong> Retained for academic record-keeping purposes</li>
              <li><strong>Deleted Accounts:</strong> Most data deleted within 30 days; some data retained for legal compliance</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">8. Children's Privacy</h2>
            <p className="text-gray-300">
              CONSOLE is designed for use by college students and educational institutions. We do not knowingly collect information from individuals under 13 years of age. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">9. International Data Transfers</h2>
            <p className="text-gray-300">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Posting the updated policy on our platform</li>
              <li>Sending an email notification to your registered email address</li>
              <li>Displaying a prominent notice on the platform</li>
            </ul>
            <p className="text-gray-300 mt-4">
              Your continued use of CONSOLE after changes are posted constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">11. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <ul className="space-y-3 text-gray-300">
                <li><strong>Email:</strong> privacy@console-platform.org</li>
                <li><strong>GitHub:</strong> <a href="https://github.com/the-sage-00/CONSOLE-Campus-Tech-Community-Platform" className="text-orange-400 hover:text-orange-300 underline">CONSOLE Repository</a></li>
                <li><strong>Response Time:</strong> We aim to respond within 48 hours</li>
              </ul>
            </div>
          </section>

          {/* Legal Compliance */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-orange-400">12. Legal Compliance</h2>
            <p className="text-gray-300 mb-4">
              This Privacy Policy is designed to comply with applicable data protection laws, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA)</li>
              <li>Information Technology Act, 2000 (India)</li>
              <li>Other applicable local and international privacy laws</li>
            </ul>
          </section>

          {/* Consent */}
          <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 p-6 rounded-xl border border-orange-700/50 mt-8">
            <h3 className="text-2xl font-bold mb-3 text-orange-300">Your Consent</h3>
            <p className="text-gray-200 leading-relaxed">
              By using CONSOLE Campus Tech Community Platform, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. You consent to our collection, use, and disclosure of your information as described herein.
            </p>
            <p className="text-sm text-gray-300 mt-4">
              If you do not agree with this Privacy Policy, please discontinue use of the platform immediately.
            </p>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              This Privacy Policy was last updated on <strong>January 15, 2026</strong>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2026 CONSOLE Campus Tech Community Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}

export default PrivacyPolicy;
