import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Brain,
	Trophy,
	Link as LinkIcon,
	Shield,
	GraduationCap,
	Search,
	Clock,
	ExternalLink,
	ChevronRight,
	ChevronDown,
	Target,
	BookOpen,
	Cpu,
	Layers,
	Youtube,
	Star,
	Users,
	Code2,
} from 'lucide-react';
import SidebarNavbar from './SidebarNavbar';
import LandingFooter from './Footer';

const LS_KEYS = {
	studyStats: 'resources_page_study_stats',
	goals: 'resources_page_goals',
	timer: 'resources_page_timer',
};

const DEFAULT_TIMER = { focusMinutes: 25, breakMinutes: 5 };

const ResourcesPage = () => {
	const navigate = useNavigate();

	// Search and filter
	const [query, setQuery] = useState('');
	const [activeCategories, setActiveCategories] = useState(new Set(['all']));
	const [activeResourceTab, setActiveResourceTab] = useState('youtube'); // 'youtube', 'coursera', 'other'
	const [expandedTabs, setExpandedTabs] = useState(new Set(['youtube'])); // Track which tabs are expanded

	// Utilities: goals, study stats, timer
	const [studyStats, setStudyStats] = useState({
		totalStudyTime: 0,
		problemsSolved: 0,
		streakDays: 0,
		lastStudyDate: null,
		completedTopics: [],
		learningGoals: []
	});
	const [newTopic, setNewTopic] = useState('');
	const [goals, setGoals] = useState([]); // { id, text, done }
	const [newGoal, setNewGoal] = useState('');

	const [focusMinutes, setFocusMinutes] = useState(DEFAULT_TIMER.focusMinutes);
	const [breakMinutes, setBreakMinutes] = useState(DEFAULT_TIMER.breakMinutes);
	const [isRunning, setIsRunning] = useState(false);
	const [phase, setPhase] = useState('focus'); // 'focus' | 'break'
	const [secondsLeft, setSecondsLeft] = useState(DEFAULT_TIMER.focusMinutes * 60);
	const intervalRef = useRef(null);

	// Base resources (expanded with C++ and Web Development)
	const resources = [
		{
			title: 'C++ Programming',
			description: 'Master C++ fundamentals, OOP concepts, and advanced topics',
			icon: Cpu,
			category: 'programming',
			link: '/resources/cpp-programming',
			difficulty: 'Intermediate',
			duration: '4 months',
		},
		{
			title: 'Machine Learning',
			description: 'Deep dive into ML algorithms and applications',
			icon: Brain,
			category: 'ai',
			link: '/resources/machine-learning',
			difficulty: 'Advanced',
			duration: '6 months',
		},
		{
			title: 'Competitive Programming',
			description: 'Master DSA and competitive coding',
			icon: Trophy,
			category: 'cp',
			link: '/resources/competitive-programming',
			difficulty: 'Intermediate',
			duration: '4 months',
		},
		{
			title: 'Web3',
			description: 'Learn blockchain, smart contracts, and DeFi',
			icon: LinkIcon,
			category: 'web3',
			link: '/resources/web3',
			difficulty: 'Intermediate',
			duration: '5 months',
		},
		{
			title: 'Information Security',
			description: 'Cybersecurity, ethical hacking, and network security',
			icon: Shield,
			category: 'security',
			link: '/resources/information-security',
			difficulty: 'Advanced',
			duration: '7 months',
		},
		{
			title: 'Python Programming',
			description: 'Learn Python from basics to advanced with hands-on projects',
			icon: Code2,
			category: 'python',
			link: '/resources/python-programming',
			difficulty: 'Beginner',
			duration: '9 weeks',
		},
		{
			title: 'Web Development',
			description: 'Full-stack web development with modern frameworks',
			icon: Layers,
			category: 'webdev',
			link: '/resources/web-development',
			difficulty: 'Beginner',
			duration: '5 months',
		},
	];

	// Quick launch shortcuts (useful/day-to-day)
	const quickLaunch = [
		{ label: 'LeetCode', href: 'https://leetcode.com', icon: Target },
		{ label: 'Codeforces', href: 'https://codeforces.com', icon: Trophy },
		{ label: 'GeeksforGeeks', href: 'https://geeksforgeeks.org', icon: BookOpen },
		{ label: 'Docs: MDN', href: 'https://developer.mozilla.org', icon: Layers },
		{ label: 'Kaggle', href: 'https://kaggle.com', icon: Cpu },
		{ label: 'Coursera', href: 'https://coursera.org', icon: GraduationCap },
	];

	// YouTube coding tutorials
	const youtubeTutorials = [
		{
			title: "CS50: Introduction to Computer Science",
			channel: "Harvard University",
			url: "https://www.youtube.com/watch?v=8mAITcNt710",
			duration: "24 hours",
			rating: 4.9,
			category: "Computer Science",
			thumbnail: "https://img.youtube.com/vi/8mAITcNt710/mqdefault.jpg"
		},
		{
			title: "JavaScript Full Course for Beginners",
			channel: "freeCodeCamp",
			url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
			duration: "3 hours",
			rating: 4.8,
			category: "Web Development",
			thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg"
		},
		{
			title: "Python for Beginners - Full Course",
			channel: "Programming with Mosh",
			url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
			duration: "6 hours",
			rating: 4.9,
			category: "Python",
			thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/mqdefault.jpg"
		},
		{
			title: "React JS Full Course 2024",
			channel: "Clever Programmer",
			url: "https://www.youtube.com/watch?v=DLX62G4lc44",
			duration: "4 hours",
			rating: 4.7,
			category: "React",
			thumbnail: "https://img.youtube.com/vi/DLX62G4lc44/mqdefault.jpg"
		},
		{
			title: "Machine Learning Full Course",
			channel: "Simplilearn",
			url: "https://www.youtube.com/watch?v=9f-GarcDY58",
			duration: "10 hours",
			rating: 4.6,
			category: "Machine Learning",
			thumbnail: "https://img.youtube.com/vi/9f-GarcDY58/mqdefault.jpg"
		},
		{
			title: "Data Structures and Algorithms",
			channel: "mycodeschool",
			url: "https://www.youtube.com/watch?v=92S4zgXN17o",
			duration: "8 hours",
			rating: 4.8,
			category: "DSA",
			thumbnail: "https://img.youtube.com/vi/92S4zgXN17o/mqdefault.jpg"
		}
	];

	// Coursera courses
	const courseraCourses = [
		{
			title: "Machine Learning",
			instructor: "Andrew Ng",
			university: "Stanford University",
			url: "https://www.coursera.org/learn/machine-learning",
			duration: "11 weeks",
			rating: 4.9,
			price: "Free",
			category: "Machine Learning",
			enrolled: "4.2M+"
		},
		{
			title: "Python for Everybody",
			instructor: "Charles Severance",
			university: "University of Michigan",
			url: "https://www.coursera.org/specializations/python",
			duration: "8 months",
			rating: 4.8,
			price: "Free",
			category: "Python",
			enrolled: "2.1M+"
		},
		{
			title: "Algorithms, Part I",
			instructor: "Robert Sedgewick",
			university: "Princeton University",
			url: "https://www.coursera.org/learn/algorithms-part1",
			duration: "6 weeks",
			rating: 4.7,
			price: "Free",
			category: "Algorithms",
			enrolled: "1.8M+"
		},
		{
			title: "Web Development",
			instructor: "Yaakov Chaikin",
			university: "Johns Hopkins University",
			url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
			duration: "4 weeks",
			rating: 4.6,
			price: "Free",
			category: "Web Development",
			enrolled: "1.5M+"
		},
		{
			title: "Data Science",
			instructor: "Jeff Leek",
			university: "Johns Hopkins University",
			url: "https://www.coursera.org/specializations/jhu-data-science",
			duration: "10 months",
			rating: 4.5,
			price: "Free",
			category: "Data Science",
			enrolled: "3.2M+"
		},
		{
			title: "Blockchain Technology",
			instructor: "Bina Ramamurthy",
			university: "University at Buffalo",
			url: "https://www.coursera.org/learn/blockchain-basics",
			duration: "4 weeks",
			rating: 4.4,
			price: "Free",
			category: "Blockchain",
			enrolled: "890K+"
		}
	];

	// Other valuable resources
	const otherResources = [
		{
			title: "The Odin Project",
			description: "Free full-stack curriculum with real projects",
			url: "https://www.theodinproject.com",
			type: "Full-Stack Curriculum",
			price: "Free",
			rating: 4.8,
			category: "Web Development"
		},
		{
			title: "freeCodeCamp",
			description: "Learn to code with interactive tutorials and projects",
			url: "https://www.freecodecamp.org",
			type: "Interactive Platform",
			price: "Free",
			rating: 4.9,
			category: "Programming"
		},
		{
			title: "Frontend Mentor",
			description: "Real-world frontend challenges with designs",
			url: "https://www.frontendmentor.io",
			type: "Practice Platform",
			price: "Free",
			rating: 4.7,
			category: "Frontend"
		},
		{
			title: "HackerRank",
			description: "Practice coding skills and prepare for interviews",
			url: "https://www.hackerrank.com",
			type: "Practice Platform",
			price: "Free",
			rating: 4.6,
			category: "Programming"
		},
		{
			title: "Dev.to",
			description: "Developer community and articles",
			url: "https://dev.to",
			type: "Community",
			price: "Free",
			rating: 4.8,
			category: "Community"
		},
		{
			title: "Stack Overflow",
			description: "Q&A platform for developers",
			url: "https://stackoverflow.com",
			type: "Q&A Platform",
			price: "Free",
			rating: 4.9,
			category: "Community"
		}
	];

	// Load from localStorage
	useEffect(() => {
		try {
			const stats = JSON.parse(localStorage.getItem(LS_KEYS.studyStats) || '{}');
			const gl = JSON.parse(localStorage.getItem(LS_KEYS.goals) || '[]');
			const tm = JSON.parse(localStorage.getItem(LS_KEYS.timer) || 'null');
			if (stats && typeof stats === 'object') setStudyStats(stats);
			if (Array.isArray(gl)) setGoals(gl);
			if (tm && typeof tm === 'object') {
				if (tm.focusMinutes) setFocusMinutes(tm.focusMinutes);
				if (tm.breakMinutes) setBreakMinutes(tm.breakMinutes);
				setPhase('focus');
				setSecondsLeft((tm.focusMinutes || DEFAULT_TIMER.focusMinutes) * 60);
			}
		} catch (_) { }
	}, []);

	// Persist to localStorage
	useEffect(() => {
		localStorage.setItem(LS_KEYS.studyStats, JSON.stringify(studyStats));
	}, [studyStats]);
	useEffect(() => {
		localStorage.setItem(LS_KEYS.goals, JSON.stringify(goals));
	}, [goals]);
	useEffect(() => {
		localStorage.setItem(LS_KEYS.timer, JSON.stringify({ focusMinutes, breakMinutes }));
	}, [focusMinutes, breakMinutes]);

	// Timer logic
	useEffect(() => {
		if (!isRunning) return;
		intervalRef.current = setInterval(() => {
			setSecondsLeft((prev) => {
				if (prev > 1) return prev - 1;
				// phase switch
				if (phase === 'focus') {
					setPhase('break');
					return breakMinutes * 60;
				} else {
					setPhase('focus');
					return focusMinutes * 60;
				}
			});
		}, 1000);
		return () => clearInterval(intervalRef.current);
	}, [isRunning, phase, focusMinutes, breakMinutes]);

	const totalForPhase = phase === 'focus' ? focusMinutes * 60 : breakMinutes * 60;
	const progress = totalForPhase > 0 ? ((totalForPhase - secondsLeft) / totalForPhase) * 100 : 0;

	const toggleCategory = (cat) => {
		setActiveCategories((prev) => {
			const next = new Set(prev);
			if (cat === 'all') return new Set(['all']);
			next.delete('all');
			if (next.has(cat)) next.delete(cat); else next.add(cat);
			if (next.size === 0) return new Set(['all']);
			return next;
		});
	};

	const toggleTabExpansion = (tabKey) => {
		setExpandedTabs((prev) => {
			const next = new Set(prev);
			if (next.has(tabKey)) {
				next.delete(tabKey);
			} else {
				next.add(tabKey);
			}
			return next;
		});
	};

	const filteredResources = useMemo(() => {
		const q = query.trim().toLowerCase();
		return resources.filter((r) => {
			const inCat = activeCategories.has('all') || activeCategories.has(r.category);
			const inText = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.difficulty.toLowerCase().includes(q);
			return inCat && inText;
		});
	}, [resources, query, activeCategories]);

	const formatTime = (secs) => {
		const m = Math.floor(secs / 60).toString().padStart(2, '0');
		const s = Math.floor(secs % 60).toString().padStart(2, '0');
		return `${m}:${s}`;
	};

	// Goal handlers
	const addGoal = () => {
		const text = newGoal.trim();
		if (!text) return;
		setGoals((g) => [{ id: Date.now(), text, done: false }, ...g]);
		setNewGoal('');
	};
	const toggleGoal = (id) => setGoals((g) => g.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
	const deleteGoal = (id) => setGoals((g) => g.filter((it) => it.id !== id));

	// Study stats handlers
	const addCompletedTopic = () => {
		const topic = newTopic.trim();
		if (!topic) return;
		setStudyStats((prev) => ({
			...prev,
			completedTopics: [...prev.completedTopics, { id: Date.now(), name: topic, date: new Date().toISOString() }]
		}));
		setNewTopic('');
	};

	const removeCompletedTopic = (id) => {
		setStudyStats((prev) => ({
			...prev,
			completedTopics: prev.completedTopics.filter(topic => topic.id !== id)
		}));
	};

	const updateStudyStats = (type, value) => {
		setStudyStats((prev) => ({
			...prev,
			[type]: value,
			lastStudyDate: new Date().toISOString()
		}));
	};

	// Timer controls
	const start = () => setIsRunning(true);
	const pause = () => setIsRunning(false);
	const reset = () => {
		setIsRunning(false);
		setPhase('focus');
		setSecondsLeft(focusMinutes * 60);
	};

	useEffect(() => {
		if (!isRunning) return;
		// When user manually changes duration during running, keep phase consistent
		setSecondsLeft((prev) => (prev > 0 ? prev : (phase === 'focus' ? focusMinutes * 60 : breakMinutes * 60)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [focusMinutes, breakMinutes]);

	return (
		<div className="min-h-screen bg-black text-white">
			<SidebarNavbar />

			{/* Header */}
			<div className="pt-20 pb-8 border-b border-gray-800/60 bg-gradient-to-b from-black/80 to-transparent">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col gap-6">
						<div className="text-center lg:text-left">
							<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
								<span className="bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] bg-clip-text text-transparent animate-pulse">
									Student Resources
								</span>
							</h1>
							<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
								Your ultimate study companion with focus tools, learning resources, and productivity features
							</p>
						</div>

						<div className="flex flex-col lg:flex-row gap-4 lg:items-center">
							<div className="relative flex-1 max-w-2xl">
								<Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search resources, tutorials, courses..."
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									className="w-full bg-black/60 border border-gray-800/70 rounded-xl pl-12 pr-4 py-3 text-lg outline-none focus:border-[#FF3C5F] focus:ring-2 focus:ring-[#FF3C5F]/20 transition-all duration-300 backdrop-blur-sm"
								/>
							</div>
							<div className="flex flex-wrap gap-2 justify-center lg:justify-start">
								{[
									{ key: 'all', label: 'All', color: 'from-[#FF3C5F] to-[#FF7A30]' },
									{ key: 'ai', label: 'AI/ML', color: 'from-purple-500 to-pink-500' },
									{ key: 'cp', label: 'CP', color: 'from-blue-500 to-cyan-500' },
									{ key: 'web3', label: 'Web3', color: 'from-green-500 to-emerald-500' },
									{ key: 'security', label: 'Security', color: 'from-red-500 to-orange-500' },
									{ key: 'programming', label: 'C++', color: 'from-indigo-500 to-blue-500' },
									{ key: 'webdev', label: 'Web Dev', color: 'from-teal-500 to-cyan-500' },
								].map((tag) => (
									<button
										key={tag.key}
										onClick={() => toggleCategory(tag.key)}
										className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105 ${activeCategories.has(tag.key)
											? `bg-gradient-to-r ${tag.color} text-white border-transparent shadow-lg`
											: 'border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 bg-black/40 backdrop-blur-sm'
											}`}
									>
										{tag.label}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
				<div className="grid lg:grid-cols-1 gap-8 lg:gap-12">
					{/* Resource Index - FIRST */}
					<div className="bg-gradient-to-br from-black/80 to-gray-900/20 border border-gray-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
						<div className="flex items-center justify-between mb-6">
							<h2 className="font-bold text-2xl sm:text-3xl flex items-center gap-3">
								<BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3C5F] group-hover:scale-110 transition-transform" />
								Resource Index
							</h2>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
							{filteredResources.map((r) => {
								const Icon = r.icon;
								return (
									<a
										key={r.title}
										onClick={() => navigate(r.link)}
										className="group relative bg-gradient-to-br from-black/40 to-gray-900/20 border border-gray-800/70 rounded-2xl p-6 sm:p-8 hover:border-[#FF3C5F]/40 hover:bg-[#FF3C5F]/5 transition-all duration-500 hover:scale-105 backdrop-blur-sm cursor-pointer active:scale-95"
									>
										{/* Floating particles effect */}
										<div className="absolute inset-0 overflow-hidden rounded-2xl">
											<div className="absolute top-4 right-4 w-2 h-2 bg-[#FF3C5F]/30 rounded-full group-hover:animate-pulse"></div>
											<div className="absolute bottom-6 left-6 w-1 h-1 bg-[#FFC22D]/40 rounded-full group-hover:animate-ping"></div>
											<div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-[#FF7A30]/30 rounded-full group-hover:animate-bounce"></div>
										</div>

										{/* Border glow effect */}
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF3C5F]/20 via-[#FF7A30]/20 to-[#FFC22D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

										{/* Icon with enhanced styling */}
										<div className="relative mb-6">
											<div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-700">
												<Icon className="w-12 h-12 text-gray-400 group-hover:text-[#FF3C5F] transition-all duration-700 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,60,95,0.6)]" />
											</div>
											{/* Gradient underline */}
											<div className="h-0.5 bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
										</div>

										{/* Content */}
										<div className="relative">
											<h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
												{r.title}
											</h3>
											<p className="text-gray-400 mb-4 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">
												{r.description}
											</p>

											{/* Tags */}
											<div className="flex flex-wrap gap-2 mb-4">
												<span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-full text-xs text-gray-300 group-hover:border-[#FF3C5F]/50 transition-colors">
													{r.difficulty}
												</span>
												<span className="px-3 py-1 bg-black/40 border border-gray-700 rounded-full text-xs text-gray-300 group-hover:border-[#FFC22D]/50 transition-colors">
													{r.duration}
												</span>
											</div>

											{/* Action indicator */}
											<div className="flex items-center justify-between">
												<span className="text-xs text-gray-500 group-hover:text-[#FF3C5F] transition-colors duration-300">
													Click to explore
												</span>
												<ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
											</div>
										</div>

										{/* Corner indicator */}
										<div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-[#FF3C5F] to-[#FFC22D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

										{/* Top accent line */}
										<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF3C5F] via-[#FF7A30] to-[#FFC22D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
									</a>
								);
							})}
						</div>

						{/* Empty state */}
						{filteredResources.length === 0 && (
							<div className="text-center py-12">
								<BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
								<h3 className="text-xl font-semibold text-gray-400 mb-2">No resources found</h3>
								<p className="text-gray-500">Try adjusting your search or filter criteria</p>
							</div>
						)}
					</div>

					{/* YouTube/Coursera/Other Resources - SECOND */}
					<div className="bg-gradient-to-br from-black/80 to-gray-900/20 border border-gray-800/60 rounded-2xl backdrop-blur-sm shadow-xl overflow-hidden">
						{[
							{ key: 'youtube', label: 'YouTube', icon: Youtube, count: youtubeTutorials.length, color: 'text-red-500', data: youtubeTutorials },
							{ key: 'coursera', label: 'Coursera', icon: GraduationCap, count: courseraCourses.length, color: 'text-[#FF3C5F]', data: courseraCourses },
							{ key: 'other', label: 'Other', icon: ExternalLink, count: otherResources.length, color: 'text-[#FFC22D]', data: otherResources },
						].map((tab) => (
							<div key={tab.key} className="border-b border-gray-800/60 last:border-b-0">
								{/* Tab Header */}
								<button
									onClick={() => toggleTabExpansion(tab.key)}
									className="w-full px-6 py-6 flex items-center justify-between hover:bg-black/40 transition-all duration-300 group"
								>
									<div className="flex items-center gap-4">
										<div className={`p-3 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 group-hover:from-[#FF3C5F]/20 group-hover:to-[#FFC22D]/20 transition-all duration-300`}>
											<tab.icon className={`w-6 h-6 ${tab.color}`} />
										</div>
										<div className="text-left">
											<h3 className="font-bold text-xl group-hover:text-white transition-colors">{tab.label}</h3>
											<p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{tab.count} resources available</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<span className="px-3 py-1.5 bg-black/40 rounded-full border border-gray-700 text-sm font-medium">
											{tab.count}
										</span>
										<ChevronDown
											className={`w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-white ${expandedTabs.has(tab.key) ? 'rotate-180' : ''
												}`}
										/>
									</div>
								</button>

								{/* Tab Content */}
								{expandedTabs.has(tab.key) && (
									<div className="px-6 pb-6">
										{tab.key === 'youtube' && (
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												{tab.data.map((video, index) => (
													<a
														key={index}
														href={video.url}
														target="_blank"
														rel="noopener noreferrer"
														className="group bg-black/40 border border-gray-800/70 rounded-lg overflow-hidden hover:border-[#FF3C5F]/40 transition-colors"
													>
														<div className="relative">
															<img
																src={video.thumbnail}
																alt={video.title}
																className="w-full h-32 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
															/>
															<div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
															<div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
																{video.duration}
															</div>
														</div>
														<div className="p-3 sm:p-4">
															<h3 className="font-semibold text-sm mb-1 group-hover:text-[#FF3C5F] transition-colors line-clamp-2">
																{video.title}
															</h3>
															<p className="text-xs text-gray-400 mb-2">{video.channel}</p>
															<div className="flex items-center justify-between">
																<span className="text-xs px-2 py-0.5 bg-gray-800/50 rounded border border-gray-700">
																	{video.category}
																</span>
																<div className="flex items-center gap-1 text-xs text-[#FFC22D]">
																	<Star className="w-3 h-3 fill-current" />
																	{video.rating}
																</div>
															</div>
														</div>
													</a>
												))}
											</div>
										)}

										{tab.key === 'coursera' && (
											<div className="divide-y divide-gray-800/60">
												{tab.data.map((course, index) => (
													<a
														key={index}
														href={course.url}
														target="_blank"
														rel="noopener noreferrer"
														className="block py-4 hover:bg-black/70 transition-colors group"
													>
														<div className="flex items-start justify-between">
															<div className="flex-1 min-w-0">
																<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-2">
																	<h3 className="font-semibold text-sm sm:text-base group-hover:text-[#FF3C5F] transition-colors line-clamp-2">
																		{course.title}
																	</h3>
																	<div className="flex items-center gap-2 text-xs">
																		<span className="text-[#FFC22D] font-semibold">{course.price}</span>
																		<div className="flex items-center gap-1 text-[#FFC22D]">
																			<Star className="w-3 h-3 fill-current" />
																			{course.rating}
																		</div>
																	</div>
																</div>
																<p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-1">
																	{course.instructor} • {course.university}
																</p>
																<div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-400">
																	<span className="flex items-center gap-1">
																		<Clock className="w-3 h-3" />
																		{course.duration}
																	</span>
																	<span className="flex items-center gap-1">
																		<Users className="w-3 h-3" />
																		{course.enrolled}
																	</span>
																	<span className="px-2 py-0.5 rounded border border-gray-700">
																		{course.category}
																	</span>
																</div>
															</div>
															<ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white ml-2 sm:ml-3 flex-shrink-0" />
														</div>
													</a>
												))}
											</div>
										)}

										{tab.key === 'other' && (
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												{tab.data.map((resource, index) => (
													<a
														key={index}
														href={resource.url}
														target="_blank"
														rel="noopener noreferrer"
														className="group bg-black/40 border border-gray-800/70 rounded-lg p-3 sm:p-4 hover:border-[#FF3C5F]/40 transition-colors"
													>
														<div className="flex items-start justify-between mb-2">
															<h3 className="font-semibold text-sm sm:text-base group-hover:text-[#FF3C5F] transition-colors line-clamp-2">
																{resource.title}
															</h3>
															<div className="flex items-center gap-1 text-xs text-[#FFC22D] flex-shrink-0">
																<Star className="w-3 h-3 fill-current" />
																{resource.rating}
															</div>
														</div>
														<p className="text-xs sm:text-sm text-gray-400 mb-3 line-clamp-2">
															{resource.description}
														</p>
														<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
															<span className="text-xs px-2 py-0.5 bg-gray-800/50 rounded border border-gray-700 w-fit">
																{resource.category}
															</span>
															<div className="flex items-center gap-2 text-xs">
																<span className="text-gray-500">{resource.type}</span>
																<span className="text-[#FF3C5F] font-semibold">{resource.price}</span>
															</div>
														</div>
													</a>
												))}
											</div>
										)}
									</div>
								)}
							</div>
						))}
					</div>

					{/* Quick Links - THIRD */}
					<div className="bg-gradient-to-br from-black/80 to-gray-900/20 border border-gray-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
						<h2 className="font-bold text-2xl sm:text-3xl mb-6 flex items-center gap-3">
							<Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3C5F] group-hover:scale-110 transition-transform" />
							Quick Links
						</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
							{quickLaunch.map((q) => (
								<a
									key={q.label}
									href={q.href}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex flex-col items-center justify-center gap-3 bg-black/40 border border-gray-800/70 rounded-xl py-6 hover:border-[#FF3C5F]/40 hover:bg-[#FF3C5F]/5 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
								>
									<div className="p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg group-hover:from-[#FF3C5F]/20 group-hover:to-[#FFC22D]/20 transition-all duration-300">
										<q.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-300 group-hover:text-white transition-colors" />
									</div>
									<span className="text-sm font-medium text-gray-300 group-hover:text-white text-center">{q.label}</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>

			<LandingFooter />
		</div>
	);
};

export default ResourcesPage; 