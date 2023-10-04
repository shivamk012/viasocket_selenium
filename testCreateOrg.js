const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const constants = require('./constants');
const fs = require('fs');
const resemble = require('resemblejs');

const dotenv = require('dotenv');
dotenv.config();

const orgName = ['new org'];
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

async function testCreateOrg(){
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
  const caps = new Capabilities();
  chromeOptions.set('chromeOptions', caps);

  

    const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    try{
        await driver.get(`${process.env.APP_LINK}`);
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
        await driver.wait(until.urlIs(`${[process.env.APP_LINK]}/projects`), 10000);

        // Find the button with text "Create New Org" using XPath
        // const createOrgButton = await driver.findElement(
        // By.xpath('//button[text()= "Create New Org"]'));
        // await createOrgButton.click();
        await driver.wait(until.elementLocated(By.id('orgtitle')), 10000);
        // await driver.wait(until.elementIsVisible(By.id('orgtitle')), 10000);
        const orgTitleInput = await driver.findElement(By.id('orgtitle'));
        await orgTitleInput.sendKeys('New Organization Name' , Key.RETURN);

        const CreateOrgRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/CreateOrgRefrenceScreenshot.png' , CreateOrgRefrenceScreenshot , 'base64');
        const CreateOrgTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/CreateOrgTestScreenshot.png' , CreateOrgTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/CreateOrgRefrenceScreenshot.png', './specs/CreateOrgTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonCreateOrg.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        resolve();

        //verify by checking text of h2 with id long-button

    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

testCreateOrg();