const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect}=require('chai');

// const testData = JSON.parse(process.env.USER_DETAILS_LOGIN);

async function testCreateOrg(){
    let projectsPage ;

    describe("Organisation test cases",async function(){
        
        before(() => {
            projectsPage = new Projects();
        })

        it('Create org then it must be created',async ()=>{
            await projectsPage.open(endpoints.HOME);
            await projectsPage.loginUser();
            await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
            // await projectsPage.waitForProjecPageToLoad();
            await projectsPage.openListOfOrgs();
            await projectsPage.createNewOrg();
            const orgNameInUI=await projectsPage.fetchOrgName();
            const orgNameInput = projectsPage.orgNameInput;
            expect(orgNameInUI).to.equal(orgNameInput);  
        }).timeout(50000);


        it("if orgname is less than 4 character then it show error message",async ()=>{
            await projectsPage.openListOfOrgs();
            await projectsPage.createNewOrg('abc');
            const alertBox=projectsPage.errorBox();
            expect(alertBox).to.not.equal('none', 'Element is not visible');
            await projectsPage.closeListOfOrgs();
        }).timeout(50000);

        it("if orgname is equal to 4 then it show error",async ()=>{
            await projectsPage.openListOfOrgs();
            await projectsPage.sleep_task(3000);
            await projectsPage.createNewOrg('abcd');
            const alertBox=projectsPage.errorBox();
            expect(alertBox).to.not.equal('none', 'Element is not visible');
            await projectsPage.closeListOfOrgs();
        }).timeout(500000);

        after(async() => {
            await projectsPage.close();
        })
})}

// testProjects();
module.exports = testCreateOrg;  