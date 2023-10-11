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
    const caps = new Capabilities();

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
        await driver.sleep(1000);
        // const screenshot1 = await driver.takeScreenshot();
        
        //TODO: dont use mui classes
        const Org=await driver.findElement(By.className(`MuiAvatar-root MuiAvatar-rounded`));
        await driver.actions().click(Org).perform();

        const SwitchOrg = await driver.findElement(By.xpath('//ul[@role="menu"]/li[1]'));
        await driver.actions().click(SwitchOrg).perform();

        
        await driver.wait(until.elementLocated(By.id('demo-customized-menu')) , 10000);
        const createNewOrg = await driver.findElement((By.xpath(`//*[@id="demo-customized-menu"]/div[3]/ul/li[8]`)));
        await createNewOrg.click();
        
        const TextField = await driver.findElement(By.id('orgtitle'));
        await TextField.sendKeys("My new Organisation");

        const CreateOrgButton = await driver.findElement(By.className(`MuiButton-containedPrimary`))
        await CreateOrgButton.click();
        
        resolve();
      }catch(err){
      reject(err)
      }})
    })

    after(async() => {
    //   await driver.quit();
    })
});
