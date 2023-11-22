const Projects = require('../Project/projects');
const FlowPage = require('../Flow/flow.js');
const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const getButtonHavingText = require('../../../utilities/getButtonHavingText');
const fs = require('fs');

class Response extends FlowPage{
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

    // async openResponseBlock(){
    //     const field = await this.driver.findElement(By.xpath(`//li[@id=':rl:-option-4']`));
    //     await field.click();
    // }

    async saveResponse(){
        // const editor = await this.driver.findElement(By.xpath(`//div[@class='ace_content']`));
        // await editor.click();
        //await editor.sendKeys("Response");
        await this.driver.sleep(3000);
        const savebutton = await this.driver.findElement(By.xpath(`//button[normalize-space()='Save']`));
        await savebutton.click();
    }

    
}

module.exports = Response;