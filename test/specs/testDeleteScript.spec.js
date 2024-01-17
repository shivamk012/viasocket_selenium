const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect} = require('chai');


async function compareSS(projectPage , imagePath){
    const comparisonResult = await projectPage.compareScreenShot(imagePath);
    const isCaptureMode = await projectPage.isCaptureMode;
    if(isCaptureMode) return;
    const misMatch = Math.floor(comparisonResult.rawMisMatchPercentage);
    return misMatch;
}

async function testDeleteScript(){
    describe('test delete script' , async() => {
        let projectPage;
        let nameOfDeletedScript;
        before(async() => {
            projectPage = new ProjectPage();
        })
        
        it('should have menu button on mouse hover' , async() => {
            await projectPage.open(endpoints.HOME);
            await projectPage.loginUser();
            await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectPage.clickOnProjectName();
            await projectPage.waitForScriptSlider();
            await projectPage.takeScreenShotOfMenuButton('menuButtonScript.png');
            const misMatch = await compareSS(projectPage , 'menuButtonScript.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })
        
        it('should open menu on mouse click' , async() => {
            nameOfDeletedScript = await projectPage.clickOnActionButtonMenuOfScript();
            await projectPage.takeScreenShotActionButtons('actionButtonsScript.png');
            const misMatch = await compareSS(projectPage , 'actionButtonsScript.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })
        
        it('should delete script on delete button click' , async()=>{
            await projectPage.deleteScript();
            const scriptListDiv = await projectPage.getListOfScripts();
            expect(scriptListDiv).to.not.include(nameOfDeletedScript);
        })

        it('List of deleted script should contain name of latest deleted script' , async() => {
            const listOfNamesOfDeletedScript = await projectPage.getListOfDeletedScripts();
            expect(listOfNamesOfDeletedScript).to.include(nameOfDeletedScript);
        })
        
        after(async() => {
            await projectPage.close();
        })
    })
}

module.exports = testDeleteScript;