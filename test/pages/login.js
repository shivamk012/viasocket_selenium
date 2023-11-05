const Page = require('./page');
const {By , until, locateWith} = require('selenium-webdriver');

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
        const submitbtn = await this.driver.findElement(By.xpath('//button[@type = "submit"]')); 
        
        await this.driver.actions().click(submitbtn).perform();
        
        await this.driver.wait(until.urlIs(`${process.env.APP_LINK}/projects`), 10000);
    }

    async AskAI(){
        const AskAI = await this.driver.findElement(By.xpath("//button[contains(text(), 'Ask AI')]",10000));
        await AskAI.click();
        const input = await this.driver.wait(until.elementLocated(By.xpath('//*[@id=":rm:"]'), 10000));
        await input.sendKeys("print string jeetverma");
        // const button = await this.driver.findElement(By.className('MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-19mgytu'),10000);
        // await button.click();
        // this.driver.sleep(200000);
        // const buttons = await this.driver.findElements(By.xpath('//button[contains(text(), "Use It")]'));
        // console.log("Last element");
        // if (buttons.length > 0) {
        //     await buttons[buttons.length - 1].click();
        //     console.log("Clicked on the last button.");   
        // }else{
        //     console.log("Button not found");
        // }
    }
}