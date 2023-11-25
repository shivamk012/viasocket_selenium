const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect} = require('chai');

let projectPage;

async function testPauseScript(){
    before(async() => {
        projectPage = new ProjectPage();
    })
    
    it('should pause script on pause button click' , async()=>{
        await projectPage.open(endpoints.HOME);
        await projectPage.loginUser();
        await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await projectPage.clickOnProjectName();
        await projectPage.waitForScriptSlider();
        await projectPage.clickOnActionButtonMenuScript();
        await projectPage.pauseScript();
        const scriptListDiv = await projectPage.getListOfScripts();
        expect(scriptListDiv).to.be.empty;
    })
    
    it('should send script in paused script section in script slider' , async() => {
        const nameOfDeletedScript = await projectPage.getListOfPausedScripts();
        console.log(nameOfDeletedScript);
        expect(nameOfDeletedScript).to.equal('Dummy Script');
    })
    
    after(async() => {
        await projectPage.close();
    })
}

module.exports = testPauseScript;