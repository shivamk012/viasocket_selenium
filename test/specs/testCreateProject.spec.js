const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');

const projectsPage = new Projects();

async function testCreateProject(){
    // try{
    //     await projectsPage.open(endpoints.HOME);
    //     await projectsPage.clickOnLoginWithGoogle();
    //     await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
    //     await projectsPage.clickOnNewProject();
    //     // await projectsPage.createNewProject('new project199990 ');
    //     // await projectsPage.clickOnNewProject();
    //     // await projectsPage.createNewProject('new project199990 ');
    //     //await projectsPage.multipleEnterClick('Multiple enter clicks project');
    //     await projectsPage.multipleButtonClick('new clicks project');
    //     await projectsPage.createNewProject('new project19999');
    //     await projectsPage.createNewProject('new project19999');
    // }catch(err){
    //     console.log(err);
    // }finally{
    //     // await projectsPage.close();
    // }

    describe("Creating Project Page TestCases",async function(){
        it("When we create project the it create successfully",async function(){
            await projectsPage.open(endpoints.HOME);
            await projectsPage.clickOnLoginWithGoogle();
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.clickOnNewProject();
            


        })

    })
}

module.exports = testCreateProject;