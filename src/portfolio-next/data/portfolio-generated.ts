// Portfolio data — all content verified against user-provided ground truth
// Last verified: 2026-08-06

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  category: 'ai-ml' | 'web' | 'embedded' | 'security' | 'automation' | 'systems';
  featured: boolean;
  achievement?: string;
  role?: string;
  teamSize?: number;
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Proficient' | 'Familiar';
  category: 'languages' | 'frameworks' | 'ml' | 'databases' | 'tools';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  note?: string;
}

export const projects: Project[] = [
  {
    id: 'vaksetu',
    title: 'Vaksetu',
    description: 'Real-time ISL recognition — 98.33% accuracy, 60+ FPS, 93K+ gesture sequences. Final year project.',
    longDescription:
      'Real-time Indian Sign Language recognition system (also listed as "ISL Sign-to-Text System" on resume). BiGRU + Spatial Graph Neural Network architecture trained on 93,000+ gesture sequences across 300 sign classes using MediaPipe skeletal landmarks. Achieves 98.33% classification accuracy and 97.84% macro F1-score. Model compressed from 4.2 MB to 1.05 MB via INT8 ONNX quantization, running at 60+ FPS CPU inference (~6.22 ms/frame). HDF5 migration delivered 391x faster dataset loading and 5.4x faster training epochs. Served over FastAPI with WebSocket streaming.',
    techStack: ['Python', 'PyTorch', 'MediaPipe', 'ONNX Runtime', 'FastAPI', 'WebSockets', 'HDF5'],
    githubUrl: 'https://github.com/JosephJonathanFernandes',
    category: 'ai-ml',
    featured: true,
    role: 'Lead Developer',
  },
  {
    id: 'cmdbridge',
    title: 'CmdBridge',
    description: 'Cross-platform natural-language terminal assistant in C. Maps NL intent to native OS APIs — no raw shell execution.',
    longDescription:
      'Cross-platform terminal assistant that maps natural-language user intent to native OS APIs instead of executing raw shell commands, eliminating a class of command-injection vulnerabilities. Features secure intent parsing with explain-before-execute validation. 94% automated test coverage across 211 unit and integration tests using AddressSanitizer, UndefinedBehaviorSanitizer, and CI. Supports Windows, Linux, and macOS.',
    techStack: ['C', 'CMake', 'AddressSanitizer', 'UndefinedBehaviorSanitizer', 'CI'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/CmdBridge',
    category: 'systems',
    featured: true,
    role: 'Solo',
  },
  {
    id: 'crowdsense',
    title: 'CrowdSense',
    description: 'Real-time disaster detection via social media NLP. Most-starred original repo.',
    longDescription:
      'Disaster response teams need real-time situational awareness from social media during crises. CrowdSense applies NLP and anomaly detection — Z-score and EWMA algorithms — to live social streams, extracts locations via Named Entity Recognition, maps incidents with Leaflet, and dispatches SMS alerts via Twilio. Backend-focused in a team of 4.',
    techStack: ['Python', 'Flask', 'spaCy', 'Twilio', 'SQLite', 'Leaflet', 'NLP'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/CrowdSense',
    category: 'ai-ml',
    featured: true,
    role: 'Full-stack, backend-focused',
    teamSize: 4,
  },
  {
    id: 'collatz-analyzer',
    title: 'Collatz Sequence Analyzer',
    description: '21-module multithreaded C++ research platform — 3.3x speedup, R2 up to 0.999995 across 50M integers.',
    longDescription:
      'A 21-module multithreaded C++ research platform analyzing the Collatz conjecture across 50 million integers. Multithreading and path caching deliver a 3.3x speedup (11.7s -> 3.6s). Includes a reproducible benchmarking and regression pipeline with R-squared fit up to 0.999995 via statistical modeling in R. Full CMake build system.',
    techStack: ['C++', 'CMake', 'Multithreading', 'R', 'Statistical Modeling'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/collatz-sequence-analyzer',
    category: 'systems',
    featured: true,
    role: 'Solo',
  },
  {
    id: 'exoscope',
    title: 'Exoscope',
    description: 'NASA Space Apps Challenge (state-level) — AI exoplanet analysis with RAG chatbot.',
    longDescription:
      'State-level entry for NASA Space Apps Challenge. An AI platform for exoplanet detection with a Retrieval-Augmented Generation (RAG) chatbot for natural-language interaction with astronomical data. Responsible for backend architecture and RAG integration in a team of 4.',
    techStack: ['React', 'TypeScript', 'FastAPI', 'Groq API', 'RAG', 'Machine Learning'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/Nasa-Space-Hackathon-WizCoders-frontend',
    category: 'ai-ml',
    featured: false,
    achievement: 'NASA Space Apps — State-level entry',
    role: 'Backend + RAG integration',
    teamSize: 4,
  },
  {
    id: 'astrodesk',
    title: 'AstroDesk',
    description: 'Space exploration platform with live NASA APIs and multi-agent AI. Coders Club Hackathon 2025.',
    longDescription:
      'Built for Coders Club Hackathon 2025. Integrates live NASA APIs with a multi-agent AI system for astronomical data analysis: NEO tracking, ISS telemetry, AI story generation, and a streaming chatbot backed by Groq. Core full-stack contributor in a team of 4.',
    techStack: ['Python', 'Flask', 'Groq LLM', 'Skyfield', 'NASA APIs', 'Multi-agent AI'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/astrodesk',
    category: 'ai-ml',
    featured: false,
    achievement: 'Coders Club Hackathon 2025',
    role: 'Core full-stack',
    teamSize: 4,
  },
  {
    id: 'hackindia-spark-3',
    title: 'TaskExpert',
    description: 'Knowledge graph task scheduler with MeTTa-based reasoning. HackIndia Spark 3 2025 — top 7 of 80+ teams.',
    longDescription:
      'Built for HackIndia Spark 3 2025, finishing top 7 of 80+ teams in the Goa region. Uses knowledge graphs and MeTTa-based reasoning (Hyperon, AtomSpace) for intelligent task scheduling with automatic dependency resolution. MeTTa developer in a team of 4.',
    techStack: ['Python', 'MeTTa', 'Hyperon', 'AtomSpace', 'Knowledge Graphs'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/HackIndia-Spark-3-2025-WizCoders',
    category: 'ai-ml',
    featured: false,
    achievement: 'HackIndia Spark 3 2025 — Top 7 of 80+ teams',
    role: 'MeTTa developer',
    teamSize: 4,
  },
  {
    id: 'ecosort-ai',
    title: 'EcoSort AI',
    description: 'Computer vision waste classifier with gamified eco-points. Global AI Buildathon.',
    longDescription:
      'Built for the Global AI Buildathon. Classifies waste into 6 categories using PyTorch computer vision with real-time image processing, an eco-harm scoring system, and gamified recycling points. Core full-stack contributor in a team of 4.',
    techStack: ['Python', 'Flask', 'PyTorch', 'Computer Vision', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/EcoSort-AI',
    category: 'ai-ml',
    featured: false,
    achievement: 'Global AI Buildathon',
    role: 'Core full-stack',
    teamSize: 4,
  },
  {
    id: 'advanced-port-scanner',
    title: 'Advanced Port Scanner',
    description: 'Multi-threaded network security scanner with vulnerability assessment and GUI. Solo.',
    longDescription:
      'A network security tool for penetration testing. Multi-threaded scanning, CIDR subnet support, banner grabbing, service detection, vulnerability assessment, and a Tkinter GUI with matplotlib visualizations. Written solo.',
    techStack: ['Python', 'Tkinter', 'Matplotlib', 'Socket Programming', 'Threading'],
    githubUrl: 'https://github.com/JosephJonathanFernandes/advanced-port-scanner',
    category: 'security',
    featured: false,
    role: 'Solo',
  },
];

export const skills: Skill[] = [
  // Languages
  { name: 'C', level: 'Expert', category: 'languages' },
  { name: 'C++', level: 'Expert', category: 'languages' },
  { name: 'Python', level: 'Expert', category: 'languages' },
  { name: 'Java', level: 'Familiar', category: 'languages' },
  { name: 'JavaScript', level: 'Familiar', category: 'languages' },
  { name: 'TypeScript', level: 'Familiar', category: 'languages' },
  { name: 'SQL', level: 'Proficient', category: 'languages' },
  { name: 'Dart', level: 'Familiar', category: 'languages' },
  { name: 'R', level: 'Familiar', category: 'languages' },
  // Frameworks
  { name: 'FastAPI', level: 'Proficient', category: 'frameworks' },
  { name: 'Flask', level: 'Proficient', category: 'frameworks' },
  { name: 'React', level: 'Familiar', category: 'frameworks' },
  { name: 'Bootstrap', level: 'Familiar', category: 'frameworks' },
  { name: 'Tailwind CSS', level: 'Familiar', category: 'frameworks' },
  { name: 'Streamlit', level: 'Familiar', category: 'frameworks' },
  // ML & AI
  { name: 'PyTorch', level: 'Proficient', category: 'ml' },
  { name: 'ONNX Runtime', level: 'Proficient', category: 'ml' },
  { name: 'MediaPipe', level: 'Proficient', category: 'ml' },
  { name: 'spaCy', level: 'Proficient', category: 'ml' },
  { name: 'scikit-learn', level: 'Familiar', category: 'ml' },
  // Databases
  { name: 'MySQL', level: 'Proficient', category: 'databases' },
  { name: 'SQLite', level: 'Proficient', category: 'databases' },
  { name: 'HDF5', level: 'Familiar', category: 'databases' },
  // Tools & Concepts
  { name: 'Git', level: 'Expert', category: 'tools' },
  { name: 'Linux', level: 'Expert', category: 'tools' },
  { name: 'CMake', level: 'Proficient', category: 'tools' },
  { name: 'VectorCAST', level: 'Proficient', category: 'tools' },
  { name: 'Klocwork', level: 'Proficient', category: 'tools' },
  { name: 'pytest', level: 'Proficient', category: 'tools' },
  { name: 'AUTOSAR', level: 'Proficient', category: 'tools' },
  { name: 'MISRA-C / CERT-C', level: 'Proficient', category: 'tools' },
];

export const experience: Experience[] = [
  {
    id: 'visteon',
    company: 'Visteon Technical & Services Centre Pvt. Ltd.',
    role: 'Software Engineering Intern — Embedded Systems',
    duration: 'July 2025 – September 2025',
    location: 'Pune, India',
    description:
      'Joined a 7-person embedded team working on production ECU modules for automotive systems. Work focused on AUTOSAR compliance, static analysis, and test coverage across production-grade C/C++ code.',
    achievements: [
      '100% branch, statement, and function coverage across 14 AUTOSAR modules using VectorCAST',
      'Analyzed 100K+ MISRA-C / CERT-C / static warnings with a 99%+ deviation approval rate',
      'Proposed fixes for ~5% of Klocwork warnings flagged for the next production release',
      'Wrote Python scripts to automate Excel-based warning analysis workflows',
      'Created internal documentation and Teams resources adopted by the broader team',
    ],
    technologies: ['C', 'C++', 'AUTOSAR', 'MISRA-C', 'CERT-C', 'VectorCAST', 'Klocwork', 'Python', 'GitLab', 'JIRA', 'WSL2'],
    note: 'Pre-Placement Offer (SDE) accepted.',
  },
];

export const achievements: string[] = [
  'HackAura 2025 — 1st place, national-level hackathon (30 teams)',
  'Infofest 2025 — 1st place, Goa University',
  'HackIndia Spark 3 2025 — Top 7 of 80+ teams (Goa)',
  'GATE qualified — CSE (2025) and DA (2026)',
  'NPTEL — 47 courses at top recognition tiers: Domain Scholar (Programming & Data Science), Star, Megastar, Evangelist',
  'Technix Quiz — co-organized state-level technical quiz (2023, 2025)',
  'CodeChef rating 1025 · HackerRank badges in C, Python, SQL, Java',
];
