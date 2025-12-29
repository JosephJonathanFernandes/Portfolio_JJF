#!/usr/bin/env node

/**
 * Portfolio Data Population Script
 *
 * This script reads the GitHub analysis results and populates the portfolio
 * data structure with verified information from repositories.
 *
 * Usage: node scripts/populate-portfolio.js
 */

const fs = require('fs');
const path = require('path');

function loadGitHubAnalysis() {
  try {
    const analysisPath = path.join(__dirname, '..', 'src', 'data', 'github-analysis.json');
    const data = fs.readFileSync(analysisPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading GitHub analysis:', error.message);
    console.log('💡 Run "npm run analyze-github <username>" first');
    process.exit(1);
  }
}

function generatePortfolioData(analysis) {
  const { repositories, skills } = analysis;

  // Convert GitHub analysis to portfolio format
  const projects = repositories.map(repo => ({
    id: repo.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description.short,
    longDescription: repo.description.long,
    techStack: repo.techStack,
    githubUrl: repo.html_url,
    demoUrl: extractDemoUrl(repo),
    category: inferCategory(repo.techStack),
    featured: repo.maturity.level === 'advanced',
    achievement: extractAchievement(repo)
  }));

  // Skills are already in the right format from the analysis
  const portfolioData = {
    projects,
    skills,
    personalInfo: {
      name: analysis.user.name || 'Joseph Fernandes',
      title: 'Software Developer',
      tagline: `Building software solutions with ${projects.length}+ public projects`,
      email: analysis.user.email || 'your.email@example.com',
      github: analysis.user.html_url || `https://github.com/${analysis.user.login}`,
      linkedin: undefined, // Not available from GitHub API
      gitroll: undefined, // Not available from GitHub API
      location: analysis.user.location || 'Location not specified',
      education: {
        degree: 'Computer Engineering',
        cgpa: undefined,
        status: 'Student'
      }
    },
    experience: [], // Not available from GitHub analysis
    achievements: [] // Not available from GitHub analysis
  };

  return portfolioData;
}

function extractDemoUrl(repo) {
  // Look for demo URLs in README or repository topics
  const readme = repo.readme || '';

  // Common patterns for demo URLs
  const patterns = [
    /https?:\/\/[^\s]+\.vercel\.app[^\s]*/i,
    /https?:\/\/[^\s]+\.netlify\.app[^\s]*/i,
    /https?:\/\/[^\s]+\.github\.io[^\s]*/i,
    /demo:\s*(https?:\/\/[^\s]+)/i,
    /live:\s*(https?:\/\/[^\s]+)/i
  ];

  for (const pattern of patterns) {
    const match = readme.match(pattern);
    if (match) {
      return match[1] || match[0];
    }
  }

  return undefined;
}

function inferCategory(techStack) {
  const categories = {
    'ai-ml': ['machine learning', 'tensorflow', 'pytorch', 'scikit-learn', 'nlp', 'computer vision', 'deep learning'],
    'web': ['react', 'vue', 'angular', 'next.js', 'html', 'css', 'javascript', 'typescript', 'flask', 'fastapi', 'django'],
    'embedded': ['c', 'c++', 'embedded', 'arduino', 'raspberry pi', 'iot', 'embedded c'],
    'security': ['security', 'cryptography', 'penetration testing', 'scanner', 'networking'],
    'automation': ['automation', 'scripting', 'bash', 'powershell']
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (techStack.some(tech =>
      keywords.some(keyword =>
        tech.toLowerCase().includes(keyword.toLowerCase())
      )
    )) {
      return category;
    }
  }

  return 'web'; // Default category
}

function extractAchievement(repo) {
  const readme = repo.readme || '';

  // Look for achievement indicators (only actual wins, not rankings like "top 7")
  const achievementPatterns = [
    /(?:winner|1st|first|champion)/i,
    /(?:hackathon|competition|contest)/i,
    /(?:award|prize|recognition)/i
  ];

  const hasAchievement = achievementPatterns.some(pattern => pattern.test(readme));
  if (hasAchievement) {
    // Extract the achievement text
    const lines = readme.split('\n');
    for (const line of lines.slice(0, 10)) { // Check first 10 lines
      if (achievementPatterns.some(pattern => pattern.test(line))) {
        return line.trim().replace(/^[*-\s]*/, '').replace(/[*-\s]*$/, '');
      }
    }
  }

  return undefined;
}

function savePortfolioData(data) {
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'portfolio-generated.ts');

  // Generate TypeScript code
  let code = '// Auto-generated portfolio data from GitHub analysis\n';
  code += '// Do not edit manually - run "npm run populate-portfolio" to update\n\n';

  // Add imports
  code += 'export interface Project {\n';
  code += '  id: string;\n';
  code += '  title: string;\n';
  code += '  description: string;\n';
  code += '  longDescription: string;\n';
  code += '  techStack: string[];\n';
  code += '  githubUrl: string;\n';
  code += '  demoUrl?: string;\n';
  code += '  category: \'ai-ml\' | \'web\' | \'embedded\' | \'security\' | \'automation\';\n';
  code += '  featured: boolean;\n';
  code += '  achievement?: string;\n';
  code += '}\n\n';

  code += 'export interface Skill {\n';
  code += '  name: string;\n';
  code += '  level: \'Expert\' | \'Proficient\' | \'Familiar\';\n';
  code += '  category: \'languages\' | \'frameworks\' | \'databases\' | \'tools\' | \'cloud\';\n';
  code += '  icon?: string;\n';
  code += '}\n\n';

  code += 'export interface Experience {\n';
  code += '  id: string;\n';
  code += '  company: string;\n';
  code += '  role: string;\n';
  code += '  duration: string;\n';
  code += '  description: string;\n';
  code += '  achievements: string[];\n';
  code += '  technologies: string[];\n';
  code += '}\n\n';

  // Convert skills object to array format
  const skillArray = [];
  if (data.skills.languages) {
    data.skills.languages.forEach(skill => {
      skillArray.push({ name: skill, level: 'Expert', category: 'languages' });
    });
  }
  if (data.skills.frameworks) {
    data.skills.frameworks.forEach(skill => {
      skillArray.push({ name: skill, level: 'Proficient', category: 'frameworks' });
    });
  }
  if (data.skills.databases) {
    data.skills.databases.forEach(skill => {
      skillArray.push({ name: skill, level: 'Proficient', category: 'databases' });
    });
  }
  if (data.skills.tools) {
    data.skills.tools.forEach(skill => {
      skillArray.push({ name: skill, level: 'Expert', category: 'tools' });
    });
  }
  if (data.skills.cloud) {
    data.skills.cloud.forEach(skill => {
      skillArray.push({ name: skill, level: 'Familiar', category: 'cloud' });
    });
  }

  // Add data
  code += `export const projects: Project[] = ${JSON.stringify(data.projects, null, 2)};\n\n`;
  code += `export const skills: Skill[] = ${JSON.stringify(skillArray, null, 2)};\n\n`;

  code += `export const experience: Experience[] = [];\n\n`;

  code += `export const personalInfo = ${JSON.stringify(data.personalInfo, null, 2)};\n\n`;

  code += `export const achievements: string[] = [];\n`;

  fs.writeFileSync(outputPath, code);
  console.log(`💾 Portfolio data saved to: ${outputPath}`);
}

function main() {
  console.log('📊 Populating portfolio data from GitHub analysis...\n');

  const analysis = loadGitHubAnalysis();
  const portfolioData = generatePortfolioData(analysis);

  console.log(`✅ Found ${portfolioData.projects.length} projects`);
  console.log(`🛠️  Identified ${portfolioData.skills.length} skills`);
  console.log(`👤 User: ${portfolioData.personalInfo.name}`);

  console.log('\n🏆 Featured Projects:');
  portfolioData.projects
    .filter(p => p.featured)
    .slice(0, 6)
    .forEach((project, i) => {
      console.log(`${i + 1}. ${project.title} (${project.category})`);
      console.log(`   Tech: ${project.techStack.slice(0, 4).join(', ')}`);
      if (project.achievement) {
        console.log(`   🏆 ${project.achievement}`);
      }
      console.log('');
    });

  savePortfolioData(portfolioData);
  console.log('\n✅ Portfolio data populated successfully!');
  console.log('💡 Update src/data/portfolio.ts to import from portfolio-generated.ts for auto-generated content');
}

if (require.main === module) {
  main();
}

module.exports = { generatePortfolioData, extractDemoUrl, inferCategory };
