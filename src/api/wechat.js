import { BASIC_URL } from './const';

export function getSignature(curURL, apikey) {
  const GET_SIGNATURE_URL = BASIC_URL+"jsapi_signature/?apikey="+apikey;
  console.log(GET_SIGNATURE_URL);
  const data = {
    url: curURL
  };
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: GET_SIGNATURE_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get signature success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get signature failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
