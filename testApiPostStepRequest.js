const {until , By} = require('selenium-webdriver');
const getButtonHavingText = require('./utilities/getButtonHavingText');

async function testApiPostStep(driver , listElements){
    try{
        await listElements[1].click();
        await driver.wait(until.elementLocated(By.id(`${process.env.STEP_PANEL_ID}`)) , 10000);
        const ApiAccordions = await driver.findElements(By.id(`${process.env.STEP_PANEL_ID}`));
        const [apiAccordion , responseAccordion] = ApiAccordions;
        const api_stepname = await apiAccordion.findElement(By.id(`${process.env.API_STEPNAME_INPUT_ID}`));
        await api_stepname.sendKeys('api_post_request');
        await responseAccordion.click();

        // await driver.wait(until.elementLocated(By.id(process.env.STEP_PANEL_CONTENT_ID)));
        const apiPanelContent = await driver.findElement(By.id(process.env.STEP_PANEL_CONTENT_ID));
        
        //hacky solution incoming for selecting request method
        const requestMethodInput = await apiPanelContent.findElement(By.xpath('.//input'));
        const requestMethodDiv = await requestMethodInput.findElement(By.xpath('.//..'));
        await requestMethodDiv.click();

        const allDivElements = await driver.findElements(By.css('div'));
        const [requestMethodListDiv] = await allDivElements.slice(-2);
        // console.log(requestMethodListDiv);

        const requestMethodList = await requestMethodListDiv.findElements(By.css('li'));
        await requestMethodList[1].click();
        const urlInputdiv = await apiPanelContent.findElement(By.id(`${process.env.API_URL_INPUTDIV_ID}`));
        await urlInputdiv.click();
        await driver.wait(until.elementLocated(By.id(process.env.API_URL_INPUT_ID)) , 10000);
        const urlInput = await apiPanelContent.findElement(By.id(process.env.API_URL_INPUT_ID));
    
        await urlInput.sendKeys(process.env.POST_REQUEST_URL);

        const buttons = await apiPanelContent.findElements(By.css('button'));
        const dryRunButton = await getButtonHavingText(buttons , process.env.DRY_RUN_BUTTON_TEXT);
        const saveButton = await getButtonHavingText(buttons , process.env.SAVE_BUTTON_TEXT);
        await dryRunButton.click();
        await saveButton.click();


    }catch(err){
        console.log(err);
    }
}

module.exports = testApiPostStep;