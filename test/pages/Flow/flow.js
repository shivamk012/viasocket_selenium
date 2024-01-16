const Projects = require('../Project/projects');
const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const getButtonHavingText = require('../../../utilities/getButtonHavingText');
const fs = require('fs');

class FlowPage extends Projects{
    constructor(){
        super();
        this.driver = super.Driver;
        this.pageUrl = '';
        this.webHookUrl = '';
        this.navbarButtons = [];
        this.steps = [];
        this.apiEditPanel = '';
        this.apiResponsePanel = '';
        this.apiContent = '';
        this.dryRunButton = '';
        this.createButton = '';
        this.addStepsMainContainer = '';
        this.listOfStepsNewFlow = [];
        this.menuButtonStep = '';
    }

    async waitForFlowPageToOpen(){
        await this.driver.wait(until.urlContains(endpoints.WORKFLOWS) , 10000);
        this.pageUrl = await this.driver.getCurrentUrl();
    }

    async getNavBarButton(){
        const navbar = await this.driver.findElement(By.css('[class*="navbar"]'));
        this.navbarButtons = await navbar.findElements(By.css('button'));
    }

    async clickOnEditButton(){
        await this.getNavBarButton();
        const editButton = await getButtonHavingText(this.navbarButtons , 'EDIT');
        await editButton.click();
        await super.waitForEndpoint(endpoints.EDIT , 10000);
    }

    async DragAndDrop(){
        try{
            await super.waitForContentToLoad(By.id("#addStepsMainContainer") , 10000);
            const divContainer = await this.driver.findElement(By.id("#addStepsMainContainer"));
            console.log("Element found")
            const dragElement = await divContainer.findElements(By.id("hoverIconContainer"));
            if (dragElement.length>1) {
                console.log("Drag element")
            }else{
                console.log("No element to drag");
            }
            const firstElement = dragElement[0];
            const secondElement = dragElement[1];
            await this.driver.actions().move({origin : firstElement}).press().dragAndDrop(firstElement , secondElement).perform();
        }catch(error){
            console.error('Error',error);
        }
    } 

    async updateAddStepsMainContainer(){
        this.addStepsMainContainer = await this.driver.findElement(By.css('[class*="addStepsMainContainer"]'));
    }

    async searchForStep(stepName){
        await this.updateAddStepsMainContainer();
        const searchStepsDiv = await this.addStepsMainContainer.findElement(By.css('[class*="createFunction"]'));
        const searchStepsInput = await searchStepsDiv.findElement(By.css('input'));
        await searchStepsInput.click();
        await searchStepsInput.sendKeys(stepName);
    }

    async clickOnAddSteps(){
        const workflow = await this.driver.findElement(By.css('[class*="workflow__flow"]'));
        // NOTE:  Iske alava koi option nai mila content load ke wait karne ka. input elements 5 hai page pe to input ke liye wait ni kar sakte
        await super.waitForContentToLoad(By.xpath('//*[text() = "Do"]') , 10000); 
        const addStepsButton = await workflow.findElements(By.css('input'));
        await this.driver.executeScript('arguments[0].scrollIntoView(true)' , addStepsButton[1]);
        await addStepsButton[1].click();
    }

    async getAllStepsNewFlow(){
        const stepsParentDiv = await this.driver.findElement(By.css('[class*="createfunction"]'));
        this.listOfStepsNewFlow = await stepsParentDiv.findElement(By.css('button'));
    }

    async getAllStepsUsedFlow(){
        await super.waitForContentToLoad(By.xpath('//span[text() = "MSG91"]') , 100000);
        const divElementsInBody = await this.driver.findElements(By.xpath('//body/div'));
        const [listComponent] = divElementsInBody.slice(-1);
        this.steps = await listComponent.findElements(By.css('li'));
    }

    async getAllSteps(){
        await super.waitForContentToLoad(By.css('[class*="createfunction"]') , 10000);
        const stepsParentDiv = await this.driver.findElement(By.css('[class*="createfunction"]'));
        this.steps = await stepsParentDiv.findElements(By.css('button'));
    }

    async clickOnStep(index){
        await this.steps[index].click();
        await super.waitForContentToLoad(By.css(`[class*=${process.env.CUSTOM_SLIDER_CLASS}]`) , 10000);
        await this.driver.sleep(1000);
    }

    async clickOnComment(index){
        await this.steps[index].click();
    }

    async fillStepName(stepName){
        const stepNameInput = await this.driver.findElement(By.id(process.env.STEP_NAME_ID));
        await stepNameInput.sendKeys(stepName);
        await this.driver.sleep(2000);
    }
    
    async getStepName(){
        const stepNameInput = await this.driver.findElement(By.id(process.env.STEP_NAME_ID));
        const stepname = await stepNameInput.getAttribute('value');
        return stepname;
    }

    async initialiseApiSlider(){
        try{
            const accordions = await this.driver.findElements(By.id(process.env.STEP_PANEL_ID));
            this.apiResponsePanel = accordions[1];
            this.apiEditPanel = accordions[0];
            this.apiContent = await this.driver.findElement(By.id(process.env.STEP_PANEL_CONTENT_ID));
            const buttons = await this.apiContent.findElements(By.css('button'));
            await super.waitForContentToBeVisible(buttons[0] , 10000);
            this.dryRunButton = await getButtonHavingText(buttons , process.env.DRY_RUN_BUTTON_TEXT);
        }catch(err){
            console.log(err);
        }
    }


    async fillUrl(url){
        let apiUrlInputField = await this.apiContent.findElement(By.id(process.env.API_URL_INPUTDIV_ID));
        await apiUrlInputField.click();
        apiUrlInputField = await this.apiContent.findElement(By.id(process.env.API_URL_INPUTDIV_ID));
        await apiUrlInputField.sendKeys(url , Key.ENTER);
        
        // NOTE: need to click outside otherwise dry will consider url.
        await this.apiContent.click();
    }

    async getUrl(){
        let apiUrlInputField = await this.apiContent.findElement(By.id(process.env.API_URL_INPUTDIV_ID));
        const url = await apiUrlInputField.getText();
        return url;
    }

    async clickOnDryRunButton(){
        await this.dryRunButton.click();
        await super.waitForContentToLoad(By.css('.object-key-val') , 30000);
        const responseContent = await this.driver.findElement(By.id(process.env.RESPOSNE_CONTENT_PANEL_ID));
        await this.driver.executeScript('arguments[0].scrollIntoView(true)' , responseContent);
    }

    async getResponseData(){
        const responseContent = await this.driver.findElement(By.id(process.env.RESPOSNE_CONTENT_PANEL_ID));
        const response = await responseContent.getText();
        return response;
    }

    async getResponsDataVariableStep(){
        await super.waitForContentToLoad(By.id('json-pretty') , 10000);
        const text = await this.getResponseData();
        return text;
    }

    async takeVariableResponseScreenShot(imagePath){
        await super.waitForContentToLoad(By.id('json-pretty') , 10000);
        const responseContent = await this.driver.findElement(By.id(process.env.RESPOSNE_CONTENT_PANEL_ID));
        await super.takeScreenShotAndCrop(responseContent , imagePath);
    }

    async takeResponseScreenShot(imagePath){
        const responseContent = await this.driver.findElement(By.id(process.env.RESPOSNE_CONTENT_PANEL_ID));
        await super.takeScreenShotAndCrop(responseContent , imagePath);
    }

    async takeScreenShotWorkFlow(imagePath){
        const flow = await this.driver.findElements(By.css('[class*="workflow__flow"]'));
        await super.takeScreenShotAndCrop(flow[1] , imagePath);
    }

    async clickOnCreateButton(isVar){
        const saveButton = isVar ? process.env.VARIABLE_SAVE_BUTTON : process.env.SAVE_BUTTON_TEXT;
        this.createButton = await this.driver.findElement(By.xpath(`//button[text() = "${saveButton}"]`));
        this.driver.executeScript("arguments[0].scrollIntoView(true);", this.createButton);
        await this.createButton.click();
    }

    async waitForStepToCreate(){
        await super.waitForContentToLoad(By.css('[class*="actionButton"]') , 100000);
    }

    async clickOnMenuButtonOfStep(){
        this.menuButtonStep = await this.driver.findElement(By.css('class*="actionButton"'));
        await  this.menuButtonStep.click();
    }

    async clickOnVariableSliderAccordion(){
        const accordions = await this.driver.findElements(By.css('[class*="variableslider__accordion"]'));
        await accordions[0].click();
        await super.waitForContentToLoad(By.xpath('//button[text() = "Update"]') , 10000);
    }

    async selectApiMethod(methodTypeIndex){
        const apiMethodDropDown = await this.apiContent.findElement(By.css('input'));
        const requestMethodDiv = await apiMethodDropDown.findElement(By.xpath('.//..'));
        await requestMethodDiv.click();

        const allDivElements = await this.driver.findElements(By.css('div'));
        const [requestMethodListDiv] = allDivElements.slice(-2);

        const requestMethodList = await requestMethodListDiv.findElements(By.css('li'));
        await requestMethodList[methodTypeIndex].click();
        await super.waitForContentToBeNotVisible(requestMethodListDiv , 10000);
    }

    async getSelectedApiMethod(){
        const apiMethodDropDown = await this.apiContent.findElement(By.css('input'));
        const text = await apiMethodDropDown.getAttribute('value');
        return text.toUpperCase();
    }

    async sendBodyData(requestMethodIndex){
        if(requestMethodIndex === 1 || requestMethodIndex === 2 || requestMethodIndex === 4){
            const textEditorDiv = await this.apiContent.findElement(By.id('jsonEditor'));
            const textEditor = await textEditorDiv.findElement(By.css('textarea'));
            if(requestMethodIndex === 1) await textEditor.sendKeys(process.env.POST_REQUEST_BODY);
            else await textEditor.sendKeys(process.env.PUT_REQUEST_BODY);
            await this.driver.sleep(1000);
        } 
    }

    async createAPI1(){
        await this.clickOnStep()
        await this.driver.sleep(4000);
        const apiname=await this.driver.findElement(By.id("function-title-textfield"));
        await this.driver.wait(until.elementIsVisible(apiname),4000);
        await apiname.click()
        await apiname.sendKeys("jokes_API");
        await apiname.sendKeys(Key.ENTER);
        const api=await this.driver.findElement(By.id("requestInput"))
        await api.click();
        await api.sendKeys("https://v2.jokeapi.dev/joke/Any?type=single");
        //now we fetch Dry Run ----- Save ----- Debug ...... Button
        const listButtons=await this.driver.findElement(By.className("apiActionContainer MuiBox-root css-0"));
        const buttonArray=await listButtons.findElements(By.tagName("button"));
        console.log(buttonArray);
        await buttonArray[0].click(); //this is for DRY RUN the API
        await this.driver.sleep(3000);
        await buttonArray[1].click();  //this is for SAVE of API
        await this.driver.findElement(By.xpath("//div[@class='flex-end-center MuiBox-root css-0']//div[2]")).click() //press cross button
    }

    async fillVariableName(name){
        await super.waitForContentToLoad(By.id(process.env.VARIABLE_NAME_FIELD_ID) , 10000);
        const var_name=await this.driver.findElement(By.id(process.env.VARIABLE_NAME_FIELD_ID));
        await var_name.click();
        await var_name.sendKeys(name);
    }

    async getVariableName(){
        const varName=await this.driver.findElement(By.id(process.env.VARIABLE_NAME_FIELD_ID));
        // const varNameParent = await varName.findElement(By.xpath('.//..'));
        // const varNameHolder = await varNameParent.findElement(By.css('span'));
        const text = await varName.getAttribute('value');
        return text;
    }

    async takeScreenShotFunctionSlider(imagePath){
        const stepNameInput = await this.driver.findElement(By.css('[class*="custom_slider__halfscreen"]'));
        await this.driver.executeScript('arguments[0].scrollIntoView(true)' , stepNameInput);
        await super.takeScreenShotAndCrop(stepNameInput , imagePath);
    }

    async takeScreenShotVariableSlider(imagePath){
        await super.waitForContentToLoad(By.css('[class*="variableinput"]') , 10000);
        const slider = await this.driver.findElement(By.css('[class*="functionsliderbody"]'));
        const sliderparent = await slider.findElement(By.xpath('.//..'));
        await super.takeScreenShotAndCrop(sliderparent , imagePath);
    }

    async fillVariableValue(value){
        const variableSlideCustomSuggestDiv = await this.driver.findElement(By.css('[class*="variableinput"]'));
        await variableSlideCustomSuggestDiv.click();
        const variableCustomSuggestInputs = await variableSlideCustomSuggestDiv.findElements(By.css('div'));
        const [variableValueDiv] = variableCustomSuggestInputs.slice(-1);
        await variableValueDiv.sendKeys(value);
    }

    async selectPlugin(searchTerm){
        let plug = '';
        for(let i=0 ; i<this.steps.length ; ++i){
            const text = await this.steps[i].getText();
            if(text === searchTerm) plug = this.steps[i]; 
        }
        if(!plug) await plug.click();
    }

    async getVariableValue(){
        const variableSlideCustomSuggestDiv = await this.driver.findElement(By.css('[class*="variableinput"]'));
        await variableSlideCustomSuggestDiv.click();
        const variableCustomSuggestInputs = await variableSlideCustomSuggestDiv.findElements(By.css('div'));
        const [variableValueDiv] = variableCustomSuggestInputs.slice(-1);
        const varValue = await variableValueDiv.getText();
        return varValue;
    }

    async createVariable(){
        await this.clickOnAddStepsButton();
        const varstep=await this.listOfSteps();
        await varstep[2].click();
        await this.driver.sleep(2000);
        const var_name=await this.driver.findElement(By.xpath("//input[@id='outlined-basic']"));
        await var_name.sendKeys("joke");
        const var_value=await this.driver.findElement(By.className("custom-suggest-style MuiBox-root css-0"));
        await var_value.click();
        await var_value.sendKeys("context?.res?.jokes_API?.joke");
        await this.driver.findElement(By.xpath("//button[text()='Create Variable']")).click();
        await this.driver.findElement(By.xpath("//div[@class='flex-end-center MuiBox-root css-0']//div[2]")).click();  //press cross button
    }

    async createIfCondition(){
        await this.clickOnAddStepsButton();
        const varstep=await this.listOfSteps();
        await varstep[1].click();
        await this.driver.sleep(2000);
        await this.driver.findElement(By.className("MuiChip-root MuiChip-filled MuiChip-sizeMedium MuiChip-colorDefault MuiChip-filledDefault css-1v6s4sg")).click();
        const condition=await this.driver.findElement(By.id("editableDividForIfBlock"));
        await condition.sendKeys("typeof(context.vals.joke)=='string'");
        await this.driver.findElement(By.xpath("//button[text()='Create']")).click();
        await this.driver.findElement(By.xpath("//div[@class='flex-end-center MuiBox-root css-0']//div[2]")).click();  //press cross button
    }

    async createFunction(){
        await this.clickOnAddStepsButton();
        const varstep=await this.listOfSteps();
        await varstep[7].click();
        await this.driver.sleep(2000);
        const function_name=await this.driver.findElement(By.id("function-title-textfield"));
        await function_name.click();
        await function_name.sendKeys("add_string");
        await function_name.sendKeys(Key.ENTER);       
        const textAreaDiv = await this.driver.findElement(By.id('functionScript'));
        const textArea = await textAreaDiv.findElement(By.xpath('.//textarea'));
        await textArea.sendKeys('return context.vals.joke+" Created By Sushil Lodhi....."');
        await this.driver.findElement(By.xpath("//div[@class='MuiBox-root css-0']//button[@type='button'][normalize-space()='Dry Run']")).click();
        await this.driver.findElement(By.xpath("//div[@class='MuiBox-root css-0']//button[@type='button'][normalize-space()='Save']")).click();
        await this.driver.findElement(By.xpath("//div[@class='flex-end-center MuiBox-root css-0']//div[2]")).click();
    }

    async createAPI2(){
        await this.clickOnAddStepsButton();
        const apistep=await this.listOfSteps();
        await apistep[0].click();
        await this.driver.sleep(4000);
        const apiname=await this.driver.findElement(By.id("function-title-textfield"));
        await this.driver.wait(until.elementIsVisible(apiname),4000);
        await apiname.click()
        await apiname.sendKeys("send_joke");
        await apiname.sendKeys(Key.ENTER);
        const api=await this.driver.findElement(By.id("requestInput"))
        await api.click();
        await api.sendKeys("https://flow.sokt.io/func/u4h5aFCxz7C9");
        //now we fetch Dry Run ----- Save ----- Debug ...... Button
        const requests=await this.driver.findElement(By.xpath('//div[@aria-label="Without label"]'));
        await requests.click();
        // const requestlist=await this.driver.findElement(By.className("MuiList-root MuiList-padding MuiMenu-list css-6qpmy0"));
        // const requestArray=await requestlist.findElement(By.tagName("li"));
        // console.log(requestArray);
        // await requestArray[1].click();
        await this.driver.findElement(By.xpath("//li[text()='POST']")).click();
        const content="{'name':'Sushil'}"
        const textAreaDiv = await this.driver.findElement(By.id('jsonEditor'));
        const textArea = await textAreaDiv.findElement(By.xpath('.//textarea'));
        await textArea.sendKeys(content);
        // const queryParams=await this.driver.findElement(By.className("paramsCustomAutoSuggest border-1 bg-white MuiBox-root css-0"));
        // await queryParams.sendKeys(content);
        const listButtons=await this.driver.findElement(By.className("apiActionContainer MuiBox-root css-0"));
        const buttonArray=await listButtons.findElements(By.tagName("button"));
        console.log(buttonArray);
        await buttonArray[1].click();  //this is for SAVE of API
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath("//div[@class='flex-end-center MuiBox-root css-0']//div[2]")).click() //press cross button
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath("//button[text()='Dry Run']")).click();

        const dryRun=await this.driver.findElement(By.className("flex-start-end p-1 MuiBox-root css-0"));
        await dryRun.findElement(By.tagName("button")).click();
    }
}

module.exports = FlowPage;