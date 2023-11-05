const Projects = require('./projects');
const endpoints = require('../enums');
const {By,until} = require('selenium-webdriver');
const getButtonHavingText = require('../../utilities/getButtonHavingText');
const axios = require('axios')

class FlowPage extends Projects{
    constructor(){
        super();
        this.driver = super.Driver;
        this.pageUrl = '';
        this.webHookUrl = '';
        this.navbarButtons = [];
        this.steps = [];
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
        const addStepsButton = await workflow.findElement(By.css('input'));
        await addStepsButton.click();
        const divElementsInBody = await workflow.findElements(By.xpath('//body/div'));
        const [listComponent] = divElementsInBody.slice(-1);
        const listElements = await listComponent.findElements(By.css('li'));
    }

    async getAllSteps(){
        const divElementsInBody = await this.driver.findElements(By.xpath('//body/div'));
        const [listComponent] = divElementsInBody.slice(-1);
        this.steps = await listComponent.findElements(By.css('li'));
    }

    async clickOnStep(index){
        await this.steps[index].click();
    }
}

module.exports = FlowPage;