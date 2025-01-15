// global-setup.js
// require { chromium } from 'playwright-core';
const { chromium  } = require('playwright-core');
// import { executablePath as _executablePath } from 'chrome-aws-lambda';
export default async config => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.connectOverCDP('http://localhost:9222');

  // const browser = await Promise.resolve(_executablePath).then(
  //   (executablePath) => {
  //     if (!executablePath) {
  //       // local execution
  //       return chromium.launch({});
  //     }
  //     return chromium.launch({ executablePath });
  //   }
  // );

  const page = await browser.newPage();
  // page.setDefaultTimeout(0);
  await page.goto(baseURL);
  await page.fill('input[name="email"]', 'andrew.bashorum@gmail.com');
  await page.fill('input[name="password"]', 'Heskey3350');
  await page.click('text=Log in');
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: storageState });
  await browser.close();
};