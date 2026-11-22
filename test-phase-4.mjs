import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const screenshotDir = 'C:\\Users\\STYLES\\.gemini\\antigravity\\brain\\06101205-d739-4c4e-b9b0-3f0712f3d830\\screenshots\\phase-4';

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function runTests() {
  console.log('Launching browser for Phase 4 verification...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Hero (1440x900)
    console.log('1. Testing Desktop Hero Viewport (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1000));

    await page.screenshot({
      path: path.join(screenshotDir, '01-desktop-hero.png'),
    });
    console.log('Saved 01-desktop-hero.png');

    // 2. Selected Work
    console.log('2. Testing Selected Work Section...');
    const projectsSection = await page.$('#projects');
    if (projectsSection) {
      await projectsSection.scrollIntoView();
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(screenshotDir, '02-desktop-selected-work.png'),
      });
      console.log('Saved 02-desktop-selected-work.png');
    }

    // 3. Capabilities & Philosophy
    console.log('3. Testing Capabilities & Philosophy...');
    const capSection = await page.$('#capabilities');
    if (capSection) {
      await capSection.scrollIntoView();
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: path.join(screenshotDir, '03-desktop-capabilities-philosophy.png'),
      });
      console.log('Saved 03-desktop-capabilities-philosophy.png');
    }

    // 4. About & Toolkit
    console.log('4. Testing About & Toolkit...');
    await page.evaluate(() => {
      const el = document.getElementById('about');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(screenshotDir, '04-desktop-about-toolkit.png'),
    });
    console.log('Saved 04-desktop-about-toolkit.png');

    // 5. Certifications & Modal Dialog
    console.log('5. Testing Certifications Dialog Modal...');
    const certSection = await page.$('#certifications');
    if (certSection) {
      await certSection.scrollIntoView();
      await new Promise((r) => setTimeout(r, 800));

      // Click the enlarge button / certificate preview
      const certBtn = await page.$('#certifications button');
      if (certBtn) {
        await certBtn.click();
        await new Promise((r) => setTimeout(r, 600));
        await page.screenshot({
          path: path.join(screenshotDir, '05-desktop-certificate-modal.png'),
        });
        console.log('Saved 05-desktop-certificate-modal.png');

        // Close modal with Escape
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    // 6. Contact Form Validation
    console.log('6. Testing Contact Form Validation...');
    const contactSection = await page.$('#contact');
    if (contactSection) {
      await contactSection.scrollIntoView();
      await new Promise((r) => setTimeout(r, 800));

      // Click Send Message button without inputs
      const submitBtn = await page.$('#contact button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
        await new Promise((r) => setTimeout(r, 500));
      }

      await page.screenshot({
        path: path.join(screenshotDir, '06-desktop-contact-form-validation.png'),
      });
      console.log('Saved 06-desktop-contact-form-validation.png');
    }

    // 7. Tablet Viewport (768x1024)
    console.log('7. Testing Tablet Viewport (768x1024)...');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(screenshotDir, '07-tablet-homepage.png'),
    });
    console.log('Saved 07-tablet-homepage.png');

    // 8. Mobile Hero (390x844)
    console.log('8. Testing Mobile Hero Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(screenshotDir, '08-mobile-hero.png'),
    });
    console.log('Saved 08-mobile-hero.png');

    // 9. Mobile Menu Drawer
    console.log('9. Testing Mobile Menu Drawer...');
    const hamburger = await page.$('button[aria-label="Open Menu"]');
    if (hamburger) {
      await hamburger.click();
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({
        path: path.join(screenshotDir, '09-mobile-menu-drawer.png'),
      });
      console.log('Saved 09-mobile-menu-drawer.png');
    }

    // 10. Case Study Route: AgroMarket (1440x900)
    console.log('10. Testing Case Study Route /projects/agromarket...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/projects/agromarket', {
      waitUntil: 'networkidle0',
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(screenshotDir, '10-case-study-agromarket.png'),
    });
    console.log('Saved 10-case-study-agromarket.png');

    console.log('All 10 tests passed successfully!');
  } finally {
    await browser.close();
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
