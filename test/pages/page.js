const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

module.exports = class Page {
    constructor(){
        const chromeOptions = new chrome.Options().windowSize({ width: 1920, height: 1080 });

        this.driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    }

    get Driver(){
        return this.driver;
    }

    async waitForPageToOpen(){
        await this.driver.get(process.env.APP_LINK);
        await this.driver.wait(async() => {
          return this.driver.executeScript('return document.readyState').then(function(readyState) {
            return readyState === 'complete';
          });
        });
    }
    //to go to a URL 
    async open(endpoint){ 
        await this.driver.get(process.env.APP_LINK + endpoint);
        await this.waitForPageToOpen(); 
    }
}