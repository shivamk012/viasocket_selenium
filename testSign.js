const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const resemble = require('resemblejs');


const testData = ['shivamji' , 'koolwalji' , 'test1@test1ji.com' , '1234567788' , '1234567788'];

async function compareImages(imagePath1, imagePath2) {
    return new Promise((resolve, reject) => {
      resemble(imagePath1)
        .compareTo(imagePath2)
        .onComplete(data => resolve(data))
        .ignoreLess()
        .onComplete(data => resolve(data));
    });
  }

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

        const SignUpRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/SignUpRefrenceScreenshot.png' , SignUpRefrenceScreenshot , 'base64');
        const SignUpTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/SignUpTestScreenshot.png' , SignUpTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/SignUpRefrenceScreenshot.png', './specs/SignUpTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonSignUp.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        resolve();
        
    }
    catch(err){
        console.log(err);
        reject(err); // Reject the Promise in case of an error
    }finally{
        // driver.quit();
    }
}

module.exports = testSign;