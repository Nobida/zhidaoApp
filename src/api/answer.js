import { BASIC_URL } from './const';
const ANSWER_URL = BASIC_URL + "answer";

export function postAnswer(data, apikey) {
  const POST_ANSWER_URL = ANSWER_URL+"/?question="+data.question+"&apikey="+apikey;
  console.log(POST_ANSWER_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_ANSWER_URL,
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
  return promise;
}

export function deleteAnswerPromise(answerID, questionID, apikey) {
  const DELETE_ANSWER_URL = ANSWER_URL+'/'+answerID+'?question='+questionID+'&apikey='+apikey;
  console.log(DELETE_ANSWER_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_ANSWER_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete answer success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete answer failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getQuestionAnswers(questionID, page, apikey) {
  const GET_QUESTION_ANSWERS_URL = ANSWER_URL+"?page="+page+"&question="+questionID+"&apikey="+apikey;
  console.log(GET_QUESTION_ANSWERS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUESTION_ANSWERS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get question answers success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get question answers failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function rateAnswer(answerID, rated, apikey) {
  const action = rated ? "del" : "add";
  const RATE_ANSWER_URL = BASIC_URL+"rate/?answer="+answerID+"&action="+action+"&apikey="+apikey;
  console.log(RATE_ANSWER_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: RATE_ANSWER_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('rate answer success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('rate answer failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}