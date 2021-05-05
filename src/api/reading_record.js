import { BASIC_URL } from './const';
const POST_LESSON_RECORD_URL = BASIC_URL + "reading_beat";

export function postLessonRecord(lesson_id, apikey) {
  const POST_URL = POST_LESSON_RECORD_URL+ "/?lesson=" +lesson_id+"&apikey="+apikey;
  console.log(POST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: POST_URL,
      contentType: "application/json; charset=utf-8",
      timeout: 5000,
      success: function(responseData){
        console.log('post lesson record success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post lesson record failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
