const ResponseAndWebhook = require('../pages/Flow/response.js');

const {endpoints } = require('../enums.js');
const { expect } = require('chai');
const { exitCode } = require('process');
const { CONNREFUSED } = require('dns');
const getUniqueName = require('../../utilities/getDate');


const responseAndWebhook= new ResponseAndWebhook();

async function testWebhookResponse(){
        
            describe('Webhook Test Script', function () {
                it('Webhook Block open', async function () {
                    await responseAndWebhook.open(endpoints.HOME);
                    await responseAndWebhook.loginUser();
                    await responseAndWebhook.waitForEndpoint(endpoints.PROJECT , 60000);
                    await responseAndWebhook.clickOnProjectName();
                    await responseAndWebhook.waitForScriptSlider();
                    await responseAndWebhook.clickOnNewFlow();
                    await responseAndWebhook.clickOnScript();
                    await responseAndWebhook.waitForFlowPageToOpen();
                    await responseAndWebhook.fullWebhookfunction();
                    await responseAndWebhook.closeSlider(); 
                        }).timeout(30000); 

                it('Response Block open', async function () {
                    await responseAndWebhook.waitForFlowPageToOpen();
                    await responseAndWebhook.responseFunction();
                    await responseAndWebhook.customResponseEnter('Response working');
                    const text_name=await responseAndWebhook.responseOfWebhook();
                    expect(text_name).to.include("Response working");
                        }).timeout(30000); 
                        
                   
                                
              });

}
module.exports = testWebhookResponse;