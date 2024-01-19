const Function = require('../pages/Flow/function.js');
const { endpoints, stepIndex } = require('../enums');
const { expect } = require('chai');

const fun = new Function();

async function testFunction() {
    describe('Function Test Script', function () {
        it('Case: Drag and Drop Elements', async function () {
            await fun.open(endpoints.HOME);
            await fun.loginUser();
            await fun.waitForEndpoint(endpoints.PROJECT, 60000);
            await fun.clickOnProjectName();
            await fun.waitForScriptSlider();
            await fun.clickOnScript();
            await fun.createSteps();
            await fun.DragAndDrop();
            expect(successMessage).to.equal('Drag and drop successful');


        }).timeout(60000);
        it('Case: No Element to Drag', async function () {
            await fun.open(endpoints.HOME);
            await fun.loginUser();
            await fun.waitForEndpoint(endpoints.PROJECT, 60000);
            await fun.clickOnProjectName();
            await fun.waitForScriptSlider();
            await fun.clickOnScript();
            await fun.DragAndDropNoElements();
            const errorMessageElement = await fun.getErrorMessageElement();
            expect(errorMessageElement).to.exist;

        }).timeout(60000);
    });
}

module.exports = testFunction;
