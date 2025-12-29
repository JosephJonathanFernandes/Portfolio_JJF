// Import auto-generated data from GitHub analysis
// To update: run "npm run analyze-github <username>" then "npm run populate-portfolio"
// This ensures all content is based on verifiable information from repositories

export {
  projects,
  skills,
  experience,
  achievements,
  type Project,
  type Skill,
  type Experience
} from './portfolio-generated';

// Enhanced personal info with additional verified contact details
export const personalInfo = {
  name: 'Joseph Jonathan Fernandes',
  title: 'Embedded-first Software Engineer',
  tagline: 'Currently learning Java, system design, Next.js, and deep learning. Building reliable software from embedded C to modern web platforms',
  email: 'josephfernandes273@gmail.com',
  github: 'https://github.com/JosephJonathanFernandes',
  linkedin: 'https://www.linkedin.com/in/joseph-jonathan-fernandes/',
  gitroll: 'https://gitroll.io/profile/u4C3j8q7Z5Dfo3CM3DGcEeo9A8Fn2',
  location: 'India',
  education: {
    degree: 'Computer Engineering (AI/ML Honors)',
    cgpa: '9.778',
    status: '2022-2026'
  }
};

// Manual additions for information not available from GitHub analysis
// These should be verified and kept minimal

// Additional experience (verified from resume)
export const additionalExperience = [
  {
    id: 'visteon',
    company: 'Visteon Corporation',
    role: 'Software Intern - Embedded Systems',
    duration: 'July 2024 – September 2024',
    description: 'Embedded systems testing and development focusing on AUTOSAR compliance and quality assurance.',
    technologies: ['C/C++', 'AUTOSAR', 'VectorCAST', 'MISRA-C']
  }
];

// Additional achievements (verified from resume)
export const additionalAchievements = [
  'HackAura Hackathon Winner (1st Place)',
  'Multiple hackathon victories and competitive programming success',
  'CodeChef Rating: 1025',
  'HackerRank: C, Python, SQL, Java badges certified',
  'State-level technical quiz co-organizer'
];
