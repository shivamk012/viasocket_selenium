const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./testCreateOrg');
// const testSign = require('./test/specs/testSignUp.spec');
// const testInvocation = require('./test/specs/testInvocation.spec');
// const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
// const testCreateScript = require('./test/specs/testCreateScript.spec');
const testAddSteps = require('./test/specs/testAddSteps.spec');


testAddSteps();
