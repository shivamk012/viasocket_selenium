const {Builder , By , Capabilities , until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const { Command } = require('selenium-webdriver/lib/command');
const assert = require('assert');


const testData = ['test1@test1.com' , '12345678'];
const firstName = "Jfdsjdfh";

// async function testLogin(){
//     const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
//   const caps = new Capabilities();
//   caps.set('goog:chromeOptions', {
//     debuggerAddress: 'https://dev-flow.viasocket.com/', // Address to connect to Chrome DevTools Protocol
//   });
//   chromeOptions.set('chromeOptions', caps);

//     const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
//     try{
//         await driver.get('http://localhost:3000');

//         const emailInput = await driver.findElement(By.id('email'));
//         const passwordInput = await driver.findElement(By.id('password'));

//         await emailInput.sendKeys(testData[0]);
//         await passwordInput.sendKeys(testData[1]);

//         const submitbtn = await driver.findElement(By.xpath('//button[@type = "submit"]'));

//         await driver.actions().click(submitbtn).perform();

//         await driver.wait(until.elementLocated(By.tagName('h3')) , 10000);
//         const name = await driver.findElement(By.tagName('h3'));

//         const text = await name.getText();
//         console.log(text)
//     }
//     catch(err){
//         console.log(err);
//     }finally{
//         // driver.quit();
//     }
// }


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
    try{
      await driver.get('http://localhost:3000');
      const emailInput = await driver.findElement(By.id('email'));
      const passwordInput = await driver.findElement(By.id('password'));

      await emailInput.sendKeys(testData[0]);
      await passwordInput.sendKeys(testData[1]);

      const submitbtn = await driver.findElement(By.xpath('//button[@type = "submit"]'));

      await driver.actions().click(submitbtn).perform();

      await driver.wait(until.elementLocated(By.tagName('h3')) , 10000);
      const name = await driver.findElement(By.tagName('h3'));

      const text = await name.getText();
      assert.strictEqual(text, `Welcome, ${firstName}`);
    }catch(err){
      console.log(err)
    }
  });
})
