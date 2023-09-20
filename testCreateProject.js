const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

const projectName = ['new test project2'];
const testData = ['test1@test1.com' , '12345678'];

async function testCreateProject(){
    const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });
  const caps = new Capabilities();
  caps.set('goog:chromeOptions', {
    debuggerAddress: 'http://localhost:3000', // Address to connect to Chrome DevTools Protocol
  });
  chromeOptions.set('chromeOptions', caps);

    const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    try{
        await driver.get('http://localhost:3000');
        const emailInput = await driver.findElement(By.id('email'));
        const passwordInput = await driver.findElement(By.id('password'));

        await emailInput.sendKeys(testData[0]);
        await passwordInput.sendKeys(testData[1]);

        const submitbtn = await driver.findElement(By.xpath('//button[@type = "submit"]'));

        await driver.actions().click(submitbtn).perform();
        await driver.wait(until.urlIs('http://localhost:3000/projects'), 10000);

        // Find the button with text "Create New Org" using XPath
        const createProjectButton = await driver.findElement(By.tagName('button'));
        await createProjectButton.click();
        await driver.wait(until.elementLocated(By.id('projectTitle')), 10000);
        // await driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
        const projectTitleInput = await driver.findElement(By.id('projectTitle'));
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