# CreepJS Scraper

## Description
This project is a web scraper designed to extract fingerprinting data from the CreepJS website (https://abrahamjuliot.github.io/creepjs/). It uses Puppeteer to automate browser interactions and collect information such as fingerprint ID, trust score, bot detection status, and detected lies.

## Features
- Utilizes Puppeteer for browser automation
- Extracts key data using text-based selectors, improving the robustness of the solution:
  - Fingerprint ID
  - Trust score
  - Bot detection status
  - Detected lies
- Saves scraped data in both JSON and PDF formats under the `/lib` directory
- Implements measures to mimic human-like behavior, including:
  - Randomization of user agent
  - Randomization of viewport dimensions
  - Randomization of geolocation
  - Randomization of timezone
  - Randomization of language settings
  - Simulation of user behavior patterns

## Project Structure
- `src/index.ts`: Main entry point of the application
- `src/helpers/`: Contains helper functions
- `src/types/scrapedDataTypes.ts`: TypeScript interfaces for scraped data
- `lib/`: Directory where scraped data is saved

## Prerequisites
- Node.js (version 18 or later recommended)
- puppeteer(version 22.12.1 recommended)

## Installation
1. Clone the repository:
    git clone https://github.com/yourusername/creepjs-scraper.git
2. Navigate to the project directory:
3. Install dependencies:
     npm install
4. To run the scrpaer:
     npm start
This will launch a browser, navigate to the CreepJS website, and scrape the specified data. The scraped data will be saved in the `/lib` directory in both JSON and PDF formats.

## Challenges and Future Improvements

### Bot Detection Evasion
The CreepJS platform implements sophisticated bot and deception detection mechanisms. My initial approach of utilizing randomized user agent strings resulted in low trust scores and frequent flagging as a bot.

Several tools that work for other websites were detected by CreepJS, including:
- [puppeteer-extra-plugin-stealth](https://www.npmjs.com/package/puppeteer-extra-plugin-stealth)
- [puppeteer-with-fingerprints](https://www.npmjs.com/package/puppeteer-with-fingerprints)
- [fingerprint-injector](https://www.npmjs.com/package/fingerprint-injector)

### User Agent Consistency
A key area for improvement is ensuring consistency between the user agent string and other browser attributes such as platform and navigator information. This alignment is crucial for creating a more convincing browser profile.

### Future Work
Given more time, I would focus on making enhancements in these areas to improve the scraper's effectiveness:
1. Developing more sophisticated browser fingerprinting techniques
2. Implementing advanced methods to synchronize user agent data with browser attributes
