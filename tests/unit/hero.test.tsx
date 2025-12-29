// Example unit test for Hero component
// This demonstrates the testing structure and approach

import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import Hero from '@/components/hero';

// Mock framer-motion to avoid animation dependencies in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down">↓</div>,
  Github: () => <div data-testid="github">GH</div>,
  Linkedin: () => <div data-testid="linkedin">LI</div>,
  Mail: () => <div data-testid="mail">✉</div>,
  ExternalLink: () => <div data-testid="external-link">→</div>,
}));

// Mock portfolio data
jest.mock('@/data/portfolio', () => ({
  personalInfo: {
    name: 'Joseph Jonathan Fernandes',
    title: 'Embedded Software Engineer',
    tagline: 'Building the future of automotive software',
    github: 'https://github.com/josephjonathanfernandes',
    linkedin: 'https://linkedin.com/in/joseph-jonathan-fernandes',
    email: 'josephfernandes273@gmail.com',
    gitroll: 'https://gitroll.io/profile/josephjonathanfernandes',
  },
}));

describe('Hero Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo for scroll tests
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });

    // Mock document.getElementById
    Object.defineProperty(document, 'getElementById', {
      value: jest.fn(() => ({ scrollIntoView: jest.fn() })),
      writable: true,
    });
  });

  it('renders the hero section with correct title', () => {
    render(<Hero />);

    // Check if the main heading contains the expected text
    expect(screen.getByText(/Hi, I'm Joseph/)).toBeInTheDocument();
  });

  it('displays the professional title', () => {
    render(<Hero />);

    expect(screen.getByText('Embedded Software Engineer')).toBeInTheDocument();
  });

  it('shows the tagline', () => {
    render(<Hero />);

    expect(screen.getByText('Building the future of automotive software')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);

    expect(screen.getByText('View My Work')).toBeInTheDocument();
    expect(screen.getByText('Download Resume')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Hero />);

    expect(screen.getByTestId('github')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('mail')).toBeInTheDocument();
    expect(screen.getByTestId('external-link')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Hero />);

    // Check for semantic HTML
    const section = screen.getByRole('banner'); // Assuming it has role="banner" or similar
    expect(section).toBeInTheDocument();
  });

  it('handles mouse movement for background effects', () => {
    render(<Hero />);

    // This would require more complex testing with user events
    // For now, just ensure the component renders without errors
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument();
  });
});

// Integration test example
describe('Hero Component Integration', () => {
  it('integrates with portfolio data correctly', () => {
    render(<Hero />);

    // Verify that data from portfolio.ts is used correctly
    expect(screen.getByText('Joseph Jonathan Fernandes')).toBeInTheDocument();
  });

  it('maintains responsive design classes', () => {
    render(<Hero />);

    // Check for responsive Tailwind classes (this is more of a smoke test)
    const heroSection = screen.getByText(/Hi, I'm/).closest('section');
    expect(heroSection).toHaveClass('min-h-screen');
  });
});
