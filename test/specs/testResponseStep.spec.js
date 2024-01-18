const Response = require('../pages/Flow/response.js');
const {endpoints , stepIndex} = require('../enums');
const { expect } = require('chai');
const { exitCode } = require('process');
const { CONNREFUSED } = require('dns');

const response= new Response();

async function testResponse(){
            // await response.open(endpoints.HOME);
            // await response.clickOnLoginWithGoogle();
            // await response.waitForEndpoint(endpoints.PROJECT , 60000);
            // await response.clickOnProjectName();
            // await response.waitForScriptSlider();
            // await response.clickOnScript();
            // await response.clickOnEditButton();
            // await response.clickOnAddSteps();
            // await response.openResponseBlock();

            describe('Response Test Script', function () {
                it('Case:01 Response Block open', async function () {
                    await response.open(endpoints.HOME);
                    await response.clickOnLoginWithGoogle();
                    await response.waitForEndpoint(endpoints.PROJECT , 60000);
                    await response.clickOnProjectName();
                    await response.waitForScriptSlider();
                    await response.clickOnScript();
                    await response.clickOnAddSteps();
                    await response.getAllSteps()
                    
                    //case:01 Click create function
                    await response.clickOnComment(stepIndex.RESPONSE);
                        }).timeout(30000); 
                        
                it('Case:02 Response Block save', async function () {
                    //case:02 save reponse in the flow
                    await response.saveResponse();
                     }).timeout(30000); 
              });
}
module.exports = testResponse;