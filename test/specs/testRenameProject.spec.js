const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect}=require('chai');
const {assert}=require('mocha');

const projectsPage= new Projects();

async function testRenameProject(){
    describe("Create rename project test cases",async function(){
        it("Project renamed successfully !",async ()=>{
            await projectsPage.open(endpoints.HOME);
            await projectsPage.clickOnLoginWithGoogle();
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.renameProject("rename1234");
            const array=await projectsPage.getAllProjectsText();
            expect(array).to.include('rename1234')
        }).timeout(70000);
        

        it("Empty project name is not empty after renaming",async function(){
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.renameProject("");
            await projectsPage.refreshPage();
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 700000);
            const array=await projectsPage.getAllProjectsText();
            expect(array).not.to.include("");
        }).timeout(70000);

        it("project is not renamed with spaces",async function(){
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.renameProject("          ");
            const alertBox=await projectsPage.errorBox();
            expect(alertBox).to.equal('error\nProject name too short!');
            await projectsPage.refreshPage();
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 700000);
        }).timeout(70000);
})
}

module.exports=testRenameProject;