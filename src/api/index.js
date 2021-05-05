//
// Api
// --------------------------------------------------

let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');
let mockAxios = axios.create();
// mock 数据
let mock = new MockAdapter(mockAxios);
// Use axois-mock-adapter to create fake Promise
mock.onGet('/my').reply(function(config) {
  let userInfo = require('./mock/user');
  window.localStorage.setItem('user',JSON.stringify(userInfo));
  return [200, userInfo];
});
mock.onPost('/register').reply(function(config){
  return [200, "success"];
});
module.exports = mockAxios;
