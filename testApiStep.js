const apiRequest = require('./utilities/api');


async function testApiStepGetRequest(driver , listElements){
    apiRequest(driver , listElements , 0 , 'api_get_request' , process.env.GET_REQUEST_URL, 'get');
}

async function testApiStepPostRequest(driver , listElements){
    apiRequest(driver , listElements , 1 , 'api_post_request' , process.env.POST_REQUEST_URL, 'post');
}

async function testApiStepPutRequest(driver , listElements){
    apiRequest(driver , listElements , 2 , 'api_put_request' , process.env.PUT_REQUEST_URL, 'put');
}

async function testApiStepDeleteRequest(driver , listElements){
    apiRequest(driver , listElements , 3 , 'api_delete_request' , process.env.DELETE_REQUEST_URL,'delete');
}

async function testApiStepPatchRequest(driver , listElements){
    apiRequest(driver , listElements , 4 , 'api_patch_request' , process.env.PATCH_REQUEST_URL,'patch');
}

module.exports = {
    testApiStepGetRequest, 
    testApiStepPostRequest, 
    testApiStepPutRequest, 
    testApiStepDeleteRequest,
    testApiStepPatchRequest,
}