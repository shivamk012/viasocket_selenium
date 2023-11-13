const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect} = require('chai');
let projectPage;

async function compareSS(imagePath){
    const comparisonResult = await projectPage.compareScreenShot(imagePath);
    const isCaptureMode = await projectPage.isCaptureMode;
    if(isCaptureMode) return;
    const misMatch = Math.floor(comparisonResult.rawMisMatchPercentage);
    return misMatch;
}

async function testDeleteProject(){
    describe('Testing Delete Project Functionality' , () => {
        before(async() => {
            projectPage = new ProjectPage();
        })
        
        it('should have menu button on mouse hover' , async() => {
            await projectPage.open(endpoints.HOME);
            await projectPage.clickOnLoginWithGoogle();
            await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectPage.takeScreenShotOfMenuButton('menuButtonProject.png');
            const misMatch = await compareSS('menuButtonProject.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })
        
        it('should open menu on mouse click' , async() => {
            await projectPage.clickOnActionButtonMenuProject();
            await projectPage.takeScreenShotActionButtons('actionButtonsProject.png');
            const misMatch = await compareSS('actionButtonsProject.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })
        
        it('should delete project on delete button click' , async()=>{
            await projectPage.deleteProject();
            const projectListDiv = await projectPage.getListOfProjects();
            expect(projectListDiv).to.be.empty;
        })
        
        after(async() => {
            await projectPage.close();
        })
    })
}

module.exports = testDeleteProject;