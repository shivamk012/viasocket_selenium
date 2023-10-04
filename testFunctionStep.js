let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
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

async function testFunctionStep(driver , listElements){
    
    try{
        await listElements[6].click();
        await driver.wait(until.elementLocated(By.id(`${process.env.STEP_PANEL_ID}`)) , 10000);
        const functionAccordions = await driver.findElement(By.id(`${process.env.STEP_PANEL_ID}`));
        const step_name_input = await functionAccordions.findElement(By.css('input'));
        await step_name_input.click();
        await step_name_input.sendKeys('abcd');

        const textAreaDiv = await driver.findElement(By.id(`${constants.step_editor_id}`));
        const textArea = await textAreaDiv.findElement(By.xpath('.//textarea'));
        await textArea.sendKeys('return 1');

        const panelContent = await driver.findElement(By.id(`${constants.step_panel_content_id}`));
        const dryRunButton = await panelContent.findElement(By.xpath('.//button[text() = "Dry Run"]'));
        await driver.actions().click(dryRunButton).perform();
        
        const saveButton = await panelContent.findElement(By.xpath('.//button[text() = "Save"]'));
        await driver.actions().click(saveButton).perform();

        // const crossButtonDiv = await driver.findElement(By.xpath('//div[contains(@class , "blockslider")]'));
        // const fullScreen_crossButton = await crossButtonDiv.findElements(By.xpath('.//button'));

        await buttons[1].click();

        const FunctionRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/FunctionRefrenceScreenshot.png' , FunctionRefrenceScreenshot , 'base64');

        const FunctionTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/FunctionTestScreenshot.png' , FunctionTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/FunctionRefrenceScreenshot.png', './specs/FunctionTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonFunction.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        // resolve();


    }catch(err){
        console.log(err);
    }
}

module.exports = testFunctionStep;