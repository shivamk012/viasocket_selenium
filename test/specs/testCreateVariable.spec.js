const FlowPage = require('../pages/Flow/flow');
const {endpoints , stepIndex} = require('../enums');
const {expect} = require('chai');

async function testVariableStep(){
    describe('test variable slider' , () => {
        let flowPage;
        
        async function compareSS(imagePath){
            const comparisonResult = await flowPage.compareScreenShot(imagePath);
            const isCaptureMode = await flowPage.isCaptureMode;
            if(isCaptureMode) return;
            const misMatch = Math.floor(comparisonResult.rawMisMatchPercentage);
            return misMatch;
        }

        before(() => {
            flowPage = new FlowPage();
        })

        it('should render variable slider' , async() => {
            try{
                await flowPage.open(endpoints.HOME);
                await flowPage.loginUser();
                await flowPage.waitForEndpoint(endpoints.PROJECT , 60000);
                await flowPage.clickOnProjectName();
                await flowPage.waitForScriptSlider();
                await flowPage.clickOnScript();
                await flowPage.waitForFlowPageToOpen();
                await flowPage.getAllStepsNewFlow();
                await flowPage.clickOnStep(stepIndex.VARIABLE);
                await flowPage.takeScreenShotVariableSlider('variableSliderEmpty.png');
                const misMatch = await compareSS('variableSliderEmpty.png');
                if(!misMatch) return;
                expect(misMatch).to.be.lessThan(20);
            }catch(err){
                throw err;
            }
        })

        it('variable step name input should be editable' , async() => {
            await flowPage.fillVariableName('random_variable');
            const var_name = await flowPage.getVariableName();
            expect(var_name).to.be.equal('random_variable');
        })
        
        it('variable value field should be editable' , async() => {
            await flowPage.fillVariableValue('1');
            const varValue = await flowPage.getVariableValue();
            expect(varValue).to.be.equal('1');
        })

        it('Create button click should show produce a response' , async() => {
            await flowPage.clickOnCreateButton(true);
            const response = await flowPage.getResponsDataVariableStep();
            expect(response).to.not.be.null;
        })

        it('Should have correct value in response' , async() => {
            await flowPage.takeVariableResponseScreenShot('variableStepResponse.png');
            const misMatch = await compareSS('variableStepResponse.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })

        it('should create a new variable step in flow' , async() => {
            await flowPage.takeScreenShotWorkFlow('variableStepInFlow.png');
            const misMatch = await compareSS('variableStepInFlow.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })

        it('should not make variable name and value empty on create button click' , async() => {
            await flowPage.clickOnVariableSliderAccordion();
            await flowPage.takeScreenShotVariableSlider('variableSliderFilled.png');
            const misMatch = await compareSS('variableSliderFilled.png');
            if(!misMatch) return;
            expect(misMatch).to.be.lessThan(20);
        })


        after(async() => {
            // await flowPage.close();
        })
    })
}

module.exports = testVariableStep;