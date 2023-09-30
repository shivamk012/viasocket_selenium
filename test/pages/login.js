const Page = require('./page');
const {By , until} = require('selenium-webdriver');

module.exports = class Login extends Page {
    constructor(){
        super();
        this.driver = super.Driver;
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
        console.log(process.env.APP_LINK + endpoint)
        console.log()
        await this.driver.get(process.env.APP_LINK + endpoint);
        await this.waitForPageToOpen(); 
    }

    async getEmailInput(){
        const emailInput = await this.driver.findElement(By.id('email'));
        return emailInput;
    }

    async getPasswordInput(){
        const passwordInput = await this.driver.findElement(By.id('password'));
        return passwordInput;
    }

    async enterEmail(email){
        const emailInput = await this.getEmailInput();
        await emailInput.sendKeys(email);
    }

    async enterPassword(password){
        const passwordInput = await this.getPasswordInput();
        await passwordInput.sendKeys(password);
    }

    async loginUser(){
        const submitbtn = await this.driver.findElement(By.xpath('//button[@type = "submit"]')); 
        
        await this.driver.actions().click(submitbtn).perform();
        
        await this.driver.wait(until.urlIs(`${process.env.APP_LINK}/projects`), 10000);
    }

}