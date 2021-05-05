import { BASIC_URL } from './const';
const POST_URL = BASIC_URL + "post";

export function deletePostPromise(post_id,round_table,apikey){
  const DELETE_POST_URL = POST_URL+'/'+post_id+'/?apikey='+apikey+'&round_table='+round_table;
  console.log(DELETE_POST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_POST_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete post success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete post failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function postPost(data,apikey){
  const POST_POST_URL = POST_URL+'/?apikey='+apikey;
  console.log(POST_POST_URL);
  data.apikey = apikey;
  console.log(data);
  
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_POST_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post post success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post post failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getPost(postID, round_table, apikey) {
  const GET_POST_URL = BASIC_URL+"post/"+postID+"?apikey="+apikey+'&round_table='+round_table;
  console.log(GET_POST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_POST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get post success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get post failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });

  return promise;
}

export function ratePost(postID, rated, apikey) {
  const action = rated ? "del" : "add";
  const RATE_POST_URL = BASIC_URL+"rate/?post="+postID+"&action="+action+"&apikey="+apikey;
  console.log(RATE_POST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: RATE_POST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('rate post success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('rate post failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
