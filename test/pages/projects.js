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
        const orgNameDiv = await this.driver.findElement(By.id('long-button'));
        this.orgName = await orgNameDiv.getText();
        const orgNameParent = await orgNameDiv.findElement(By.xpath('.//..'));
        const orgNameListButton = await orgNameParent.findElement(By.css('div'));
        return orgNameListButton;
    }

    async clickOnOrgButton(){
        const orgNameListButton = await this.orgField();
        await orgNameListButton.click();
    }

    async openListOfOrgs(){
        await this.clickOnOrgButton();
        await this.driver.wait(until.elementLocated(By.id('account-menu')) , 10000);
        const orgListToggleButton = await this.driver.findElement(By.id('account-menu')).findElement(By.css('li'));
        await orgListToggleButton.click();
    }

    async orgTitleInputField(){
        await driver.wait(until.elementLocated(By.id('demo-customized-menu')), 10000);
        const orgList = await driver.findElements(By.id('demo-customized-menu')).findElement(By.css('ul'));
        const createNewOrgButton = await orgList.findElements(By.css('li'))[-1];
        return createNewOrgButton;
    }

    async createNewOrg(title){
        const orgInput = await this.orgTitleInputField();
        await orgInput.sendKeys(title , Key.RETURN);
    }
}   

module.exports = Projects;