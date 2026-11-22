import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = 'C:/Users/STYLES/.gemini/antigravity/brain/06101205-d739-4c4e-b9b0-3f0712f3d830/screenshots/phase-6';
const BASE_URL = 'http://localhost:3000';

async function runAudit() {
  console.log('--- STARTING PHASE 6 COMPREHENSIVE LAUNCH AUDIT ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const auditResults = {
    seo: {},
    contactValidation: {},
    caseStudies: {},
    notFound: {},
    responsive: {},
    security: {},
    performance: {},
    accessibility: {},
    robotsAndSitemap: {},
  };

  const page = await browser.newPage();

  // 1. Homepage SEO & Conversion Audit (Desktop 1440x900)
  console.log('\n[1/7] Auditing Homepage at 1440x900...');
  await page.setViewport({ width: 1440, height: 900 });
  const startHome = performance.now();
  const homeRes = await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  const homeLoadTime = Math.round(performance.now() - startHome);

  auditResults.performance.homepage = {
    status: homeRes.status(),
    loadTimeMs: homeLoadTime,
  };

  // Extract SEO tags
  auditResults.seo.homepage = await page.evaluate(() => {
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content') || null,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null,
      ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || null,
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null,
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') || null,
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || null,
      twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || null,
      twitterDescription: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || null,
      h1Count: document.querySelectorAll('h1').length,
      h1Text: Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()),
    };
  });

  // Take Desktop Homepage Screenshot
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '01-homepage-desktop-1440.png'),
    fullPage: false,
  });

  // Capture hero specifically
  const heroEl = await page.$('section#hero') || await page.$('section');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(SCREENSHOT_DIR, '02-homepage-hero.png') });
  }

  // Capture selected work
  const workEl = await page.$('section#projects') || await page.$('#selected-work');
  if (workEl) {
    await workEl.screenshot({ path: path.join(SCREENSHOT_DIR, '03-homepage-selected-work.png') });
  }

  // 2. Contact Form & Lead Conversion Validation
  console.log('\n[2/7] Testing Contact Form Validation & State Handling...');
  // Scroll to contact section
  await page.evaluate(() => {
    const contact = document.querySelector('#contact');
    if (contact) contact.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));

  const contactEl = await page.$('#contact');
  if (contactEl) {
    await contactEl.screenshot({ path: path.join(SCREENSHOT_DIR, '04-homepage-contact-form-initial.png') });
  }

  // Try submitting with empty fields
  console.log('Testing empty form submission...');
  const submitBtn = await page.$('#contact button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }

  // Collect validation error messages
  const initialErrors = await page.evaluate(() => {
    const errorEls = Array.from(document.querySelectorAll('#contact p.text-red-400, #contact [role="alert"], #contact p.text-destructive'));
    return errorEls.map(el => el.innerText.trim()).filter(Boolean);
  });
  auditResults.contactValidation.emptySubmitErrors = initialErrors;

  // Test invalid email
  console.log('Testing invalid email input...');
  await page.type('#contact input[placeholder*="John Doe"]', 'Auditor Test');
  await page.type('#contact input[type="email"]', 'not-a-valid-email');
  await page.type('#contact textarea', 'This is an audit test message.');
  if (submitBtn) {
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 600));
  }

  const emailErrors = await page.evaluate(() => {
    const errorEls = Array.from(document.querySelectorAll('#contact p.text-red-400, #contact [role="alert"], #contact p.text-destructive'));
    return errorEls.map(el => el.innerText.trim()).filter(Boolean);
  });
  auditResults.contactValidation.invalidEmailErrors = emailErrors;

  if (contactEl) {
    await contactEl.screenshot({ path: path.join(SCREENSHOT_DIR, '05-homepage-contact-form-validation-errors.png') });
  }

  // Clear inputs without sending to avoid polluting backend
  await page.evaluate(() => {
    const form = document.querySelector('#contact form');
    if (form) form.reset();
  });

  // 3. Tablet (768x1024) and Mobile (390x844) Viewports for Homepage
  console.log('\n[3/7] Auditing Homepage Responsive Layouts (768px and 390px)...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '06-homepage-tablet-768.png'),
    fullPage: false,
  });

  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  const homeOverflowMobile = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  auditResults.responsive.homepageMobileOverflow = homeOverflowMobile;

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '07-homepage-mobile-390.png'),
    fullPage: false,
  });

  // 4. Case Studies Audit (Desktop & Mobile)
  console.log('\n[4/7] Auditing All 4 Featured Case Studies...');
  const slugs = ['agromarket', 'cv-builder', 'zee-essentials', 'adepa-wc-mpaboa'];

  for (const slug of slugs) {
    console.log(`Auditing /projects/${slug}...`);
    // Desktop Viewport
    await page.setViewport({ width: 1440, height: 900 });
    const startTime = performance.now();
    const res = await page.goto(`${BASE_URL}/projects/${slug}`, { waitUntil: 'networkidle2' });
    const loadTime = Math.round(performance.now() - startTime);

    const data = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || null,
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || null,
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null,
        h1Count: document.querySelectorAll('h1').length,
        h1Text: document.querySelector('h1')?.innerText?.trim() || null,
        hasSubSecondMention: bodyText.toLowerCase().includes('sub-second'),
        hasOtpMention: bodyText.toLowerCase().includes('otp') || bodyText.toLowerCase().includes('six-digit'),
        hasWebSocketMention: bodyText.toLowerCase().includes('socket.io') || bodyText.toLowerCase().includes('websocket'),
        liveUrlLink: document.querySelector('a[href*="dev-joseph.me"]')?.getAttribute('href') || null,
        allH2s: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()),
      };
    });

    auditResults.caseStudies[slug] = {
      status: res.status(),
      loadTimeMs: loadTime,
      ...data,
    };

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `08-${slug}-desktop-1440.png`),
      fullPage: false,
    });

    // Mobile Viewport
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/projects/${slug}`, { waitUntil: 'networkidle2' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    auditResults.caseStudies[slug].mobileOverflow = overflow;

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `09-${slug}-mobile-390.png`),
      fullPage: false,
    });
  }

  // 5. 404 Route Verification
  console.log('\n[5/7] Testing 404 Not Found Route...');
  await page.setViewport({ width: 1440, height: 900 });
  const notFoundRes = await page.goto(`${BASE_URL}/projects/unknown-audit-slug-test-404`, { waitUntil: 'networkidle2' });
  const notFoundInfo = await page.evaluate(() => {
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText?.trim() || null,
      hasReturnLink: !!document.querySelector('a[href="/"]'),
      bodyText: document.body.innerText.slice(0, 300),
    };
  });
  auditResults.notFound = {
    status: notFoundRes.status(),
    ...notFoundInfo,
  };
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '10-route-not-found-404.png'),
    fullPage: false,
  });

  // 6. Security & Admin Route Gate
  console.log('\n[6/7] Checking Admin Protection & Leak Inspection...');
  const adminRes = await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle2' });
  const currentUrl = page.url();
  auditResults.security.adminRoute = {
    initialStatus: adminRes.status(),
    finalUrl: currentUrl,
    isRedirectedOrGated: currentUrl.includes('/login') || (await page.$('form input[type="password"]')) !== null,
  };

  // Inspect scripts on homepage for private secrets
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  const secretLeaks = await page.evaluate(() => {
    const html = document.documentElement.innerHTML;
    const sensitiveTokens = [
      'SUPABASE_SERVICE_ROLE_KEY',
      'JWT_SECRET',
      'SMTP_PASS',
      'DATABASE_URL',
      'POSTGRES_PASSWORD',
    ];
    const detected = [];
    for (const token of sensitiveTokens) {
      if (html.includes(token)) detected.push(token);
    }
    return detected;
  });
  auditResults.security.detectedSecretTokensInClient = secretLeaks;

  // 7. Robots.txt, Sitemap.xml & Favicon
  console.log('\n[7/7] Testing Robots.txt and Sitemap.xml...');
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await robotsRes.text();
  auditResults.robotsAndSitemap.robotsTxt = {
    status: robotsRes.status,
    contentType: robotsRes.headers.get('content-type'),
    content: robotsText,
    disallowsAdmin: robotsText.includes('Disallow: /admin'),
    hasSitemap: robotsText.includes('sitemap.xml'),
  };

  const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  auditResults.robotsAndSitemap.sitemapXml = {
    status: sitemapRes.status,
    contentType: sitemapRes.headers.get('content-type'),
    urlCount: (sitemapText.match(/<loc>/g) || []).length,
    sampleUrls: (sitemapText.match(/<loc>(.*?)<\/loc>/g) || []).slice(0, 8),
  };

  // Accessibility & Headings Hierarchy Check on Homepage
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  auditResults.accessibility.homepage = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => ({
      tag: h.tagName.toLowerCase(),
      text: h.innerText.trim(),
    }));
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src,
      alt: img.alt,
      hasAlt: img.hasAttribute('alt') && img.alt.trim().length > 0,
    }));
    const missingAltCount = images.filter(img => !img.hasAlt).length;
    return {
      totalHeadings: headings.length,
      headings,
      totalImages: images.length,
      missingAltCount,
    };
  });

  await browser.close();

  // Save audit output to json for reference
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'audit-results.json'),
    JSON.stringify(auditResults, null, 2),
    'utf-8'
  );

  console.log('\n=== PHASE 6 AUDIT COMPLETE ===');
  console.log(JSON.stringify(auditResults, null, 2));
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
