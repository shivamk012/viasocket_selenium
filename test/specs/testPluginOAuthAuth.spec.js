const FlowPage = require('../pages/Flow/flow');
const {endpoints , stepIndex , apiIndex} = require('../enums');
const {expect} = require('chai');

let flowPage;
flowPage = new FlowPage();

async function testPlugin(methodType){
    await flowPage.open(endpoints.HOME);
    await flowPage.loginUser();
    await flowPage.openLink(process.env.WEBHOOKURL_TEST_SLACKPLUG);
    await flowPage.waitForFlowPageToOpen();
    await flowPage.clickOnAddSteps();
    await flowPage.getAllSteps();
    await flowPage.selectStep();
    // describe('test OAuth 2.0 plugin' , () => {
    //     before(() => {
    //         flowPage = new FlowPage();
    //     })

    //     it('should render function step' , async() => {
    //         try{
    //             await flowPage.clickOnStep(stepIndex.API);
    //             await flowPage.takeScreenShotFunctionSlider('apiSlider.png');
    //             const isCaptureMode = await flowPage.isCaptureMode;
    //             if(isCaptureMode) return;
    //             const comparisonResult = await flowPage.compareScreenShot('apiSlider.png'); 
    //             const num = Math.floor(comparisonResult.rawMisMatchPercentage);
    //             expect(num).to.be.lessThan(20);
    //         }catch(err){
    //             console.log(err);
    //         }
    //     })

    //     it('api step name should be editable' , async() => {
    //         await flowPage.initialiseApiSlider();
    //         await flowPage.fillStepName('api_step');
    //         const stepname = await flowPage.getStepName();
    //         expect(stepname).to.be.equal('api_step');
    //     })

    //     it('api url field should be editable' , async() => {
    //         await flowPage.fillUrl(process.env.GET_REQUEST_URL);
    //         const url = await flowPage.getUrl();
    //         expect(url).to.be.equal(process.env.GET_REQUEST_URL);
    //     })

    //     it('api method should be editable' , async() => {
    //         await flowPage.selectApiMethod(apiIndex[methodType]);
    //         const method = await flowPage.getSelectedApiMethod();
    //         expect(method).to.be.equal(methodType);
    //     })

    //     it('dry run should produce a response' , async()=>{
    //         if(apiIndex[methodType] === 1 || api[methodType] === 2 || api[methodType] === 4){
    //             await flowPage.sendBodyData(apiIndex[methodType]);
    //         } 
    //         await flowPage.clickOnDryRunButton();
    //         const response = await flowPage.getResponseData();
    //         expect(response).to.not.be.null;
    //     })

    //     it('should have correct resposne' , async() => {
    //         await flowPage.takeResponseScreenShot('apiResponse.png');
    //         const isCaptureMode = await flowPage.isCaptureMode;
    //         if(isCaptureMode) return;
    //         const result = await flowPage.compareScreenShot('apiResponse.png');
    //         const num = Math.floor(result.rawMisMatchPercentage);
    //         expect(num).to.be.lessThan(20);
    //     })
        
    //     it('api slider input fields should not become empty on dry run click' , async() => {
    //         await flowPage.takeScreenShotFunctionSlider('filledApiSlider.png');
    //         const isCaptureMode = await flowPage.isCaptureMode;
    //         if(isCaptureMode) return
    //         const comparisonResult = await flowPage.compareScreenShot('filledApiSlider.png');
    //         const num = Math.floor(comparisonResult.rawMisMatchPercentage);
    //         expect(num).to.be.lessThan(20);
    //     })

    //     it('should create a api step in flow' , async() => {
    //         await flowPage.clickOnCreateButton();

    //     })

    //     after(async()=>{
    //         await flowPage.close();
    //     })
    // })
}

module.exports = testPlugin;