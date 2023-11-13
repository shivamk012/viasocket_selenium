const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./test/specs/testCreateOrg.spec');
// const testInvocation = require('./test/specs/testInvocation.spec');
// const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
// const testCreateScript = require('./test/specs/testCreateScript.spec');
// const testAddSteps = require('./test/specs/testAddSteps.spec');
// const testLogin = require('./test/specs/testLogin.spec');
const testCreateOrg= require('./test/specs/testCreateOrg.spec');
// const testVariableStep = require('./test/specs/testCreateVariable.spec');
// const testPauseProject = require('./test/specs/testPauseProject.spec')


testCreateOrg()

// testInvocation();

