// Auto-generated portfolio data from GitHub analysis
// Do not edit manually - run "npm run populate-portfolio" to update

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  category: 'ai-ml' | 'web' | 'embedded' | 'security' | 'automation';
  featured: boolean;
  achievement?: string;
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Proficient' | 'Familiar';
  category: 'languages' | 'frameworks' | 'databases' | 'tools' | 'cloud';
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const projects: Project[] = [
  {
    "id": "astrodesk",
    "title": "Astrodesk",
    "description": "Space exploration platform with real-time NASA API integration and multi-agent AI.",
    "longDescription": "A comprehensive space exploration platform that integrates real-time NASA APIs with multi-agent AI systems for enhanced astronomical data analysis and storytelling. Features Real-time NEO (Near Earth Objects) tracking Multi-agent AI story generation 3D planetary visualization ISS tracking with live data AI chatbot with streaming responses Architecture Flask backend with async capabilities Groq LLM integration for AI features Skyfield for astronomical calculations Multiple NASA API integrations Tech Stack Python, Flask, AsyncIO Groq AI, Multi-agent systems Skyfield, NASA APIs Modern web technologies",
    "techStack": [
      "Python",
      "Flask",
      "Groq LLM",
      "Skyfield",
      "NASA APIs",
      "Multi-agent AI"
    ],
    "githubUrl": "https://github.com/JosephJonathanFernandes/astrodesk",
    "category": "web",
    "featured": true
  },
  {
    "id": "ecosort-ai",
    "title": "EcoSort AI",
    "description": "AI-powered waste segregation with gamification and eco-points system.",
    "longDescription": "Problem Statement Traditional waste management systems lack intelligent sorting capabilities, leading to inefficient recycling processes and environmental impact. Solution EcoSort-AI uses computer vision and machine learning to automatically classify waste into 6 categories with high accuracy, providing eco-harm scores and disposal recommendations. Key Features 6-category waste classification Real-time image processing Eco-harm scoring system Gamified recycling with eco-points User engagement analytics Technical Implementation PyTorch-based computer vision models Flask web application Responsive HTML/CSS interface Model deployment and inference optimization",
    "techStack": [
      "Python",
      "Flask",
      "PyTorch",
      "Computer Vision",
      "HTML",
      "CSS"
    ],
    "githubUrl": "https://github.com/JosephJonathanFernandes/EcoSort-AI",
    "category": "ai-ml",
    "featured": true
  },
  {
    "id": "crowdsense",
    "title": "CrowdSense - HackAura Hackathon Winner",
    "description": "Real-time disaster detection system using social media analysis and NLP.",
    "longDescription": "HackAura Hackathon Winner (1st Place) Challenge Disaster response teams need real-time situational awareness from social media during crises, but current systems lack sophisticated analysis capabilities. Approach CrowdSense implements advanced NLP and anomaly detection algorithms to analyze social media streams for disaster-related information. Capabilities Real-time tweet analysis with streaming APIs Anomaly detection using Z-score and EWMA algorithms Named Entity Recognition for location extraction Interactive map visualization with Leaflet Automated SMS alerts via Twilio integration Architecture Python/Flask backend with async processing spaCy for advanced NLP tasks SQLite for efficient data storage Twilio API for SMS notifications",
    "techStack": [
      "Python",
      "Flask",
      "spaCy",
      "Twilio",
      "SQLite",
      "Leaflet",
      "NLP"
    ],
    "githubUrl": "https://github.com/JosephJonathanFernandes/CrowdSense",
    "category": "ai-ml",
    "featured": false,
    "achievement": "## HackAura Hackathon Winner (1st Place)"
  },
  {
    "id": "advanced-port-scanner",
    "title": "Advanced Port Scanner",
    "description": "Multi-threaded network security scanner with comprehensive vulnerability assessment.",
    "longDescription": "Purpose A comprehensive network security tool for penetration testing and network analysis with advanced scanning capabilities. Features Multi-threaded scanning for improved performance CIDR notation support for subnet scanning Banner grabbing and service detection Vulnerability assessment algorithms Export functionality for reports GUI interface with matplotlib visualizations Technical Details Socket programming with timeout handling Threading for concurrent operations Tkinter GUI with responsive design Matplotlib for result visualization Comprehensive error handling and logging",
    "techStack": [
      "Python",
      "Tkinter",
      "Matplotlib",
      "Socket Programming",
      "Threading",
      "Cybersecurity"
    ],
    "githubUrl": "https://github.com/JosephJonathanFernandes/advanced-port-scanner",
    "category": "security",
    "featured": false
  },
  {
    "id": "hackindia-spark-3-2025-wizcoders",
    "title": "HackIndia Spark 3 2025 WizCoders",
    "description": "Knowledge graph-based task scheduling system with dependency management.",
    "longDescription": "HackIndia Spark 3 Winner Top 7 out of 80+ teams in Goa region. Problem Traditional task scheduling systems lack intelligent dependency management and reasoning capabilities. Innovation TaskExpert uses knowledge graphs and advanced reasoning to create intelligent task scheduling with automatic dependency resolution. Core Features Graph-based task representation Automatic dependency detection Intelligent scheduling algorithms Reasoning engine for complex scenarios Interactive visualization Technology Stack Python with MeTTa programming Hyperon framework for reasoning AtomSpace for knowledge representation Modern web interface",
    "techStack": [
      "Python",
      "MeTTa",
      "Hyperon",
      "AtomSpace",
      "Knowledge Graphs"
    ],
    "githubUrl": "https://github.com/JosephJonathanFernandes/HackIndia-Spark-3-2025-WizCoders",
    "category": "embedded",
    "featured": false,
    "achievement": "## HackIndia Spark 3 Winner"
  }
];

export const skills: Skill[] = [
  {
    "name": "TypeScript",
    "level": "Expert",
    "category": "languages"
  },
  {
    "name": "Python",
    "level": "Expert",
    "category": "languages"
  },
  {
    "name": "JavaScript",
    "level": "Expert",
    "category": "languages"
  },
  {
    "name": "C",
    "level": "Expert",
    "category": "languages"
  },
  {
    "name": "C++",
    "level": "Expert",
    "category": "languages"
  },
  {
    "name": "Embedded C",
    "level": "Expert",
    "category": "languages"
  },
  {
    "name": "React",
    "level": "Proficient",
    "category": "frameworks"
  },
  {
    "name": "Next.js",
    "level": "Proficient",
    "category": "frameworks"
  },
  {
    "name": "FastAPI",
    "level": "Proficient",
    "category": "frameworks"
  },
  {
    "name": "Flask",
    "level": "Proficient",
    "category": "frameworks"
  },
  {
    "name": "PyTorch",
    "level": "Proficient",
    "category": "frameworks"
  },
  {
    "name": "Machine Learning",
    "level": "Proficient",
    "category": "frameworks"
  },
  {
    "name": "SQLite",
    "level": "Proficient",
    "category": "databases"
  },
  {
    "name": "Git",
    "level": "Expert",
    "category": "tools"
  },
  {
    "name": "Linux",
    "level": "Expert",
    "category": "tools"
  }
];

export const experience: Experience[] = [];

export const personalInfo = {
  "name": "Joseph Jonathan Fernandes",
  "title": "Software Developer",
  "tagline": "Building software solutions with 6+ public projects",
  "email": "josephfernandes273@gmail.com",
  "github": "https://github.com/JosephJonathanFernandes",
  "location": "India",
  "education": {
    "degree": "Computer Engineering",
    "status": "Student"
  }
};

export const achievements: string[] = [];
