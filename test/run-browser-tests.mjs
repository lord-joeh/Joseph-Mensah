import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('frontend/test-evidence');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const BASE_URL = 'http://localhost:3000';
const results = [];

function record(name, passed, details = '') {
  results.push({ name, passed, details });
  console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name} ${details ? '- ' + details : ''}`);
}

async function run() {
  console.log('Launching headless Chrome for verification...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('requestfailed', (req) => {
    networkErrors.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  try {
    // -------------------------------------------------------------
    // Test 1: Public Homepage
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Public Homepage ---');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2', timeout: 30000 });

    const title = await page.title();
    record('Homepage Title Check', title.includes('Joseph Mensah'), `Title is: "${title}"`);

    const heroText = await page.$eval('h1', (el) => el.innerText);
    record('Hero Headline Render', heroText.includes('JOSEPH MENSAH'), `Found: "${heroText}"`);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-homepage-hero.png'), fullPage: false });

    // Check Projects Grid
    const projectCards = await page.$$eval('#projects h3', (els) => els.map((e) => e.innerText));
    record('Projects Rendered', projectCards.length >= 4, `Rendered ${projectCards.length} projects (${projectCards.slice(0, 3).join(', ')}...)`);

    // Check Skills Grid
    const skillsCount = await page.$$eval('#skills img', (els) => els.length);
    record('Skills Grid Rendered', skillsCount > 5, `Found ${skillsCount} skill icons`);

    // -------------------------------------------------------------
    // Test 2: Certificate Modal Dialog Zoom
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Certificate Modal ---');
    const certTrigger = await page.$('#certifications button');
    if (certTrigger) {
      await certTrigger.click();
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
      const dialogVisible = await page.$eval('[role="dialog"]', (el) => Boolean(el));
      record('Certificate Dialog Opened', dialogVisible, 'Dialog zoom modal opened on click');
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-certificate-dialog-modal.png') });

      // Close dialog with Escape
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 600));
      const dialogClosed = (await page.$('[role="dialog"]')) === null;
      record('Certificate Dialog Closed', dialogClosed, 'Closed dialog cleanly');
    } else {
      record('Certificate Dialog Trigger', false, 'Trigger button not found');
    }

    // -------------------------------------------------------------
    // Test 3: Contact Form Client-side Zod Validation
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Contact Form Validation ---');
    await page.$eval('#contact', (el) => el.scrollIntoView());
    const submitBtn = await page.$('#contact button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise((r) => setTimeout(r, 800));

      const validationMessages = await page.$$eval('#contact p', (els) => els.map((e) => e.innerText));
      const hasNameValidation = validationMessages.some((m) => m.includes('Name must be at least'));
      const hasEmailValidation = validationMessages.some((m) => m.includes('Invalid email'));
      const hasMsgValidation = validationMessages.some((m) => m.includes('Message must be at least'));

      record('Contact Form Name Validation', hasNameValidation, 'Caught short/empty name');
      record('Contact Form Email Validation', hasEmailValidation, 'Caught invalid/empty email');
      record('Contact Form Message Validation', hasMsgValidation, 'Caught short/empty message');

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-contact-form-validation.png') });
    }

    // -------------------------------------------------------------
    // Test 4: Mobile Responsiveness
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Mobile Viewport ---');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    record('Mobile No Horizontal Overflow', !hasHorizontalOverflow, `scrollWidth <= clientWidth`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-mobile-viewport.png'), fullPage: false });

    // Reset viewport
    await page.setViewport({ width: 1280, height: 900 });

    // -------------------------------------------------------------
    // Test 5: Custom 404 Page
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing 404 Route ---');
    await page.goto(`${BASE_URL}/non-existent-page-testing`, { waitUntil: 'networkidle2' });
    const notFoundText = await page.evaluate(() => document.body.innerText);
    const is404 = notFoundText.includes('404') && notFoundText.includes("Page doesn't exist");
    record('404 Page Handling', is404, 'Rendered custom 404 component');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-not-found-page.png') });

    // -------------------------------------------------------------
    // Test 6: Protected Admin Route Redirects
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Protected Admin Route Redirects ---');
    const adminRoutes = ['/admin', '/admin/projects', '/admin/about', '/admin/notifications'];
    for (const route of adminRoutes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2' });
      const currentUrl = page.url();
      const redirectedToLogin = currentUrl.includes('/login');
      record(`Redirect ${route} -> /login`, redirectedToLogin, `Landed on: ${currentUrl}`);
    }

    // -------------------------------------------------------------
    // Test 7: Admin Login Validation with Invalid Credentials
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Admin Login Credentials Rejection ---');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-login-page.png') });

    await page.type('input[type="email"]', 'fake-admin@dev-joseph.me');
    await page.type('input[type="password"]', 'totallyWrongPassword123!');
    await page.click('button[type="submit"]');

    // Wait for Supabase Auth error banner / toast
    await page.waitForFunction(
      () => document.body.innerText.includes('Invalid login credentials') || document.body.innerText.includes('Invalid'),
      { timeout: 8000 }
    );

    const loginBodyText = await page.evaluate(() => document.body.innerText);
    const hasAuthError = loginBodyText.includes('Invalid login credentials');
    record('Supabase Auth Invalid Login Rejection', hasAuthError, 'Displayed: "Invalid login credentials"');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-login-invalid-credentials-error.png') });

  } catch (err) {
    console.error('Test execution error:', err);
    record('Global Suite Execution', false, err.message);
  } finally {
    await browser.close();

    console.log('\n=======================================');
    console.log('BROWSER TEST SUMMARY:');
    const passedCount = results.filter((r) => r.passed).length;
    console.log(`Total: ${results.length} | Passed: ${passedCount} | Failed: ${results.length - passedCount}`);
    console.log('=======================================');

    fs.writeFileSync(
      path.join(SCREENSHOT_DIR, 'test-report.json'),
      JSON.stringify({ results, consoleErrors, networkErrors, timestamp: new Date().toISOString() }, null, 2)
    );
  }
}

run();
