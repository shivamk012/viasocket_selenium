const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');

const projectPage = new ProjectPage();

async function testPauseProject(){
    await projectPage.open(endpoints.HOME);
    await projectPage.clickOnLoginWithGoogle();
    await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await projectPage.pauseProject();
}

module.exports = testPauseProject;