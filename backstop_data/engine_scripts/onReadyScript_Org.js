module.exports = async (page, scenario, vp, isReference) => {
    await require('./puppet/loadCookies')(page, scenario);
  
    // Example: set user agent
    await page.goto('https://flow.viasocket.com/');
    await page.waitForSelector('body'); // Wait for the page to load


    const emailInput = await page.$('#email');
    const passwordInput = await page.$('#password');

    await emailInput.type("test1@test1.com");
    await passwordInput.type("12345678");

    const submitBtn = await page.$x('//button[@type="submit"]');
    await submitBtn[0].click();

    await page.waitForNavigation({ url: `https://flow.viasocket.com/projects`, timeout: 10000 });

    // Find the element with id 'orgtitle' and wait until it's located
    await page.waitForSelector('#orgtitle');

    const orgTitleInput = await page.$('#orgtitle');
    await orgTitleInput.type('New Org');
    await orgTitleInput.press('Enter');

    await page.waitForFunction(
        (elementId) => !document.querySelector(elementId),
        {},
        '#orgtitle'
      );
  
  };