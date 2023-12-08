//Here we write test cases of IF Block

const FlowPage = require('../pages/Flow/flow');
const {endpoints , stepIndex , apiIndex} = require('../enums');
const IfStep=require('../pages/Flow/if');
const {expect}=require('chai');

// const flowPage = new FlowPage();
const ifStep=new IfStep();

async function testIfBlockStep(){

    describe('test cases for IF condition under flowPage',async function(){

        it("if block created successfully with true condtiton",async function(){
            await ifStep.open(endpoints.HOME);
            await ifStep.clickOnLoginWithGoogle();
            await ifStep.waitForEndpoint(endpoints.PROJECT , 60000);
            await ifStep.clickOnProjectName();
            await ifStep.waitForScriptSlider();
            await ifStep.clickOnScript();
            await ifStep.waitForFlowPageToOpen();
            await ifStep.clickOnEditButton();
            await ifStep.clickOnAddSteps();
            await ifStep.getAllSteps();
            await ifStep.clickOnStep(stepIndex.IF);
            await ifStep.createCondition("true");
            const text_name=await ifStep.responseOfIfBlock();
            expect(text_name).to.include("true");
            await ifStep.crossIfBlock();
        }).timeout(700000);

        it("if block created successfully with false condition",async function(){
            await ifStep.clickOnAddSteps();
            await ifStep.getAllSteps();
            await ifStep.clickOnStep(stepIndex.IF);
            await ifStep.createCondition("false");
            const text_name=await ifStep.responseOfIfBlock();
            expect(text_name).to.include("false");
            await ifStep.crossIfBlock();
        }).timeout(700000);
    });
};

module.exports=testIfBlockStep;