const FlowPage = require('../pages/Flow/flow');
const {endpoints} = require('../enums');
const getUniqueName = require('../../utilities/getDate');

async function testCreateScript(){
    describe('test create script' , async() => {
        let flowPage;
        before(async() => {
            flowPage = new FlowPage();
        })

        it('should create a new script' , async() => {
            try{
                await flowPage.open(endpoints.HOME);
                await flowPage.loginUser();
                await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
                await flowPage.clickOnProjectName();
                await flowPage.waitForScriptSlider();
                await flowPage.clickOnNewFlow();
                await flowPage.createNewScript(getUniqueName());
            }catch(err){
                console.log(err);
            }
        })
        
        after(async() => {
            await flowPage.close();
        })
    })
}

module.exports = testCreateScript;