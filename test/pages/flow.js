const Projects = require('./projects');
const endpoints = require('../enums');
const {By,until} = require('selenium-webdriver');
const getButtonHavingText = require('../../utilities/getButtonHavingText');
const axios = require('axios');

class FlowPage extends Projects{
    constructor(){
        super();
        this.driver = super.Driver;
        this.pageUrl = '';
        this.webHookUrl = '';
        this.navbarButtons = [];
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
}

module.exports = FlowPage;