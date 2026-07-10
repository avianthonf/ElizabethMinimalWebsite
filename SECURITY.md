# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| develop | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly:

### How to Report

1. **DO NOT** create a public GitHub issue
2. Email security details to: **principal@stelizabethhighschool.in**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 1 week
  - Medium: 2 weeks
  - Low: 1 month

### Disclosure Policy

- We will coordinate disclosure timing with you
- Security advisories published after fix is deployed
- Credit given to reporter (unless anonymity requested)

## Security Measures

### Automated Scanning

- **npm audit**: Runs on every push and PR
- **Snyk**: Weekly security scans
- **Dependency Review**: Automated on PRs
- **CodeQL**: Static analysis for vulnerabilities

### Thresholds

- **Critical/High**: Blocks deployment
- **Moderate**: Warning (reviewed manually)
- **Low**: Tracked but doesn't block

### Dependencies

- Production dependencies scanned continuously
- Dev dependencies scanned separately
- Automated Dependabot updates enabled
- License compliance checked

### Security Headers

All pages include:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000`
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`
- `Permissions-Policy: restrictive settings`

### Rate Limiting

- Contact form: 3 requests per hour per email
- Powered by Upstash Redis (persistent)
- IP-based tracking planned

### Input Validation

- All forms use Zod validation
- Server-side validation on all endpoints
- HTML sanitization for user content
- Honeypot spam protection

### Authentication

Currently N/A (public website). Future admin panel will use:

- NextAuth.js for authentication
- Role-based access control
- Session management
- Secure password hashing

## Best Practices for Contributors

### Code Security

1. Never commit secrets (use .env)
2. Sanitize all user inputs
3. Use parameterized queries
4. Validate on both client and server
5. Follow principle of least privilege

### Dependencies

1. Pin exact versions in package.json
2. Review dependency changes in PRs
3. Prefer established, maintained packages
4. Check npm package reputation
5. Minimize dependency count

### Testing

1. Write tests for security-critical code
2. Test authentication/authorization flows
3. Validate input sanitization
4. Test rate limiting
5. Verify XSS protection

## Vulnerability Response Process

### 1. Triage (24 hours)

- Confirm vulnerability exists
- Assess severity and impact
- Determine affected versions

### 2. Fix (varies by severity)

- Develop patch
- Write tests
- Review code changes
- Test in staging

### 3. Deploy (coordinated)

- Deploy to production
- Monitor for issues
- Verify fix effectiveness

### 4. Disclose (after fix)

- Publish security advisory
- Update CHANGELOG
- Notify users if needed
- Credit reporter

## Security Contacts

- **General Security**: principal@stelizabethhighschool.in
- **Infrastructure**: (TBD when admin panel added)

## Acknowledgments

We thank the following security researchers:

- (None yet - be the first!)

## External Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
