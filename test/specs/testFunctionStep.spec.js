const Function = require('../pages/Flow/function.js');
const {endpoints , stepIndex} = require('../enums');
const { expect } = require('chai');
const { exitCode } = require('process');
const { CONNREFUSED } = require('dns');
const { waitForDebugger } = require('inspector');

const fun= new Function();

async function testFunction(){
            describe('Function Test Script', function () {
                it('Case:01 Function Block clicked', async function () {
                    await fun.open(endpoints.HOME);
                    await fun.loginUser();
                    await fun.waitForEndpoint(endpoints.PROJECT , 60000);
                    await fun.clickOnProjectName();
                    await fun.waitForScriptSlider();
                    await fun.clickOnNewFlow();
                    await fun.clickOnScript();
                    await fun.closeSlider(); // close trigger slider
                    await fun.waitForFlowPageToOpen();
                    await fun.clickOnAddSteps();
                    await fun.getAllStepsUsedFlow();
                    await fun.clickOnStep(stepIndex.FUNCTION);

                }).timeout(30000); 

                it('Case:02 write empty function name',async function(){
                    //case:02 write empty function name
                    await fun.funName("");
                    await fun.create();
                }).timeout(30000);

                it('Case:03 write correct function name',async function(){
                    //case:02 write correct function name
                    await fun.funName("fun01");
                    await fun.create();
                    await fun.closeFunctionSlider();
                }).timeout(30000);

                it('Case:04 write Duplicate function name',async function(){
                    // await fun.clickOnEditButton();
                    await fun.clickOnAddSteps();
                    await fun.getAllStepsUsedFlow();
                    await fun.clickOnComment(stepIndex.FUNCTION);
                    await fun.funName("fun01");
                    await fun.create();
                }).timeout(30000);

                // it('Case:05 Function return something',async function(){
                //     await fun.closeFunctionSlider();
                //     //await fun.clickOnEditButton();
                //     await fun.clickOnAddSteps();
                //     await fun.getAllStepsUsedFlow();
                //     await fun.clickOnComment(stepIndex.FUNCTION);
                //     await fun.funName("New fun");
                //     await fun.writeFunction();
                //     await fun.dryrun();
                //     await fun.create();
                // }).timeout(30000);
              });
}
module.exports = testFunction;