const {Builder, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const resemble = require('resemblejs');
module.exports = class Page {
    constructor(){
        try{
            let options = new chrome.Options();
            let userDataDir = process.env.USER_PROFILE_DIR;
            console.log(process.argv);
            if(process.argv[3] == "chromeProfile") options.addArguments(`user-data-dir=${userDataDir}`); 
            this.driver = new Builder().setChromeOptions(options).forBrowser('chrome').build();
            console.log('Driver created successfully');
            this.app_link = (process.argv[2] === "test" ? process.env.TEST_LINK : process.env.PROD_LINK);
        }
        catch(err){
            console.log(err);
        }
    }

    get Driver(){
        return this.driver;
    }

    currentUrl(endpoint){
        return this.app_link + endpoint;
    }

    async waitForPageToOpen(){
        await this.driver.wait(async() => {
          return this.driver.executeScript('return document.readyState').then(function(readyState) {
            return readyState === 'complete';
          });
        });
    }

    async waitForEndpoint(endpoint , timer){
        await this.driver.wait(until.urlContains(endpoint) , timer);
    }

    async waitForContentToLoad(locator , timer){
        await this.driver.wait(until.elementLocated(locator) , timer);
    }

    async waitForContentToBeVisible(locator , timer){
        await this.driver.wait(until.elementIsVisible(locator) , timer);
    }

    async waitForContentToBeNotVisible(locator , timer){
        await this.driver.wait(until.elementIsNotVisible(locator) , timer);
    }

    async getLocalStorage(){
        const localStorage = await this.driver.executeScript('return JSON.stringify(window.localStorage)');
        fs.writeFileSync('./localStorage.json' , localStorage , 'utf-8');
    }
    
    async setLocalStorage(){
        const localStorage = fs.readFileSync('./localStorage.json' , 'utf-8');
        const parsedLocalStorage = JSON.parse(localStorage);
        const arrayOfJson = [parsedLocalStorage];
        await fs.writeFileSync('./arrayofjson.json' , new Buffer(arrayOfJson , 'utf-8'));
        const keys = Object.keys(parsedLocalStorage);
        for(const key of keys){
            if(key == "persist:root") continue;
            console.log(`window.localStorage.setItem( '${key}' , '${parsedLocalStorage[key]}' )`);
            await this.driver.executeScript(`window.localStorage.setItem( '${key}' , '${parsedLocalStorage[key]}' )`);
        }
    }

    //to go to a URL 
    async open(endpoint){ 
        console.log(this.currentUrl(endpoint));
        await this.driver.get(this.currentUrl(endpoint));
        await this.waitForPageToOpen(); 
    }

    async close(){
        await this.driver.quit();
    }

    async addBlurToElement(webelement){
        await this.driver.executeScript("arguments[0].style.filter = 'blur(10px)';" , webelement);
    }

    async takeScreenShotAndSave(imagePath){
        const FunctionRefrenceScreenshot = await this.driver.takeScreenshot();
        fs.writeFileSync(imagePath , FunctionRefrenceScreenshot , 'base64');
    }

    async compareScreenShot(referenceImagePath , specImagePath , comparisonImagePath){
        return new Promise(async(resolve , reject) => {
            try{
                const comparisonResult = await compareImages(referenceImagePath, specImagePath);
                fs.writeFileSync(comparisonImagePath, comparisonResult.getBuffer());
                resolve(comparisonResult);
            }catch(err){
                reject(err);
            }
        })
    }
}