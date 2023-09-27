let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
async function testVariableStep(driver , listElements){
    try{
        await listElements[3].click();
        await driver.wait(until.elementLocated(By.xpath('//p[text() = "Create Variable"]')) , 10000);
        const variableAccordion = await driver.findElement(By.xpath('//p[text() = "Create Variable"]'));
        await variableAccordion.click();
        const if_input = await driver.findElement(By.id(`${constants.variable_input_id}`));
        await if_input.sendKeys('Sushil_variable');

        const enter_var=await driver.findElement(By.className('custom-suggest-style MuiBox-root css-0'));
        await enter_var.sendKeys("Sushil Lodhi");

        const create_variable=await driver.findElement(By.xpath('//button[normalize-space()="Create Variable"]'))
        await driver.actions().click(create_variable).perform();
        await driver.sleep(5000);
        const svgElements = driver.findElement(By.xpath('//div[contains(@class,"variableslider__icons flex-end-center p-2 MuiBox-root css-0")]//div[2]'));
        await svgElements.click();
        await driver.sleep(2000);
    }catch(err){
        console.log(err);
    }
    finally{
        await driver.quit();
    }
}

module.exports = testVariableStep;