const Page = require('./page');
const {By , until} = require('selenium-webdriver');
const fs = require('fs');

module.exports = class Login extends Page {
    constructor(){
        super();
        this.driver = super.Driver;
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

    async clickOnLoginWithGoogle(){
        const ss = await this.driver.takeScreenshot();
        fs.writeFileSync('./ss.png' , ss , 'base64');
        await this.driver.sleep(5000);
        const proxuAuth = await this.driver.findElement(By.xpath('//proxy-auth'));
        const shadowRoot = await this.driver.executeScript('return arguments[0].shadowRoot' , proxuAuth);
        console.log(shadowRoot);
        const googleBtn = await shadowRoot.findElement(By.xpath('.//button[text() = "Continue with Google"]'));
        const text = await googleBtn.getText();
        fs.writeFileSync('./text.txt' , text , 'utf-8');
        await googleBtn.click();
        // await this.driver.wait(until.elementLocated(By.xpath('//button[contains(. , "Continue with Google")]')) , 10000);
        // const loginWithGoogle = await this.driver.findElement(By.xpath('//button[text() = "Continue with Google"]'));
        // await loginWithGoogle.click();
    }

    async loginUser(){
        const submitbtn = await this.driver.findElement(By.xpath('//button[@type = "submit"]')); 
        
        await this.driver.actions().click(submitbtn).perform();
        
        await this.driver.wait(until.urlIs(`${process.env.APP_LINK}/projects`), 10000);
    }

}