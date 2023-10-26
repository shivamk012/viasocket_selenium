const {Builder, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

module.exports = class Page {
    constructor(){
        try{
            let options = new chrome.Options();
            let userDataDir = process.env.USER_PROFILE_DIR;
            options.addArguments(`user-data-dir=${userDataDir}`);

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
        await this.driver.wait(until.urlContains(this.currentUrl(endpoint)) , timer);
    }

    async waitForContentToLoad(locator , timer){
        await this.driver.wait(until.elementLocated(locator) , timer);
    }

    async waitForContentToBeVisible(locator , timer){
        await this.driver.wait(until.elementIsVisible(locator) , timer);
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
}