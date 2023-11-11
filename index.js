const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./test/specs/testCreateOrg.spec');
// const testInvocation = require('./test/specs/testInvocation.spec');
//const testDragAndDrop = require('./test/specs/testDragAndDrop.spec');
//const createProject = require('./test/specs/testCreateProject.spec');

//const createScript = require('./test/specs/testAddScript.spec');
const dryrun = require('./test/specs/dryrun.spec');
// testDragAndDrop();
// createProject();
// createScript();
dryrun();