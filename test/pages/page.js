const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

module.exports = class Page {
    constructor(){
        
        try{
        let options = new chrome.Options();
        let userDataDir = 'C:\\Users\\hp\\AppData\\Local\\Google\\Chrome\\User Data';
        options.addArguments(`user-data-dir=${userDataDir}`);

        this.driver = new Builder().setChromeOptions(options).forBrowser('chrome').build();
        console.log('Driver created successfully');
        // const chromeOptions = new chrome.Options();
        // chromeOptions.addArguments('--user-data-dir=C:\\Users\\hp\\AppData\\Local\\Google\\Chrome\\User Data'); // Replace with your Chrome user data directory
        // chromeOptions.addArguments('--profile-directory=C:\Users\hp\AppData\Local\Google\Chrome\User Data\Profile 1'); // Replace with your Chrome profile directory

        }
        catch(err){
            console.log(err);
        }
    }

    get Driver(){
        return this.driver;
    }

    async waitForPageToOpen(){
        await this.driver.wait(async() => {
          return this.driver.executeScript('return document.readyState').then(function(readyState) {
            return readyState === 'complete';
          });
        });
    }
    //to go to a URL 
    async open(endpoint){ 
        console.log(process.env.APP_LINK + endpoint);
        await this.driver.get(process.env.APP_LINK + endpoint);
        await this.waitForPageToOpen(); 
    }
}