const {until , By} = require('selenium-webdriver');
async function testApiGetStep(driver , listElements){
    try{
        await listElements[1].click();
        await driver.wait(until.elementLocated(By.id(`${process.env.STEP_PANEL_ID}`)) , 10000);
        const apiAccordion = await driver.findElement(By.id(`${process.env.STEP_PANEL_ID}`));
        await apiAccordion.click();
        const api_stename = await driver.findElement(By.id(`${process.env.API_STEPNAME_INPUT_ID}`));
        await api_stename.sendKeys('api_get_request');

        const apiPanelContent = await driver.findElement(By.id(process.env.STEP_PANEL_CONTENT_ID));
        const urlInputdiv = await apiPanelContent.findElement(By.id(`${process.env.API_URL_INPUTDIV_ID}`));
        await urlInputdiv.click();
        await apiPanelContent.wait(until.elementLocated(By.id(process.env.API_URL_INPUT_ID)) , 10000);
        const urlInput = await apiPanelContent.findElement(By.id(process.env.API_URL_INPUT_ID));
    
        await urlInput.sendKeys('abc');
        
        // const createButton = await panelContent.findElement(By.xpath('.//button[text() = "Create"]'));
        // await createButton.click();

        // const crossButtonDiv = await driver.findElement(By.xpath('//div[contains(@class , "blockslider")]'));
        // const fullScreen_crossButton = await crossButtonDiv.findElements(By.xpath('.//button'));

        // await fullScreen_crossButton[1].click();


    }catch(err){
        console.log(err);
    }
}

module.exports = testApiGetStep;