import { Page } from 'puppeteer';

// Set a random viewport size
export const randomizeViewPort = async (page: Page) => {
  const getRandomViewPort = () => {
    const widths = [1920, 1366, 1440, 1536, 1280];
    const heights = [1080, 768, 900, 864, 1024];
    const randomWidth = widths[Math.floor(Math.random() * widths.length)];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];
    return { width: randomWidth, height: randomHeight };
  };

  const randomViewPort = getRandomViewPort();
  await page.setViewport(randomViewPort);
};

export const randomizeLanguage = async (page: Page) => {
  const getRandomLanguage = () => {
    const languages = ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES'];
    return languages[Math.floor(Math.random() * languages.length)];
  };
  const randomLanguage = getRandomLanguage();
  await page.setExtraHTTPHeaders({ 'Accept-Language': randomLanguage });
};

export const randomizeTimeZone = async (page: Page) => {
  const getRandomTimeZone = () => {
    const timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];
    return timezones[Math.floor(Math.random() * timezones.length)];
  };
  const randomTimeZone = getRandomTimeZone();
  await page.emulateTimezone(randomTimeZone);
};

export const randomizeGeoLocation = async (page: Page) => {
  const getRandomGeoLocation = () => {
    const randomGeoLocation = {
      latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
      longitude: parseFloat((Math.random() * 360 - 180).toFixed(6)),
      accuracy: 100,
    };
    return randomGeoLocation;
  };
  const randomGeoLocation = getRandomGeoLocation();
  await page.setGeolocation(randomGeoLocation);
};
