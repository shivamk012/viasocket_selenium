const FlowPage = require('../pages/flow');
const {endpoints} = require('../enums');

const flowPage = new FlowPage();

async function testCreateScript(){
    await flowPage.open(endpoints.HOME);
    await flowPage.clickOnLoginWithGoogle();
    await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await flowPage.clickOnProjectName();
    await flowPage.waitForScriptSlider();
    await flowPage.clickOnNewFlow();
    await flowPage.createNewScript('newscript')
}

module.exports = testCreateScript;