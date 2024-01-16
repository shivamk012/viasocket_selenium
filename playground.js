

const axios = require('axios');
// async function k(){
// const url = 'https://api.calendly.com/scheduled_events';
// const data = {
//     user: 'https://api.calendly.com/users/fc9fb2c9-168b-4ca7-810c-699b2e696a97',
//     organization: 'https://api.calendly.com/organizations/6865614a-cddf-4c51-9f34-cbc4291e208e'
// };
//     const response = await axios.get(url, {
//         params: data,
//         headers: {
//             Authorization: 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzAwNTQxNTg0LCJqdGkiOiIzNjdmZWQ0Mi1hMGMyLTRlMDQtYjQwNC0wMDhkNzlmZmY1MGUiLCJ1c2VyX3V1aWQiOiJmYzlmYjJjOS0xNjhiLTRjYTctODEwYy02OTliMmU2OTZhOTciLCJhcHBfdWlkIjoiYUpxVnFreUF0UDBORHA1QUtyUXBYREd6UnB3QVJuYk5RcURzemZ2cjB5WSIsImV4cCI6MTcwMDU0ODc4NH0.hKdIy3oTQB9rfE4v61eS7-E-HB2a71L10oUTjYXjia_WgglsTZhcX5IOCprsOQAOc6TbIEj_Ws_vkzhiUvXgRw'
//         }
//     });

//     const array = response.data.collection
//   .filter(subs => subs.invitees_counter && subs.invitees_counter.active === 1)
//   .map(subs => ({
//     label: subs.name + " " + subs.uri.split('/').pop(),
//     value: subs.uri.split('/').pop(),
//     sample: "event_id"
//   }));

//     return array;
// }

// k().then(result => console.log(result)).catch(error => console.error(error));





const apiUrl = 'https://api.calendly.com/scheduling_links';
const accessToken = 'Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzAwNTQ1NTEyLCJqdGkiOiJhODQzNDMwNS0zMzc2LTRmZjgtODdjZC02YjMwZDc5YzdkNjYiLCJ1c2VyX3V1aWQiOiJmYzlmYjJjOS0xNjhiLTRjYTctODEwYy02OTliMmU2OTZhOTciLCJhcHBfdWlkIjoiYUpxVnFreUF0UDBORHA1QUtyUXBYREd6UnB3QVJuYk5RcURzemZ2cjB5WSIsImV4cCI6MTcwMDU1MjcxMn0._H3Zp4j9S3hh8d2RkBNkjCvImVdihZ48Zh2CiC6filHBMNbgFtevgQ6qvcN8lre2Jw5Ub9w0kr3S92F2eZCjkg'; // Your access token

const requestData = {
  max_event_count: 1,
  owner: 'https://api.calendly.com/event_types/bfa94ea9-b979-410c-8232-d07a22a88588',
  owner_type: 'EventType'
};

const headers = {
  Authorization: accessToken,
  'Content-Type': 'application/json'
};

axios.post(apiUrl, requestData, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.response.data);
  });
