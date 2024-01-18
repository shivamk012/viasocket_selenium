const {Builder, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const resemble = require('resemblejs');
const Jimp = require('jimp');

module.exports = class Page {
    constructor(){
        try{
            // let service = new chrome.ServiceBuilder('C:\\Users\\91702\\Downloads\\chromedriver-win64').build();
            // chrome.setDefaultService(service);
            let options = new chrome.Options();
            // console.log(process.argv);
            
            this.driver = new Builder().setChromeOptions(options).forBrowser('chrome').build();
            // this.driver = new Builder().forBrowser('chrome').build();
            // console.log('Driver created successfully');
            this.isDev = process.argv[2] === "test" || process.argv[3] === "test";
            this.app_link = (this.isDev ? process.env.TEST_LINK : process.env.PROD_LINK);
            this.mode = process.argv[3] === "capture" || process.argv[4] === "capture";
        }
        catch(err){
            console.log(err);
        }
    }

    async compareImages(imagePath1, imagePath2) {
        return new Promise((resolve, reject) => {
          resemble(imagePath1)
            .compareTo(imagePath2)
            .onComplete(data => resolve(data))
            .ignoreLess()
            .onComplete(data => resolve(data));
        });
      }

    get Driver(){
        return this.driver;
    }

    get isCaptureMode(){
        return this.mode
    }

    get isDevMode(){
        return this.isDev
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

    async waitForMultipleElementsToLoad(locator , timer){
        await this.driver.wait(until.elementsLocated(locator) , timer);
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
        // const localStorage = fs.readFileSync('./localStorage.json' , 'utf-8');
        // const parsedLocalStorage = JSON.parse(localStorage);
        // const arrayOfJson = [parsedLocalStorage];
        // await fs.writeFileSync('./arrayofjson.json' , new Buffer(arrayOfJson , 'utf-8'));
        // const keys = Object.keys(parsedLocalStorage);
        // for(const key of keys){
        //     if(key == "persist:root") continue;
        //     console.log(`window.localStorage.setItem( '${key}' , '${parsedLocalStorage[key]}' )`);
        // }
        
        await this.driver.executeScript(`window.localStorage.setItem( "proxy_auth_token" , '${process.env.access_token}' )`);
    }

    async openLink(link){
        await this.driver.get(link);
        await this.waitForPageToOpen(); 
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

    async takeScreenShotAndCrop(element , imagePath){
        // const screenShot = await this.driver.takeScreenshot();
        // const rect = await element.getRect();

        // // Calculate the region to crop
        // const left = rect.x;
        // const top = rect.y;
        // const width = rect.width;
        // const height = rect.height;
        // sharp(screenShot)
        // .extract({ left: left, top: top, width: width, height: height })
        // .toFile('./functionflow.png', function (err) {
        //     if (err) console.log(err);
        // })
        
        const location = await element.getRect();

        // Take a screenshot of the entire page
        const screenshot = await this.driver.takeScreenshot();

        // Use Jimp to process the image
        const image = await Jimp.read(Buffer.from(screenshot, 'base64'));
        
        // Crop the image to the region of the element
        // console.log(location);
        image.crop(location.x, location.y, location.width, location.height);
        
        // Save the cropped image
        if(process.argv[4] === "capture") await image.writeAsync(`./test/ReferenceImages/${imagePath}`);
        else await image.writeAsync(`./test/SpecImages/${imagePath}`);
    }
    
    async compareScreenShot(imagePath){
        return new Promise(async(resolve , reject) => {
            try{
                if(process.argv[4] === "capture") resolve("capture");
                const comparisonResult = await this.compareImages(`./test/ReferenceImages/${imagePath}`, `./test/SpecImages/${imagePath}`);
                fs.writeFileSync(`./test/ComparisonImages/${imagePath}`, comparisonResult.getBuffer());
                resolve(comparisonResult);
            }catch(err){
                reject(err);
            }
        })
    }
}