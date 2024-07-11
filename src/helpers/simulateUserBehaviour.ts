import { Page } from 'puppeteer';

//return a random integer between min and max, as the time delay between actions
const generateRandomDelay = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//simulate user waiting behaviour
export const simulateWait = async (page: Page): Promise<void> => {
  const randomDelay: number = generateRandomDelay(10000, 20000);
  await page.evaluate((delay: number) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }, randomDelay);
};

//simulate user's behaviour of moving mouse around the page with random short delay in between
export const simulateMouseMovements = async (page: Page): Promise<void> => {
  await page.mouse.move(generateRandomDelay(0, 500), generateRandomDelay(0, 500));
  await page.evaluate(
    (delay: number) => {
      return new Promise((resolve) => setTimeout(resolve, delay));
    },
    generateRandomDelay(0, 500)
  );
  await page.mouse.move(generateRandomDelay(0, 500), generateRandomDelay(0, 500));
};
