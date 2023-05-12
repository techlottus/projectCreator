import axios from 'axios';

function callApiProjects() {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://dev.azure.com/lottusAdmin/_apis/projects',
        headers: { 
          'Authorization': 'Basic am9uYXRoYW4uYXJpYXNAbG90dHVzZWR1Y2F0aW9uLmNvbTpjZ2xheGoyaWJlZnNjdHlrZmR4cTZkbnI3dmozdTNnbmFnNDV4M2ppMm5xZGFoYWVyamtx', 
          'Cookie': 'VstsSession=%7B%22PersistentSessionId%22%3A%221dfee7be-41e3-43f6-a2f9-7afa7a3284a7%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D'
        }
      };
      
      axios.request(config)
      .then((response) => {
        return response.data.value;
      })
      .catch((error) => {
        console.log(error);
      });
};

/* module.exports = {
    callApi: callApi
}; */

export default callApiProjects;