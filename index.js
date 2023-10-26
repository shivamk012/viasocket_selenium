const dotenv = require('dotenv');
dotenv.config();
// const testCreateOrg = require('./testCreateOrg');
// const testSign = require('./test/specs/testSignUp.spec');
const testCreateOrg = require('./test/specs/testCreateOrg.spec');


testCreateOrg();
