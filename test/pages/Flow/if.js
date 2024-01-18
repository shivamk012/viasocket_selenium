const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const FlowPage=require('./flow');


class IfBlock extends FlowPage{

    constructor(){
        super();
        this.driver = super.Driver;
    }

    async createCondition(confititon_name){
        await super.waitForContentToLoad(By.className("ifblockslider__editbox m-1 MuiBox-root css-0") , 10000);    
        const parentclass=await this.driver.findElement(By.className("ifblockslider__editbox m-1 MuiBox-root css-0"));
        const text_field= await parentclass.findElement(By.className("p-1"));
        await text_field.sendKeys(confititon_name);
        const create=await parentclass.findElement(By.xpath("//*[text()='Create']"));
        await create.click();
    }
 
    async responseOfIfBlock(){
        const responseElement=await this.driver.findElement(By.className('ifblockslider__responsebox__responsecontent border-1 mt-1 pl-1 flex-start-center MuiBox-root css-0'));
        const text=responseElement.getText();
        return text
    }
    
    async crossIfBlock(){
        const cross_icon=await this.driver.findElement(By.xpath("//button[@aria-label='Close']//*[name()='svg']"));
        await cross_icon.click();
    }

}


module.exports=IfBlock;
