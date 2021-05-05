import { POST_SHARE_URL } from './const';

export function postShare(data,apikey){
  const POST_URL = POST_SHARE_URL+'?apikey='+apikey;
  console.log(POST_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post share success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post share failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
