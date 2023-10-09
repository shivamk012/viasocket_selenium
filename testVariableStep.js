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

async function testVariableStep(driver , listElements){
    try{
        await listElements[2].click();
        // await driver.wait(until.elementLocated(By.xpath('//p[text() = "Create Variable"]')) , 10000);
        // const variableAccordion = await driver.findElement(By.xpath('//p[text() = "Create Variable"]'));
        // await variableAccordion.click();
        const variable_name_input = await driver.findElement(By.id(`${constants.variable_input_id}`));
        await variable_name_input.click();
        await variable_name_input.sendKeys('variable');
        await driver.sleep(2000);

        const enter_var=await driver.findElement(By.css('[class*="variableinput"]'));
        await enter_var.click();
        await enter_var.sendKeys("xyz");

        const create_variable=await driver.findElement(By.xpath('//button[normalize-space()="Create Variable"]'))
        await driver.actions().click(create_variable).perform();
        await driver.sleep(5000);
        
        await closeSlider(driver , 'functionsliderbody' , true);

        const VariableRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/VariableRefrenceScreenshot.png' , VariableRefrenceScreenshot , 'base64');

        const VariableTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/VariableTestScreenshot.png' , VariableTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/VariableRefrenceScreenshot.png', './specs/VariableTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonVariable.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);

    }catch(err){
        console.log(err);
    }
    finally{
        await driver.quit();
    }
}

module.exports = testVariableStep;