import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

const screenshotDir = 'C:\\Users\\STYLES\\.gemini\\antigravity\\brain\\06101205-d739-4c4e-b9b0-3f0712f3d830\\screenshots\\phase-5.1';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const ALL_SLUGS_TO_TEST = [
  'agromarket',
  'cv-builder',
  'zee-essentials',
  'adepa-wc-mpaboa',
  'adepa', // alias
  'the-vault',
  'course-rep',
  'automated-ci-cd-infrastructure',
  'shopease',
  'event-ticketing-platform',
  'currency-converter',
  'pizza-ordering-system',
];

async function runAudit() {
  console.log('=== STARTING PHASE 5.1 COMPREHENSIVE ROUTING & VISUAL AUDIT ===');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const auditResults = {
    routes: [],
    overflows: [],
    unknownSlugCheck: null,
    archiveNavigationCheck: null,
  };

  try {
    const page = await browser.newPage();

    // 1. Audit all 12 project routes (11 projects + 1 alias)
    console.log('\n--- 1. AUDITING ALL 11 DATABASE PROJECT ROUTES + ALIAS ---');
    for (const slug of ALL_SLUGS_TO_TEST) {
      const url = `http://localhost:3000/projects/${slug}`;
      const res = await page.goto(url, { waitUntil: 'networkidle0' });
      const status = res.status();
      const pageTitle = await page.title();
      
      const details = await page.evaluate(() => {
        const h1 = document.querySelector('h1')?.innerText || '';
        const subtitle = document.querySelector('h1 + p, section p.text-lime')?.innerText || '';
        const heroImg = document.querySelector('section img');
        const hasArchitecture = Boolean(document.getElementById('architecture'));
        const hasFeatures = Boolean(document.querySelector('section:has(article)'));
        return {
          h1,
          subtitle,
          imgSrc: heroImg ? heroImg.src : null,
          hasArchitecture,
          hasFeatures,
        };
      });

      console.log(`[${status === 200 ? 'PASS' : 'FAIL'}] /projects/${slug} -> HTTP ${status} | "${details.h1}" | Img: ${details.imgSrc?.slice(0, 70)}...`);
      auditResults.routes.push({
        slug,
        status,
        pageTitle,
        ...details,
      });
    }

    // 2. Test Unknown Slugs
    console.log('\n--- 2. TESTING UNKNOWN SLUGS (404 NOT FOUND) ---');
    const unknownRes = await page.goto('http://localhost:3000/projects/unknown-prototype-xyz', { waitUntil: 'networkidle0' });
    const unknownStatus = unknownRes.status();
    const unknownText = await page.evaluate(() => document.body.innerText);
    const is404 = unknownStatus === 404 || unknownText.includes('404') || unknownText.includes('This page could not be found');
    console.log(`Unknown slug /projects/unknown-prototype-xyz -> HTTP ${unknownStatus} (Is 404: ${is404})`);
    auditResults.unknownSlugCheck = { status: unknownStatus, is404 };

    // 3. Test Mobile & Desktop Visual Quality for 4 Featured Projects
    console.log('\n--- 3. VISUAL QUALITY AUDIT & SCREENSHOT CAPTURE (DESKTOP & MOBILE) ---');
    const featuredProjects = [
      { slug: 'agromarket', name: '01-agromarket' },
      { slug: 'cv-builder', name: '02-cv-builder' },
      { slug: 'zee-essentials', name: '03-zee-essentials' },
      { slug: 'adepa-wc-mpaboa', name: '04-adepa' },
    ];

    for (const proj of featuredProjects) {
      // Desktop (1440x900)
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(`http://localhost:3000/projects/${proj.slug}`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 600));
      const desktopPath = path.join(screenshotDir, `${proj.name}-desktop.png`);
      await page.screenshot({ path: desktopPath });
      console.log(`Captured ${proj.name}-desktop.png`);

      // Mobile (390x844)
      await page.setViewport({ width: 390, height: 844 });
      await page.goto(`http://localhost:3000/projects/${proj.slug}`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 600));
      
      // Check horizontal overflow on mobile
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      if (hasHorizontalScroll) {
        console.warn(`[WARNING] Horizontal scroll detected on /projects/${proj.slug} at 390px!`);
        auditResults.overflows.push(proj.slug);
      } else {
        console.log(`[PASS] No mobile horizontal overflow on /projects/${proj.slug}`);
      }

      const mobilePath = path.join(screenshotDir, `${proj.name}-mobile.png`);
      await page.screenshot({ path: mobilePath });
      console.log(`Captured ${proj.name}-mobile.png`);
    }

    // 4. Test Homepage Selected Work & Archive Navigation
    console.log('\n--- 4. HOMEPAGE SELECTED WORK & EXPANDABLE ARCHIVE TEST ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to #projects
    await page.evaluate(() => {
      const el = document.getElementById('projects');
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'instant' });
      }
    });
    await new Promise(r => setTimeout(r, 600));

    // Screenshot homepage selected work
    await page.screenshot({ path: path.join(screenshotDir, '05-homepage-selected-work.png') });
    console.log('Captured 05-homepage-selected-work.png');

    // Click "VIEW ARCHIVE"
    const buttons = await page.$$('button');
    let archiveBtn = null;
    for (const b of buttons) {
      const text = await (await b.getProperty('innerText')).jsonValue();
      if (text.includes('ARCHIVE')) {
        archiveBtn = b;
        break;
      }
    }

    if (archiveBtn) {
      await archiveBtn.click();
      await new Promise(r => setTimeout(r, 800));
      const archiveCards = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#projects .grid div h4 a')).map(a => a.innerText.trim());
      });
      console.log(`Archive expanded successfully with ${archiveCards.length} project cards:`, archiveCards);
      await page.screenshot({ path: path.join(screenshotDir, '06-homepage-archive-expanded.png') });
      console.log('Captured 06-homepage-archive-expanded.png');
      auditResults.archiveNavigationCheck = { success: true, count: archiveCards.length, cards: archiveCards };
    } else {
      console.warn('Could not find View Archive button');
    }

    console.log('\n=== AUDIT COMPLETE ===');
    console.log(JSON.stringify(auditResults, null, 2));

  } finally {
    await browser.close();
  }
}

runAudit().catch(console.error);
