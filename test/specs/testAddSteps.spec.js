const FlowPage = require('../pages/flow');
const endpoints = require('../enums');

const flowPage = new FlowPage();

async function testAddSteps(){
    await flowPage.open(endpoints.HOME);
    await flowPage.clickOnLoginWithGoogle();
    await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await flowPage.clickOnProjectName();
    await flowPage.waitForScriptSlider();
    await flowPage.clickOnScript();
    await flowPage.waitForFlowPageToOpen();
    await flowPage.clickOnEditButton();
    await flowPage.clickOnAddStepsButton();
    await flowPage.listOfSteps();
    await flowPage.createAPI1();
    await flowPage.createVariable();
    await flowPage.createIfCondition();
    await flowPage.createFunction();
    await flowPage.createAPI2();
}

module.exports = testAddSteps;