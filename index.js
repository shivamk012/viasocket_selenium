const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./test/specs/testCreateOrg.spec');
// const testInvocation = require('./test/specs/testInvocation.spec');
// const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
// const testCreateScript = require('./test/specs/testCreateScript.spec');
// const testAddSteps = require('./test/specs/testAddSteps.spec');
// const testLogin = require('./test/specs/testLogin.spec');
//const {testPostStep} = require('./test/specs/testApiStep.spec');
// const rename = require('./test/specs/testRenameScript.spec');
// rename()

const response = require('./test/specs/testResponseStep.spec.js');
response()

// const comment = require('./test/specs/testCommentStep.spec.js');
// comment();

// const fun =  require('./test/specs/testFunctionStep.spec.js')
// fun();
// testInvocation();
//testPostStep();
//rename();

