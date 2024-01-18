const Comment = require('../pages/Flow/comment.js');
const {endpoints , stepIndex} = require('../enums');
const { expect } = require('chai');
const { exitCode } = require('process');
const { CONNREFUSED } = require('dns');
const { waitForDebugger } = require('inspector');

const comment= new Comment();

async function testComment(){
            describe('Comment Test Script', function () {
                it('Case:01 Comment Block clicked', async function () {
                    await comment.open(endpoints.HOME);
                    await comment.clickOnLoginWithGoogle();
                    await comment.waitForEndpoint(endpoints.PROJECT , 60000);
                    await comment.clickOnProjectName();
                    await comment.waitForScriptSlider();
                    await comment.clickOnScript();
                    await comment.clickOnEditButton();
                    await comment.clickOnAddSteps();
                    await comment.getAllSteps();
                    //case:01 Click create comment
                    await comment.clickOnComment(stepIndex.COMMENT);
                        }).timeout(30000); 

                it('Case:02 write comment',async function(){
                    //case:02 write comment-new
                    await comment.writeComment("Newcomment");
                }).timeout(30000);

                it('Case:03 write comment-spaces only',async function(){
                    //case:03 write comment-spaces
                    await comment.writeComment("     ");
                }).timeout(30000);

                it('Case:03 Backspace comment-Remove comment from the flow',async function(){
                    //case:04 Remove comment
                    await comment.RemoveComment();
                }).timeout(30000);
              });
}
module.exports = testComment;