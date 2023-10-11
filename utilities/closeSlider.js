const {By , until} = require('selenium-webdriver');

async function closeSlider(driver , term , isAskAiButtonPresent){
    await driver.sleep(1000);
    const apiSlider = await driver.findElement(By.css(`[class*=${term}]`));
    const fullScreen_close_Button = await apiSlider.findElements(By.css('button'));
    
    //0th index contains askAi or fullscreen. If askai is on screen then 2nd index will be close else 1st index
    const closeButtonIndex = isAskAiButtonPresent ? 2 : 1;
    await fullScreen_close_Button[closeButtonIndex].click();

    // await driver.wait(until.elementIsVisible(By.css("[class*='toast-body']")) , 10000);
    // await driver.actions({origin : fullScreen_close_Button[1]}).click().perform();
}

module.exports = closeSlider;