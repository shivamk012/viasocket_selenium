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

async function testDeleteScript(){
    before(async() => {
        projectPage = new ProjectPage();
    })
    
    it('should have menu button on mouse hover' , async() => {
        await projectPage.open(endpoints.HOME);
        await projectPage.clickOnLoginWithGoogle();
        await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await projectPage.clickOnProjectName();
        await projectPage.waitForScriptSlider();
        await projectPage.takeScreenShotOfMenuButton('menuButtonScript.png');
        const misMatch = await compareSS('menuButtonScript.png');
        if(!misMatch) return;
        expect(misMatch).to.be.lessThan(20);
    })
    
    it('should open menu on mouse click' , async() => {
        await projectPage.clickOnActionButtonMenuScript();
        await projectPage.takeScreenShotActionButtons('actionButtonsScript.png');
        const misMatch = await compareSS('actionButtonsScript.png');
        if(!misMatch) return;
        expect(misMatch).to.be.lessThan(20);
    })
    
    it('should delete script on delete button click' , async()=>{
        await projectPage.deleteScript();
        const scriptListDiv = await projectPage.getListOfScripts();
        expect(scriptListDiv).to.be.empty;
    })
    
    it('should send script into deleted scripts section in script slider' , async() => {
        const nameOfDeletedScript = await projectPage.getListOfDeletedScripts();
        console.log(nameOfDeletedScript);
        expect(nameOfDeletedScript).to.equal('Dummy Script');
    })
    
    after(async() => {
        // await projectPage.close();
    })
}

module.exports = testDeleteScript;