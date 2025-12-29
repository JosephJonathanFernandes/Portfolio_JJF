// GitHub API client for portfolio data analysis
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  language: string;
  languages: Record<string, number>;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  archived: boolean;
  disabled: boolean;
  readme?: string;
  commits_count?: number;
  contributors_count?: number;
}

export interface GitHubUser {
  login: string;
  id: number;
  name: string;
  bio: string;
  location: string;
  email?: string;
  blog?: string;
  company?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export class GitHubAnalyzer {
  private baseUrl = 'https://api.github.com';
  private username: string;

  constructor(username: string) {
    this.username = username;
  }

  async getUserProfile(): Promise<GitHubUser> {
    const response = await fetch(`${this.baseUrl}/users/${this.username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.status}`);
    }
    return response.json();
  }

  async getRepositories(): Promise<GitHubRepo[]> {
    const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }
    const repos = await response.json();

    // Filter out archived, disabled, and very small repos
    return repos.filter((repo: GitHubRepo) =>
      !repo.archived &&
      !repo.disabled &&
      repo.size > 10 && // Filter out very small repos
      !repo.name.includes('fork') && // Avoid forks unless they're meaningful
      repo.description // Must have description
    );
  }

  async getRepositoryLanguages(repoName: string): Promise<Record<string, number>> {
    const response = await fetch(`${this.baseUrl}/repos/${this.username}/${repoName}/languages`);
    if (!response.ok) {
      return {};
    }
    return response.json();
  }

  async getRepositoryReadme(repoName: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.username}/${repoName}/readme`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      // Decode base64 content
      return atob(data.content.replace(/\n/g, ''));
    } catch {
      return null;
    }
  }

  async getRepositoryCommits(repoName: string): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.username}/${repoName}/commits?per_page=1`);
      if (!response.ok) {
        return 0;
      }
      const linkHeader = response.headers.get('link');
      if (linkHeader) {
        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
        return match ? parseInt(match[1]) : 1;
      }
      return 1;
    } catch {
      return 0;
    }
  }

  analyzeProjectMaturity(repo: GitHubRepo, readme: string | null, commitsCount: number): {
    maturity: 'beginner' | 'intermediate' | 'advanced';
    score: number;
  } {
    let score = 0;

    // Size and complexity
    if (repo.size > 1000) score += 2; // Large codebase
    else if (repo.size > 100) score += 1; // Medium codebase

    // Commit history
    if (commitsCount > 50) score += 2;
    else if (commitsCount > 20) score += 1;

    // Documentation
    if (readme && readme.length > 500) score += 2;
    else if (readme) score += 1;

    // Community engagement
    if (repo.stargazers_count > 10) score += 1;
    if (repo.forks_count > 5) score += 1;

    // Topics/tags indicate seriousness
    if (repo.topics.length > 3) score += 1;

    // Determine maturity level
    if (score >= 6) return { maturity: 'advanced', score };
    if (score >= 3) return { maturity: 'intermediate', score };
    return { maturity: 'beginner', score };
  }

  extractTechStack(languages: Record<string, number>, topics: string[]): string[] {
    const techStack: string[] = [];

    // Add primary languages
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    techStack.push(...sortedLanguages.map(([lang]) => lang));

    // Add frameworks and tools from topics
    const frameworkMap: Record<string, string[]> = {
      'react': ['React', 'Next.js', 'TypeScript'],
      'vue': ['Vue.js', 'Nuxt.js'],
      'angular': ['Angular', 'TypeScript'],
      'node': ['Node.js', 'Express', 'FastAPI'],
      'python': ['Python', 'Flask', 'Django', 'PyTorch'],
      'django': ['Django', 'Python'],
      'flask': ['Flask', 'Python'],
      'fastapi': ['FastAPI', 'Python'],
      'tensorflow': ['TensorFlow', 'Python'],
      'pytorch': ['PyTorch', 'Python'],
      'machine-learning': ['Machine Learning', 'AI'],
      'deep-learning': ['Deep Learning', 'Neural Networks'],
      'nlp': ['NLP', 'Natural Language Processing'],
      'computer-vision': ['Computer Vision', 'OpenCV'],
      'android': ['Android', 'Java', 'Kotlin'],
      'ios': ['iOS', 'Swift'],
      'flutter': ['Flutter', 'Dart'],
      'react-native': ['React Native', 'JavaScript'],
      'mongodb': ['MongoDB', 'NoSQL'],
      'postgresql': ['PostgreSQL', 'SQL'],
      'mysql': ['MySQL', 'SQL'],
      'sqlite': ['SQLite', 'SQL'],
      'docker': ['Docker', 'Containerization'],
      'kubernetes': ['Kubernetes', 'Orchestration'],
      'aws': ['AWS', 'Cloud'],
      'azure': ['Azure', 'Cloud'],
      'gcp': ['Google Cloud', 'Cloud'],
      'linux': ['Linux', 'Systems'],
      'embedded': ['Embedded Systems', 'C/C++'],
      'arduino': ['Arduino', 'IoT'],
      'raspberry-pi': ['Raspberry Pi', 'IoT'],
      'blockchain': ['Blockchain', 'Web3'],
      'ethereum': ['Ethereum', 'Smart Contracts'],
      'solidity': ['Solidity', 'Blockchain'],
      'web3': ['Web3', 'Blockchain'],
      'cybersecurity': ['Cybersecurity', 'Security'],
      'penetration-testing': ['Penetration Testing', 'Security'],
      'cryptography': ['Cryptography', 'Security']
    };

    topics.forEach(topic => {
      const frameworks = frameworkMap[topic.toLowerCase()];
      if (frameworks) {
        techStack.push(...frameworks);
      }
    });

    // Remove duplicates and return
    return [...new Set(techStack)];
  }

  extractProjectDescription(readme: string | null, repoDescription: string): {
    shortDescription: string;
    longDescription: string;
    problemStatement?: string;
    outcomes?: string[];
  } {
    const description = readme || repoDescription;

    if (!description) {
      return {
        shortDescription: repoDescription || 'No description available',
        longDescription: repoDescription || 'No description available'
      };
    }

    // Extract key sections from README
    const sections = {
      problem: description.match(/(?:#+\s*(?:Problem|Challenge|Motivation|Background)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0],
      solution: description.match(/(?:#+\s*(?:Solution|Approach|Implementation|Architecture)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0],
      features: description.match(/(?:#+\s*(?:Features|Functionality|Capabilities)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0],
      outcomes: description.match(/(?:#+\s*(?:Results|Outcomes|Achievements|Impact)[\s\S]*?)(?=#+\s|\n\n|$)/i)?.[0]
    };

    // Generate professional descriptions
    const shortDescription = this.generateShortDescription(description, repoDescription);
    const longDescription = this.generateLongDescription(sections);

    return {
      shortDescription,
      longDescription,
      problemStatement: sections.problem ? this.cleanMarkdown(sections.problem) : undefined,
      outcomes: sections.outcomes ? this.extractOutcomes(sections.outcomes) : undefined
    };
  }

  private generateShortDescription(content: string, fallback: string): string {
    // Try to find the first meaningful sentence or paragraph
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    if (sentences.length > 0) {
      return sentences[0].trim() + '.';
    }
    return fallback || 'Innovative software solution';
  }

  private generateLongDescription(sections: Record<string, string | undefined>): string {
    let description = '';

    if (sections.problem) {
      description += `Problem: ${this.cleanMarkdown(sections.problem).substring(0, 200)}... `;
    }

    if (sections.solution) {
      description += `Solution: ${this.cleanMarkdown(sections.solution).substring(0, 300)}... `;
    }

    if (sections.features) {
      description += `Key Features: ${this.cleanMarkdown(sections.features).substring(0, 200)}... `;
    }

    if (sections.outcomes) {
      description += `Outcomes: ${this.cleanMarkdown(sections.outcomes).substring(0, 200)}`;
    }

    return description || 'Comprehensive software solution with modern architecture and best practices.';
  }

  private cleanMarkdown(text: string): string {
    return text
      .replace(/^#+\s*/gm, '') // Remove headers
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .replace(/`([^`]+)`/g, '$1') // Remove inline code
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
  }

  private extractOutcomes(outcomesText: string): string[] {
    const cleaned = this.cleanMarkdown(outcomesText);
    const outcomes: string[] = [];

    // Split by bullet points, numbers, or key phrases
    const lines = cleaned.split(/[•\-\*\d+\.]/).filter(line => line.trim().length > 10);

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && outcomes.length < 5) {
        outcomes.push(trimmed);
      }
    });

    return outcomes;
  }

  async analyzePortfolio(): Promise<{
    user: GitHubUser;
    repositories: GitHubRepo[];
    skills: Record<string, any>;
    recommendations: string[];
  }> {
    try {
      const [user, repos] = await Promise.all([
        this.getUserProfile(),
        this.getRepositories()
      ]);

      // Analyze each repository
      const analyzedRepos = await Promise.all(
        repos.slice(0, 10).map(async (repo) => {
          const [languages, readme, commitsCount] = await Promise.all([
            this.getRepositoryLanguages(repo.name),
            this.getRepositoryReadme(repo.name),
            this.getRepositoryCommits(repo.name)
          ]);

          const maturity = this.analyzeProjectMaturity(repo, readme, commitsCount);
          const techStack = this.extractTechStack(languages, repo.topics);
          const description = this.extractProjectDescription(readme, repo.description || '');

          return {
            ...repo,
            languages,
            readme,
            commitsCount,
            maturity,
            techStack,
            description
          };
        })
      );

      // Sort by maturity and impact
      analyzedRepos.sort((a, b) => b.maturity.score - a.maturity.score);

      // Extract skills from all repositories
      const skills = this.extractSkillsFromRepos(analyzedRepos);

      // Generate recommendations
      const recommendations = this.generateRecommendations(analyzedRepos, user);

      return {
        user,
        repositories: analyzedRepos,
        skills,
        recommendations
      };
    } catch (error) {
      throw new Error(`Failed to analyze GitHub portfolio: ${error}`);
    }
  }

  private extractSkillsFromRepos(repos: any[]): Record<string, any> {
    const skills = {
      languages: new Set<string>(),
      frameworks: new Set<string>(),
      databases: new Set<string>(),
      tools: new Set<string>(),
      cloud: new Set<string>()
    };

    repos.forEach(repo => {
      // Languages from GitHub API
      Object.keys(repo.languages).forEach(lang => {
        skills.languages.add(lang);
      });

      // Frameworks and tools from tech stack analysis
      repo.techStack.forEach((tech: string) => {
        if (['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js'].includes(tech)) {
          skills.frameworks.add(tech);
        } else if (['Node.js', 'Express', 'FastAPI', 'Flask', 'Django'].includes(tech)) {
          skills.frameworks.add(tech);
        } else if (['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite'].includes(tech)) {
          skills.databases.add(tech);
        } else if (['Docker', 'Kubernetes', 'Git', 'Linux'].includes(tech)) {
          skills.tools.add(tech);
        } else if (['AWS', 'Azure', 'Google Cloud'].includes(tech)) {
          skills.cloud.add(tech);
        } else if (['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C'].includes(tech)) {
          skills.languages.add(tech);
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

  private generateRecommendations(repos: any[], user: GitHubUser): string[] {
    const recommendations: string[] = [];

    // Check for README quality
    const reposWithoutReadme = repos.filter(r => !r.readme).length;
    if (reposWithoutReadme > 0) {
      recommendations.push(`${reposWithoutReadme} repositories lack detailed README files. Add comprehensive documentation including setup instructions, architecture overview, and usage examples.`);
    }

    // Check for project diversity
    const languages = new Set(repos.flatMap(r => Object.keys(r.languages)));
    if (languages.size < 3) {
      recommendations.push('Consider diversifying your tech stack. Currently focused on fewer programming languages. Explore new technologies to broaden your expertise.');
    }

    // Check for project maturity
    const advancedProjects = repos.filter(r => r.maturity.maturity === 'advanced').length;
    if (advancedProjects < 2) {
      recommendations.push('Focus on developing more complex, production-ready projects. Consider contributing to open-source or building scalable applications.');
    }

    // Check for documentation
    const reposWithPoorDocs = repos.filter(r => r.readme && r.readme.length < 300).length;
    if (reposWithPoorDocs > 0) {
      recommendations.push('Improve README quality in several repositories. Include architecture diagrams, API documentation, and deployment instructions.');
    }

    // Check for consistency
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
}

// Export a function to run the analysis
export async function analyzeGitHubPortfolio(username: string) {
  const analyzer = new GitHubAnalyzer(username);
  return analyzer.analyzePortfolio();
}
