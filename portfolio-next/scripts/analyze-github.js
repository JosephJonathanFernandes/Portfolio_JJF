#!/usr/bin/env node

/**
 * GitHub Portfolio Analyzer
 *
 * This script analyzes a GitHub profile and extracts portfolio data
 * for generating a professional developer portfolio website.
 *
 * Usage: node scripts/analyze-github.js <username>
 */

const https = require('https');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

class GitHubAnalyzer {
  constructor(username) {
    this.username = username;
    this.baseUrl = 'https://api.github.com';
  }

  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'User-Agent': 'GitHub-Portfolio-Analyzer/1.0',
          'Accept': 'application/vnd.github.v3+json'
        }
      };

      https.get(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode === 200) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            }
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  async getUserProfile() {
    console.log(`📊 Analyzing GitHub profile: ${this.username}`);
    const user = await this.makeRequest(`${this.baseUrl}/users/${this.username}`);
    console.log(`✅ Found user: ${user.name} (${user.bio})`);
    return user;
  }

  async getRepositories() {
    console.log('📂 Fetching repositories...');
    const repos = await this.makeRequest(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=50`);

    // Filter meaningful repositories
    const filteredRepos = repos.filter(repo =>
      !repo.archived &&
      !repo.disabled &&
      repo.size > 10 &&
      repo.description &&
      !repo.fork
    );

    console.log(`✅ Found ${filteredRepos.length} meaningful repositories`);
    return filteredRepos;
  }

  async analyzeRepository(repo) {
    console.log(`🔍 Analyzing: ${repo.name}`);

    try {
      // Get languages
      const languages = await this.makeRequest(`${this.baseUrl}/repos/${this.username}/${repo.name}/languages`);

      // Get README
      let readme = null;
      try {
        const readmeData = await this.makeRequest(`${this.baseUrl}/repos/${this.username}/${repo.name}/readme`);
        readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
      } catch (e) {
        console.log(`⚠️  No README found for ${repo.name}`);
      }

      // Analyze maturity
      const maturity = this.analyzeMaturity(repo, readme);

      // Extract tech stack
      const techStack = this.extractTechStack(languages, repo.topics || []);

      // Extract description
      const description = this.extractDescription(readme, repo.description);

      return {
        ...repo,
        languages,
        readme,
        maturity,
        techStack,
        description
      };
    } catch (e) {
      console.error(`❌ Error analyzing ${repo.name}:`, e.message);
      return null;
    }
  }

  analyzeMaturity(repo, readme) {
    let score = 0;

    // Size and complexity
    if (repo.size > 1000) score += 2;
    else if (repo.size > 100) score += 1;

    // Documentation
    if (readme && readme.length > 500) score += 2;
    else if (readme) score += 1;

    // Community engagement
    if (repo.stargazers_count > 5) score += 1;
    if (repo.forks_count > 2) score += 1;

    // Topics indicate seriousness
    if (repo.topics && repo.topics.length > 2) score += 1;

    // Activity (recent updates)
    const updated = new Date(repo.updated_at);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    if (updated > threeMonthsAgo) score += 1;

    if (score >= 6) return { level: 'advanced', score };
    if (score >= 3) return { level: 'intermediate', score };
    return { level: 'beginner', score };
  }

  extractTechStack(languages, topics) {
    const techStack = new Set();

    // Add primary languages (top 3 by bytes)
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    sortedLanguages.forEach(([lang]) => techStack.add(lang));

    // Map topics to technologies
    const topicMap = {
      'react': ['React', 'JavaScript', 'TypeScript'],
      'nextjs': ['Next.js', 'React', 'TypeScript'],
      'vue': ['Vue.js', 'JavaScript'],
      'angular': ['Angular', 'TypeScript'],
      'nodejs': ['Node.js', 'JavaScript'],
      'python': ['Python'],
      'django': ['Django', 'Python'],
      'flask': ['Flask', 'Python'],
      'fastapi': ['FastAPI', 'Python'],
      'tensorflow': ['TensorFlow', 'Python', 'Machine Learning'],
      'pytorch': ['PyTorch', 'Python', 'Machine Learning'],
      'machine-learning': ['Machine Learning', 'Python'],
      'deep-learning': ['Deep Learning', 'Neural Networks'],
      'nlp': ['NLP', 'Natural Language Processing'],
      'computer-vision': ['Computer Vision', 'OpenCV'],
      'mongodb': ['MongoDB', 'NoSQL'],
      'postgresql': ['PostgreSQL', 'SQL'],
      'mysql': ['MySQL', 'SQL'],
      'docker': ['Docker'],
      'kubernetes': ['Kubernetes'],
      'aws': ['AWS', 'Cloud'],
      'linux': ['Linux'],
      'embedded': ['Embedded Systems', 'C/C++'],
      'arduino': ['Arduino', 'IoT']
    };

    topics.forEach(topic => {
      const techs = topicMap[topic.toLowerCase()];
      if (techs) {
        techs.forEach(tech => techStack.add(tech));
      }
    });

    return Array.from(techStack);
  }

  extractDescription(readme, fallback) {
    if (!readme) return { short: fallback, long: fallback };

    // Extract key sections
    const sections = {
      problem: readme.match(/(?:#+\s*(?:Problem|Challenge|Motivation|Background)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0],
      solution: readme.match(/(?:#+\s*(?:Solution|Approach|Implementation|Architecture)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0],
      features: readme.match(/(?:#+\s*(?:Features|Functionality|Capabilities)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0],
      results: readme.match(/(?:#+\s*(?:Results|Outcomes|Achievements|Impact)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0]
    };

    // Generate descriptions
    let shortDesc = fallback;
    let longDesc = fallback;

    if (sections.problem || sections.solution) {
      const problem = sections.problem ? this.cleanMarkdown(sections.problem).substring(0, 100) : '';
      const solution = sections.solution ? this.cleanMarkdown(sections.solution).substring(0, 150) : '';
      longDesc = `${problem} ${solution}`.trim();
      shortDesc = longDesc.split('.')[0] + '.';
    }

    return { short: shortDesc, long: longDesc };
  }

  cleanMarkdown(text) {
    return text
      .replace(/^#+\s*/gm, '')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
  }

  extractSkills(repos) {
    const skills = {
      languages: new Set(),
      frameworks: new Set(),
      databases: new Set(),
      tools: new Set(),
      cloud: new Set()
    };

    repos.forEach(repo => {
      // Languages
      Object.keys(repo.languages || {}).forEach(lang => skills.languages.add(lang));

      // Frameworks and tools from tech stack
      repo.techStack.forEach(tech => {
        if (['React', 'Vue.js', 'Angular', 'Next.js'].includes(tech)) {
          skills.frameworks.add(tech);
        } else if (['Node.js', 'Express', 'FastAPI', 'Flask', 'Django'].includes(tech)) {
          skills.frameworks.add(tech);
        } else if (['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'].includes(tech)) {
          skills.databases.add(tech);
        } else if (['Docker', 'Kubernetes', 'Git', 'Linux'].includes(tech)) {
          skills.tools.add(tech);
        } else if (['AWS', 'Azure', 'Google Cloud'].includes(tech)) {
          skills.cloud.add(tech);
        }
      });
    });

    return {
      languages: Array.from(skills.languages),
      frameworks: Array.from(skills.frameworks),
      databases: Array.from(skills.databases),
      tools: Array.from(skills.tools),
      cloud: Array.from(skills.cloud)
    };
  }

  generateRecommendations(repos, user) {
    const recommendations = [];

    // README quality
    const reposWithoutReadme = repos.filter(r => !r.readme).length;
    if (reposWithoutReadme > 0) {
      recommendations.push(`${reposWithoutReadme} repositories lack detailed README files. Add comprehensive documentation including setup instructions, architecture overview, and usage examples.`);
    }

    // Project diversity
    const languages = new Set(repos.flatMap(r => Object.keys(r.languages || {})));
    if (languages.size < 3) {
      recommendations.push('Consider diversifying your tech stack. Currently focused on fewer programming languages. Explore new technologies to broaden your expertise.');
    }

    // Project maturity
    const advancedProjects = repos.filter(r => r.maturity.level === 'advanced').length;
    if (advancedProjects < 2) {
      recommendations.push('Focus on developing more complex, production-ready projects. Consider contributing to open-source or building scalable applications.');
    }

    // Documentation quality
    const reposWithPoorDocs = repos.filter(r => r.readme && r.readme.length < 300).length;
    if (reposWithPoorDocs > 0) {
      recommendations.push('Improve README quality in several repositories. Include architecture diagrams, API documentation, and deployment instructions.');
    }

    // Consistency
    const recentRepos = repos.filter(r => {
      const updated = new Date(r.updated_at);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return updated > sixMonthsAgo;
    });

    if (recentRepos.length < repos.length * 0.5) {
      recommendations.push('Maintain consistent development activity. Regular updates and new projects demonstrate ongoing learning and commitment.');
    }

    return recommendations;
  }

  async analyzePortfolio() {
    try {
      const user = await this.getUserProfile();
      const repos = await this.getRepositories();

      console.log('🔬 Analyzing repositories...');
      const analyzedRepos = [];

      for (const repo of repos.slice(0, 10)) { // Analyze top 10 repos
        const analyzed = await this.analyzeRepository(repo);
        if (analyzed) {
          analyzedRepos.push(analyzed);
        }
      }

      // Sort by maturity
      analyzedRepos.sort((a, b) => b.maturity.score - a.maturity.score);

      // Extract skills
      const skills = this.extractSkills(analyzedRepos);

      // Generate recommendations
      const recommendations = this.generateRecommendations(analyzedRepos, user);

      return {
        user,
        repositories: analyzedRepos,
        skills,
        recommendations
      };

    } catch (error) {
      console.error('❌ Analysis failed:', error.message);
      throw error;
    }
  }

  async saveToFile(data) {
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'github-analysis.json');
    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`💾 Analysis saved to: ${outputPath}`);
  }
}

// Main execution
async function main() {
  const username = process.argv[2];

  if (!username) {
    console.error('❌ Please provide a GitHub username:');
    console.error('   node scripts/analyze-github.js <username>');
    process.exit(1);
  }

  try {
    const analyzer = new GitHubAnalyzer(username);
    const results = await analyzer.analyzePortfolio();

    console.log('\n📈 ANALYSIS COMPLETE');
    console.log('==================');
    console.log(`👤 User: ${results.user.name} (${results.user.login})`);
    console.log(`📊 Repositories analyzed: ${results.repositories.length}`);
    console.log(`🛠️  Skills identified: ${Object.values(results.skills).flat().length}`);
    console.log(`💡 Recommendations: ${results.recommendations.length}`);

    console.log('\n🏆 TOP PROJECTS:');
    results.repositories.slice(0, 6).forEach((repo, i) => {
      console.log(`${i + 1}. ${repo.name} (${repo.maturity.level}) - ${repo.techStack.slice(0, 3).join(', ')}`);
    });

    console.log('\n🛠️  SKILLS BY CATEGORY:');
    Object.entries(results.skills).forEach(([category, skills]) => {
      if (skills.length > 0) {
        console.log(`${category}: ${skills.join(', ')}`);
      }
    });

    if (results.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      results.recommendations.forEach((rec, i) => {
        console.log(`${i + 1}. ${rec}`);
      });
    }

    // Save results
    await analyzer.saveToFile(results);
    console.log('\n✅ Analysis complete! Results saved to src/data/github-analysis.json');

  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = GitHubAnalyzer;
