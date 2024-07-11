import puppeteer, { Browser, Page } from 'puppeteer';

const CREEP_URL = 'https://abrahamjuliot.github.io/creepjs/';

const scrapeData = async () => {
  const browser: Browser = await puppeteer.launch({
    headless: false,
  });

  const page: Page = await browser.newPage();

  try {
    await page.goto(CREEP_URL);
    // wait for 5 seconds
    await page.evaluate(() => {
      return new Promise((resolve) => setTimeout(resolve, 5000));
    });
  } catch (err) {
    console.log(err);
  } finally {
    console.log('successfully access the browser');
    await browser.close();
  }
};

await scrapeData();
