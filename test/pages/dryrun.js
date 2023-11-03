const Login = require('./login'); 
const {By , until , Key, Actions} = require('selenium-webdriver');// login class extends page class

class dryrun extends Login{
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
        await project_list[1].click();
    }

    async openscript(){
        await this.driver.sleep(3000);
        const scriptDiv = await this.driver.findElement(By.xpath(`(//div[contains(@class,'script_block flex-spaceBetween-center w-100 br-1 p-2 cur-pointer text-overflow-eclipse block MuiBox-root css-0')])[1]`));
        await scriptDiv.click();
    }
    
    async clickonDryrunButton(){
        await this.driver.sleep(3000);
        const scriptDiv = await this.driver.findElement(By.xpath(`//*[text()='Dry Run']`));
        await scriptDiv.click();
    }

    async selectPOSTrequest(){
        await this.driver.sleep(2000);
        const select = await this.driver.findElement(By.className('MuiFormControl-root bg-white css-198mb5z'));
        await select.click();
        const itemToSelect = await this.driver.findElement(By.xpath('//*[text()="POST"]'));
        await itemToSelect.click();

        
    }

    async sendName(name){
        const Name_inputField = await this.driver.findElement(By.xpath(`(//input[@id='name'])[1]`));
        await Name_inputField.click();
        await Name_inputField.sendKeys(name);
    }

    async sendValue(value){
        const valueInputField = await this.driver.findElement(By.xpath('(//input[@id="value"])[1]'));
        await valueInputField.click();
        await valueInputField.sendKeys(value);
    }

    async selectBody_formData(){
        await this.driver.sleep(3000);
        const radioButton1 = await this.driver.findElement(By.className('MuiFormGroup-root MuiFormGroup-row css-p58oka'));
        const rarray=await radioButton1.findElements(By.tagName('label'));
        await rarray[0].click();
        this.sendName('Key');
        this.sendValue('Testing data');
    }

    async formData_01(){
        this.selectBody_formData();
    }

    async finalDryrunButton(){
        await this.driver.sleep(3000);
        const finalDryrunButton = await this.driver.findElement(By.xpath(`//button[@class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation dry-run-btn css-1gn8hqb']`));
        await finalDryrunButton.click();
    }
}   

module.exports = dryrun;