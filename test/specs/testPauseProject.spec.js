const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect} = require('chai');

let projectPage;

async function testPauseProject(){

    before(async() => {
        projectPage = new ProjectPage();
    })
    
    it('should pause project on pause button click' , async()=>{
        await projectPage.open(endpoints.HOME);
        await projectPage.loginUser();
        await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await projectPage.clickOnActionButtonMenuProject();
        await projectPage.pauseProject();
        const isClassCorrect = await projectPage.checkIfClassPresent('disabled-block');
        expect(isClassCorrect).to.be.true;
    })
    
    after(async() => {
        await projectPage.close();
    })

}

module.exports = testPauseProject;