let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
async function testIfStep(driver , listElements){
    try{
        await listElements[2].click();
        await driver.wait(until.elementLocated(By.id(`${constants.step_panel_id}`)) , 10000);
        const ifAccordion = await driver.findElement(By.id(`${constants.step_panel_id}`));
        await ifAccordion.click();
        const if_input = await driver.findElement(By.id(`${constants.if_block_field_id}`));
        await if_input.sendKeys('true');

        const panelContent = await driver.findElement(By.id(`${constants.step_panel_content_id}`));
        const createButton = await panelContent.findElement(By.xpath('.//button[text() = "Create"]'));
        await createButton.click();


    }catch(err){
        console.log(err);
    }
}

module.exports = testIfStep;