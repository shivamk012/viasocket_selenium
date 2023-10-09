const dotenv = require('dotenv');
dotenv.config();
const {Builder , By , Capabilities , until, Key} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const constants = require('./constants');

const projectName = ['new test project2'];
const testData = ['test1@test1.com' , '12345678'];
const fs = require('fs');
const resemble = require('resemblejs');


async function compareImages(imagePath1, imagePath2) {
  return new Promise((resolve, reject) => {
    resemble(imagePath1)
      .compareTo(imagePath2)
      .onComplete(data => resolve(data))
      .ignoreLess()
      .onComplete(data => resolve(data));
  });
}


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

        await driver.sleep(5000);

        // Find the button with text "Create New Org" using XPath
        const createProjectButton = await driver.findElement(By.tagName('button'));
        await createProjectButton.click();
        await driver.wait(until.elementLocated(By.tagName('label')), 10000);
        // await driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
        const projectTitleLabel = await driver.findElement(By.css('label'));
        const projectTitleInputDiv = await projectTitleLabel.findElement(By.xpath('.//..'));
        const projectTitleInput = await projectTitleInputDiv.findElement(By.css('input'));
        await projectTitleInput.sendKeys(projectName[0] , Key.RETURN);


        //verify by checking text of h2 with id long-button


        const CreateProjectRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/CreateProjectRefrenceScreenshot.png' , CreateProjectRefrenceScreenshot , 'base64');
        const CreateProjectTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/CreateProjectTestScreenshot.png' , CreateProjectTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/CreateProjectRefrenceScreenshot.png', './specs/CreateProjectTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonCreateProject.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        resolve();


    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}


testCreateProject();

