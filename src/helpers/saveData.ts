import fs from 'fs';
import path from 'path';
import { Page } from 'puppeteer';

import ScrapedData from '../Interface';

interface ScrapedData {
  fpId: string;
  trustScore: string;
  bot: string;
  lies: string;
}

const saveAsJson = async (result: ScrapedData, timestamp: string, dir: string): Promise<void> => {
  const jsonFileName = `result_${timestamp}.json`;
  const jsonFilePath = path.join(dir, jsonFileName);
  fs.writeFileSync(jsonFilePath, JSON.stringify(result, null, 2), 'utf-8');
};

const saveAsPDF = async (page: Page, timestamp: string, dir: string): Promise<void> => {
  const pdfFileName = `result_${timestamp}.pdf`;
  const pdfFilePath = path.join(dir, pdfFileName);
  await page.pdf({ path: pdfFilePath, format: 'A4', printBackground: true });
};

const saveScrapedData = async (result: ScrapedData, page: Page): Promise<void> => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(process.cwd(), '/lib');
  await Promise.all([saveAsJson(result, timestamp, dir), saveAsPDF(page, timestamp, dir)]);
};

export default saveScrapedData;
