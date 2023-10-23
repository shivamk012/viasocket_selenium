let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
const fs = require('fs');
const resemble = require('resemblejs');
const closeSlider = require('./utilities/closeSlider');

async function compareImages(imagePath1, imagePath2) {
    return new Promise((resolve, reject) => {
      resemble(imagePath1)
        .compareTo(imagePath2)
        .onComplete(data => resolve(data))
        .ignoreLess()
        .onComplete(data => resolve(data));
    });
  }

async function testIfStep(driver , listElements){
    try{
        await listElements[1].click();
        await driver.wait(until.elementLocated(By.id(`${constants.step_panel_id}`)) , 10000);
        const ifAccordion = await driver.findElement(By.id(`${constants.step_panel_id}`));
        await ifAccordion.click();
        const if_input = await driver.findElement(By.id(`${constants.if_block_field_id}`));
        await if_input.sendKeys('true');

        const panelContent = await driver.findElement(By.id(`${constants.step_panel_content_id}`));
        const createButton = await panelContent.findElement(By.xpath('.//button[text() = "Create"]'));
        await createButton.click();
        await closeSlider(driver , 'functionsliderbody' , true);


        const IfStepRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./referenceImage/IfStepRefrenceScreenshot.png' , IfStepRefrenceScreenshot , 'base64');

        const IfStepTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/IfStepTestScreenshot.png' , IfStepTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./referenceImage/IfStepRefrenceScreenshot.png', './specs/IfStepTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonIfStep.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);



    }catch(err){
        console.log(err);
    }
}

module.exports = testIfStep;