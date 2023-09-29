const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

const testData = ['shivam' , 'koolwal' , 'test1@test1.com' , '123456778' , '123456778'];

async function testSign(){
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
  const caps = new Capabilities();
  
  chromeOptions.set('chromeOptions', caps);

    const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    try{
        await driver.get(process.env.APP_LINK);
        await driver.wait(async() => {
            return driver.executeScript('return document.readyState').then(function(readyState) {
              return readyState === 'complete';
            });
          });

        await driver.wait(until.elementLocated(By.css('h4')) , 10000);

        const createAccountDiv = await driver.findElement(By.css('h4'));

        const createAccountBtn = await createAccountDiv.findElement(By.xpath('.//div'));

        await driver.actions().click(createAccountBtn).perform();

        const accountDetailsForm = await driver.findElement(By.css('form'));
        const inputElements = await accountDetailsForm.findElements(By.css('input'));

        await inputElements[0].sendKeys(testData[0]);
        await inputElements[1].sendKeys(testData[1]);
        await inputElements[2].sendKeys(testData[2]);
        await inputElements[3].sendKeys(testData[3]);
        await inputElements[4].sendKeys(testData[4]);


        const signUpButton = await accountDetailsForm.findElement(By.css('button'));

        await driver.actions().move({origin : signUpButton}).click().perform();
    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

module.exports = testSign;