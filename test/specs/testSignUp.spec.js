const SignUp = require('../pages/signup');

const signUp = new SignUp();
const testData = JSON.parse(process.env.USER_DETAIL_SIGNUP);

async function testSign(){
    try{
        
        await signUp.open('/');
        await signUp.clickOnCreateAccountButton();
        await signUp.inputUserDetails(testData);
        await signUp.clickOnSignUp();
    }
    catch(err){
        console.log(err);
    }finally{
        // driver.quit();
    }
}

module.exports = testSign;