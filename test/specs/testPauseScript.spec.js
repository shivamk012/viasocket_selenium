const ProjectPage = require('../pages/Project/projects');
const {endpoints} = require('../enums');
const {expect} = require('chai');


async function testPauseScript(){
    describe('test pause script' , async() => {
        
        let projectPage;
        let nameOfPausedScript = '';
        before(async() => {
            projectPage = new ProjectPage();
        })
        
        it('should pause script on pause button click' , async()=>{
            await projectPage.open(endpoints.HOME);
            await projectPage.loginUser();
            await projectPage.waitForEndpoint(endpoints.PROJECT , 60000);
            await projectPage.clickOnProjectName();
            await projectPage.waitForScriptSlider();
            nameOfPausedScript = await projectPage.clickOnActionButtonMenuOfScript();
            await projectPage.pauseScript();
            const nameOfScripts = await projectPage.getListOfScripts();
            expect(nameOfScripts).to.not.include(nameOfPausedScript);
        })
        
        it('should send script in paused script section in script slider' , async() => {
            const nameOfPausedScripts = await projectPage.getListOfPausedScripts();
            expect(nameOfPausedScripts).to.include(nameOfPausedScript);
        })
        
        after(async() => {
            await projectPage.close();
        })
    })
}

module.exports = testPauseScript;