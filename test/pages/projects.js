const Login = require('./login'); 
const {By , until} = require('selenium-webdriver');// login class extends page class

class Projects extends Login{
    constructor(){
        super();
        this.driver = super.Driver;
        this.orgName = '';
    }

    async orgField(){
        // NOTE: long-button is used for orgtitle and on "..." button of each project 
        const org = await this.driver.findElement(By.id('long-button'));
        this.orgName = await org.getText();
        return org;
    }

    async clickOnOrgButton(){
        const org = await this.orgField();
        const orgDiv = await org.findElement(By.xpath('.//..'));
        await orgDiv.click();
    }

    async orgTitleInputField(){
        await driver.wait(until.elementLocated(By.id('orgtitle')), 10000);
        const orgTitleInput = await driver.findElement(By.id('orgtitle'));
        return orgTitleInput;
    }

    async createNewOrg(title){
        const orgInput = await this.orgTitleInputField();
        await orgInput.sendKeys(title , Key.RETURN);
    }
}

module.exports = Projects;