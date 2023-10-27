const Projects = require('./projects');
const endpoints = require('../enums');
const {By,until} = require('selenium-webdriver');
const getButtonHavingText = require('../../utilities/getButtonHavingText');

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
        this.currentUrl = await this.driver.getCurrentUrl();
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
            const divContainer = await this.driver.findElement(By.id("#mainContainer"));
            console.log("Element found")
            const dragElement = await divContainer.findElements(By.id("hoverIconContainer"));
            if (dragElement.length>0) {
                console.log("Drag element")
            }else{
                console.log("DragElement Wala console log");
            }
            const firstElement = dragElement[0]
            const secondElement = dragElement[1]
            const action = this.driver.actions({bridge:'true'});
            await action.move({origin:firstElement}).press().move({origin:secondElement}).release().perform();
        }catch(error){
            console.error('Error',error);
        }
    } 
}

module.exports = FlowPage;