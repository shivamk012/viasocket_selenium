const FlowPage = require('../pages/Flow/flow');
const {endpoints , stepIndex} = require('../enums');

const flowPage = new FlowPage();

async function testAddSteps(){
    await flowPage.open(endpoints.HOME);
    await flowPage.loginUser();
    await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await flowPage.clickOnProjectName();
    await flowPage.waitForScriptSlider();
    await flowPage.clickOnScript();
    await flowPage.waitForFlowPageToOpen();
    await flowPage.clickOnEditButton();
    await flowPage.clickOnAddSteps();
    await flowPage.getAllSteps();
    await flowPage.clickOnStep(stepIndex.API);
}

module.exports = testAddSteps;