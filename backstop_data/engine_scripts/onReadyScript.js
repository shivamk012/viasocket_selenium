module.exports = async (page, scenario, vp, isReference) => {
    await require('./puppet/loadCookies')(page, scenario);
  
    // Example: set user agent
    await page.goto('https://flow.viasocket.com/');
    await page.waitForSelector('body'); // Wait for the page to load

    await page.waitForSelector('#email');
    const emailInput = await page.$('#email');
    await page.waitForSelector('#password');
    const passwordInput = await page.$('#password');

    await emailInput.type('test1@test1.com');
    await passwordInput.type('12345678');

    const submitBtn = await page.$x('//button[@type="submit"]');

    await page.evaluate(() => {
      const elementToBlur = document.querySelector('#email');
      if (elementToBlur) {
        elementToBlur.style.filter = 'blur(5px)';
      }
    });
    // await submitBtn[0].click();

    // await page.waitForNavigation({ url: `https://flow.viasocket.com/projects`, timeout: 10000 });
  
  };