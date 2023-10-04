let constants = require('./constants');
const {until , By ,Key} = require('selenium-webdriver');
const fs = require('fs');
const resemble = require('resemblejs');



async function compareImages(imagePath1, imagePath2) {
    return new Promise((resolve, reject) => {
      resemble(imagePath1)
        .compareTo(imagePath2)
        .onComplete(data => resolve(data))
        .ignoreLess()
        .onComplete(data => resolve(data));
    });
  }

  
async function testComment(driver , listElements){
    try{
        await listElements[4].click();
        await driver.wait(until.elementLocated(By.id('editCommentInputField')) , 10000);
        const add_comment=await driver.findElement(By.id('editCommentInputField'));
        await add_comment.sendKeys("my first comment");
        await add_comment.sendKeys(Key.RETURN)
        await driver.sleep(2000);


        const CommentsRefrenceScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./refrenceImage/CommentsRefrenceScreenshot.png' , CommentsRefrenceScreenshot , 'base64');
        const CommentsTestScreenshot = await driver.takeScreenshot();
        fs.writeFileSync('./specs/CommentsTestScreenshot.png' , CommentsTestScreenshot   , 'base64');
        
        const comparisonResult = await compareImages('./refrenceImage/CommentsRefrenceScreenshot.png', './specs/CommentsTestScreenshot.png');
        fs.writeFileSync('./comparisonImage/comparisonComments.png', comparisonResult.getBuffer());
        
        console.log('Image comparison result:', comparisonResult);
        resolve();

    }
    catch(err){
        console.log(err);
    }
    finally{
        await driver.quit();
    }
}

module.exports=testComment;
