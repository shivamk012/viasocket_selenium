const {until , By} = require('selenium-webdriver');
const getButtonHavingText = require('./getButtonHavingText');

async function apiRequest(driver , listElements , requestMethodIndex , stepName , requestUrl){
    try{
        await listElements[1].click();
        await driver.wait(until.elementLocated(By.id(`${process.env.STEP_PANEL_ID}`)) , 10000);
        const ApiAccordions = await driver.findElements(By.id(`${process.env.STEP_PANEL_ID}`));
        const [apiAccordion , responseAccordion] = ApiAccordions;
        const api_stepname = await apiAccordion.findElement(By.id(`${process.env.API_STEPNAME_INPUT_ID}`));
        await api_stepname.sendKeys(stepName);
        await responseAccordion.click();

        // await driver.wait(until.elementLocated(By.id(process.env.STEP_PANEL_CONTENT_ID)));
        const apiPanelContent = await driver.findElement(By.id(process.env.STEP_PANEL_CONTENT_ID));
        
        //hacky solution for selecting request method
        const requestMethodInput = await apiPanelContent.findElement(By.xpath('.//input'));
        const requestMethodDiv = await requestMethodInput.findElement(By.xpath('.//..'));
        await requestMethodDiv.click();

        const allDivElements = await driver.findElements(By.css('div'));
        const [requestMethodListDiv] = await allDivElements.slice(-2);

        const requestMethodList = await requestMethodListDiv.findElements(By.css('li'));
        await requestMethodList[requestMethodIndex].click();
        const urlInputdiv = await apiPanelContent.findElement(By.id(`${process.env.API_URL_INPUTDIV_ID}`));
        await urlInputdiv.click();
        await driver.wait(until.elementLocated(By.id(process.env.API_URL_INPUT_ID)) , 10000);
        const urlInput = await apiPanelContent.findElement(By.id(process.env.API_URL_INPUT_ID));
    
        await urlInput.sendKeys(requestUrl);

        //send data in body if request is post , put or patch
        if(requestMethodIndex === 1 || requestMethodIndex === 2 || requestMethodIndex === 4){
            const textEditorDiv = await apiPanelContent.findElement(By.id('jsonEditor'));
            const textEditor = await textEditorDiv.findElement(By.css('textarea'));
            if(requestMethodIndex === 1) await textEditor.sendKeys(JSON.parse(process.env.POST_REQUEST_BODY));
            else await textEditor.sendKeys(process.env.PUT_REQUEST_BODY);
        }
        
        const buttons = await apiPanelContent.findElements(By.css('button'));
        const dryRunButton = await getButtonHavingText(buttons , process.env.DRY_RUN_BUTTON_TEXT);
        const saveButton = await getButtonHavingText(buttons , process.env.SAVE_BUTTON_TEXT);
        await dryRunButton.click();
        await saveButton.click();

    }catch(err){
        console.log(err);
    }
}

module.exports = apiRequest;