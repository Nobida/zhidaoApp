import { BASIC_URL } from './const';
const REPLY_URL = BASIC_URL + "reply";

export function postReply(data, apikey) {
  const POST_REPLY_URL = REPLY_URL+"/?post="+data.post+"&apikey="+apikey;
  console.log(POST_REPLY_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_REPLY_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post reply success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post reply failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function deleteReplyPromise(replyID, postID, apikey) {
  const DELETE_REPLY_URL = REPLY_URL+'/'+replyID+'?post='+postID+'&apikey='+apikey;
  console.log(DELETE_REPLY_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_REPLY_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete reply success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete reply failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getPostReplys(postID, page, apikey) {
  const GET_POST_REPLYS_URL = REPLY_URL+"?page="+page+"&post="+postID+"&apikey="+apikey;
  console.log(GET_POST_REPLYS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_POST_REPLYS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get post replys success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get post replys failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function rateReply(replyID, rated, apikey) {
  const action = rated ? "del" : "add";
  const RATE_REPLY_URL = BASIC_URL+"rate/?reply="+replyID+"&action="+action+"&apikey="+apikey;
  console.log(RATE_REPLY_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: RATE_REPLY_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('rate reply success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('rate reply failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}