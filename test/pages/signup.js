const Page = require('./page');
const {By , until} = require('selenium-webdriver');

module.exports = class SignUp extends Page {
    constructor(){
        super();
        this.driver = super.Driver;
        this.signUpButton = '';
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

    async clickOnCreateAccountButton(){
        await this.driver.wait(until.elementLocated(By.css('h4')) , 10000);

        const createAccountDiv = await this.driver.findElement(By.css('h4'));

        const createAccountBtn = await createAccountDiv.findElement(By.xpath('.//div'));

        await this.driver.actions().click(createAccountBtn).perform();
    }

    async inputUserDetails(userDetails){
        const accountDetailsForm = await this.driver.findElement(By.css('form'));
        const inputElements = await accountDetailsForm.findElements(By.css('input'));

        await inputElements[0].sendKeys(userDetails[0]);
        await inputElements[1].sendKeys(userDetails[1]);
        await inputElements[2].sendKeys(userDetails[2]);
        await inputElements[3].sendKeys(userDetails[3]);
        await inputElements[4].sendKeys(userDetails[4]);

        // storing sign up button to avoid searching for it again when clicking on sign up button
        this.signUpButton = await accountDetailsForm.findElement(By.css('button')); 
    }

    async clickOnSignUp(){
        
        await this.driver.actions().move({origin : this.signUpButton}).click().perform();
        
        await this.driver.wait(until.urlIs(`${process.env.APP_LINK}/projects`), 10000);
    }

}