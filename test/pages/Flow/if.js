const {endpoints} = require('../../enums');
const {By,until,Key} = require('selenium-webdriver');
const FlowPage=require('./flow');


class IfBlock extends FlowPage{

    constructor(){
        super();
        this.driver = super.Driver;
    }

    async createCondition(confititon_name){
        const text_field=await this.driver.findElement(By.id("editableDividForIfBlock"));
        await text_field.sendKeys(confititon_name);
        const create=await this.driver.findElement(By.xpath('//button[normalize-space()="Create"]'));
        await create.click();
    }

    async responseOfIfBlock(){
        const responseElement=await this.driver.findElement(By.className('MuiTypography-root MuiTypography-base word_break-all css-oy4d7z'));
        const text=responseElement.getText();
        return text
    }
    
    async crossIfBlock(){
        const cross_icon=await this.driver.findElement(By.xpath("//button[@aria-label='Close']//*[name()='svg']"));
        await cross_icon.click();
    }

}


module.exports=IfBlock;
