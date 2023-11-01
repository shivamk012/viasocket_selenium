const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./testCreateOrg');
// const testSign = require('./test/specs/testSignUp.spec');
// const testInvocation = require('./test/specs/testInvocation.spec');
//const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
//const createProject = require('./test/specs/testCreateProject.spec');

const createScript = require('./test/specs/testAddScript.spec');

// testDragAndDrop();
//createProject();
createScript();