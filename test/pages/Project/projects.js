const {endpoints , actions} = require('../../enums');
const Login = require('../Login/login'); 
const {By , until , Key, Actions} = require('selenium-webdriver');
const getUniqueName = require('../../../utilities/getDate');
const fs = require('fs');
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
        this.listOfOrgs = [];
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
        await super.waitForContentToLoad(By.css('[class*="project-page-cont"]') , 10000);
        const orgNameDiv = await this.driver.findElement(By.css('[class*="project-page-cont"]'));        
        this.orgName = await orgNameDiv.getText();

        const orgNameListButton = await orgNameDiv.findElement(By.css('button'));
        return orgNameListButton;
    }

    async clickOnOrgButton(){
        const orgNameListButton = await this.orgField();
        await orgNameListButton.click();
    }
    
    async fullWebhookfunction(){
        await super.waitForContentToLoad(By.className('masterslider_cont '), 10000);
        const doBlock=await this.driver.findElement(By.className('masterslider_cont'));
        const webClick =await doBlock.findElement(By.className('flex-wrap flex-start-center gap-2 p-2 options-box MuiBox-root css-0'));
        const webhookpick= await webClick.findElement(By.id('0option'));
        webhookpick.click();
        // await super.waitForContentToLoad(By.className('masterslider_cont transition custom_slider custom_slider__halfscreen masterslider_cont__in MuiBox-root css-0'),10000);
        // const webhookDiv=await this.driver.findElement(By.className('flex-spaceBetween-center w-100 gap-1 MuiBox-root css-0'));
        // const saveBtn=await webhookDiv.findElement(By.xpath("//button[contains(text(),'save')]"));
        // saveBtn.click();

    }
    
    async responseFunction(){

        const responseBlockFull=await this.driver.findElement(By.className('workflow  flex-col gap-3 mb-4  MuiBox-root css-0'));
        const resBlock=await responseBlockFull.findElement(By.className('pl-28  w-100  MuiBox-root css-0'));
        await  super.waitForContentToLoad(By.xpath('//*[@id="response"]'), 10000);
        const resBtn=await resBlock.findElement(By.xpath('//*[@id="response"]'));
        resBtn.click();
        await super.waitForContentToLoad(By.className('responseslider column w-100 MuiBox-root css-0'),10000);
        const resSlider= this.driver.findElement(By.className('responseslider column w-100 MuiBox-root css-0')) ;
        const cusBtn= await resSlider.findElement(By.xpath("//*[text()='Custom']"));
        cusBtn.click();
    }

    async customResponseEnter(content){
        await super.waitForContentToLoad(By.className('responseslider__container w-100 column   MuiBox-root css-0'),10000);
        const resSlider= await this.driver.findElement(By.className('mt-1 pos-rel MuiBox-root css-0')) ;
        const contentBtn= await resSlider.findElement(By.xpath("//*[text()='//Write return statement here...']"));
        contentBtn.click();
        contentBtn.sendKeys(content); 
        const saveBtn=await resSlider.findElement(By.xpath("//*[text()='Save']"));
        saveBtn.click();
    }
    async responseOfWebhook(){
        const responseElement=await this.driver.findElement(By.className('MuiTypography-root MuiTypography-h6 response__container__title  css-pbqldk'));
        const text=responseElement.getText();
        return text
    }

    async openListOfOrgs() {
        try {
            await this.clickOnOrgButton();
            await super.waitForContentToLoad(By.css('[class*="overlay_home"]'), 10000);
            
            //     const orgListOpenButton = await this.driver.findElement(By.css('[class*="overlay_home"]'));
            // if (orgListOpenButton) {
            //     await orgListOpenButton.click();
            // } else {
            //     console.error("Org List Open button not found");
            // }
        } catch (error) {
            console.error("Error in openListOfOrgs:", error.message);
        }
    }

 
    async getListOfOrgs(){
        await super.waitForContentToLoad(By.css('[class*="workspace__modal"]') , 10000);
        await this.driver.sleep(2000);
        this.listOfOrgs = await this.driver.findElement(By.css('[class*="workspace__modal"]')).findElements(By.css('[class*="workspace__modal__element"]'));
    }

    async getOrgTitleInputField() {
        try {
            await this.getListOfOrgs();
    
            const [createNewOrgButton] = this.listOfOrgs.slice(-1);
            if (createNewOrgButton) {
                await this.driver.actions().move({ origin: createNewOrgButton }).perform();
                await this.driver.sleep(2000);
                await createNewOrgButton.click();
            } else {
                console.error("Create New Org button not found");
                return null; // Or handle the absence of the button in a way that makes sense for your application
            }
            await super.waitForContentToLoad(By.xpath('//input[@placeholder="Workspace title"]'), 10000);
            const orgInput = await this.driver.findElement(By.xpath('//input[@placeholder="Workspace title"]'));
            if (orgInput) {
                return orgInput;
            } else {
                console.error("Org Title Input field not found");
                return null; // Or handle the absence of the input field
            }
        } catch (error) {
            console.error("Error in getOrgTitleInputField:", error.message);
            return null; // Or handle the error in a way that makes sense for your application
        }
    }


    async createNewOrg(title){
        const orgInput = await this.getOrgTitleInputField();
        this.currentOrgName = getUniqueName('org');
        await orgInput.sendKeys(title || this.currentOrgName , Key.RETURN); 
    }

    async closeListOfOrgs(){
        const orgListParent = await this.driver.findElement(By.css('[class*="workspace__modal"]'));
        await this.driver.actions({move : orgListParent}).perform();
        const buttonToCloseList = await orgListParent.findElement(By.css('button'));
        await buttonToCloseList.click();
    }

    async fetchOrgName(){
        await this.driver.sleep(3000);
        const name_field=await this.driver.findElement(By.css('[class*="workspace__element__text "]'));
        await this.driver.wait(until.elementIsVisible(name_field),3000);
        const name_string=await name_field.getText();
        return name_string;
    }
      
    async sleep_task(time){
        await this.driver.sleep(time);
    }

    async errorBox(){
        const error1 = await this.driver.findElement(By.id('alert-container-0'));
        const pageSource = await this.driver.getPageSource();
        fs.writeFileSync('pageSource.txt' , pageSource , 'utf-8');
        // console.log(error.length);
        const text1 = await error1.getText();
        // const text2 = await error2.getText();`
        // console.log(text1 , text2);
        return text1;
    }

    async switchOrg(index){
        const text=await this.listOfOrgs[index].getText();
        await this.listOfOrgs[index].click();
        return text;
    }
    
    async crossOrgTextField(){
        const errorDiv = this.driver.findElement(By.id('alert-container-0'));
        await this.driver.wait(until.elementTextIs(errorDiv, ''), 10000);
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
    
    async waitForProjectToLoad(){
        await this.driver.wait(until.elementLocated(By.css(`[class*=${process.env.PROJECT_NAME_CLASS}]`) , 10000));
    }
0
    async clickOnProjectName(){
        try{
            await super.waitForMultipleElementsToLoad(By.css(`[class*=${process.env.PROJECT_NAME_CLASS}]`) , 10000);
            await this.driver.sleep(2000);
            this.listOfProjects = await this.driver.findElements(By.css(`[class*=${process.env.PROJECT_NAME_CLASS}]`));
            await this.listOfProjects[0].click();
        }catch(err){
            throw(err);
        }
    }

    async waitForScriptSlider(){
        await super.waitForContentToLoad(By.xpath('//div[contains(@class , "script_slider")]') , 10000);
        this.scriptSlider = await this.driver.findElement(By.xpath('//div[contains(@class , "script_slider")]'));
        await super.waitForContentToBeVisible(this.scriptSlider , 10000);
    }
    
    async clickOnScript(){
        await super.waitForContentToLoad(By.xpath('//span[text() = "FLOWS"]') , 10000);
        const flowTextSpanElement = await this.driver.findElement(By.xpath('//span[text() = "FLOWS"]'));
        this.listOfScripts = await flowTextSpanElement.findElements(By.xpath('following-sibling::div'));
        await this.listOfScripts[0].click();
        await super.waitForEndpoint(endpoints.EDIT , 10000);
    }

    async getListOfScripts(){
        await super.waitForContentToLoad(By.xpath('//span[text() = "FLOWS"]') , 10000);
        const flowTextSpanElement = await this.driver.findElement(By.xpath('//span[text() = "FLOWS"]'));
        this.listOfScripts = await flowTextSpanElement.findElements(By.xpath('following-sibling::div'));
        let nameOfScripts = [];
        for(let i=0 ; i<this.listOfScripts.length ; ++i){
            const text = await this.listOfScripts[i].getText();
            nameOfScripts.push(text);
        }
        return nameOfScripts;
    }

    async clickOnActionButtonMenuOfScript(){
        await this.getListOfScripts();
        const nameOfScript = await this.listOfScripts[0].getText();
        const actionButtonContainer = await this.listOfScripts[0].findElement(By.css('[class*="actionBtnContainer"]'));
        await actionButtonContainer.click();
        await super.waitForContentToLoad(By.id(process.env.ACTION_BUTTONS_DIV_ID) , 10000);
        this.actionButtonDiv = await this.driver.findElement(By.id(process.env.ACTION_BUTTONS_DIV_ID));
        this.actionButtons = await this.actionButtonDiv.findElements(By.css('li'));
        return nameOfScript;
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

    // this will create a new script.
    async clickOnNewFlow(){
        await this.driver.wait(until.elementLocated(By.xpath('//button[text() = "Create new flow"]')) , 10000);
        const newScriptButton = await this.driver.findElement(By.xpath('//button[text() = "Create new flow"]'));
        await newScriptButton.click();
    }

    //deprecated function
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
        await super.takeScreenShotAndSave(actionBtnContainer , imagePath);
    }

    async takeScreenShotActionButtons(imagePath){
        await super.takeScreenShotAndSave(this.actionButtonDiv , imagePath);
    }

    async getListOfProjects(){
        const projectListDiv = await this.driver.findElements(By.css('[class*="project_list__projects"]'));
        const projectList = [];
        for(let i=0 ; i<projectListDiv.length ; ++i){
            const text = await projectListDiv[i].getText();
            projectList.push(text);
        }
        return projectList;
    }

    async getListOfDeletedProjects(){
        await super.waitForContentToLoad(By.xpath('//span[text() = "Deleted Projects"]') , 10000);
        const deletedProjectWebElement = await this.driver.findElement(By.xpath('//span[text() = "Deleted Projects"]'));
        const deletedProjectDiv = await deletedProjectWebElement.findElement(By.xpath('.//../following-sibling::*'));
        // await deletedProjectDiv.click();
        // const deletedProjectsListDiv = await deletedProjectDiv.findElement(By.xpath(''));
        // await super.waitForContentToLoad(By.css(`[class*=${process.env.PROJECT_NAME_CLASS}]`) , 10000);
        const deletedProjectsListWebElements = await deletedProjectDiv.findElements(By.css(`[class*=${process.env.PROJECT_NAME_CLASS}]`));
        console.log(deletedProjectsListWebElements);
        const text = await deletedProjectsListWebElements[0].getText();
        return text;
    }


    async getListOfDeletedScripts(){
        const deletedScriptSpanElement = await this.driver.findElement(By.xpath('//span[text() = "DELETED FLOWS"]'));;
        const deletedScriptsParent = await deletedScriptSpanElement.findElement(By.xpath('.//..'));
        await deletedScriptsParent.click();
        await super.waitForContentToLoad(By.css(`[class*=${process.env.SCRIPT_NAME_CLASS}]`) , 10000);
        const listOfScriptsParentDiv = await deletedScriptsParent.findElement(By.xpath('.//following-sibling::*'));
        const listOfDeletedScripts = await listOfScriptsParentDiv.findElements(By.css(`[class*=${process.env.SCRIPT_NAME_CLASS}]`));
        if(!listOfDeletedScripts.length) return null;
        const text = await listOfDeletedScripts[0].getText();
        return text;
    }

    async getListOfPausedScripts(){
        const pausedScriptSpanElement = await this.driver.findElement(By.xpath('//span[text() = "PAUSED FLOWS"]'));
        const pausedScriptParentDiv = await pausedScriptSpanElement.findElement(By.xpath('.//..'));
        const listOfPausedScripts = await pausedScriptParentDiv.findElements(By.xpath('.//following-sibling::*'));
        if(!listOfPausedScripts.length) return null;
        const pausedScriptName = [];
        for(let i=0 ; i<listOfPausedScripts.length ; ++i){
            const textOfPausedScript = await listOfPausedScripts[i].getText();
            pausedScriptName.push(textOfPausedScript);
        }
        return pausedScriptName;
    }

    async getListOfDeletedScripts(){
        const deletedScriptSpanElement = await this.driver.findElement(By.xpath('//span[text() = "DELETED FLOWS"]'));
        const pausedScriptParentDiv = await deletedScriptSpanElement.findElement(By.xpath('.//..'));
        const listOfDeletedScripts = await pausedScriptParentDiv.findElements(By.xpath('.//following-sibling::*'));
        if(!listOfDeletedScripts.length) return null;
        const deletedScriptName = [];
        for(let i=0 ; i<listOfDeletedScripts.length ; ++i){
            const textOfDeletedScript = await listOfDeletedScripts[i].getText();
            deletedScriptName.push(textOfDeletedScript);
        }
        return deletedScriptName;
    }

    async checkIfClassPresent(className){
        const projectTitleDiv = await this.driver.findElement(By.css(`[class*=${process.env.PROJECT_NAME_CLASS}]`));
        const projectTitleDivParent = await projectTitleDiv.findElement(By.xpath('.//..'));
        const projectTitleClass = await projectTitleDivParent.getAttribute('class');
        return projectTitleClass.includes(className);
    }
}   

module.exports = Projects;