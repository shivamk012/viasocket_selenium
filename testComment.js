let constants = require('./constants');
const {until , By ,Key} = require('selenium-webdriver');
async function testComment(driver , listElements){
    try{
        await listElements[5].click();
        await driver.wait(until.elementLocated(By.id('editCommentInputField')) , 10000);
        const add_comment=await driver.findElement(By.id('editCommentInputField'));
        await add_comment.sendKeys("my first comment");
        await add_comment.sendKeys(Key.RETURN)
        await driver.sleep(2000);
    }
    catch(err){
        console.log(err);
    }
    finally{
        await driver.quit();
    }
}

module.exports=testComment;
