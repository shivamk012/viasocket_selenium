const {endpoints , actions} = require('../../enums');
const Login = require('../Login/login'); 
const {By , until , Key, Actions} = require('selenium-webdriver');// login class extends page class

class Projects extends Login{
    constructor(){
        super();
        this.driver = super.Driver;
        this.orgName = '';
        this.scriptSlider = '';
        this.listOfScripts = '';
        this.actionButtons = [];
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

    async createNewOrg(title){
        const orgInput = await this.getOrgTitleInputField();
        await orgInput.sendKeys(title , Key.RETURN); 
        
    }
    async fetchOrgName(){
        await this.driver.sleep(3000);
        const name_field=await this.driver.findElement(By.css('[class*="css-pzevym"]'));
        await this.driver.wait(until.elementIsVisible(name_field),3000);
        const name_string=await name_field.getText();
        return name_string;
    }
      
    async sleep_task(time){
        await this.driver.sleep(time);
    }

    async errorBox(){
        const error=await this.driver.findElement(By.id("alert-container-0"));
        const text=await error.getText();
        return text
    }
    
    async arrayOfOrgs(){
        const Parent_array=await this.driver.findElement(By.css('[class*="css-1j8ctzr"]'));
        const array=Parent_array.findElements(By.css("li"));
        return await array
    }

    async switcOrg(array,index){
        const text=await array[index].getText();
        await array[index].click();
        return text

    }
    
    async crossOrgTextField(){
        const cross=await this.driver.findElement(By.xpath("//body/div[@role='presentation']/div[@role='presentation']/div[@role='dialog']/form[1]/div[1]//*[name()='svg']"))
        await cross.click();
    }
    
    async clickOnNewProject(){
        await super.waitForContentToLoad(By.css('button') , 60000);
        const newProjectButton = await this.driver.findElements(By.css('button'));
        await newProjectButton[1].click();
        // await this.driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
    }

    
    async createNewProject(projectName){
        await super.waitForContentToLoad(By.css('label') , 10000);
        const projectTitleLabel = await this.driver.findElement(By.css('label'));
        const projectTitleInputDiv = await projectTitleLabel.findElement(By.xpath('.//..'));
        const projectTitleInput = await projectTitleInputDiv.findElement(By.css('input'));
        await projectTitleInput.sendKeys(projectName , Key.RETURN);
        await this.driver.sleep(2000);
    }

    async getAllProjectsText(){
        await this.driver.sleep(2000);
        const element=await this.driver.findElement(By.className('project_list flex-col MuiBox-root css-0'));
        const elements=await element.findElements(By.css("div"));
        const text_array=new Set();
        for(let value of elements){
            const text=await value.getText();
            text_array.add(text);
        }
        text_array.delete('');
        console.log(text_array);
        return text_array;
    }
    
    async clickOnProjectName(){
        await this.driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_name__title")]')) , 10000);
        const allProjects = await this.driver.findElements(By.xpath('//div[contains(@class, "project_name__title")]'));
        await allProjects[0].click();
    }

    async waitForScriptSlider(){
        this.scriptSlider = await this.driver.findElement(By.xpath('//div[contains(@class , "script_slider")]'));
        await super.waitForContentToBeVisible(this.scriptSlider , 10000);
        await super.waitForContentToLoad(By.xpath('.//div[contains(@class , "script_block")]') , 10000);
        this.listOfScripts = await this.scriptSlider.findElements(By.xpath('.//div[contains(@class , "script_block")]'));
    }
    
    async clickOnScript(){
        await this.listOfScripts[0].click();
        await super.waitForEndpoint(endpoints.PUBLISHED , 10000);
    }

    async intitaliseActionButtonsForScript(){
        const actionButtonContainer = await this.listOfScripts[0].findElement(By.css('[class*="actionBtnContainer"]'));
        await actionButtonContainer.click();
        await super.waitForContentToLoad(By.id(process.env.ACTION_BUTTONS_DIV_ID) , 10000);
        const actionButtonsDiv = await this.driver.findElement(By.id(process.env.ACTION_BUTTONS_DIV_ID));
        this.actionButtons = await actionButtonsDiv.findElements(By.css('li'));
    }
    
    async intitaliseActionButtonsForProject(){
        const actionButtonContainer = await this.driver.findElement(By.css('[class*="actionBtnContainer"]'));
        await actionButtonContainer.click();
        await super.waitForContentToLoad(By.id(process.env.ACTION_BUTTONS_DIV_ID) , 10000);
        const actionButtonsDiv = await this.driver.findElement(By.id(process.env.ACTION_BUTTONS_DIV_ID));
        this.actionButtons = await actionButtonsDiv.findElements(By.css('li'));
    }
    
    async pauseProject(){
        await this.intitaliseActionButtonsForProject();
        await this.actionButtons[actions.PAUSE].click();
    }
    
    async deleteProject(){
        await this.intitaliseActionButtonsForProject();
        await this.actionButtons[actions.DELETE].click();
    }

    async renameProject(new_name){
        await this.intitaliseActionButtonsForProject();
        await this.actionButtons[actions.RENAME].click();
        const activeElement = await this.driver.executeScript('return document.activeElement');
        await this.driver.executeScript('arguments[0].select()', activeElement);
        await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
        await activeElement.sendKeys(new_name);
        await activeElement.sendKeys(Key.ENTER);
        await this.driver.sleep(2000);
    }

    async refreshPage(){
        await this.driver.navigate().refresh();
    }

    async pauseScript(){
        await this.intitaliseActionButtonsForScript();
        await this.actionButtons[actions.PAUSE].click();
    }
    
    async deleteScript(){
        await this.intitaliseActionButtonsForScript();
        await this.actionButtons[actions.DELETE].click();
        
    }

    async clickOnNewFlow(){
        await this.driver.wait(until.elementLocated(By.xpath('//button[text() = "New Flow"]')) , 10000);
        const newScriptButton = await this.driver.findElement(By.xpath('//button[text() = "New Flow"]'));
        await newScriptButton.click();
    }

    async createNewScript(scriptName){
        await super.waitForContentToLoad(By.css('[class*="custom-modal"]') , 10000);
        const scriptModal = await this.driver.findElements(By.css('[class*="custom-modal"]'));
        const scriptInput = await scriptModal[1].findElement(By.css('input'));
        await scriptInput.sendKeys(scriptName , Key.RETURN);
    }

}   

module.exports = Projects;