// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const playwrightConfig = require('../playwright.config');

test('Sell Contracts for 200', async ({  }) => {

  // connect to already open (authenticated with fifa web app) chrome browser
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = await context.newPage();
  let baseURL  = playwrightConfig.use?.baseURL;
  
  
  // CONST VARS
  const max_bin = 3500  // The price we buy for
  const chemStyle = false;
  const torino = true;

  // Soft VARS
  let count = 0;
  let bin_count = 0;
  let low_bin = 0;
  let found_count = 0;

  // Go to web app
  await page.goto(baseURL+'');
  page.setDefaultTimeout(0);

  await page.getByRole('button', { name: ' Transfers' }).click();
  await page.locator('div').filter({ hasText: /^Search the Transfer Market$/ }).locator('div').nth(1).click();


});
  
