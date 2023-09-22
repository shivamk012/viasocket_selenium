const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const testFunctionStep = require('./testFunctionStep');
const testIfStep = require('./testIfStep');
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


        await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_title")]')) , 10000);
        const allProjects = await driver.findElements(By.xpath('//div[contains(@class, "project_title")]'));
        await allProjects[0].click();
        const scriptSlider = await driver.findElement(By.xpath('//div[contains(@class , "script-slider")]'));
        await driver.wait(until.elementIsVisible(scriptSlider) , 10000);
        const scripBlocks = await scriptSlider.findElements(By.xpath('.//div[contains(@class , "scriptBlock")]'));
        await scripBlocks[0].click();
        
        //TODO
        //check if url of site contains a script id , project id and workflows
        
        await driver.wait(until.elementLocated(By.xpath('//input[contains(@placeholder , "Steps")]')) , 10000);
        const addStepInput = await driver.findElement(By.xpath('//input[contains(@placeholder , "Steps")]'));
        await addStepInput.click();
        
        // const sourceCode = await driver.getPageSource();
        // fs.writeFileSync('./sourceCode.txt' , sourceCode);

        const divElementsInBody = await driver.findElements(By.xpath('//body/div'));
        const [listComponent] = divElementsInBody.slice(-1);
        const listElements = await listComponent.findElements(By.tagName('li'));
        await testFunctionStep(driver , listElements);
        await testIfStep(driver , listElements);

        
        //verify by checking text of h2 with id long-button

    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

testCreateProject();