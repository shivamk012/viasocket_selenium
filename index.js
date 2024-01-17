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
const testInvocation_prod = require('./test/specs/testInvocation_prod.spec');
// const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
// const testAddSteps = require('./test/specs/testAddSteps.spec');
// const testLogin = require('./test/specs/testLogin.spec');
// const testRenameProject= require('./test/specs/testIfBlockStep.spec');
// const testIfBlockStep = require('./test/specs/testIfBlockStep.spec');
// const testVariableStep = require('./test/specs/testCreateVariable.spec');
// const testPlugin = require('./test/specs/testPluginOAuthAuth.spec');
<<<<<<< HEAD
const {testGetStep} = require('./test/specs/testApiStep.spec');
// const testFunction = require('./test/specs/testFunctionStep.spec');
// const testIf = require('./test/specs/testIfBlockStep.spec');
=======
// const {testGetStep} = require('./test/specs/testApiStep.spec');
// const testFunction = require('./test/specs/testFunctionStep.spec');
// const testIf = require('./test/specs/testIfBlockStep.spec')
// const testInvocation_dev = require('./test/specs/testInvocation_dev.spec');

>>>>>>> cfbc6df3afb7ab711823cf423aa0b1fbea5cc3e6


async function test(){
    // await testCreateOrg();
    // await testCreateProject();
    // await testCreateScript();
    // await testDeleteScript();
    // await testVariableStep();
<<<<<<< HEAD
    // await testDeleteProject();
    await testGetStep();
    // await testFunction();
=======
    // await testGetStep();
    // await testFunction();
    // await testDragAndDrop();
    // await testInvocation_dev();
    await testInvocation_prod();
>>>>>>> cfbc6df3afb7ab711823cf423aa0b1fbea5cc3e6
}

test();