const Projects = require('../Project/projects');
const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const getButtonHavingText = require('../../../utilities/getButtonHavingText');
const axios = require('axios');

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
            await super.waitForContentToLoad(By.id("#mainContainer") , 10000);
            const divContainer = await this.driver.findElement(By.id("#mainContainer"));
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

    async clickOnAddSteps(){
        const workflow = await this.driver.findElement(By.css('[class*="workflow__flow"]'));

        // NOTE:  Iske alava koi option nai mila content load ke wait karne ka. input elements 5 hai page pe to input ke liye wait ni kar sakte
        await super.waitForContentToLoad(By.xpath('//button[text() = "Dry Run"]') , 10000); 
        
        const addStepsButton = await workflow.findElements(By.css('input'));
        await addStepsButton[1].click();
    }

    async getAllSteps(){
        const divElementsInBody = await this.driver.findElements(By.xpath('//body/div'));
        const [listComponent] = divElementsInBody.slice(-1);
        this.steps = await listComponent.findElements(By.css('li'));
    }

    async clickOnStep(index){
        await this.steps[index].click();
        await super.waitForContentToLoad(By.id(`${process.env.STEP_NAME_ID}`) , 10000);
    }

    async fillStepName(stepName){
        const stepNameInput = await this.driver.findElement(By.id(process.env.STEP_NAME_ID));
        await stepNameInput.sendKeys(stepName);
    }

    async fillInput(){
        const [editPanel , responsePanel] = await this.driver.findElements(By.id(process.env.STEP_PANEL_ID));
        this.apiEditPanel = editPanel;
        this.apiResponsePanel = responsePanel;
    }

    async fillUrl(url){
        this.apiContent = await this.driver.findElement(By.id(process.env.STEP_PANEL_CONTENT_ID));
        const apiUrlInputField = await this.apiContent.findElement(By.id(process.env.API_URL_INPUTDIV_ID));
        await apiUrlInputField.sendKeys(url);
    }

    async selectApiMethod(methodTypeIndex){
        const apiMethodDropDown = await this.apiContent.findElement(By.css('input'));
        const requestMethodDiv = await apiMethodDropDown.findElement(By.xpath('.//..'));
        await requestMethodDiv.click();

        const allDivElements = await driver.findElements(By.css('div'));
        const [requestMethodListDiv] = await allDivElements.slice(-2);

        const requestMethodList = await requestMethodListDiv.findElements(By.css('li'));
        await requestMethodList[methodTypeIndex].click();
    }

    async createAPI1(){
        const apistep=await this.listOfSteps();
        await apistep[0].click();
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