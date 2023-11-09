const Projects = require('../pages/projects');
const endpoints = require('../enums');

const projectsPage = new Projects();

async function testCreateProject(){
    try{
        await projectsPage.open(endpoints.HOME);
        await projectsPage.clickOnLoginWithGoogle();
        await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await projectsPage.clickOnNewProject();
        // await projectsPage.createNewProject('new project199990 ');
        // await projectsPage.clickOnNewProject();
        // await projectsPage.createNewProject('new project199990 ');
        //await projectsPage.multipleEnterClick('Multiple enter clicks project');
        await projectsPage.multipleButtonClick('new clicks project');

    }catch(err){
        console.log(err);
    }finally{
        // await projectsPage.close();
    }
}

module.exports = testCreateProject;