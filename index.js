const dotenv = require('dotenv');
dotenv.config();
// const testCreateOrg = require('./testCreateOrg');
// const testSign = require('./test/specs/testSignUp.spec');
const testCreateProject = require('./test/specs/testCreateProject.spec');


testCreateProject();
