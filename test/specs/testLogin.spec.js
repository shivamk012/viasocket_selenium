const login = require('../pages/login');
const endpoints = require('../enums');

const loginPage = new login();

async function testLogin(){
    try{
        await loginPage.open('/');
        await loginPage.processLocalStorage();
        // await loginPage.clickOnLoginWithGoogle();
        // await loginPage.waitForEndpoint(endpoints.PROJECT , 10000);
        // await loginPage.getLocalStorage();
    }   
    catch(err){
        console.log(err);
    }
};

module.exports = testLogin;