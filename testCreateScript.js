const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const constants = require('./constants');
const fs = require('fs');
const resemble = require('resemblejs');

const testData = ['test1@test1.com' , '12345678'];


async function compareImages(imagePath1, imagePath2) {
  return new Promise((resolve, reject) => {
    resemble(imagePath1)
      .compareTo(imagePath2)
      .onComplete(data => resolve(data))
      .ignoreLess()
      .onComplete(data => resolve(data));
  });
}

async function testCreateScript(){
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
  const caps = new Capabilities();
  caps.set('goog:chromeOptions', {
    debuggerAddress: `${constants.app_link}`, // Address to connect to Chrome DevTools Protocol
  });
  chromeOptions.set('chromeOptions', caps);

    const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    try{
        await driver.get(`${constants.app_link}`);
        await driver.wait(async() => {
          return driver.executeScript('return document.readyState').then(function(readyState) {
            return readyState === 'complete';
          });
        });
        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));

        await emailInput.sendKeys(testData[0]);
        await passwordInput.sendKeys(testData[1]);

        const submitbtn = await driver.findElement(By.xpath('//button[@type = "submit"]'));

        await driver.actions().click(submitbtn).perform();
        await driver.wait(until.urlIs(`${constants.app_link}/projects`), 10000);

        // // Find the button with text "Create New Org" using XPath
        // const CreateProjectButton = await driver.findElement(By.tagName('button'));
        // await CreateProjectButton.click();
        // await driver.wait(until.elementLocated(By.id('projectTitle')), 10000);
        // // await driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
        // const projectTitleInput = await driver.findElement(By.id('projectTitle'));
        // await projectTitleInput.sendKeys(projectName[0] , Key.RETURN);
        // await projectTitleInput.sendKeys(Key.RETURN); //hacks ... tell this to dev team 


        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_name__title")]')) , 10000);
        const allProjects = await driver.findElements(By.xpath('//div[contains(@class, "project_name__title")]'));
        await allProjects[0].click();
        await driver.wait(until.elementLocated(By.className('script_slider')));
        const scriptSlider = await driver.findElement(By.className('script_slider'));
        const newScriptButton = await scriptSlider.findElement(By.css('button'));
        await newScriptButton.click();
        
        await driver.wait(until.elementLocated(By.css('[class*="custom-modal"]')));
        const newScriptForm = await driver.findElement(By.css('[class*="custom-modal"]'));
        const scriptInput = await newScriptForm.findElement(By.css('input'));
        await driver.wait(until.elementIsEnabled(scriptInput) , 10000);
        await driver.sleep(2000);
        await scriptInput.sendKeys('test script1' , Key.RETURN);
        //verify by checking text of h2 with id long-button



        const CreateScriptRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./referenceImage/CreateScriptRefrenceScreenshot.png' , CreateScriptRefrenceScreenshot , 'base64');
        const CreateScriptTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/CreateScriptTestScreenshot.png' , CreateScriptTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./referenceImage/CreateScriptRefrenceScreenshot.png', './specs/CreateScriptTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonCreateScript.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        resolve();

    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

testCreateScript();