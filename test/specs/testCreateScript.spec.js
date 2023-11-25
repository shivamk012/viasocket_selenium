const FlowPage = require('../pages/Flow/flow');
const {endpoints} = require('../enums');
const getUniqueName = require('../../utilities/getDate');
const flowPage = new FlowPage();

async function testCreateScript(){
    await flowPage.open(endpoints.HOME);
    await flowPage.loginUser();
    await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await flowPage.clickOnProjectName();
    await flowPage.waitForScriptSlider();
    await flowPage.clickOnNewFlow();
    await flowPage.createNewScript(getUniqueName());
}

module.exports = testCreateScript;