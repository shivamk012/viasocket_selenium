const dotenv = require('dotenv');
dotenv.config();
const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const constants = require('./constants');
const projectName = ['new test project2'];
const testData = ['test1@test1.com' , '12345678'];

async function testCreateProject(){
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
        await driver.wait(until.urlIs(`${process.env.APP_LINK}/projects`), 10000);

        // Find the button with text "Create New Org" using XPath
        const createProjectButton = await driver.findElements(By.css('button'));
        await createProjectButton[0].click();
        await driver.wait(until.elementLocated(By.tagName('label')), 10000);
        // await driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
        const projectTitleLabel = await driver.findElement(By.tagName('label'));
        const projectTitleInputDiv = await projectTitleLabel.findElement(By.xpath('.//..'));
        const projectTitleInput = await projectTitleInputDiv.findElement(By.tagName('input'));
        await projectTitleInput.sendKeys(projectName[0] , Key.RETURN);

        //verify by checking text of h2 with id long-button

    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

testCreateProject();