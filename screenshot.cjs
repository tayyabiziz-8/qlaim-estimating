const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/home/claude/.cache/puppeteer/chrome/linux-131.0.6778.204/chrome-linux64/chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const shots = [
    { name: 'desktop-home', width: 1440, height: 900, url: 'http://localhost:4173/' },
    { name: 'mobile-home', width: 390, height: 844, url: 'http://localhost:4173/' },
    { name: 'mobile-nav-closeup', width: 375, height: 200, url: 'http://localhost:4173/' },
    { name: 'mobile-pricing', width: 390, height: 1400, url: 'http://localhost:4173/pricing' },
    { name: 'mobile-order', width: 390, height: 1800, url: 'http://localhost:4173/order' },
  ];

  for (const s of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.width, height: s.height });
    await page.goto(s.url, { waitUntil: 'networkidle0', timeout: 20000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: `/tmp/${s.name}.png`, fullPage: s.name.includes('pricing') || s.name.includes('order') || s.name === 'mobile-home' });
    await page.close();
  }

  await browser.close();
})();
