const Projects = require('../pages/projects');
const endpoints = require('../enums');
const Scripts = require('../pages/createscript');

const ScriptPage = new Scripts();

async function testCreateScript(){
    try{
        await ScriptPage.open(endpoints.HOME);
        await ScriptPage.clickOnLoginWithGoogle();
        await ScriptPage.waitForEndpoint(endpoints.PROJECT , 60000);
        await ScriptPage.openProject();
        await ScriptPage.clickOnNewFlow();
        //await ScriptPage.createNewScript('Test scirpt');

        // await ScriptPage.clickOnNewFlow();
        // await ScriptPage.createNewScript('scriptttttttt');
        
        //await ScriptPage.multipleEnterClick('123BUG');
        await ScriptPage.multipleButtonClick('0987654321');
    }catch(err){
        console.log(err);
    }finally{
        // await projectsPage.close();
    }
}

module.exports = testCreateScript;