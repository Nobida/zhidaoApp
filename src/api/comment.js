import { BASIC_URL } from './const';
const COMMENT_URL = BASIC_URL + "comment";

export function postComment(data, apikey) {
  const POST_COMMENT_URL = COMMENT_URL+"/?note="+data.note+"&apikey="+apikey;
  console.log(POST_COMMENT_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_COMMENT_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post comment success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post comment failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function deleteCommentPromise(commentID, noteID, apikey) {
  const DELETE_COMMENT_URL = COMMENT_URL+'/'+commentID+'?note='+noteID+'&apikey='+apikey;
  console.log(DELETE_COMMENT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_COMMENT_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete comment success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete comment failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getNoteComments(noteID, page, apikey) {
  const GET_NOTE_COMMENTS_URL = COMMENT_URL+"?page="+page+"&note="+noteID+"&apikey="+apikey;
  console.log(GET_NOTE_COMMENTS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTE_COMMENTS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get note comments success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get note comments failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function rateComment(commentID, rated, apikey) {
  const action = rated ? "del" : "add";
  const RATE_COMMENT_URL = BASIC_URL+"rate/?comment="+commentID+"&action="+action+"&apikey="+apikey;
  console.log(RATE_COMMENT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: RATE_COMMENT_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('rate comment success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('rate comment failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}