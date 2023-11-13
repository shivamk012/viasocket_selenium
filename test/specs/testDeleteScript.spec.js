const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');

const projectPage = new ProjectPage();

async function testDeleteScript(){
    await projectPage.open(endpoints.HOME);
    await projectPage.clickOnLoginWithGoogle();
    await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await projectPage.clickOnProjectName();
    await projectPage.waitForScriptSlider();
    await projectPage.deleteScript();
}

module.exports = testDeleteScript;