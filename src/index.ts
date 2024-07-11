import puppeteer, { Browser, Page } from 'puppeteer';

const CREEP_URL = 'https://abrahamjuliot.github.io/creepjs/';
const FP_ID_LENGTH = 64;

const scrapeData = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: false,
  });

  const page: Page = await browser.newPage();
  try {
    await page.goto(CREEP_URL);
    // Wait for the element that contains finger print data to be present before proceeding
    await page.waitForSelector('#fingerprint-data');

    // wait for the animation to finish before the fp data is revealed
    await page.evaluate(() => {
      return new Promise((resolve) => setTimeout(resolve, 5000));
    });

    const result = await page.evaluate((FP_ID_LENGTH) => {
      // Scrape fpId
      const fingerprintInfo = document.querySelector('#fingerprint-data');
      let fpId: string | null = null;
      if (fingerprintInfo) {
        const divs = fingerprintInfo.querySelectorAll('div');
        for (const div of divs) {
          if (div.textContent && div.textContent.includes('FP ID:')) {
            const spans = div.querySelectorAll('span');
            fpId = Array.from(spans)
              .map((span) => span.textContent)
              .join('')
              .slice(0, FP_ID_LENGTH);
            break;
          }
        }
      }

      // Scrape trust score and bot
      const visitorInfo = document.querySelector('.visitor-info');
      let trustScore: string = 'N/A';
      let bot: string = 'N/A';
      let lies: string = 'N/A';
      if (visitorInfo) {
        const divs = visitorInfo.querySelectorAll('div');
        for (const div of divs) {
          if (trustScore === 'N/A' && div.textContent && div.textContent.includes('trust score:')) {
            const scoreText = div.textContent.split('trust score:')[1].trim();
            trustScore = scoreText.split(' ')[0];
            continue;
          }
          if (bot === 'N/A' && div.textContent && div.textContent.includes('bot:')) {
            bot = div.textContent.split('bot:')[1].trim().split('\n')[0];
            continue;
          }
          if (lies === 'N/A' && div.textContent && div.textContent.includes('lies (')) {
            lies = div.textContent.trim();
            continue;
          }
        }
      }
      return { fpId, trustScore, bot, lies };
    }, FP_ID_LENGTH);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
  }
};

await scrapeData();
