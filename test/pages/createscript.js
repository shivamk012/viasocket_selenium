const Login = require('./login'); 
const {By , until , Key, Actions} = require('selenium-webdriver');// login class extends page class

class Scripts extends Login{
    constructor(){
        super();
        this.driver = super.Driver;
        this.orgName = '';
        this.scriptSlider = '';
    }

    async openProject(){
        // NOTE: long-button is used for orgtitle and on "..." button of each project 
        await super.waitForContentToLoad(By.id('long-button') , 10000);
        const projectDiv = await this.driver.findElement(By.className('project_list flex-col MuiBox-root css-0'));
        const project_list=await projectDiv.findElements(By.tagName("div"));
        //console.log(project_list);
        await project_list[1].click();
    }

    async clickOnNewFlow(){
        await this.driver.sleep(3000);
        const addflowbutton = await this.driver.findElement(By.xpath(`//*[text()='New Flow']`));
        await addflowbutton.click();
    }

    async createNewScript(scriptName){ 
        const field = await this.driver.findElement(By.xpath('/html[1]/body[1]/div[4]/div[3]/div[1]/form[1]/div[2]/div[1]/div[1]/div[1]/input[1]'));
        await field.sendKeys(scriptName,Key.ENTER); 
    }
    
    async multipleEnterClick(scriptName){
        const field = await this.driver.findElement(By.xpath('/html[1]/body[1]/div[4]/div[3]/div[1]/form[1]/div[2]/div[1]/div[1]/div[1]/input[1]'));
        await field.sendKeys(scriptName);
        await this.driver.sleep(3000) 
        for (let i=0;i<5;i++) {
            await field.sendKeys(Key.ENTER);
          }
    }

    async multipleButtonClick(scriptName){
        const field = await this.driver.findElement(By.xpath('/html[1]/body[1]/div[4]/div[3]/div[1]/form[1]/div[2]/div[1]/div[1]/div[1]/input[1]'));
        await field.sendKeys(scriptName);
        const button = await this.driver.findElement(By.xpath('/html[1]/body[1]/div[4]/div[3]/div[1]/form[1]/div[2]/div[2]/button[1]'))
        for(let i=0;i<5;i++){
            await button.click();
        }
    } 
}   

module.exports = Scripts;