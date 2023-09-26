const {By} = require('selenium-webdriver');

async function closeSlider(driver , term){
    const apiSlider = await driver.findElement(By.css(`[class*=${term}]`));
    const fullScreen_close_Button = await apiSlider.findElements(By.css('button'));

    //0th index contains full screen button and 1st index contains close slider button
    await fullScreen_close_Button[1].click();
}

module.exports = closeSlider;