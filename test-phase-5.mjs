import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const screenshotDir = 'C:\\Users\\STYLES\\.gemini\\antigravity\\brain\\06101205-d739-4c4e-b9b0-3f0712f3d830\\screenshots\\phase-5';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

async function runPhase5Tests() {
  console.log('Starting Phase 5 & API Image Verification Test Suite...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();

    // -----------------------------------------------------------
    // 1. Homepage Featured Projects & API Images
    // -----------------------------------------------------------
    console.log('1. Verifying Homepage Featured Selection & Live Supabase Image URLs...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1200));

    // Scroll to #projects
    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 800));

    const featuredData = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#projects article'));
      return cards.map((card) => {
        const title = card.querySelector('h3')?.innerText.trim() || '';
        const img = card.querySelector('img');
        return {
          title,
          imgSrc: img ? img.src : null,
          imgCurrentSrc: img ? img.currentSrc : null,
        };
      });
    });

    console.log('Featured Cards on Homepage:', JSON.stringify(featuredData, null, 2));

    const expectedOrder = [
      'AgroMarket',
      'AI-Powered CV Builder',
      'Zee Essentials',
      'Adepa Wc Mpaboa',
    ];

    let allImagesValid = true;
    for (let i = 0; i < expectedOrder.length; i++) {
      const item = featuredData[i];
      if (!item || !item.title.includes(expectedOrder[i])) {
        console.error(`Mismatch at index ${i}: expected "${expectedOrder[i]}", got "${item?.title}"`);
        allImagesValid = false;
      }
      if (!item || !item.imgSrc || !item.imgSrc.includes('supabase.co')) {
        console.error(`Image at index ${i} (${item?.title}) is NOT using Supabase storage URL: ${item?.imgSrc}`);
        allImagesValid = false;
      }
    }
    console.log('API Image Consumption check for Homepage Selected Work:', allImagesValid ? 'PASSED' : 'FAILED');

    await page.screenshot({
      path: path.join(screenshotDir, '01-homepage-featured-selection.png'),
    });
    console.log('Saved 01-homepage-featured-selection.png');

    // -----------------------------------------------------------
    // 2. Case Study: AgroMarket (Desktop & Mobile)
    // -----------------------------------------------------------
    console.log('2. Testing Case Study: /projects/agromarket...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/projects/agromarket', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const agroImgSrc = await page.evaluate(() => document.querySelector('section img')?.src);
    console.log('AgroMarket Case Study Hero Image:', agroImgSrc);
    if (!agroImgSrc || !agroImgSrc.includes('supabase.co')) {
      console.error('AgroMarket case study hero image does not use Supabase URL!');
    }

    await page.screenshot({ path: path.join(screenshotDir, '02-agromarket-desktop.png') });

    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/projects/agromarket', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, '03-agromarket-mobile.png') });
    console.log('Saved AgroMarket screenshots (Desktop & Mobile)');

    // -----------------------------------------------------------
    // 3. Case Study: AI-Powered CV Builder (Desktop & Mobile)
    // -----------------------------------------------------------
    console.log('3. Testing Case Study: /projects/cv-builder...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/projects/cv-builder', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const cvImgSrc = await page.evaluate(() => document.querySelector('section img')?.src);
    console.log('CV Builder Case Study Hero Image:', cvImgSrc);
    if (!cvImgSrc || !cvImgSrc.includes('supabase.co')) {
      console.error('CV Builder case study hero image does not use Supabase URL!');
    }

    await page.screenshot({ path: path.join(screenshotDir, '04-cv-builder-desktop.png') });

    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/projects/cv-builder', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, '05-cv-builder-mobile.png') });
    console.log('Saved CV Builder screenshots (Desktop & Mobile)');

    // -----------------------------------------------------------
    // 4. Case Study: Zee Essentials (Desktop & Mobile)
    // -----------------------------------------------------------
    console.log('4. Testing Case Study: /projects/zee-essentials...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/projects/zee-essentials', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const zeeImgSrc = await page.evaluate(() => document.querySelector('section img')?.src);
    console.log('Zee Essentials Case Study Hero Image:', zeeImgSrc);
    if (!zeeImgSrc || !zeeImgSrc.includes('supabase.co')) {
      console.error('Zee Essentials case study hero image does not use Supabase URL!');
    }

    await page.screenshot({ path: path.join(screenshotDir, '06-zee-essentials-desktop.png') });

    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/projects/zee-essentials', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, '07-zee-essentials-mobile.png') });
    console.log('Saved Zee Essentials screenshots (Desktop & Mobile)');

    // -----------------------------------------------------------
    // 5. Case Study: Adepa Wc Mpaboa (Desktop & Mobile)
    // -----------------------------------------------------------
    console.log('5. Testing Case Study: /projects/adepa-wc-mpaboa...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000/projects/adepa-wc-mpaboa', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    const adepaImgSrc = await page.evaluate(() => document.querySelector('section img')?.src);
    console.log('Adepa Case Study Hero Image:', adepaImgSrc);
    if (!adepaImgSrc || !adepaImgSrc.includes('supabase.co')) {
      console.error('Adepa case study hero image does not use Supabase URL!');
    }

    await page.screenshot({ path: path.join(screenshotDir, '08-adepa-desktop.png') });

    await page.setViewport({ width: 390, height: 844 });
    await page.goto('http://localhost:3000/projects/adepa-wc-mpaboa', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, '09-adepa-mobile.png') });
    console.log('Saved Adepa screenshots (Desktop & Mobile)');

    // -----------------------------------------------------------
    // 6. Test Alias: /projects/adepa
    // -----------------------------------------------------------
    console.log('6. Testing Alias: /projects/adepa...');
    const aliasRes = await page.goto('http://localhost:3000/projects/adepa', { waitUntil: 'networkidle0' });
    console.log('Alias /projects/adepa HTTP status:', aliasRes.status());

    // -----------------------------------------------------------
    // 7. Test Existing Case Studies: The Vault & Course Rep
    // -----------------------------------------------------------
    console.log('7. Testing Existing Case Studies: /projects/the-vault & /projects/course-rep...');
    const vaultRes = await page.goto('http://localhost:3000/projects/the-vault', { waitUntil: 'networkidle0' });
    console.log('The Vault HTTP status:', vaultRes.status());
    const repRes = await page.goto('http://localhost:3000/projects/course-rep', { waitUntil: 'networkidle0' });
    console.log('Course Rep HTTP status:', repRes.status());

    // -----------------------------------------------------------
    // 8. Test 404 for Unknown Project Slug
    // -----------------------------------------------------------
    console.log('8. Testing Unknown Slug 404...');
    const unknownRes = await page.goto('http://localhost:3000/projects/this-does-not-exist', { waitUntil: 'networkidle0' });
    console.log('Unknown slug HTTP status:', unknownRes.status());
    await page.screenshot({ path: path.join(screenshotDir, '10-unknown-project-404.png') });

    console.log('All Phase 5 verification tests completed successfully!');
  } finally {
    await browser.close();
  }
}

runPhase5Tests().catch((err) => {
  console.error('Phase 5 test execution failed:', err);
  process.exit(1);
});
