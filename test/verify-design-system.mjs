import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('frontend/test-evidence/phase-3');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function verifyDesignSystem() {
  console.log('Launching headless Chrome to inspect Phase 3 Design System...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // 1. Desktop Viewport (1440x900)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/design-system', { waitUntil: 'networkidle2' });

  console.log('Capturing Desktop Design System...');
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '01-design-system-desktop-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });

  // Capture Palette and Typography
  const typographyEl = await page.$('section:nth-of-type(2)');
  if (typographyEl) {
    await typographyEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '02-typography-tokens.png'),
      clip: { x: 0, y: 300, width: 1440, height: 800 },
    });
  }

  // Capture Project Card foundations
  const projectCardsEl = await page.$('section:nth-of-type(5)');
  if (projectCardsEl) {
    await projectCardsEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '03-project-card-foundations.png'),
      clip: { x: 0, y: 1500, width: 1440, height: 900 },
    });
  }

  // Full page desktop capture
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '04-design-system-fullpage-desktop.png'),
    fullPage: true,
  });

  // 2. Mobile Viewport (390x844 - iPhone 14)
  console.log('Capturing Mobile Viewport...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/design-system', { waitUntil: 'networkidle2' });
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '05-mobile-design-system.png'),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });

  // Mobile navigation drawer test
  const mobileMenuBtn = await page.$('button[aria-label="Open Menu"]');
  if (mobileMenuBtn) {
    await mobileMenuBtn.click();
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '06-mobile-menu-drawer.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });
  }

  await browser.close();
  console.log('Phase 3 visual verification complete! Screenshots saved in:', SCREENSHOT_DIR);
}

verifyDesignSystem().catch(console.error);
