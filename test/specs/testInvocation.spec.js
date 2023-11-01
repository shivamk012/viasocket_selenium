const FlowPage = require('../pages/flow');
const axios = require('axios');

async function testInvocation(){
    const queryParams = {
        query1 : 1,
        query2 : 2
    };

    const bodyParams = {
        body1 : 3,
        body2 : 4
    }

    const getRequestResponse = await axios.get(process.env.WEBHOOKURL_TEST_GET_REQUEST , {
        params : queryParams
    });

    const postRequestResponse = await axios.post(process.env.WEBHOOKURL_TEST_POST_REQUEST , bodyParams);

    const bothQueryAndPostResponse = await axios.post(process.env.WEBHOOKURL_TEST_INVOCATION_DATA , bodyParams , {
        params : queryParams
    });

    console.log(getRequestResponse.data);

    console.log(postRequestResponse.data);

    console.log(bothQueryAndPostResponse.data);

}

module.exports = testInvocation;