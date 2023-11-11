const Projects = require('../pages/Project/projects');
const endpoints = require('../enums');
const {By,until,Key} = require('selenium-webdriver');
//vrt image func
// const fs = require('fs');
// const resemble = require('resemblejs');

// async function compareImages(imagePath1, imagePath2) {
//     return new Promise((resolve, reject) => {
//       resemble(imagePath1)
//         .compareTo(imagePath2)
//         .onComplete(data => resolve(data))
//         .ignoreLess()
//         .onComplete(data => resolve(data));
//     });
//   }

class RenameScript extends Projects{
    constructor(){
        super();
        this.driver = super.Driver;
        this.pageUrl = '';
        this.webHookUrl = '';
        this.navbarButtons = [];
    }

    

    async clickOptions(){
        await this.driver.sleep(3000);
        const dotbutton = await this.driver.findElement(By.xpath(`//div[@id='0']//div[@class='actionBtnContainer flex-center-center MuiBox-root css-0']`));
        await dotbutton.click();
    }

    async clickOnRename(){
        await this.driver.sleep(3000);
        const renameButton = await this.driver.findElement(By.xpath(`//li[normalize-space()='Rename']`));
        await renameButton.click();
        const activeElement = await this.driver.executeScript('return document.activeElement');
        await this.driver.executeScript('arguments[0].select()', activeElement);
        await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
        //empty name
        await this.driver.sleep(3000);
        const edit = await this.driver.findElement(By.xpath(`//div[@class='sliderbox flex flex-grow MuiBox-root css-0']`));
        await edit.click();
    }

    async getScriptName(){
            const select = await this.driver.findElement(By.xpath(`//span[@class='MuiTypography-root MuiTypography-base1 line-height text-overflow-eclipse css-19o2zjz']`));
            const scriptName = await select.getText();
            return scriptName;
    }

    async sendSpaces(){
        await this.clickOptions();
        const renameButton = await this.driver.findElement(By.xpath(`//li[normalize-space()='Rename']`));
        await renameButton.click();
        const activeElement = await this.driver.executeScript('return document.activeElement');
        await this.driver.executeScript('arguments[0].select()', activeElement);
        await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
        //spaces as script name
        await activeElement.sendKeys("             ");
        const edit = await this.driver.findElement(By.xpath(`//div[@class='sliderbox flex flex-grow MuiBox-root css-0']`));
        await edit.click();
    }

    async sendShortName(){
        await this.clickOptions();
        const renameButton = await this.driver.findElement(By.xpath(`//li[normalize-space()='Rename']`));
        await renameButton.click();
        const activeElement = await this.driver.executeScript('return document.activeElement');
        await this.driver.executeScript('arguments[0].select()', activeElement);
        await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
        //length less than 4 char
        await activeElement.sendKeys("less");
        const edit = await this.driver.findElement(By.xpath(`//div[@class='sliderbox flex flex-grow MuiBox-root css-0']`));
        await edit.click();
    }

    // async duplicateScript(){
    //     await this.clickOnNewFlow();
    //     await this.createNewScript("new script");
    //     await this.clickOptions();
    //     const renameButton = await this.driver.findElement(By.xpath(`//li[normalize-space()='Rename']`));
    //     await renameButton.click();
    //     const activeElement = await this.driver.executeScript('return document.activeElement');
    //     await this.driver.executeScript('arguments[0].select()', activeElement);
    //     await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
    //     //duplicate name
    //     await activeElement.sendKeys("new script");
    //     const edit = await this.driver.findElement(By.xpath(`//div[@class='script_slider_large dis-initial']//div[@class='slider__maincotainer normal-width box-sizing-border-box column px-2 gap-3 h-100vh pt-nav MuiBox-root css-0']']`));
    //     await edit.click();
    // }

    async updateScriptName(name){
        await this.clickOptions();
        const renameButton = await this.driver.findElement(By.xpath(`//li[normalize-space()='Rename']`));
        await renameButton.click();
        const activeElement = await this.driver.executeScript('return document.activeElement');
        await this.driver.executeScript('arguments[0].select()', activeElement);
        await this.driver.actions().sendKeys(Key.BACK_SPACE).perform();
        //length less than 4 char
        await activeElement.sendKeys(name);
        const edit = await this.driver.findElement(By.xpath(`//div[@class='sliderbox flex flex-grow MuiBox-root css-0']`));
        await edit.click();
    }
}
module.exports = RenameScript;












