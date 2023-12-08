const RenameScript = require('../pages/renamescript.js');
const {endpoints , stepIndex} = require('../enums');
const { expect } = require('chai');
const { exitCode } = require('process');
const { CONNREFUSED } = require('dns');

const rename= new RenameScript();

async function testRenameScript(){
    describe('Rename Test script', function () {
        it('Case:01 Try to send empty script name-Empty name is not accepted', async function () {
            await rename.open(endpoints.HOME);
            await rename.clickOnLoginWithGoogle();
            await rename.waitForEndpoint(endpoints.PROJECT , 60000);
            await rename.clickOnProjectName();
            await rename.waitForScriptSlider();
            await rename.clickOptions();
          //case:01 empty name
          const selectedOption = await rename.getScriptName();
          await rename.clickOnRename();
          const selectedOption2 = await rename.getScriptName();
          expect(selectedOption).to.equal(selectedOption2);
        }).timeout(30000);

        it('Case:02 Try to send only spaces as script name-not accepted',async function(){
          //case:02 send only spaces
          
          const selectedOption = await rename.getScriptName();
          await rename.sendSpaces();
          const selectedOption2 = await rename.getScriptName();
          expect(selectedOption).to.equal(selectedOption2);
          }).timeout(30000);

          it('Case:03 Try to send script name with length less than 4-not accepted',async function(){
            //case:03 send short script name
            const selectedOption = await rename.getScriptName();
            await rename.sendShortName();
            const selectedOption2 = await rename.getScriptName();
            expect(selectedOption).to.equal(selectedOption2);
            }).timeout(30000);

            // it('Case:04 Try to create duplicate scriptname-not accepted',async function(){
            //   //case:04 send same script name
            //   const selectedOption = await rename.getScriptName();
            //   await rename.duplicateScript();
            //   const selectedOption2 = await rename.getScriptName();
            //   expect(selectedOption).to.equal(selectedOption2);
            //   }).timeout(30000);

            it('Case:04 new valid script name',async function(){
              //case:04 new script name
              const selectedOption = await rename.getScriptName();
              await rename.updateScriptName("valid");
              const selectedOption2 = await rename.getScriptName();
              expect(selectedOption).to.equal(selectedOption2);
              await rename.takeSs();
              }).timeout(30000);

              
      });
}
module.exports = testRenameScript;