let constants = require('./constants');
const {until , By} = require('selenium-webdriver');
async function testResponse(driver , listElements){
    try{
        await listElements[6].click();
        await driver.wait(until.elementLocated(By.className('ace_content')) , 10000);
        const add_response=await driver.findElement(By.xpath('//div[@id="functionScript"]/textarea'));
        let inputText="'Sushil Lodhi'"
        await add_response.clear();
        add_response.sendKeys(inputText);
        const save=await driver.findElement(By.xpath('//button[text()="Save"]'))
        save.click();
        const svgElements = driver.findElement(By.xpath('//div[contains(@class,"responseslider__icons flex-end-center px-2 mb-4 MuiBox-root css-0")]//div'));
        await svgElements.click();
        await driver.sleep(2000);
    } 
    catch(error){
        console.log(error);
    }finally{
        await driver.quit();
    }}


module.exports=testResponse;


















