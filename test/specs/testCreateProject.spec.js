const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect}=require('chai');
const {assert}=require('mocha');

const projectsPage = new Projects();
const getUniqueName = require('../../utilities/getDate');

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
            await projectsPage.createNewProject('new project3');
            const array=await projectsPage.getAllProjectsText();
            expect(array).to.include('new project3')
        }).timeout(70000);

        it("Project with same name is not created",async function(){
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.clickOnNewProject();
            await projectsPage.createNewProject('new project3');
            const alertBox=await projectsPage.errorBox();
            expect(alertBox).to.equal('error\nProject name already exists');
            await projectsPage.crossOrgTextField();
        }).timeout(70000);

        it("Project with name less than 4 characters not created",async function(){
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.clickOnNewProject();
            await projectsPage.createNewProject('new');
            const alertBox=await projectsPage.errorBox();
            expect(alertBox).to.equal('error\nProject name too short');
            await projectsPage.crossOrgTextField();
        });

        it("Project with name equal to 4 characters not created",async function(){
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.clickOnNewProject();
            await projectsPage.createNewProject('news');
            const alertBox=await projectsPage.errorBox();
            expect(alertBox).to.equal('error\nProject name too short');
            await projectsPage.crossOrgTextField();
        });
    })
}

module.exports = testCreateProject;