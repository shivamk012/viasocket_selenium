const FlowPage = require('../pages/flow')
const endpoints = require('../enums')

const flowPage = new FlowPage();

async function testFunction(){
    await flowPage.open(endpoints.HOME)
    await flowPage.clickOnLoginWithGoogle();
    await flowPage.waitForEndpoint(endpoints.PROJECT,60000)
    await flowPage.clickOnProjectName()
    await flowPage.waitForScriptSlider()
    await flowPage.clickOnScript()
    await flowPage.waitForFlowPageToOpen()
    await flowPage.clickOnEditButton()
    await flowPage.clickOnAddSteps()
    await flowPage.clickOnStep(4)
}

module.exports = testFunction;