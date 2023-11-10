const login = require('../pages/login');
const {endpoints} = require('../enums');

const loginPage = new login();

async function testLogin(){
    return new Promise(async(resolve , reject) => {
        try{
            await loginPage.open('/');
            if(process.argv[3] == "getToken"){
                await loginPage.clickOnLoginWithGoogle();
                await loginPage.waitForEndpoint(endpoints.PROJECT , 10000);
                await loginPage.getLocalStorage();
                resolve();
            }
            await loginPage.setLocalStorage();
        }   
        catch(err){
            reject(err);
        }finally{
            await loginPage.close();
        }
    }
)};

module.exports = testLogin;