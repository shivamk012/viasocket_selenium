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
}