const dotenv = require('dotenv');

dotenv.config();
// const testCreateOrg = require('./testCreateOrg');
// const testSign = require('./test/specs/testSignUp.spec');
const testAddSteps = require('./test/specs/testAddSteps.spec');


testAddSteps();
