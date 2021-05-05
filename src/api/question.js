import { BASIC_URL } from './const';
const QUESTION_URL = BASIC_URL + "question";

export function deleteQuestionPromise(question_id,apikey){
  const DELETE_QUESTION_URL = QUESTION_URL+'/'+question_id+'/?apikey='+apikey;
  console.log(DELETE_QUESTION_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_QUESTION_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete question success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete question failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function postQuestion(data,apikey){
  const POST_QUESTION_URL = QUESTION_URL+'/?apikey='+apikey;
  console.log(POST_QUESTION_URL);
  data.apikey = apikey;
  console.log(data);
  
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_QUESTION_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post question success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post question failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonThinkingQuestions(lessonId,apikey){
  const GET_QUESTIONS_URL = QUESTION_URL+"?apikey="+apikey+'&lesson='+lessonId+"&type=assignment";
  console.log(GET_QUESTIONS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUESTIONS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson thinking questions success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson thinking questions fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonUserQuestions(lessonId,page,user,apikey){
  const GET_QUESTIONS_URL = QUESTION_URL+"?page="+page+"&apikey="+apikey+'&lesson='+lessonId+'&user='+user;
  console.log(GET_QUESTIONS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUESTIONS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson user questions success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson user questions fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonQuestions(lessonId, page, apikey){
  const GET_QUESTIONS_URL = QUESTION_URL+"?page="+page+"&apikey="+apikey+'&lesson='+lessonId;
  console.log(GET_QUESTIONS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUESTIONS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get questions success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get questions failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getQuestion(questionID, apikey) {
  const GET_QUESTION_URL = BASIC_URL+"question/"+questionID+"?apikey="+apikey;
  console.log(GET_QUESTION_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUESTION_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get question success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get question failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });

  return promise;
}

export function getUserQuestionList(user,page,apikey){
  const GET_QUESTIONS_URL = BASIC_URL+"question/"+"?page="+page+"&apikey="+apikey +'&user='+user;
  console.log(GET_QUESTIONS_URL);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_QUESTIONS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson user questions success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson user questions fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function rateQuestion(questionID, rated, apikey) {
  const action = rated ? "del" : "add";
  const RATE_QUESTION_URL = BASIC_URL+"rate/?question="+questionID+"&action="+action+"&apikey="+apikey;
  console.log(RATE_QUESTION_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: RATE_QUESTION_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('rate question success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('rate question failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}