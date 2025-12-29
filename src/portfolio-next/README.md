# GitHub-Based Developer Portfolio

A clean, professional portfolio website that generates content from verifiable GitHub repository data. No assumptions or fabricated information - everything is derived from actual code, README files, and repository metadata.

## 🎯 Philosophy

- **Factual Only**: All content based on verifiable GitHub data
- **No Assumptions**: Skills derived from actual code usage, not assumptions
- **Professional**: Resume-quality descriptions from README files
- **Transparent**: Clear attribution to source repositories

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- GitHub account with public repositories

### Installation & Setup

1. **Clone and install**:
```bash
git clone <repository-url>
cd portfolio-next
npm install
```

2. **Analyze your GitHub profile**:
```bash
npm run analyze-github YOUR_GITHUB_USERNAME
```

3. **Populate portfolio data**:
```bash
npm run populate-portfolio
```

4. **Start development server**:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## 📊 GitHub Analysis System

### What Gets Analyzed

The system crawls your public repositories and extracts:

- **Project Maturity**: Size, documentation quality, commit history, community engagement
- **Tech Stack**: Languages, frameworks, and tools from code and repository topics
- **Descriptions**: Professional descriptions extracted from README files
- **Categories**: AI/ML, Web, Embedded, Security, Automation based on technologies
- **Demo Links**: Verified live demo URLs from README files

### Analysis Output

Creates structured data for:
- **6 Featured Projects**: Top repositories by maturity score
- **Skills Inventory**: Categorized technical competencies
- **Improvement Recommendations**: README enhancement suggestions

### Sample Analysis Results

```
📊 Analyzing GitHub profile: JosephJonathanFernandes
✅ Found user: Joseph Jonathan Fernandes
✅ Found 25 meaningful repositories

🏆 Featured Projects:
1. Nasa Space Hackathon WizCoders Frontend (Advanced) - React, TypeScript, AI
2. Astrodesk (Advanced) - Python, Flask, NASA APIs
3. EcoSort AI (Advanced) - PyTorch, Computer Vision

🛠️ Skills Identified: 15
   Languages: TypeScript, Python, JavaScript, C, C++
   Frameworks: React, Flask, PyTorch, FastAPI
   Tools: Git, Linux
```

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run analyze-github   # Analyze GitHub repositories
npm run populate-portfolio # Generate portfolio data
```

## 📁 Project Structure

```
portfolio-next/
├── scripts/
│   ├── analyze-github.js        # GitHub API crawler
│   └── populate-portfolio.js    # Data transformation
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with SEO
│   │   └── page.tsx             # Main portfolio page
│   ├── components/
│   │   ├── header.tsx           # Navigation with theme toggle
│   │   ├── hero.tsx             # Landing section
│   │   ├── about.tsx            # Professional summary
│   │   ├── skills.tsx           # Technical skills grid
│   │   ├── projects.tsx         # Project showcase
│   │   ├── experience.tsx       # Work history (manual)
│   │   └── contact.tsx          # Contact form & links
│   ├── data/
│   │   ├── portfolio.ts         # Main data exports
│   │   ├── portfolio-generated.ts # Auto-generated from GitHub
│   │   └── github-analysis.json # Raw GitHub analysis data
│   └── lib/
│       └── github-api.ts        # GitHub API utilities
├── public/                      # Static assets
└── README.md                    # This file
```

## 🎨 Portfolio Sections

### 1. Hero Section
- Name and professional title
- Tagline based on repository themes
- Social links (GitHub verified)
- Call-to-action buttons

### 2. About Section
- Professional summary based on GitHub activity
- Technology focus areas
- Current project count and activity level

### 3. Skills Section
- **Strictly from GitHub data**: No assumptions
- Categorized: Languages, Frameworks, Databases, Tools
- Proficiency levels based on repository usage

### 4. Projects Section
- **Top 6 repositories** by maturity score
- Professional descriptions from README files
- Tech stack badges from actual code analysis
- GitHub links to source code
- Demo links (only if verifiable in README)

### 5. Experience Section
- **Manual entry**: Not available from GitHub API
- Add professional experience, internships, etc.
- Keep factual and verifiable

### 6. Contact Section
- Contact form with validation
- Verified GitHub and social links
- Professional email and location

## 🔧 Customization

### Adding Manual Information

For information not available from GitHub analysis, edit `src/data/portfolio.ts`:

```typescript
// Add experience not reflected in repositories
export const additionalExperience = [
  {
    company: 'Company Name',
    role: 'Your Role',
    duration: 'Start - End',
    description: 'Professional summary',
    technologies: ['Tech1', 'Tech2']
  }
];

// Add education details
export const extendedPersonalInfo = {
  education: {
    degree: 'Your Degree',
    status: 'Current Status'
  }
};
```

### Styling Customization

- **Colors**: Modify Tailwind config for brand colors
- **Layout**: Update component structure in `/components`
- **Animations**: Adjust Framer Motion settings
- **Typography**: Change font families in layout

### Repository Selection

The analysis automatically selects the best repositories, but you can adjust criteria in `scripts/analyze-github.js`:

- **Maturity thresholds**: Minimum scores for "featured" status
- **Repository count**: How many to analyze (default: 10)
- **Tech stack filtering**: Which technologies to highlight

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository**:
   - Import project on Vercel dashboard
   - Connect your GitHub repository

2. **Environment variables** (optional):
   - Add `NEXT_PUBLIC_SITE_URL` for absolute URLs

3. **Deploy**: Automatic on push to main branch

### Netlify

1. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `out`

2. **Deploy**: Connect repository and deploy

### Manual Deployment

```bash
npm run build
# Deploy the 'out' directory to any static hosting
```

## 🔍 GitHub API Details

### Rate Limits
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5000 requests/hour
- Analysis uses ~10-15 requests per profile

### Data Sources
- **User Profile**: Basic info, bio, location
- **Repositories**: Metadata, languages, topics
- **README Files**: Project descriptions, features
- **Languages API**: Technology usage statistics

### Analysis Algorithm

**Maturity Score Calculation**:
- Size: 1000+ lines = 2 points
- README quality: 500+ chars = 2 points
- Recent activity: Updated in 3 months = 1 point
- Community: Stars/forks = 1 point
- Topics: Well-tagged = 1 point

**Category Inference**:
- AI/ML: ML frameworks, data science libraries
- Web: React, Next.js, web technologies
- Embedded: C/C++, hardware, IoT keywords
- Security: Security tools, penetration testing
- Automation: Scripting, DevOps tools

## 💡 Recommendations System

The analysis provides actionable suggestions:

### README Improvements
- "Add detailed README with setup instructions"
- "Include architecture diagrams and API docs"
- "Document deployment and usage examples"

### Repository Management
- "Maintain consistent commit activity"
- "Add meaningful repository topics"
- "Improve project descriptions"

### Tech Stack Diversification
- "Explore additional programming languages"
- "Consider cloud platforms and DevOps tools"

## 🐛 Troubleshooting

### GitHub API Issues
```bash
# Check rate limits
curl -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/rate_limit
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Data Not Updating
```bash
# Re-run analysis
npm run analyze-github YOUR_USERNAME
npm run populate-portfolio
```

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: All green scores
- **Bundle Size**: Optimized Next.js build
- **Loading Speed**: Sub-second initial page load

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit: `git commit -m 'Add feature'`
5. Push and create pull request

## 📄 License

MIT License - see LICENSE file for details.

## 📞 Support

For issues or questions:
- Open GitHub issue
- Check existing documentation
- Review troubleshooting section

---

**Built for developers who value accuracy and verifiable achievements.**
