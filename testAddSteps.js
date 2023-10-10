const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs');
const resemble = require('resemblejs');
const testFunctionStep = require('./testFunctionStep');
const testIfStep = require('./testIfStep');
const testVariableStep= require('./testVariableStep');
const testComment=require('./testComment');
const testResponse=require('./testResponse')
const {
  testApiStepGetRequest,
  testApiStepPostRequest,
  testApiStepPutRequest,
  testApiStepDeleteRequest,
  testApiStepPatchRequest
} = require('./testApiStep');
const dotenv = require('dotenv');

dotenv.config();
const testData = JSON.parse(process.env.USER_DETAILS_LOGIN);


async function compareImages(imagePath1, imagePath2) {
  return new Promise((resolve, reject) => {
    resemble(imagePath1)
      .compareTo(imagePath2)
      .onComplete(data => resolve(data))
      .ignoreLess()
      .onComplete(data => resolve(data));
  });
}


async function testAddSteps(){
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
    const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    try{
        await driver.get(process.env.APP_LINK);
        await driver.wait(async() => {
          return driver.executeScript('return document.readyState').then(function(readyState) {
            return readyState === 'complete';
          });
        });
        await driver.wait(until.elementLocated(By.id('email')) , 10000);
        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));

        await emailInput.sendKeys(testData[0]);
        await passwordInput.sendKeys(testData[1]);

        const submitbtn = await driver.findElement(By.xpath('//button[@type = "submit"]'));

        await driver.actions().click(submitbtn).perform();
        await driver.wait(until.urlIs(`${process.env.APP_LINK}/projects`), 10000);


        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_name__title")]')) , 10000);
        const allProjects = await driver.findElements(By.xpath('//div[contains(@class, "project_name__title")]'));
        await allProjects[0].click();
        const scriptSlider = await driver.findElement(By.xpath('//div[contains(@class , "script-slider")]'));
        await driver.wait(until.elementIsVisible(scriptSlider) , 10000);
        await driver.wait(until.elementLocated(By.xpath('.//div[contains(@class , "script_block")]')) , 10000);
        const scripBlocks = await scriptSlider.findElements(By.xpath('.//div[contains(@class , "script_block")]'));
        await scripBlocks[0].click();
        
        //TODO
        //check if url of site contains a script id , project id and workflows       
        await driver.wait(until.elementLocated(By.xpath('//input[contains(@placeholder , "Steps")]')) , 10000);
        const addStepInput = await driver.findElement(By.xpath('//input[contains(@placeholder , "Steps")]'));
        await addStepInput.click();
        // const sourceCode = await driver.getPageSource();
        // fs.writeFileSync('./sourceCode.txt' , sourceCode);
        const divElementsInBody = await driver.findElements(By.xpath('//body/div'));
        const [listComponent] = divElementsInBody.slice(-1);
        const listElements = await listComponent.findElements(By.tagName('li'));
        // await testFunctionStep(driver , listElements );
        // await testIfStep(driver , listElements);  
        // await testVariableStep(driver,listElements);
        // await testApiStepGetRequest(driver , listElements);
        // await testApiStepPostRequest(driver , listElements);
        // await testApiStepPatchRequest(driver , listElements);
        // await testApiStepDeleteRequest(driver , listElements);
        await testApiStepPutRequest(driver , listElements);

        
        //verify by checking text of h2 with id long-button
        // await testComment(driver,listElements); 
        
        // await testResponse(driver,listElements); 
      

        // const AddStepsRefrenceScreenshot = await driver.takeScreenshot();
        // fs.writeFileSync('./refrenceImage/AddStepsRefrenceScreenshot.png' , AddStepsRefrenceScreenshot , 'base64');

        // const AddStepsTestScreenshot = await driver.takeScreenshot();
        // fs.writeFileSync('./specs/AddStepsTestScreenshot.png' , AddStepsTestScreenshot   , 'base64');
        
        // const comparisonResult = await compareImages('./refrenceImage/AddStepsRefrenceScreenshot.png', './specs/AddStepsTestScreenshot.png');
        // fs.writeFileSync('./comparisonImage/comparisonAddSteps.png', comparisonResult.getBuffer());
        
        // console.log('Image comparison result:', comparisonResult);
        // resolve();

    }
    catch(err){
        console.log(err);
    }
};

testAddSteps();
