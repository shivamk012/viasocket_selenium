const {endpoints , actions} = require('../../enums');
const Login = require('../Login/login'); 
const {By , until , Key, Actions} = require('selenium-webdriver');
const getUniqueName = require('../../../utilities/getDate');
// login class extends page class

class Projects extends Login{
    constructor(){
        super();
        this.driver = super.Driver;
        this.orgName = '';
        this.scriptSlider = '';
        this.listOfScripts = '';
        this.actionButtons = [];
        this.actionButtonDiv = '';
        this.listOfProjects = [];
        this.currentOrgName = ''; // stores the value of new org created
        this.currentProjectName = ''; // stores the value of new project created
        this.currentScriptName = ''; // stores the value of new scripts created
    }

    get orgNameInput(){
        return this.currentOrgName;
    }

    get projectNameInput(){
        return this.currentProjectName;
    }

    get scriptNameInput(){
        return this.currentScriptName;
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
        this.currentOrgName = getUniqueName('org');
        await orgInput.sendKeys(title || this.currentOrgName , Key.RETURN); 
    }

    async fetchOrgName(){
        await this.driver.sleep(3000);
        const name_field=await this.driver.findElement(By.id('long-button'));
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
        await super.waitForContentToLoad(By.xpath('//button[text() = "New Project"]') , 10000);
        const newProjectButton = await this.driver.findElements(By.css('button'));
        await newProjectButton[1].click();
        // await this.driver.wait(until.elementIsVisible(By.id('projectTitle')), 10000);
    }

    
    async createNewProject(projectName){
        await super.waitForContentToLoad(By.css('label') , 10000);
        const projectTitleLabel = await this.driver.findElement(By.css('label'));
        const projectTitleInputDiv = await projectTitleLabel.findElement(By.xpath('.//..'));
        const projectTitleInput = await projectTitleInputDiv.findElement(By.css('input'));
        this.currentProjectName = getUniqueName('project');
        await projectTitleInput.sendKeys(projectName || this.currentProjectName, Key.RETURN);
        await this.driver.sleep(2000);
    }

    async getAllProjectsText(){
        await this.driver.sleep(2000);
        const element=await this.driver.findElement(By.className('project_list flex-grow  MuiBox-root css-0'));
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
    
    async waitForProjectToLoad(){
        await this.driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_name__title")]')) , 10000);
    }

    async clickOnProjectName(){
        await this.driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "project_name__title")]')) , 10000);
        this.listOfProjects = await this.driver.findElements(By.xpath('//div[contains(@class, "project_name__title")]'));
        await this.listOfProjects[0].click();
    }

    async waitForScriptSlider(){
        this.scriptSlider = await this.driver.findElement(By.xpath('//div[contains(@class , "script_slider")]'));
        await super.waitForContentToBeVisible(this.scriptSlider , 10000);
    }
    
    async clickOnScript(){
        await super.waitForContentToLoad(By.xpath('.//div[contains(@class , "script_block")]') , 10000);
        this.listOfScripts = await this.scriptSlider.findElements(By.xpath('.//div[contains(@class , "script_block")]'));
        await this.listOfScripts[0].click();
        await super.waitForEndpoint(endpoints.EDIT , 10000);
    }

    async getListOfScripts(){
        await super.waitForContentToLoad(By.xpath('//span[text() = "FLOWS"]') , 10000);
        const flowTextSpanElement = await this.driver.findElement(By.xpath('//span[text() = "FLOWS"]'));
        const scriptListParents = await flowTextSpanElement.findElement(By.xpath('.//..'));
        await super.waitForContentToLoad(By.css('[class*="script_block"]') , 10000);
        this.listOfScripts = await scriptListParents.findElements(By.css('[class*="script_block"]'));
        return this.listOfScripts;
    }

    async clickOnActionButtonMenuScript(){
        await this.getListOfScripts();
        const actionButtonContainer = await this.listOfScripts[0].findElement(By.css('[class*="actionBtnContainer"]'));
        await actionButtonContainer.click();
        await super.waitForContentToLoad(By.id(process.env.ACTION_BUTTONS_DIV_ID) , 10000);
        this.actionButtonDiv = await this.driver.findElement(By.id(process.env.ACTION_BUTTONS_DIV_ID));
        this.actionButtons = await this.actionButtonDiv.findElements(By.css('li'));
    }
    

    async clickOnActionButtonMenuProject(){
        const actionButtonContainer = await this.driver.findElement(By.css('[class*="actionBtnContainer"]'));
        await actionButtonContainer.click();
        await super.waitForContentToLoad(By.id(process.env.ACTION_BUTTONS_DIV_ID) , 10000);
        this.actionButtonDiv = await this.driver.findElement(By.id(process.env.ACTION_BUTTONS_DIV_ID));
        this.actionButtons = await this.actionButtonDiv.findElements(By.css('li'));
    }
    
    async pauseProject(){
        await this.actionButtons[actions.PAUSE].click();
        await this.driver.sleep(2000);
    }
    
    async deleteProject(){
        await this.actionButtons[actions.DELETE].click();
        await this.driver.sleep(2000);
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
        await this.actionButtons[actions.PAUSE].click();
        await this.driver.sleep(2000);
    }
    
    async deleteScript(){
        await this.actionButtons[actions.DELETE].click();
        await this.driver.sleep(2000);
    }

    async clickOnNewFlow(){
        await this.driver.wait(until.elementLocated(By.xpath('//button[text() = "New Flow"]')) , 10000);
        const newScriptButton = await this.driver.findElement(By.xpath('//button[text() = "New Flow"]'));
        await newScriptButton.click();
    }

    async createNewScript(scriptName){
        await super.waitForContentToLoad(By.css('[class*="custom-modal"]') , 10000);
        const scriptModal = await this.driver.findElement(By.css('[class*="custom-modal"]'));
        const scriptInput = await scriptModal.findElement(By.css('input'));
        this.currentScriptName = getUniqueName('script');
        await scriptInput.sendKeys(scriptName || this.currentScriptName, Key.RETURN);
        await this.driver.sleep(5000);
    }

    async hoverOnMenuButton(){
        const actionButtonContainer = await this.driver.findElements(By.id('long-button'));
        await this.driver.actions().move({origin : actionButtonContainer[1]}).pause(1000).perform();
        return actionButtonContainer[1];
    }

    async takeScreenShotOfMenuButton(imagePath){
        const actionBtnContainer = await this.hoverOnMenuButton();
        await super.takeScreenShotAndCrop(actionBtnContainer , imagePath);
    }

    async takeScreenShotActionButtons(imagePath){
        await super.takeScreenShotAndCrop(this.actionButtonDiv , imagePath);
    }

    async getListOfProjects(){
        const projectListDiv = await this.driver.findElements(By.css('[class*="project_list__projects"]'));
        return projectListDiv;
    }

    async getListOfDeletedProjects(){
        await super.waitForContentToLoad(By.xpath('//span[text() = "Deleted Projects"]') , 10000);
        const deletedProjectWebElement = await this.driver.findElement(By.xpath('//span[text() = "Deleted Projects"]'));
        const deletedProjectDiv = await deletedProjectWebElement.findElement(By.xpath('.//../following-sibling::*'));
        // await deletedProjectDiv.click();
        // const deletedProjectsListDiv = await deletedProjectDiv.findElement(By.xpath(''));
        // await super.waitForContentToLoad(By.css('[class*="project_name__title"]') , 10000);
        const deletedProjectsListWebElements = await deletedProjectDiv.findElements(By.css('[class*="project_name__title"]'));
        console.log(deletedProjectsListWebElements);
        const text = await deletedProjectsListWebElements[0].getText();
        return text;
    }


    async getListOfDeletedScripts(){
        const deletedScriptSpanElement = await this.driver.findElement(By.xpath('//span[text() = "DELETED FLOWS"]'));;
        const deletedScriptsParent = await deletedScriptSpanElement.findElement(By.xpath('.//..'));
        await deletedScriptsParent.click();
        await super.waitForContentToLoad(By.css('[class*="script_block"]') , 10000);
        const listOfScriptsParentDiv = await deletedScriptsParent.findElement(By.xpath('.//following-sibling::*'));
        const listOfDeletedScripts = await listOfScriptsParentDiv.findElements(By.css('[class*="script_block"]'));
        if(!listOfDeletedScripts.length) return null;
        const text = await listOfDeletedScripts[0].getText();
        return text;
    }

    async getListOfPausedScripts(){
        const pausedScriptSpanElement = await this.driver.findElement(By.xpath('//span[text() = "PAUSED FLOWS"]'));
        const pausedScriptParentDiv = await pausedScriptSpanElement.findElement(By.xpath('.//..'));
        const listOfPausedScripts = await pausedScriptParentDiv.findElements(By.css('[class*="script_block"]'));
        if(!listOfPausedScripts.length) return null;
        const text = await listOfPausedScripts[0].getText();
        return text;
    }

    async checkIfClassPresent(className){
        const projectTitleDiv = await this.driver.findElement(By.css('[class*="project_name__title"]'));
        const projectTitleDivParent = await projectTitleDiv.findElement(By.xpath('.//..'));
        const projectTitleClass = await projectTitleDivParent.getAttribute('class');
        return projectTitleClass.includes(className);
    }
}   

module.exports = Projects;