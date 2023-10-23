const {Builder , By , Capabilities , until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const { Command } = require('selenium-webdriver/lib/command');
const assert = require('assert');
const constants = require('./constants');
const resemble = require('resemblejs');
const fs = require('fs');

const testData = ['test1@test1.com' , '12345678'];
const firstName = "Jfdsjdfh";

async function compareImages(imagePath1, imagePath2) {
  return new Promise((resolve, reject) => {
    resemble(imagePath1)
      .compareTo(imagePath2)
      .onComplete(data => resolve(data))
      .ignoreLess()
      .onComplete(data => resolve(data));
  });
}

describe('Login' , () => {
  let driver;

  before(async() => {
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });

    driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  })

  it('should log in successfully', async () => {
    return new Promise(async(resolve , reject) => {
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
        // const screenshot1 = await driver.takeScreenshot();
        // fs.writeFileSync('./refrenceImage/LoginRefrenceScreenshot.png' , screenshot1 , 'base64');

        const screenshot2 = await driver.takeScreenshot();
        fs.writeFileSync('./specs/LoginTestScreenshot.png' , screenshot2   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/LoginRefrenceScreenshot.png', './specs/LoginTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonLogin.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        resolve();
      }catch(err){
      reject(err)
      }})
    })

    after(async() => {
      await driver.quit();
    })
  });
