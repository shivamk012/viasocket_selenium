const {until , By} = require('selenium-webdriver');
const getButtonHavingText = require('./utilities/getButtonHavingText');

async function testApiGetStep(driver , listElements){
    try{
        await listElements[1].click();
        await driver.wait(until.elementLocated(By.id(`${process.env.STEP_PANEL_ID}`)) , 10000);
        const ApiAccordions = await driver.findElements(By.id(`${process.env.STEP_PANEL_ID}`));
        const [requesAccordion , responseAccordion] = ApiAccordions;
        const api_stepname = await requesAccordion.findElement(By.id(`${process.env.API_STEPNAME_INPUT_ID}`));
        await api_stepname.sendKeys('api_get_request');
        await responseAccordion.click();

        const apiPanelContent = await driver.findElement(By.id(process.env.STEP_PANEL_CONTENT_ID));
        await driver.wait(until.elementLocated(By.id(process.env.STEP_PANEL_CONTENT_ID)));
        const urlInputdiv = await apiPanelContent.findElement(By.id(`${process.env.API_URL_INPUTDIV_ID}`));
        await urlInputdiv.click();
        await driver.wait(until.elementLocated(By.id(process.env.API_URL_INPUT_ID)) , 10000);
        const urlInput = await apiPanelContent.findElement(By.id(process.env.API_URL_INPUT_ID));
    
        await urlInput.sendKeys(process.env.GET_REQUEST_URL);
        
        const buttons = await apiPanelContent.findElements(By.css('button'));
        const dryRunButton = await getButtonHavingText(buttons , process.env.DRY_RUN_BUTTON_TEXT);
        const saveButton = await getButtonHavingText(buttons , process.env.SAVE_BUTTON_TEXT);
        await dryRunButton.click();
        await saveButton.click();


    }catch(err){
        console.log(err);
    }
}

module.exports = testApiGetStep;