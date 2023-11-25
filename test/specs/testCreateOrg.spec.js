const Projects = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const getUniqueName = require('../../utilities/getDate');
const projectsPage = new Projects();
// const testData = JSON.parse(process.env.USER_DETAILS_LOGIN);

async function testCreateOrg(){
    try{
        await projectsPage.open(endpoints.HOME);
        await projectsPage.loginUser();
        await projectsPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await projectsPage.waitForProjecPageToLoad();
        await projectsPage.openListOfOrgs();
        await projectsPage.createNewOrg(getUniqueName());
    }
    catch(err){
        console.log(err);
    }
};
// testProjects();
module.exports = testCreateOrg;  