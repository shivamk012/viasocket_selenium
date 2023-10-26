const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const axios = require('axios');
const fs = require('fs');
const getButtonHavingText = require('./utilities/getButtonHavingText')
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
        const scriptSlider = await driver.findElement(By.xpath('//div[contains(@class , "script_slider")]'));
        await driver.wait(until.elementIsVisible(scriptSlider) , 10000);
        await driver.wait(until.elementLocated(By.xpath('.//div[contains(@class , "script_block__title")]')) , 10000);
        const scripBlocks = await scriptSlider.findElements(By.xpath('.//div[contains(@class , "script_block")]'));
        await scripBlocks[0].click();

        await driver.wait(until.urlContains('workflows') , 10000);
        const currentUrl = await driver.getCurrentUrl();
        
        const pattern = "workflows";
        const workflowMatch = /workflow/.exec(currentUrl);
        const publishedMatch = /published/.exec(currentUrl);
        console.log(currentUrl[workflowMatch.index + currentUrl.length - 1] , currentUrl[publishedMatch.index]);
        console.log(`https://flow.sokt.io/func/${currentUrl.substring(workflowMatch.index + pattern.length+1 , publishedMatch.index-1)}`);
        const webhook = `https://flow.sokt.io/func/${currentUrl.substring(workflowMatch.index + pattern.length+1 , publishedMatch.index-1)}?a=1&b=1`;
        const invocationResponse = await axios.post(webhook , {a : 1 , b : 1});
        const logDiv = await driver.findElement(By.css('[class*="workflownavbar__tabs"]'));
        const tabButtons = await logDiv.findElements(By.css('button'));
        console.log(tabButtons);
        const [logButton] = tabButtons.slice(-1);
        console.log(logButton)
        await logButton.click();

        const logData = await driver.findElement(By.css('[class*="workflow"]'));
        const payload = await driver.findElement(By.xpath('.//div[contains(@class , "logs__flowbody")]//span//span'));
        await payload.click()
        // const body = await payload.findElement(By.xpath('.//div[text() = "body"]'));
        // await body.click();

    }
    catch(err){
        console.log(err);
    }
    finally{
      // await driver.quit();
    }
};

testAddSteps();