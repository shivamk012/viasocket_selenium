const { expect } = require('chai');

const Projects = require('../pages/Project/projects');
const endpoints = require('../enums');
const DryRunfile = require('../pages/dryrun');
const { exitCode } = require('process');
const { CONNREFUSED } = require('dns');

const dryrun=new DryRunfile();
async function dryrunflow(){
    
    describe('Selenium Tests', function () {
        it('Run the Selenium script and select POST request', async function () {
          await dryrun.open();
          await dryrun.openProject();
          await dryrun.openscript();
          await dryrun.clickonDryrunButton();
          //case:01 select the post request
          const selectedOption = await dryrun.selectPOSTrequest();
          expect(selectedOption).to.equal("POST");
        }).timeout(30000);

        it('Edit request url:Url is not editable',async function(){
          //case:02 try to edit url
          const isURLnotChanged = await dryrun.editURL();
          expect(isURLnotChanged).to.be.true;
          }).timeout(20000);
      });
}
module.exports = dryrunflow;
