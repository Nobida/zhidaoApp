import { BASIC_URL } from './const';
const QUIZ_URL = BASIC_URL + "quizset";
const SUBMIT_QUIZ_URL = BASIC_URL + "submit_quiz_answer";

export function postQuizAnswer(data,lessonId,courseId,apikey){
  const POST_QUIZ_URL = SUBMIT_QUIZ_URL+"/"+lessonId+"/?apikey="+apikey+'&course='+courseId;
  console.log(POST_QUIZ_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_QUIZ_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post answer success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post answer failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}

export function getQuizSet(lessonId,courseId,apikey){
  const GET_QUIZ_URL = QUIZ_URL+"/"+lessonId+"/?apikey="+apikey+'&course='+courseId;
  console.log(GET_QUIZ_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUIZ_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get quiz set success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get quiz set failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}