const Projects = require('../Project/projects');
const FlowPage = require('../Flow/flow.js');
const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const getButtonHavingText = require('../../../utilities/getButtonHavingText');
const fs = require('fs');

class Function extends FlowPage{
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
    }

    async funName(name){
        await this.driver.sleep(2000);
        const funName = await this.driver.findElement(By.xpath(`//input[@id='function-title-textfield']`));
        await funName.click();
        await funName.sendKeys(Key.CONTROL + "a");
        await funName.sendKeys(Key.DELETE);
        await funName.sendKeys(name);
    }

    async dryrun(){
        await this.driver.sleep(2000);
        const button = await this.driver.findElement(By.xpath(`//div[1]//div[1]//div[2]//div[2]//div[1]//div[1]//div[1]//div[1]//div[2]//div[1]//button[1]`));
        await button.click();
    }

    async create(){
        await this.driver.sleep(2000);
        const createButton = await this.driver.findElement(By.xpath(`//button[normalize-space()='Update']`));
        await createButton.click();
    }

    async writeFunction(){
        await this.driver.sleep(2000);
        const editor = await this.driver.findElement(By(xpath(`/html[1]/body[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/textarea[1]`)));
        await editor.click();
        //await editor.sendKeys("Return true");
    }

    async clearField(){
        await this.driver.sleep(2000);
        const funName = await this.driver.findElement(By.xpath(`//input[@id='function-title-textfield']`));
        await funName.click();
        // await funName.clear();
        const currentValue = await funName.getAttribute('value');
            for (let i = 0; i < currentValue.length; i++) {
                await funName.sendKeys(Key.BACK_SPACE);
            }
        await this.driver.sleep(5000);
        await funName.click();
    }

    async closeFunctionSlider(){
        const closeButton = await this.driver.findElement(By.xpath(`//button[@aria-label='Close']//*[name()='svg']`));
        await closeButton.click();
        await this.driver.sleep(5000);
    }

    async getSuccessMessage() {
        const successMessageElement = await this.driver.findElement(By.css(''));
        await fun.waitForUIChange(); // Update the selector based on your actual success message element
        return await successMessageElement.getText();
    }
    async DragAndDropNoElements() {
        console.log("Simulating no elements to drag");
        // Add logic to handle the case where there are no elements to drag
    }
}

module.exports = Function;