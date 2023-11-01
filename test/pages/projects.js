const Login = require('./login'); 
const {By , until , Key, Actions} = require('selenium-webdriver');// login class extends page class

class Projects extends Login{
    constructor(){
        super();
        this.driver = super.Driver;
        this.orgName = '';
        this.scriptSlider = '';
    }

    async orgField(){
        // NOTE: long-button is used for orgtitle and on "..." button of each project 
        await super.waitForContentToLoad(By.id('long-button') , 10000);
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

    async waitForProjecPageToLoad(){
        await super.waitForContentToLoad(By.css('[class*="project-page"]') , 10000);
        const projectPage = await this.driver.findElement(By.css('[class*="project-page"]'));
        await super.waitForContentToBeVisible(projectPage);
    }

    async openListOfOrgs(){
        await this.clickOnOrgButton();
        await super.waitForContentToLoad(By.id('account-menu') , 10000);
        const orgListOpenButton = await this.driver.findElement(By.id('account-menu')).findElement(By.css('li'));
        await orgListOpenButton.click();
    }

    async getOrgTitleInputField(){
        await super.waitForContentToLoad(By.id('demo-customized-menu') , 10000);
        const orgList = await this.driver.findElement(By.id('demo-customized-menu')).findElement(By.css('ul'));
        const [createNewOrgButton] = (await orgList.findElements(By.css('li'))).slice(-1);
        await createNewOrgButton.click();
        await super.waitForContentToLoad(By.id('orgtitle') , 10000);
        const orgInput = await this.driver.findElement(By.id('orgtitle'));
        return orgInput;
    }

    async clickOnNewProject(){
        const newProjectButton = await this.driver.findElements(By.tagName('button'));
        await newProjectButton[1].click();
        // await this.driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
    }
    
    async createNewProject(projectName){
        await super.waitForContentToLoad(By.css('label') , 10000);
        const projectTitleLabel = await this.driver.findElement(By.css('label'));
        const projectTitleInputDiv = await projectTitleLabel.findElement(By.xpath('.//..'));
        const projectTitleInput = await projectTitleInputDiv.findElement(By.css('input'));
        await projectTitleInput.sendKeys(projectName , Key.RETURN);
    }

    async clickOnProjectName(){
        await this.driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_name__title")]')) , 10000);
        const allProjects = await this.driver.findElements(By.xpath('//div[contains(@class, "project_name__title")]'));
        await allProjects[0].click();
    }

    async waitForScriptSlider(){
        this.scriptSlider = await this.driver.findElement(By.xpath('//div[contains(@class , "script_slider")]'));
        await super.waitForContentToBeVisible(this.scriptSlider , 10000);
    }
    
    async clickOnScript(){
        await super.waitForContentToLoad(By.xpath('.//div[contains(@class , "script_block")]') , 10000);
        const scripBlocks = await this.scriptSlider.findElements(By.xpath('.//div[contains(@class , "script_block")]'));
        await scripBlocks[0].click();
    }

    async createNewOrg(title){
        const orgInput = await this.getOrgTitleInputField();
        await orgInput.sendKeys(title , Key.RETURN);
    }
}   

module.exports = Projects;