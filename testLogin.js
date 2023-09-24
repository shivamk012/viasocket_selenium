const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const { Command } = require('selenium-webdriver/lib/command');

const testData = ['shivam' , 'koolwal' , 'shivamkoolwal@gmail.com' , 'abcdefghi' , 'abcdefghi'];

async function checkSignUp(btn){
    const text = await btn.getText();
    return text === "Sign up"; 
}

async function testLogin(){
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
  const caps = new Capabilities();
  caps.set('goog:chromeOptions', {
    debuggerAddress: 'https://dev-flow.viasocket.com/', // Address to connect to Chrome DevTools Protocol
  });
  chromeOptions.set('chromeOptions', caps);

    const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    try{
        await driver.get(`${constants.app_link}`);

        await driver.wait(until.elementLocated(By.tagName('h4')) , 10000);

        const createAccountDiv = await driver.findElement(By.tagName('h4'));

        const createAccountBtn = await createAccountDiv.findElement(By.xpath('.//div'));

        await driver.actions().click(createAccountBtn).perform();

        const inputElements = await driver.findElements(By.tagName('input'));

        await inputElements[0].sendKeys(testData[0]);
        await inputElements[1].sendKeys(testData[1]);
        await inputElements[2].sendKeys(testData[2]);
        await inputElements[3].sendKeys(testData[3]);
        await inputElements[4].sendKeys(testData[4]);

        

        // const buttonsInCreateAccount = await driver.findElement(By.xpath('//button[@type = "submit"]'));

        // const boolArray = await Promise.all(buttonsInCreateAccount.filter(checkSignUp));

        // console.log(signUpBtn);

        // const btn = await buttonsInCreateAccount[1].findElement(By.xpath('.//span'));
        // await driver.executeScript('arguments[0].click();', buttonsInCreateAccount);
        // await driver.actions().click(buttonsInCreateAccount[1]).perform();
        // await inputElements[0].submit();
    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

testLogin();