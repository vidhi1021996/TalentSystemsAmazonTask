const playwright = require('playwright');
const { expect } = require('@playwright/test');

(async () => {
    
  //launch chrome in headless mode
  const browser = await playwright.chromium.launch({ headless: false,});

  const page = await browser.newPage();
  //Navigate to amazon.ca
  await page.goto('https://www.amazon.ca');

  //send "Alexa" to search textbox
  await page.locator('id=twotabsearchtextbox').fill('Alexa');
  //click on search icon
  await page.locator('id=nav-search-submit-button').click();

  //match the price on search page
  const Price1 = page.locator('xpath=//*[@id="search"]/div[1]/div[1]/div/span[3]/div[2]/div[2]/div/div/div/div/div[3]/div[3]/div/a/span/span[1]');
  await expect(Price1).toHaveText('$54.99')
  console.log("Price checked on search product page");
 
  //open first alexa product from searched result
  await page.locator('text=Echo Dot (3rd gen) - Smart speaker with Alexa - Charcoal').click();
  
  //match the price above add to card window
  const Price2 = page.locator('xpath=//*[@id="corePrice_feature_div"]/div/span/span[1]');
  await expect(Price2).toHaveText('$54.99');
  console.log("Price checked on product detail page");

  //click add to cart
  await page.locator('id=add-to-cart-button').click();

  //matching the price on Item added to card window
  const Price3 = page.locator('xpath=//*[@id="sw-subtotal"]/span[2]/span/span[1]');
  await expect(Price3).toHaveText('$54.99');
  console.log("Price checked on product detail page");

  //navigate to cart
  await page.locator('text=Go to cart').click();

  //*[@id="sc-subtotal-amount-buybox"]/span
  //match the quantity above add to card window
  const QuantityOnCart = page.locator('id=sc-subtotal-label-buybox');
  await expect(QuantityOnCart).toHaveText('Subtotal (1 item):');
  console.log("Quantity checked on cart details page");

  //matching the prise on checkout page
  const Price5 = page.locator('xpath=//*[@id="sc-subtotal-amount-buybox"]/span');
  await expect(Price5).toHaveText('$54.99');
  console.log("Price checked on checkout page");
  
  //Close browser window
  await browser.close();
})();

