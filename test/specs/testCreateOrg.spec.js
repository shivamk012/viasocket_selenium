const Projects = require('../pages/projects');

const projectsPage = new Projects();
// const testData = JSON.parse(process.env.USER_DETAILS_LOGIN);

async function testProjects(){
    try{
        await projectsPage.open('/');
        await projectsPage.clickOnLoginWithGoogle();
        // await projectsPage.enterEmail(testData[0]);
        // await projectsPage.enterPassword(testData[1]);
        // await projectsPage.loginUser();
        // await projectsPage.openListOfOrgs();
        // await projectsPage.createNewOrg('new org');
    }
    catch(err){
        console.log(err);
    }
};
// testProjects();
module.exports = testProjects;