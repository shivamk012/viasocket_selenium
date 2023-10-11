const Projects = require('../pages/projects');

const projectsPage = new Projects();
const testData = JSON.parse(process.env.USER_DETAILS_LOGIN);

async function testProjects(){
    try{
        await projectsPage.open('/');
        await projectsPage.enterEmail(testData[0]);
        await projectsPage.enterPassword(testData[1]);
        await projectsPage.loginUser();
    }
    catch(err){
        console.log(err);
    }
};

module.exports = testProjects;