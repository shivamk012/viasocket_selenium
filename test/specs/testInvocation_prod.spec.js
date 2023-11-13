const axios = require('axios');
const {expect} = require('chai');

async function testInvocation(){
    const queryParams = {
        query1 : '1',
        query2 : '2'
    };

    const bodyParams = {
        body1 : '3',
        body2 : '4'
    }
    describe('Test invocation' , () => {
        it('should return correct query params' , async() => {
            const getRequestResponse = await axios.get(process.env.WEBHOOKURL_TEST_GET_REQUEST , {
                params : queryParams
            });
            const responseData = getRequestResponse.data;
            expect(JSON.stringify(responseData)).to.equal(JSON.stringify(queryParams));
        })

        it('should return correct body params' , async() => {
            const postRequestResponse = await axios.post(process.env.WEBHOOKURL_TEST_POST_REQUEST , bodyParams);
            const responseData = postRequestResponse.data;
            expect(JSON.stringify(responseData)).to.equal(JSON.stringify(bodyParams));
        })

        it('should return that script is paused' , async() => {
            try{
                const response = await axios.get(process.env.WEBHOOKURL_TEST_PAUSED_SCRIPT);
                const responseData = response.data;
                expect(responseData.message).to.be.equal('Script is either paused or deleted');
            }catch(err){
                console.log(err);
            }
            
        })

        // it('should return that script is deleted' , () => {

        // })

        // it('should return that project is paused' , () => {

        // })

        // it('should return that project is deleted' , () => {

        // })
    })
}

module.exports = testInvocation;