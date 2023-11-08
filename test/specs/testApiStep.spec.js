const FlowPage = require('../pages/Flow/flow');
const {endpoints , stepIndex , apiIndex} = require('../enums');

const flowPage = new FlowPage();

async function testApiStep(methodType){
    return new Promise(async(resolve , reject) => {
        try{
            await flowPage.open(endpoints.HOME);
            await flowPage.clickOnLoginWithGoogle();
            await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await flowPage.clickOnProjectName();
            await flowPage.waitForScriptSlider();
            await flowPage.clickOnScript();
            await flowPage.waitForFlowPageToOpen();
            await flowPage.clickOnEditButton();
            await flowPage.clickOnAddSteps();
            await flowPage.getAllSteps();
            await flowPage.clickOnStep(stepIndex.API);
            await flowPage.initialiseApiSlider();
            await flowPage.fillStepName('api_step');
            await flowPage.selectApiMethod(apiIndex[methodType]);
            await flowPage.fillUrl(process.env.GET_REQUEST_URL);
            await flowPage.clickOnDryRunButton();
            await flowPage.clickOnCreateButton();
        }catch(err){
                reject(err);
        }finally{
            // await flowPage.close();
        }
    })
}

module.exports = testApiStep;