const {until , By} = require('selenium-webdriver');
const getButtonHavingText = require('./getButtonHavingText');
const closeSlider = require('./closeSlider');

const fs = require('fs');
const resemble = require('resemblejs');

async function compareImages(imagePath1, imagePath2) {
    return new Promise((resolve, reject) => {
      resemble(imagePath1)
        .compareTo(imagePath2)
        .onComplete(data => resolve(data))
        .ignoreLess()
        .onComplete(data => resolve(data));
    });
  }

async function apiRequest(driver , listElements , requestMethodIndex , stepName , requestUrl){
    try{
        await listElements[0].click();
        await driver.wait(until.elementLocated(By.id(`${process.env.STEP_PANEL_ID}`)) , 10000);
        const ApiAccordions = await driver.findElements(By.id(`${process.env.STEP_PANEL_ID}`));
        const [apiAccordion , responseAccordion] = ApiAccordions;
        await driver.wait(until.elementLocated(By.id(`${process.env.API_STEPNAME_INPUT_ID}`)) , 10000);
        const api_stepname = await driver.findElement(By.id(`${process.env.API_STEPNAME_INPUT_ID}`));
        await api_stepname.click();
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

        // NOTE:  index = 1 => post , 2 => put , 4-> patch. these request needs a json body 
        if(requestMethodIndex === 1 || requestMethodIndex === 2 || requestMethodIndex === 4){
            const textEditorDiv = await apiPanelContent.findElement(By.id('jsonEditor'));
            const textEditor = await textEditorDiv.findElement(By.css('textarea'));
            if(requestMethodIndex === 1) await textEditor.sendKeys(process.env.POST_REQUEST_BODY);
            else await textEditor.sendKeys(process.env.PUT_REQUEST_BODY);
            await driver.sleep(1000);
        } 
        
        const buttons = await apiPanelContent.findElements(By.css('button'));
        const dryRunButton = await getButtonHavingText(buttons , process.env.DRY_RUN_BUTTON_TEXT);
        const saveButton = await getButtonHavingText(buttons , process.env.SAVE_BUTTON_TEXT);
        await dryRunButton.click();
        await saveButton.click();
        await driver.sleep(1000);
        await closeSlider(driver , "apiSliderMainContainer" , false);
        
        const apiRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/apiRefrenceScreenshot.png' , apiRefrenceScreenshot , 'base64');

        const apiTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/apiTestScreenshot.png' , apiTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/apiRefrenceScreenshot.png', './specs/apiTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonapi.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);

    }catch(err){
        console.log(err);
    }
}

module.exports = apiRequest;