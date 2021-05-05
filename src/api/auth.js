import { BASIC_URL, MAIN_URL,ROOT_URL } from './const';
import { user1, user2, user3, demoUser } from './mock/user';
import { getQueryString } from '../utils';
import { isWeixinBrowser } from '../utils/wechat';
export function getProbationUserInfo(){
  // const userInfoJSON = localStorage.getItem("userInfo");
  //   if (userInfoJSON) {
  //     return (JSON.parse(userInfoJSON));
  // }
  return demoUser;
}

/*
* 获取用户权限
* 现有权限包括：
* {
*   preview: 预览权限,
*   create_assignment: 思考题权限
*   create_round_table: 创建圆桌的权限
* }
* */
export function getUserPerm(apikey){
  const GET_USER_PERM_URL = BASIC_URL+"user_perm/?apikey="+apikey;
  console.log(GET_USER_PERM_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_USER_PERM_URL,
      contentType: "application/json; charset=utf-8",
      timeout: 5000,
      success: function(responseData){
        console.log('get user perm success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post user perm failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

/*
* 确认使用token登陆
* */

export function checkToken(token='',apikey){
  const CLAIM_TOKEN_URL = ROOT_URL +"api/auth/claim_token/?token="+token+'&apikey='+apikey;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: CLAIM_TOKEN_URL,
      contentType: "application/json; charset=utf-8",
      timeout: 5000,
      success: function (responseData) {
        resolve(responseData);
      },
      error: function (error) {
        console.log('check log failed!');
        console.log(error);
        reject(error.message);
      }
    });
  })
  return promise
}

/*
* 根据token请求返回登陆信息
* */
export function getLogStatus(token='Z5UYXzQ1zwp8UHi1aprluYzllipfe6RJ'){
  const GET_USER_LOG_URL = ROOT_URL +"api/auth/get_user_info/?token="+token;
  console.log(GET_USER_LOG_URL);
  //localStorage.setItem("userInfo", JSON.stringify(user1));
  //localStorage.clear('userInfo'); 
  let promise = new Promise((resolve, reject) => {
    const userInfoJSON = localStorage.getItem("userInfo");
    if (userInfoJSON) {
      resolve(JSON.parse(userInfoJSON));
      return;
    }
    if(!token){
      reject({});
    }
    $.ajax({
      type: "GET",
      url: GET_USER_LOG_URL,
      contentType: "application/json; charset=utf-8",
      timeout: 5000,
      success: function(responseData){
        console.log(responseData);
        if(responseData.apikey){
          console.log('log in');
          resolve(responseData);
        }else{
          console.log('wait for log');
          reject('wait for log');
        }

      },
      error: function(error){
        console.log('check log failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;

}

export function getUserInfo(callback) {
  // TODO 这是测试用的，先存到 local storage里面，以后把这行删掉
  //localStorage.setItem("userInfo", JSON.stringify(user1));
  //localStorage.clear('userInfo');
  const cur_routes = window.location.href.split('#');
  const cur_path = cur_routes.length>1?'#'+cur_routes[1]:''
  let promise = new Promise((resolve, reject) => {
    const userInfoJSON = localStorage.getItem("userInfo");
    if (userInfoJSON) {
      return resolve(JSON.parse(userInfoJSON));
    }
    const code = getQueryString('code');
    if (code) {
      const GET_USERINFO_URL = BASIC_URL + 'weixin_user_info/' + code;
      $.ajax({
        type: 'GET',
        url: GET_USERINFO_URL,
        dataType: "json",
        timeout: 5000,
        success: function(responseData) {
          console.log('get user info success');
          console.log(responseData);
          resolve(responseData);
        },
        error: function(error) {
          console.log('get user info failed!');
          console.log(error);
          reject(error.message);
        }
      });
    } else if (isWeixinBrowser()) {
      window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize'+
      '?appid=wx0f4144a8f58dd771'+
      '&redirect_uri='+encodeURIComponent(MAIN_URL+cur_path)+
      '&response_type=code&scope=snsapi_userinfo&state=ok#wechat_redirect';
      reject('redirect to wechat auth page');
    } else {

      window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx0f4144a8f58dd771&redirect_uri=' + encodeURIComponent(MAIN_URL+cur_path) + '&response_type=code&scope=snsapi_login&state=ok#wechat_redirect';
    }
  });
  return promise;
}


export function postUserInfo(data, apikey) {
  const POST_USERINFO_URL = BASIC_URL+"user_info/"+data.id+"?apikey="+apikey;
  console.log(POST_USERINFO_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_USERINFO_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post userinfo success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post userinfo failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
