# Google Analytics 4 Setup Guide

This guide explains how to enable Google Analytics 4 (GA4) tracking on the St. Elizabeth's High School website.

## Overview

Google Analytics 4 is integrated using the official `@next/third-parties/google` package, following Next.js best practices. The implementation:

- ✅ Uses the official Next.js third-party library
- ✅ Lazy loads GA4 after hydration (no performance impact)
- ✅ Respects user privacy settings
- ✅ Environment-based configuration
- ✅ Easy to enable/disable per environment

## Setup Steps

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Account**, select or create an account
4. Under **Property**, click **Create Property**
5. Enter property details:
   - **Property name:** St. Elizabeth's High School
   - **Reporting time zone:** (GMT+05:30) India Standard Time
   - **Currency:** Indian Rupee (₹)
6. Complete the property setup wizard
7. Select **Web** as the platform
8. Enter website details:
   - **Website URL:** https://stelizabethhighschool.in
   - **Stream name:** Main Website
9. Click **Create stream**
10. **Copy the Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

Update your `.env` file with the Measurement ID:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Replace with your actual Measurement ID
NEXT_PUBLIC_ENABLE_ANALYTICS=true       # Set to true to enable tracking
```

**Environment-specific configuration:**

```bash
# Development (.env.local)
NEXT_PUBLIC_ENABLE_ANALYTICS=false      # Disable in development

# Staging (.env.staging)
NEXT_PUBLIC_ENABLE_ANALYTICS=false      # Disable in staging

# Production (.env.production)
NEXT_PUBLIC_ENABLE_ANALYTICS=true       # Enable in production only
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Your actual Measurement ID
```

### 3. Deploy and Verify

1. Deploy the changes to production
2. Visit your website
3. Open browser DevTools → Network tab
4. Look for requests to `www.google-analytics.com/g/collect`
5. Verify events appear in GA4 Real-Time reports (Admin → Data Streams → View real-time data)

## What's Being Tracked

Google Analytics 4 automatically tracks:

### Automatic Events

- **Page views** - Every page navigation
- **Scrolls** - 90% scroll depth
- **Outbound clicks** - Links to external sites
- **Site search** - When users search the site
- **File downloads** - PDF, DOC, etc.
- **Video engagement** - Play, pause, complete (if videos embedded)

### Enhanced Measurement (Auto-enabled)

- **Scroll tracking** - How far users scroll
- **Outbound link clicks** - External website clicks
- **Site search** - Internal search queries
- **Video engagement** - YouTube video interactions
- **File downloads** - Document downloads

### User Properties

- **Device type** - Desktop, mobile, tablet
- **Browser** - Chrome, Safari, Firefox, etc.
- **Location** - City, region, country
- **Traffic source** - Direct, organic, referral
- **Landing page** - First page visited

## Privacy & Compliance

### Cookie Consent

Google Analytics uses cookies. While basic GA4 implementation is included, you should:

1. Add a cookie consent banner (not yet implemented)
2. Only load GA4 after user consent
3. Provide cookie policy and privacy policy pages

**Recommended library:** [cookie-consent-banner](https://www.npmjs.com/package/cookie-consent-banner) or [CookieYes](https://www.cookieyes.com/)

### Data Privacy Settings

Configure privacy settings in GA4:

1. Go to **Admin → Data Settings → Data Collection**
2. Enable **Google signals** (optional - for cross-device tracking)
3. Go to **Admin → Data Settings → Data Retention**
4. Set event data retention: **14 months** (recommended)
5. Reset user data on new activity: **On** (recommended)

### IP Anonymization

GA4 automatically anonymizes IP addresses by default (no configuration needed).

## Custom Events (Future Enhancement)

You can track custom events by adding this code:

```typescript
// Track contact form submission
if (typeof window !== "undefined" && window.gtag) {
  window.gtag("event", "form_submit", {
    form_name: "contact_form",
    form_destination: "admissions",
  });
}

// Track brochure download
if (typeof window !== "undefined" && window.gtag) {
  window.gtag("event", "file_download", {
    file_name: "school-brochure.pdf",
    link_url: "/downloads/brochure.pdf",
  });
}
```

## Useful Metrics to Monitor

### Key Performance Indicators (KPIs)

1. **Total Users** - Unique visitors
2. **Sessions** - Total visits
3. **Engagement Rate** - % of engaged sessions (>10s or 2+ pages)
4. **Average Session Duration** - Time spent on site
5. **Bounce Rate** - Single-page sessions
6. **Top Pages** - Most visited pages
7. **Traffic Sources** - Where visitors come from
8. **Device Breakdown** - Desktop vs Mobile
9. **Location** - Geographic distribution
10. **Conversions** - Form submissions, applications

### Reports to Check Weekly

- **Real-Time** → See live visitor activity
- **Life Cycle → Acquisition** → Traffic sources
- **Life Cycle → Engagement → Pages and screens** → Popular pages
- **Life Cycle → Engagement → Events** → User actions
- **User → Demographics** → Age, gender, interests
- **User → Tech** → Devices, browsers, OS

## Troubleshooting

### GA4 Not Tracking

**Check:**

1. `NEXT_PUBLIC_ENABLE_ANALYTICS=true` in production `.env`
2. Measurement ID is correct (format: `G-XXXXXXXXXX`)
3. Website is deployed (doesn't work in localhost)
4. Ad blockers are disabled when testing
5. Browser DevTools → Network → Filter by "google-analytics"

### Events Not Appearing

- Events can take **24-48 hours** to appear in standard reports
- Use **Real-Time** reports for immediate verification
- Check **Admin → Data Streams → View tag settings** for stream status

### Debug Mode

Enable debug mode to see detailed event tracking:

```typescript
// Add to src/app/layout.tsx (development only)
{process.env.NODE_ENV === 'development' && GA_ID && (
  <GoogleAnalytics gaId={GA_ID} dataLayerName="dataLayer" />
)}
```

Then visit: `chrome://extensions` → Enable Developer Mode → Install Google Analytics Debugger

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Next.js Third-Party Libraries](https://nextjs.org/docs/app/guides/third-party-libraries)
- [@next/third-parties GitHub](https://github.com/vercel/next.js/tree/canary/packages/third-parties)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Best Practices](https://support.google.com/analytics/answer/9964640)

## Implementation Details

**Package:** `@next/third-parties@latest`  
**Component:** `GoogleAnalytics` from `@next/third-parties/google`  
**Location:** `src/app/layout.tsx`  
**Load strategy:** Deferred (after hydration)  
**Performance impact:** ~5KB gzipped, loaded asynchronously

---

**Next Steps:**

1. Get your GA4 Measurement ID
2. Update `.env.production` with real ID
3. Set `NEXT_PUBLIC_ENABLE_ANALYTICS=true`
4. Deploy to production
5. Verify tracking in GA4 Real-Time reports
6. Set up conversion goals (contact form, admissions inquiries)
7. Create custom dashboards for school metrics
