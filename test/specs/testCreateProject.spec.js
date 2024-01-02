const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect}=require('chai');
const {assert}=require('mocha');
const getUniqueName = require('../../utilities/getDate');



async function testCreateProject(){
    let projectsPage;

    describe("Creating Project Page TestCases",async function(){
        before(() => {
            projectsPage = new Projects();
        })

        it("When we create project the it create successfully the",async function(){
            await projectsPage.open(endpoints.HOME);
            await projectsPage.loginUser();
            await projectsPage.waitForEndpoint(endpoints.PROJECT ,60000);
            await projectsPage.clickOnNewProject();
            await projectsPage.createNewProject();
            const array = await projectsPage.getAllProjectsText();
            const projectNameInput = projectsPage.projectNameInput;
            expect(array).to.include(projectNameInput);
        }).timeout(70000);

        it("Project with same name is not created",async function(){
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectsPage.clickOnNewProject();
            const projectNameInput = projectsPage.projectNameInput;
            await projectsPage.createNewProject(projectNameInput);
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
    })
}

module.exports = testCreateProject;