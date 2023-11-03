const Projects = require('../pages/projects');
const endpoints = require('../enums');
const DryRunfile = require('../pages/dryrun');


const dryrun=new DryRunfile();


async function dryrunflow(){
        await dryrun.open(endpoints.HOME);
        await dryrun.clickOnLoginWithGoogle();
        await dryrun.waitForEndpoint(endpoints.PROJECT , 60000);
        await dryrun.openProject();
        await dryrun.openscript();
        await dryrun.clickonDryrunButton();
        await dryrun.selectPOSTrequest();
        await dryrun.formData_01();
        await dryrun.finalDryrunButton();
     }

module.exports = dryrunflow;