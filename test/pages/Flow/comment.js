const Projects = require('../Project/projects');
const FlowPage = require('../Flow/flow.js');
const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const getButtonHavingText = require('../../../utilities/getButtonHavingText');
const fs = require('fs');

class Comment extends FlowPage{
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
    async writeComment(comment){
        await this.driver.sleep(2000);
        const commnetField = await this.driver.findElement(By.xpath(`//div[@id='cmtXmkVk']//div[@class='outputcomment__commentvalue commentValue word_break-all MuiBox-root css-0']`));
        //await commnetField.click();
        await this.driver.actions().doubleClick(commnetField).perform();
        await this.driver.actions().sendKeys(comment).perform();
        await this.driver.actions().sendKeys(Key.RETURN).perform();
    }

    async RemoveComment(){
        await this.driver.sleep(2000);
        const commnetField = await this.driver.findElement(By.xpath(`//div[@id='cmtXmkVk']//div[@class='outputcomment__commentvalue commentValue word_break-all MuiBox-root css-0']`));
        //await commnetField.click();
        await this.driver.actions().doubleClick(commnetField).perform();
        await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
        await this.driver.actions().sendKeys(Key.RETURN).perform();
    }
}

module.exports = Comment;