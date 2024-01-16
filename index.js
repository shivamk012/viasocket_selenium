const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./test/specs/testCreateOrg.spec');
// const testCreateProject = require('./test/specs/testCreateProject.spec');
// const testCreateScript = require('./test/specs/testCreateScript.spec');
// const testPauseScript = require('./test/specs/testPauseScript.spec');
// const testDeleteScript = require('./test/specs/testDeleteScript.spec');
// const testPauseProject = require('./test/specs/testPauseProject.spec');
// const testDeleteProject = require('./test/specs/testDeleteProject.spec');
// const testPauseScript = require('./test/specs/testPauseProject.spec')
// const testInvocation = require('./test/specs/testInvocation_prod.spec');
// const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
// const testAddSteps = require('./test/specs/testAddSteps.spec');
// const testLogin = require('./test/specs/testLogin.spec');
// const testRenameProject= require('./test/specs/testIfBlockStep.spec');
// const testIfBlockStep = require('./test/specs/testIfBlockStep.spec');
const testVariableStep = require('./test/specs/testCreateVariable.spec');
// const testPlugin = require('./test/specs/testPluginOAuthAuth.spec');
// const {testGetStep} = require('./test/specs/testApiStep.spec');
// const testFunction = require('./test/specs/testFunonStep.spec');
// const testIf = require('./test/specs/testIfBlockStep.spec')


async function test(){
    // await testCreateOrg();
    // await testCreateProject();
    // await testCreateScript();
    // await testDeleteScript();
    await testVariableStep();
    // await testGetStep();
    // await testFunction();
}

test();