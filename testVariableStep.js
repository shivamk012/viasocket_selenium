let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
async function testIfStep(driver , listElements){
    try{
        await listElements[3].click();
        await driver.wait(until.elementLocated(By.xpath('//p[text() = "Create Variable"]')) , 10000);
        const variableAccordion = await driver.findElement(By.xpath('//p[text() = "Create Variable"]'));
        await variableAccordion.click();
        const if_input = await driver.findElement(By.id(`${constants.if_block_field_id}`));
        await if_input.sendKeys('true');

        const panelContent = await driver.findElement(By.id(`${constants.step_panel_content_id}`));
        const createButton = await panelContent.findElement(By.xpath('.//button[text() = "Create"]'));
        await createButton.click();

        const crossButtonDiv = await driver.findElement(By.xpath('//div[contains(@class , "blockslider")]'));
        const fullScreen_crossButton = await crossButtonDiv.findElements(By.xpath('.//button'));

        await fullScreen_crossButton[1].click();


    }catch(err){
        console.log(err);
    }
}

module.exports = testIfStep;