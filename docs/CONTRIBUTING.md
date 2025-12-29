# Contributing Guidelines

Thank you for your interest in contributing to this portfolio repository! This document provides guidelines and best practices for contributors.

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites
- Node.js 18+ (for Next.js development)
- Git
- GitHub account
- Code editor (VS Code recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
```bash
git clone https://github.com/YOUR_USERNAME/Portfolio_JJF.git
cd Portfolio_JJF
```

3. **Set up upstream remote**:
```bash
git remote add upstream https://github.com/JosephJonathanFernandes/Portfolio_JJF.git
```

4. **Install dependencies** (for Next.js):
```bash
cd src/portfolio-next
npm install
```

5. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

### 1. Choose an Issue
- Check existing [Issues](../../issues) for tasks
- Comment on the issue to indicate you're working on it
- For new features, create an issue first for discussion

### 2. Development Process
```bash
# Keep your branch updated
git pull upstream main

# Make your changes
# Write tests for new functionality
# Ensure all tests pass
npm test

# Commit with clear messages
git commit -m "feat: add new portfolio feature

- Add component for X
- Update styling for Y
- Add tests for Z"

# Push to your fork
git push origin feature/your-feature-name
```

### 3. Pull Request Process
- Ensure your branch is up to date with main
- Run all tests and linting
- Update documentation if needed
- Create a clear PR description
- Request review from maintainers

## Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components
```typescript
// Good: Clear component structure
interface HeroProps {
  title: string;
  subtitle?: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
```

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theming

### File Organization
```
src/portfolio-next/src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── sections/       # Page sections
│   └── layouts/        # Layout components
├── lib/                # Utility functions
├── data/               # Data management
├── types/              # TypeScript definitions
└── hooks/              # Custom React hooks
```

## Testing Requirements

### Test Coverage
- Aim for >80% code coverage
- Write tests for all new features
- Test both happy path and error scenarios
- Include integration tests for complex features

### Testing Examples

**Unit Test**:
```typescript
// __tests__/components/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';

describe('Hero', () => {
  it('renders title correctly', () => {
    render(<Hero title="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
```

**Integration Test**:
```typescript
// __tests__/integration/portfolio-flow.test.tsx
describe('Portfolio Flow', () => {
  it('navigates through all sections', async () => {
    // Test navigation and content loading
  });
});
```

## Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

### Examples
```
feat: add dark mode toggle

- Add theme provider component
- Implement toggle button in header
- Persist theme preference in localStorage

Closes #123
```

```
fix: resolve mobile navigation overflow

Fix navigation menu overflow on mobile devices by adjusting
container padding and menu positioning.

Fixes #456
```

## Pull Request Guidelines

### PR Title
- Use the same format as commit messages
- Be descriptive but concise
- Include issue number if applicable

### PR Description
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots
<!-- Add screenshots for UI changes -->

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. **Automated Checks**: CI must pass all checks
2. **Code Review**: At least one maintainer review
3. **Testing**: All tests must pass
4. **Documentation**: Update docs for changes
5. **Merge**: Squash merge with descriptive commit message

## Documentation

### Code Documentation
- Add JSDoc comments for functions and components
- Document complex logic with inline comments
- Update README for significant changes

### User Documentation
- Update README.md for new features
- Add examples for new functionality
- Update API documentation

## Security Considerations

### Before Committing
- Never commit sensitive information
- Use environment variables for secrets
- Validate all inputs
- Sanitize data from external sources

### Security Checklist
- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] Dependencies scanned for vulnerabilities
- [ ] HTTPS used for external requests
- [ ] CORS properly configured

## Performance Guidelines

### Frontend Performance
- Optimize images and assets
- Minimize bundle size
- Use lazy loading for components
- Implement proper caching strategies

### Code Performance
- Avoid unnecessary re-renders
- Use memoization appropriately
- Optimize database queries
- Implement efficient algorithms

## Accessibility (a11y)

### WCAG Guidelines
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Maintain sufficient color contrast
- Add ARIA labels where needed

### Testing Accessibility
```bash
# Run accessibility tests
npm run test:a11y

# Manual testing checklist
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
```

## Branching Strategy

### Branch Naming
```
feature/add-dark-mode
fix/navigation-bug
docs/update-readme
chore/update-dependencies
```

### Branch Lifecycle
1. Create from `main`
2. Regular commits with clear messages
3. Keep branch updated with `main`
4. Delete after merge

## Release Process

### Versioning
Follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Create git tag
- [ ] Deploy to production
- [ ] Announce release

## Getting Help

### Communication Channels
- **Issues**: Bug reports and feature requests
- **Discussions**: General questions and ideas
- **Pull Requests**: Code review and implementation discussion

### Asking for Help
- Provide clear problem description
- Include error messages and stack traces
- Share your environment details
- Link to relevant code or issues

## Recognition

Contributors will be recognized in:
- Repository contributors list
- CHANGELOG.md for significant contributions
- Release notes
- Social media mentions (with permission)

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT).

---

Thank you for contributing to this project! Your efforts help make this portfolio better for everyone.
