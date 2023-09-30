const login = require('../pages/login');

const loginPage = new login();
const testData = JSON.parse(process.env.USER_DETAILS);

async function testLogin(){
    try{
        await loginPage.open('/');
        await loginPage.enterEmail(testData[0]);
        await loginPage.enterPassword(testData[1]);
        await loginPage.loginUser();
    }
    catch(err){
        console.log(err);
    }
};

module.exports = testLogin;