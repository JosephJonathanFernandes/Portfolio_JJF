# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in this project, please follow these steps:

### 1. Do Not Create Public Issues
Please **do not report security vulnerabilities through public GitHub issues**, discussions, or pull requests.

### 2. Report Privately
Send security reports to: [security@josephfernandes.dev](mailto:security@josephfernandes.dev)

Include the following information:
- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact and severity
- Any suggested fixes or mitigations

### 3. Response Timeline
- **Initial Response**: Within 24 hours
- **Vulnerability Assessment**: Within 72 hours
- **Fix Development**: Within 1-2 weeks for critical issues
- **Public Disclosure**: After fix is deployed and tested

### 4. Responsible Disclosure
We follow responsible disclosure practices:
- We will acknowledge receipt of your report
- We will provide regular updates on our progress
- We will credit you (if desired) once the issue is resolved
- We ask that you allow us time to fix the issue before public disclosure

## Security Best Practices

### For Contributors
- Never commit sensitive information (API keys, passwords, tokens)
- Use environment variables for configuration
- Follow secure coding practices
- Test for common vulnerabilities (XSS, CSRF, injection attacks)

### For Users
- Keep dependencies updated
- Use HTTPS in production
- Implement proper input validation
- Monitor for security advisories

## Security Measures

This project implements several security measures:

- **Dependency Scanning**: Automated checks for vulnerable dependencies
- **Code Analysis**: Static analysis for security issues
- **Input Validation**: Sanitization of user inputs
- **HTTPS Enforcement**: Secure communication channels
- **Regular Audits**: Periodic security reviews

## Contact

For security-related questions or concerns:
- Email: [security@josephfernandes.dev](mailto:security@josephfernandes.dev)
- PGP Key: Available upon request for encrypted communications

Thank you for helping keep this project secure!
