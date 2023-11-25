const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const getUniqueName = require('../../utilities/getDate');
const projectsPage = new Projects();

async function testCreateProject(){
    try{
        await projectsPage.open(endpoints.HOME);
        await projectsPage.loginUser();
        await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await projectsPage.clickOnNewProject();
        await projectsPage.createNewProject(getUniqueName());
        // await projectsPage.clickOnNewProject();
        // await projectsPage.createNewProject('new project199990 ');
        //await projectsPage.multipleEnterClick('Multiple enter clicks project');
        // await projectsPage.multipleButtonClick('new clicks project');
        // await projectsPage.createNewProject('new project19999');
        // await projectsPage.createNewProject('new project19999');
    }catch(err){
        console.log(err);
    }finally{
        // await projectsPage.close();
    }
}

module.exports = testCreateProject;