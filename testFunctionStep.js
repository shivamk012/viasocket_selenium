let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
async function testFunctionStep(driver , listElements){
    try{
        await listElements[0].click();
        await driver.wait(until.elementLocated(By.id(`${constants.step_name_id}`)) , 10000);
        const step_name_input = await driver.findElement(By.id(`${constants.step_name_id}`));
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



    }catch(err){
        console.log(err);
    }
}

module.exports = testFunctionStep;