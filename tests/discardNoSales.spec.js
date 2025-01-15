// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const playwrightConfig = require('../playwright.config');

test('Discard Everything Red On transfer list', async ({  }) => {

  // connect to already open (authenticated with fifa web app) chrome browser
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = await context.newPage();
  let baseURL  = playwrightConfig.use?.baseURL;
  
  page.setDefaultTimeout(15000)
  // CONST VARS
  const max_bin = 3500  // The price we buy for
  const chemStyle = false;
  const torino = true;

  // Soft VARS
  let count = 1;
  let bin_count = 0;
  let low_bin = 0;
  let found_count = 0;

  let eachPlayerLocator1 = "li:nth-child("
  let eachPlayerLocator2 = ") > .rowContent > .entityContainer"
  let resultEachPlayer = ""
  let still_left_to_discard = true
  // Go to web app
  await page.goto(baseURL+'');

  await page.getByRole('button', { name: ' Transfers' }).click();
  
  await page.getByText('Transfer List').click();

  while(still_left_to_discard){
    resultEachPlayer = eachPlayerLocator1.concat(count.toString(), eachPlayerLocator2)
    
    await page.locator(resultEachPlayer).first().click();

    if(await page.getByText("This item was previously listed for").isVisible()){
        await page.getByRole('button', { name: /Quick Sell/ }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
        console.log(resultEachPlayer)
    }
    else{
        count+=1;
    }
    
    await page.waitForTimeout(400);
  }
});