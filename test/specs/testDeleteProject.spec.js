const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');

const projectPage = new ProjectPage();

async function testDeleteProject(){
    await projectPage.open(endpoints.HOME);
    await projectPage.clickOnLoginWithGoogle();
    await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
    await projectPage.deleteProject();
}

module.exports = testDeleteProject;