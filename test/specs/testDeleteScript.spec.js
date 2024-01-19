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
        
        it('delete the latest script and goes to recycle bin' , async() => {
            await projectPage.open(endpoints.HOME);
            await projectPage.loginUser();
            await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectPage.clickOnProjectName();
            await projectPage.waitForScriptSlider();
            nameOfDeletedScript = await projectPage.clickOnActionButtonMenuOfScript();
            await projectPage.deleteScript();
            const scriptListDiv = await projectPage.getListOfScripts();
            expect(scriptListDiv).to.not.include(nameOfDeletedScript);
            // await projectPage.takeScreenShotOfMenuButton('menuButtonScript.png');
            // const misMatch = await compareSS(projectPage , 'menuButtonScript.png');
            // if(!misMatch) return;
            // expect(misMatch).to.be.lessThan(20);
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