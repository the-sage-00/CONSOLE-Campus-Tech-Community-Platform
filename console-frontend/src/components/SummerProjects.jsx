import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Rocket, Download, Briefcase, ShoppingCart, Users,
    Zap, Server, Globe, Brain, Shield, Calendar, BarChart3, MessageSquare,
    Camera, MapPin, CreditCard, Search, FileText, Code, Eye, Award,
    Target, Layers, Sparkles, Terminal, Clock, Heart, PartyPopper, FileDown
} from 'lucide-react';
import SidebarNavbar from './SidebarNavbar';
import LandingFooter from './Footer';

// ─── Single consolidated PDF path ────────────────────────────────
const PHASE_A_PDF = '/projects/BuildVerse_Phase_A.pdf';

// ─── Holi Color Splashes (decorative background) ─────────────────
const HoliSplashes = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top-left pink splash */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #FF1493 0%, transparent 70%)' }} />
        {/* Top-right yellow splash */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }} />
        {/* Mid-left purple splash */}
        <div className="absolute top-[40%] -left-20 w-[350px] h-[350px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }} />
        {/* Mid-right green splash */}
        <div className="absolute top-[55%] -right-16 w-[300px] h-[300px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
        {/* Bottom orange splash */}
        <div className="absolute -bottom-20 left-[30%] w-[450px] h-[450px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #FF7A30 0%, transparent 70%)' }} />
    </div>
);

// ─── Project Data ────────────────────────────────────────────────
const projects = [
    {
        id: 1,
        title: "Business Management System",
        subtitle: "The Centralized Source of Truth",
        tagline: "Stop the digital mess. Build accountability.",
        description:
            "CONSOLE is growing fast, but messy spreadsheets and scattered chat messages for a firm with 150+ developers is no longer enough. Build a professional web app that serves as a centralized business management platform — like Jira, but built by you.",
        icon: Briefcase,
        gradient: "from-[#FF3C5F] to-[#FF7A30]",
        borderHover: "hover:border-[#FF3C5F]/40",
        pdfPath: PHASE_A_PDF,
        techHints: ["React", "Node.js", "MongoDB", "WebSockets", "OpenCV", "Google Calendar API"],
        stages: [
            {
                name: "Stage 1 — The Foundation",
                goal: "Make a functional website.",
                features: [
                    "Smart Login with role-based dashboards + Face Recognition (OpenCV)",
                    "Task Assignment & Monitoring — Kanban board (To-Do → In-Progress → Completed)",
                    "\"Black Box\" Recorder — History log of every action, who did it, when",
                    "Clean responsive interface for phones & PCs",
                ],
            },
            {
                name: "Stage 2 — The Automator & Communicator",
                goal: "Let the code do the boring stuff.",
                features: [
                    "Local Calendar + Meeting auto-scheduling based on availability",
                    "Auto-generate PDF salary slips on the 1st of every month, send via Gmail",
                    "Local Messaging hub for tasks, announcements, and team interaction",
                ],
            },
            {
                name: "Stage 3 — The Live Nerve Center",
                goal: "Everything updates instantly.",
                features: [
                    "Real-time Live Scoreboard — auto-updates without refresh",
                    "Active Users — show who's online and what they're working on",
                ],
            },
            {
                name: "Bonus — God Mode",
                goal: "Prediction-powered insights.",
                features: [
                    "\"Burn Rate\" Graph — predict when cash runs out using a prebuilt ML model",
                    "Optimize and minimize all operational delays",
                ],
            },
        ],
    },
    {
        id: 2,
        title: "Smarter BlinkIt",
        subtitle: "AI-Driven Multi-Seller Intelligent Commerce",
        tagline: "A marketplace that understands intent, not just keywords.",
        description:
            "Most shopping apps are just digital catalogs. Build a \"Smart Marketplace\" that connects buyers and local sellers using AI — an AI Shopping Assistant that fills your cart for you, and a Barcode-based Inventory Modification System for sellers.",
        icon: ShoppingCart,
        gradient: "from-[#FF7A30] to-[#FFC22D]",
        borderHover: "hover:border-[#FF7A30]/40",
        pdfPath: PHASE_A_PDF,
        techHints: ["React", "Node.js", "Neo4j", "NLP/Semantic Search", "Razorpay", "OpenCV"],
        stages: [
            {
                name: "Stage 1 — The Foundation",
                goal: "Build a working website where users can find what they need.",
                features: [
                    "Dual-Login for Buyers & Sellers with different dashboards + Face Recognition",
                    "\"Intent\" Semantic Search — type \"I have a cold\" → suggest Honey or Ginger Tea",
                    "Local First — detect location, auto-place orders to closest shops",
                    "Barcode-based Inventory Modification for sellers",
                    "Dummy Payment integration via Razorpay",
                ],
            },
            {
                name: "Stage 2 — The Automator",
                goal: "Let the AI do the heavy lifting.",
                features: [
                    "\"Recipe\" Agent — type \"Make Pizza for 4\" → AI fills cart from nearby shops",
                    "Flash Sale Pricing — auto-drop price by 40% if item expires tomorrow",
                    "Similar Items via Neo4j graph (SIMILAR_TO, BOUGHT_WITH relationships)",
                ],
            },
            {
                name: "Stage 3 — The Orchestrator",
                goal: "Ensure the order is right, the route is fast.",
                features: [
                    "Smart Cart Splitting — split order across shops for best delivery",
                    "\"Pack-Shot\" Verify — AI checks photo of bag against order list before dispatch",
                    "Live Storeboard — real-time dashboard of top items & top-rated shops",
                ],
            },
            {
                name: "Bonus — God Mode",
                goal: "Prediction-based intelligence.",
                features: [
                    "Demand Forecasting using a prebuilt ML model — no existing LLMs",
                ],
            },
        ],
    },
    {
        id: 3,
        title: "TalentBridge",
        subtitle: "Centralized Recruitment Intelligence",
        tagline: "Stop losing top talent to scattered data.",
        description:
            "CONSOLE is scaling fast, but hiring is lagging behind. Top-tier talent slips through the cracks because data is scattered across external testing sites, messy emails, and rigid search filters. Build a centralized recruitment platform.",
        icon: Users,
        gradient: "from-[#8B5CF6] to-[#FF3C5F]",
        borderHover: "hover:border-[#8B5CF6]/40",
        pdfPath: PHASE_A_PDF,
        techHints: ["React", "Node.js", "RAG/Semantic Search", "PDF Generation", "WebSockets"],
        stages: [
            {
                name: "Stage 1 — The Functional Core",
                goal: "A secure, end-to-end recruitment pipeline.",
                features: [
                    "Dual-Sided Portal for Recruiters & Candidates with keyword + filter search",
                    "Direct Sync Messaging — in-built real-time communication hub",
                    "Audit Trail — every status change (Applied → Interviewing → Offered) is logged",
                ],
            },
            {
                name: "Stage 2 — The Smart Matcher",
                goal: "Solve the \"Keyword Trap\" with AI.",
                features: [
                    "Hybrid Search Engine — Semantic Layer (RAG) that understands job intent",
                    "Contextual Ranking — match candidates even if resume uses different phrasing",
                ],
            },
            {
                name: "Stage 3 — Extraordinary Features",
                goal: "Ease the most time-consuming tasks.",
                features: [
                    "Auto Messaging & Calendar sync for OA/interviews",
                    "Resume → Custom Profile auto-conversion",
                    "Offer Letter Generator — auto-generate secure PDF offers",
                    "Auto Closure — position closes when offer is accepted",
                ],
            },
            {
                name: "Bonus — The Profile Vault",
                goal: "Eliminate third-party dependencies.",
                features: [
                    "Coding Sandbox — integrated IDE + Quiz Engine within the platform",
                    "Live Monitoring (Proctor) — track tab-switching, watch code in real-time",
                    "Instant Grading — auto-grade and update candidate status on Live Scoreboard",
                ],
            },
        ],
    },
];

// ─── Holi color palette for accents ──────────────────────────────
const holiColors = ['#FF3C5F', '#FF7A30', '#FFC22D', '#8B5CF6', '#10B981', '#FF1493', '#06B6D4'];

// ─── Animation variants ─────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

// ─── Single Project Card ─────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
    const ProjectIcon = project.icon;

    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            className={`relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 backdrop-blur-sm rounded-3xl border border-gray-800/50 ${project.borderHover} transition-all duration-500 overflow-hidden group`}
        >
            {/* Top gradient stripe */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

            <div className="p-6 sm:p-8">
                {/* Header row */}
                <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                        <ProjectIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-xl sm:text-2xl font-black text-white">{project.title}</h3>
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${project.gradient} text-white rounded-full`}>
                                Project {project.id}
                            </span>
                        </div>
                        <p className={`text-sm font-semibold mt-1 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                            {project.subtitle}
                        </p>
                    </div>
                </div>

                {/* Tagline */}
                <p className="text-gray-300 text-base sm:text-lg font-medium mb-3 italic">
                    "{project.tagline}"
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techHints.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-gray-800/80 text-gray-300 rounded-full border border-gray-700/50"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Stages */}
                <div className="space-y-4 mb-6">
                    {project.stages.map((stage, si) => (
                        <div key={si} className="bg-gray-800/30 rounded-2xl p-4 sm:p-5 border border-gray-800/40">
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}>
                                    <span className="text-white text-[10px] font-black">{si + 1}</span>
                                </div>
                                <h4 className="text-white font-bold text-sm sm:text-base">{stage.name}</h4>
                            </div>
                            <p className="text-gray-500 text-xs mb-3 italic">{stage.goal}</p>
                            <ul className="space-y-1.5">
                                {stage.features.map((f, fi) => (
                                    <li key={fi} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm leading-relaxed">
                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Download Button */}
                <a
                    href={project.pdfPath}
                    download="BuildVerse_Phase_A.pdf"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300`}
                >
                    <Download className="w-4 h-4" />
                    Download Problem Statement PDF
                </a>
            </div>
        </motion.div>
    );
};

// ─── Main Page Component ─────────────────────────────────────────
const SummerProjects = () => {

    // Scroll animation observer
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
            { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
        );

        const cards = document.querySelectorAll('.scroll-animation-card');
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white relative">
            {/* Navigation */}
            <SidebarNavbar />

            {/* Holi color splashes in background */}
            <HoliSplashes />

            {/* ── Holi Message Banner ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-30"
            >
                <div className="h-1 w-full bg-gradient-to-r from-[#FF3C5F] via-[#FFC22D] via-[#10B981] via-[#8B5CF6] to-[#FF1493]" />
            </motion.div>

            {/* ── Hero Section ── */}
            <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
                {/* Holi colored floating dots */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {holiColors.map((color, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                background: color,
                                left: `${10 + i * 13}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                boxShadow: `0 0 20px ${color}60`,
                            }}
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: i * 0.4,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Holi Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF3C5F]/10 via-[#FFC22D]/10 to-[#8B5CF6]/10 border border-gray-700/50 backdrop-blur-sm mb-8"
                    >
                        <span className="text-lg">🎨</span>
                        <span className="text-gray-200 text-sm font-medium">Holi Break 2026 • CONSOLE Tech Community</span>
                        <span className="text-lg">🎉</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-5 leading-[0.95]"
                    >
                        <span className="bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                            BuildVerse
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl sm:text-2xl text-gray-200 font-medium mb-10 max-w-2xl mx-auto"
                    >
                        Where ideas get{' '}
                        <span className="bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent font-bold">
                            built.
                        </span>
                    </motion.p>

                    {/* Holi Message Card from Team CONSOLE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-800/50 overflow-hidden text-left">
                            {/* Rainbow top border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3C5F] via-[#FFC22D] via-[#10B981] via-[#8B5CF6] to-[#FF1493]" />

                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF3C5F] to-[#FFC22D] flex items-center justify-center flex-shrink-0">
                                    <Heart className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-base sm:text-lg">Happy Holi from Team CONSOLE! 🎨🌈</h3>
                                    <p className="text-gray-500 text-xs">March 2026 • CONSOLE Tech Community</p>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                This Holi, while the world plays with colors, we want you to paint your career with <span className="text-[#FF3C5F] font-semibold">code</span>.
                                We've curated <span className="text-[#FFC22D] font-semibold">3 industry-grade problem statements</span> for you to build during the Holi break.
                                Pick your challenge, download the brief, and start shipping real projects. Let this break be the one where you go from
                                <span className="text-[#10B981] font-semibold"> learner to builder</span>. 🚀
                            </p>
                            <p className="text-gray-400 text-sm mt-3 font-medium italic">
                                — With love & colors, Team CONSOLE 💜🧡💛
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex items-center justify-center gap-8 sm:gap-14"
                    >
                        {[
                            { label: 'Projects', value: '3', emoji: '🚀' },
                            { label: 'Stages Each', value: '4', emoji: '📈' },
                            { label: 'Phase A PDF', value: '1', emoji: '📄' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-sm mb-1">{stat.emoji}</div>
                                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-0.5">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Project Cards Section ── */}
            <section className="relative py-12 sm:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
                            <span className="bg-gradient-to-r from-[#FF3C5F] via-[#8B5CF6] to-[#FFC22D] bg-clip-text text-transparent">
                                Choose Your Challenge
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                            Each project is a 4-stage progressive build — from foundation to god mode. Pick one and push your limits.
                        </p>
                    </motion.div>

                    {/* Project Cards — simple vertical stack */}
                    <div className="space-y-8 sm:space-y-10">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How to Approach Section ── */}
            <section className="relative py-12 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden"
                    >
                        {/* Top gradient stripe */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-[#8B5CF6]" />

                        <div className="p-6 sm:p-8 lg:p-10">
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center shadow-lg flex-shrink-0">
                                    <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-white">
                                        How to Approach These Projects?
                                    </h2>
                                    <p className="text-sm font-semibold mt-1 bg-gradient-to-r from-[#10B981] to-[#06B6D4] bg-clip-text text-transparent">
                                        AI Agents + Smart Planning = Faster Shipping
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 mb-6">
                                <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-5 border border-gray-800/40">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-[10px] font-black">1</span>
                                        </div>
                                        <h4 className="text-white font-bold text-sm sm:text-base">Talk to the AI the Right Way</h4>
                                    </div>
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                        Don't just say "build me an app." Break your project into clear, specific tasks. Describe what each feature should do, what inputs it takes, and what output you expect. The more precise your prompts, the better the AI's output.
                                    </p>
                                </div>

                                <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-5 border border-gray-800/40">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-[10px] font-black">2</span>
                                        </div>
                                        <h4 className="text-white font-bold text-sm sm:text-base">Understand What the AI Writes</h4>
                                    </div>
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                        Don't blindly copy-paste. Read every line the AI generates — understand the error handling, the data flow, and why it made certain design choices. Good code handles worst-case scenarios gracefully, not just happy paths.
                                    </p>
                                </div>

                                <div className="bg-gray-800/30 rounded-2xl p-4 sm:p-5 border border-gray-800/40">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-[10px] font-black">3</span>
                                        </div>
                                        <h4 className="text-white font-bold text-sm sm:text-base">Build Stage by Stage</h4>
                                    </div>
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                                        Follow the 4-stage approach outlined in each project. Don't jump to Stage 3 before Stage 1 works. Each stage builds on the previous one — get the foundation rock-solid first, then layer on intelligence and automation.
                                    </p>
                                </div>
                            </div>

                            {/* Download approach PDF */}
                            <a
                                href="/projects/BuildVerse_Approach_Phase_A.pdf"
                                download="BuildVerse_Approach_Phase_A.pdf"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                            >
                                <Download className="w-4 h-4" />
                                Download Full Approach Guide (PDF)
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Download Section ── */}
            <section className="relative py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-gray-900/70 to-gray-950/70 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-gray-800/50 text-center overflow-hidden"
                    >
                        {/* Rainbow border top */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3C5F] via-[#FFC22D] via-[#10B981] via-[#8B5CF6] to-[#FF1493]" />

                        <div className="text-3xl mb-4">📥</div>
                        <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                            Download Problem Statements
                        </h3>
                        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
                            All 3 problem statements in one PDF — BuildVerse Phase A.
                        </p>

                        <a
                            href={PHASE_A_PDF}
                            download="BuildVerse_Phase_A.pdf"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] text-white font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <FileDown className="w-5 h-5" />
                            <span>Download BuildVerse Phase A (PDF)</span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <LandingFooter />
        </div>
    );
};

export default SummerProjects;
