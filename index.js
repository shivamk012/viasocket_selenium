const dotenv = require('dotenv');
const testSignUp = require('./testSignUp');

dotenv.config();
const testSign = require('./test/specs/testSignUp.spec');

testSign();

