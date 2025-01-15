// @ts-check
const { test, expect, chromium } = require('@playwright/test');
const playwrightConfig = require('../playwright.config');

test('Bin SNIPE', async ({  }) => {

  // connect to already open (authenticated with fifa web app) chrome browser
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const context = browser.contexts()[0];
  const page = await context.newPage();
  let baseURL  = playwrightConfig.use?.baseURL;
  
  
  // CONST VARS
  const ban_buffer = 6 // the lower the number the more delay is added.

  const max_bin = 82500  // The price we buy for
  const max_bin_shadow = 3300
  const max_bin_hunter = 2500
  const silver_torino_max = 2200
  const gold_torino_max = 2000

  const wait_for_buy_now_to_be_visible_timer = 90
   
  const player_search_name = 'Raphaël'
  const player_found_name = 'Raphaël Varane'
  const player_rating = '85'
  const player_position = 'Defenders'  // 'Attackers' // 'Defenders' 


  const chemStyle = false;
  const torino = false;

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

  if (torino){
    await page.getByText('League').click();
    await page.getByText('Serie A TIM (ITA 1)').click();
    await page.locator('div').filter({ hasText: /^Club$/ }).nth(2).click();
    await page.getByText('Torino').click();

        // search gold 
    await page.locator('div').filter({ hasText: /^Quality$/ }).nth(2).click();
    await page.getByText('Gold').click();
  
    while(true){

      bin_count += 1;
      count += 1;
      low_bin = bin_count * 50;

      if (low_bin + 200 >= gold_torino_max){
        bin_count = 0
      }

      await page.getByPlaceholder('Any').nth(2).click();
      await page.getByPlaceholder('Any').nth(2).fill(low_bin.toString()); // put in gold filter price

      await page.getByPlaceholder('Any').nth(3).click();
      await page.getByPlaceholder('Any').nth(3).fill(gold_torino_max.toString()); // put in gold filter price

      await page.getByRole('button', { name: 'Search' }).click();

      // await page.waitForTimeout(wait_for_buy_now_to_be_visible_timer)

      await page.waitForTimeout(5);
      await page.getByRole('button', { name: 'Buy Now for' }).isVisible({timeout: 500})
      
      if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){ // found a player
          await page.getByRole('button', { name: 'Buy Now for' }).click();
          await page.getByRole('button', { name: 'Ok' }).click();

          await page.waitForTimeout(200);

          if(await page.getByRole('button', { name: 'Send to Transfer List' }).isVisible()){ // bought the player
              await page.waitForTimeout(200);
              await page.getByRole('button', { name: 'Send to Transfer List' }).click();
              
          }
          found_count += 1;
          await page.getByRole('button', { name: ' Transfers' }).click(); // leave market and return 
          await page.locator('div').filter({ hasText: /^Search the Transfer Market$/ }).locator('div').nth(1).click();
          await page.getByRole('button', { name: '' }).first().click();
      }
      else{  // didnt find any player

        await page.waitForTimeout(Math.floor(Math.random() * (1400 - 761 + 1) + 661));

        if (count % ban_buffer == 0){
          await page.waitForTimeout(Math.floor(Math.random() * (7500 - 3511 + 1) + 2511));
        }

        if (count % (ban_buffer * 6) == 0){
          await page.waitForTimeout(Math.floor(Math.random() * (25000 - 5011 + 1) + 5011));
        }
        
        if (count % (ban_buffer * 12) == 0){
          await page.waitForTimeout(Math.floor(Math.random() * (145000 - 115000 + 1) + 115000));
        }

        await page.getByRole('button', { name: '' }).click(); // backout to transfer search
        // await page.getByRole('button', { name: '' }).first().click(); // remove 'silver' from qualityies 
      }
      
      console.log('found_count:' + found_count)

    // Search silver
    //   await page.locator('div').filter({ hasText: /^Quality$/ }).nth(2).click();
    //   await page.getByText('Silver').click();
    //   await page.locator('div').filter({ hasText: /^Rarity$/ }).nth(2).click(); // add in only rares
    //   await page.getByText('Rare').click();    
    //   await page.getByPlaceholder('Any').nth(3).click();
    //   await page.getByPlaceholder('Any').nth(3).fill(silver_torino_max.toString()); // put in gold filter price
    //   await page.getByRole('button', { name: 'Search' }).click();

    //   await page.waitForTimeout(wait_for_buy_now_to_be_visible_timer);
    //   if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){ // found a player
    //       await page.getByRole('button', { name: 'Buy Now for' }).click();
    //       await page.getByRole('button', { name: 'Ok' }).click();

    //       await page.waitForTimeout(200);
    //       if(await page.getByRole('button', { name: 'Send to Transfer List' }).isVisible()){ // bought a player
    //         await page.waitForTimeout(200);
    //         await page.getByRole('button', { name: 'Send to Transfer List' }).click();
    //       }
    //       await page.getByRole('button', { name: ' Transfers' }).click(); // leave and return to market
    //       await page.locator('div').filter({ hasText: /^Search the Transfer Market$/ }).locator('div').nth(1).click();
    //       await page.getByRole('button', { name: '' }).first().click(); // remove silver
    //       found_count += 1;
    //     }
    //   else{ // didnt find any player
    //     await page.waitForTimeout(Math.floor(Math.random() * (1400 - 761 + 1) + 661));

    //     if (count % ban_buffer == 0){
    //       await page.waitForTimeout(Math.floor(Math.random() * (7500 - 3511 + 1) + 2511));
    //     }

    //     if (count % (ban_buffer * 6) == 0){
    //       await page.waitForTimeout(Math.floor(Math.random() * (25000 - 5011 + 1) + 5011));
    //     }
        
    //     if (count % (ban_buffer * 12) == 0){
    //       await page.waitForTimeout(Math.floor(Math.random() * (145000 - 115000 + 1) + 115000));
    //     }
    //     await page.getByRole('button', { name: '' }).click(); // backout to transfer search
    //     await page.getByRole('button', { name: '' }).first().click(); // remove 'silver' from qualityies 
    //   }
    }
  }
  else if (chemStyle){
    await page.getByRole('button', { name: 'Consumables' }).click();
    await page.locator('div').filter({ hasText: /^Chemistry Styles$/ }).nth(2).click();
    await page.locator('li').filter({ hasText: 'Chemistry Styles' }).click();
    await page.locator('div').filter({ hasText: /^Chemistry Styles$/ }).nth(2).click();
    await page.getByText('Manager Leagues').click();
    await page.locator('div').filter({ hasText: /^Manager Leagues$/ }).nth(2).click();
    await page.getByText('Chemistry Styles').click();


    while(true){
      count +=1
      // search shadow
      await page.locator('div').filter({ hasText: /^Chemistry Style$/ }).nth(2).click();
      await page.getByText('Shadow').click();
      await page.getByPlaceholder('Any').nth(3).click();
      await page.getByPlaceholder('Any').nth(3).fill('');
      await page.getByPlaceholder('Any').nth(3).fill(max_bin_shadow.toString());

      await page.getByRole('button', { name: 'Search' }).click();
      // await page.waitForTimeout(10);
      
      await page.waitForTimeout(150);
      if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){
        await page.getByRole('button', { name: 'Buy Now for' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('button', { name: 'Send to Transfer List' }).click();
        await page.getByRole('button', { name: '', exact: true }).click();
        // break;
      }

      await page.waitForTimeout(Math.floor(Math.random() * (1400 - 761 + 1) + 661));
      await page.getByRole('button', { name: '' }).click();
      
      // await page.pause()

      // search hunter

      await page.getByRole('button', { name: '' }).click();
      await page.locator('div').filter({ hasText: /^Chemistry Style$/ }).nth(2).click();
      await page.getByText('Hunter').click();
      await page.getByPlaceholder('Any').nth(3).fill('');
      await page.getByPlaceholder('Any').nth(3).fill(max_bin_hunter.toString());

      await page.getByRole('button', { name: 'Search' }).click();
      
      await page.waitForTimeout(150);
      if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){
        await page.getByRole('button', { name: 'Buy Now for' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('button', { name: 'Send to Transfer List' }).click();
        await page.getByRole('button', { name: '', exact: true }).click();
        // break;
      }
      await page.waitForTimeout(Math.floor(Math.random() * (1600 - 751 + 1) + 451));
      await page.getByRole('button', { name: '' }).click();
      
      // timer delay so we dont get banned
      if (count % ban_buffer == 0){
        await page.waitForTimeout(Math.floor(Math.random() * (7500 - 3511 + 1) + 2511));
      }

      if (count % (ban_buffer * 6) == 0){
        await page.waitForTimeout(Math.floor(Math.random() * (25000 - 5011 + 1) + 5011));
      }

      await page.getByRole('button', { name: '' }).click();
    }
  }
  else{
      // PLAYER 
        // put in player details
        await page.getByRole('button', { name: ' Transfers' }).click();
        await page.locator('div').filter({ hasText: /^Search the Transfer Market$/ }).locator('div').nth(1).click();
        await page.getByPlaceholder('Type Player Name').click();

        await page.getByPlaceholder('Type Player Name').fill(player_search_name);
        await page.getByRole('button', { name: player_found_name + ' ' + player_rating }).click();
        await page.getByPlaceholder('Any').nth(3).click();
        await page.getByPlaceholder('Any').nth(3).fill(max_bin.toString());

        // while(true){
        //   count +=1
        //   // search with attackers
        //   await page.getByText('Position').click();
        //   await page.getByText(player_position).click();
        //   await page.getByRole('button', { name: 'Search' }).click();
        //   await page.waitForTimeout(600);
          
        //   if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){
        //     await page.getByRole('button', { name: 'Buy Now for' }).click();
        //     await page.getByRole('button', { name: 'Ok' }).click();
        //     await page.getByRole('button', { name: 'Send to Transfer List' }).click();
        //     await page.getByRole('button', { name: '', exact: true }).click();
        //     break;
        //   }
        //   await page.getByRole('button', { name: '' }).click();
          
        //   // search without pos attackers
        //   await page.getByRole('button', { name: '' }).nth(1).click();
        //   await page.getByRole('button', { name: 'Search' }).click();
        //   await page.waitForTimeout(600);
          
        //   if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){
        //     await page.getByRole('button', { name: 'Buy Now for' }).click();
        //     await page.getByRole('button', { name: 'Ok' }).click();
        //     await page.getByRole('button', { name: 'Send to Transfer List' }).click();
        //     await page.getByRole('button', { name: '', exact: true }).click();
        //     break;
        //   }
        //   await page.getByRole('button', { name: '' }).click();

        //   // timer delay so we dont get banned
        //   if (count % ban_buffer == 0){
        //     await page.waitForTimeout(5000);
        //   }

        //   if (count % ban_buffer * 20 == 0){
        //     await page.waitForTimeout(30000);
        //   }

        //   // re-search until we find one 
        // }
        while(true){

          bin_count += 1;
          count += 1;
          low_bin = bin_count * 50;
    
          if (low_bin + 200 >= gold_torino_max){
            bin_count = 0
          }
    
          await page.getByPlaceholder('Any').nth(2).click();
          await page.getByPlaceholder('Any').nth(2).fill(low_bin.toString()); // put in gold filter price
    
          // await page.getByPlaceholder('Any').nth(3).click();
          // await page.getByPlaceholder('Any').nth(3).fill(gold_torino_max.toString()); // put in gold filter price
    
          await page.getByRole('button', { name: 'Search' }).click();
    
          // await page.waitForTimeout(wait_for_buy_now_to_be_visible_timer)
    
          await page.waitForTimeout(70);
          // await page.getByRole('button', { name: 'Buy Now for' }).isVisible({timeout: 500})
          
          if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){ // found a player
              await page.getByRole('button', { name: 'Buy Now for' }).click();
              await page.getByRole('button', { name: 'Ok' }).click();
    
              await page.waitForTimeout(200);
    
              if(await page.getByRole('button', { name: 'Send to Transfer List' }).isVisible()){ // bought the player
                  await page.waitForTimeout(200);
                  await page.getByRole('button', { name: 'Send to Transfer List' }).click();
                  
              }
              found_count += 1;
              await page.getByRole('button', { name: ' Transfers' }).click(); // leave market and return 
              await page.locator('div').filter({ hasText: /^Search the Transfer Market$/ }).locator('div').nth(1).click();
              await page.getByRole('button', { name: '' }).first().click();
          }
          else{  // didnt find any player
    
            await page.waitForTimeout(Math.floor(Math.random() * (1400 - 761 + 1) + 661));
    
            if (count % ban_buffer == 0){
              await page.waitForTimeout(Math.floor(Math.random() * (7500 - 3511 + 1) + 2511));
            }
    
            if (count % (ban_buffer * 6) == 0){
              await page.waitForTimeout(Math.floor(Math.random() * (25000 - 5011 + 1) + 5011));
            }
            
            if (count % (ban_buffer * 12) == 0){
              await page.waitForTimeout(Math.floor(Math.random() * (145000 - 115000 + 1) + 115000));
            }
    
            await page.getByRole('button', { name: '' }).click(); // backout to transfer search
            // await page.getByRole('button', { name: '' }).first().click(); // remove 'silver' from qualityies 
          }
          
          console.log('found_count:' + found_count)
    
          // Search silver
        //   await page.locator('div').filter({ hasText: /^Quality$/ }).nth(2).click();
        //   await page.getByText('Silver').click();
        //   await page.locator('div').filter({ hasText: /^Rarity$/ }).nth(2).click(); // add in only rares
        //   await page.getByText('Rare').click();    
        //   await page.getByPlaceholder('Any').nth(3).click();
        //   await page.getByPlaceholder('Any').nth(3).fill(silver_torino_max.toString()); // put in gold filter price
        //   await page.getByRole('button', { name: 'Search' }).click();
    
        //   await page.waitForTimeout(wait_for_buy_now_to_be_visible_timer);
        //   if(await page.getByRole('button', { name: 'Buy Now for' }).isVisible()){ // found a player
        //       await page.getByRole('button', { name: 'Buy Now for' }).click();
        //       await page.getByRole('button', { name: 'Ok' }).click();
    
        //       await page.waitForTimeout(200);
        //       if(await page.getByRole('button', { name: 'Send to Transfer List' }).isVisible()){ // bought a player
        //         await page.waitForTimeout(200);
        //         await page.getByRole('button', { name: 'Send to Transfer List' }).click();
        //       }
        //       await page.getByRole('button', { name: ' Transfers' }).click(); // leave and return to market
        //       await page.locator('div').filter({ hasText: /^Search the Transfer Market$/ }).locator('div').nth(1).click();
        //       await page.getByRole('button', { name: '' }).first().click(); // remove silver
        //       found_count += 1;
        //     }
        //   else{ // didnt find any player
        //     await page.waitForTimeout(Math.floor(Math.random() * (1400 - 761 + 1) + 661));
    
        //     if (count % ban_buffer == 0){
        //       await page.waitForTimeout(Math.floor(Math.random() * (7500 - 3511 + 1) + 2511));
        //     }
    
        //     if (count % (ban_buffer * 6) == 0){
        //       await page.waitForTimeout(Math.floor(Math.random() * (25000 - 5011 + 1) + 5011));
        //     }
            
        //     if (count % (ban_buffer * 12) == 0){
        //       await page.waitForTimeout(Math.floor(Math.random() * (145000 - 115000 + 1) + 115000));
        //     }
        //     await page.getByRole('button', { name: '' }).click(); // backout to transfer search
        //     await page.getByRole('button', { name: '' }).first().click(); // remove 'silver' from qualityies 
        //   }
        }
      
      
      
      
      
      }
});
  
