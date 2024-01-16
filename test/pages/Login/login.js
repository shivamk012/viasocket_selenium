const Page = require('../Page/page');
const {By , until} = require('selenium-webdriver');

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
        await this.driver.sleep(5000);
        const currentUrl = await this.driver.getCurrentUrl();
        if(currentUrl.includes("projects")) return;
        const proxuAuth = await this.driver.findElement(By.xpath('//proxy-auth'));
        const shadowRoot = await this.driver.executeScript('return arguments[0].shadowRoot' , proxuAuth);
        const [proxyCrossButton , googleLoginButton] = await shadowRoot.findElements(By.css('button'));
        await googleLoginButton.click();

        await this.driver.wait(until.urlContains('accounts.google.com') , 10000);
        const gmailId = await this.driver.findElement(By.xpath('//div[contains(text() , "@gmail.com")]'));
        await gmailId.click();
    }

    async loginUser(){
        const access_token = super.isDevMode ? process.env.DEV_ACCESS_TOKEN : process.env.PROD_ACCESS_TOKEN;
        await this.driver.executeScript(`window.localStorage.setItem( "proxy_auth_token" , '${access_token}' )`);
        await this.driver.navigate().refresh();
    }

}