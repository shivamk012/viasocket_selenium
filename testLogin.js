const {Builder , By , Capabilities , until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const { Command } = require('selenium-webdriver/lib/command');
const assert = require('assert');
const constants = require('./constants');
const percySnapshot = require('@percy/selenium-webdriver');

const testData = ['test1@test1.com' , '12345678'];
const firstName = "Jfdsjdfh";

describe('Login' , () => {
  let driver;

  before(async() => {
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
    const caps = new Capabilities();
    caps.set('goog:chromeOptions', {
      debuggerAddress: 'https://dev-flow.viasocket.com/', // Address to connect to Chrome DevTools Protocol
    });
    chromeOptions.set('chromeOptions', caps);

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

        await percySnapshot(driver, 'Viasocket-Homepage');
        resolve();
      }catch(err){
      reject(err)
      }})
    })

    after(async() => {
      await driver.quit();
    })
  });
