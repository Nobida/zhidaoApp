import {BASIC_URL} from './const';

export function getLessons(courseId,apikey){
  const GET_LESSONS_URL = BASIC_URL + "lesson/?course="+courseId+"&apikey="+apikey;
  console.log(GET_LESSONS_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSONS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get course lesson success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get course lesson failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonById(lessonId,course_id,apikey) {
  const GET_LESSON_BY_ID_URL = BASIC_URL + "lesson/" + lessonId +"/?apikey="+apikey+'&course='+course_id;
  console.log(GET_LESSON_BY_ID_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_BY_ID_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson info success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson info failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getPublicLessonById(lessonId,course_id,apikey){
  const GET_LESSON_BY_ID_URL = BASIC_URL + "public_lesson/" + lessonId +"/?apikey="+apikey+'&course='+course_id;
  console.log(GET_LESSON_BY_ID_URL);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_BY_ID_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson info success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson info failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonBG(lessonId,apikey) {
  const GET_LESSON_GB_URL = BASIC_URL + "lesson_page/" + lessonId +"/BG/?apikey="+apikey;
  console.log(GET_LESSON_GB_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_GB_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson background success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson background failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonText(lessonId,apikey) {
  const GET_LESSON_TEXT_URL = BASIC_URL + "lesson_page/" + lessonId +"/Text/?apikey="+apikey;
  console.log(GET_LESSON_TEXT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_TEXT_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson text success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson text failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonQA(lessonId,apikey) {
  const GET_LESSON_QA_URL = BASIC_URL + "lesson_page/" + lessonId +"/QA/?apikey="+apikey;
  console.log(GET_LESSON_QA_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_QA_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson QA success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson QA failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonLecture(lessonId,apikey) {
  const GET_LESSON_LECTURE_URL = BASIC_URL + "lesson_page/" + lessonId +"/Notes/?apikey="+apikey;
  console.log(GET_LESSON_LECTURE_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_LECTURE_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson notes success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson notes failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonPage(lessonId, course_id,pageName,apikey){
  const GET_LESSON_PAGE_URL = BASIC_URL + "lesson_page/" + lessonId +"/"+pageName+"/?apikey="+apikey+'&course='+course_id;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_PAGE_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson page success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson page failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonQuizStatus(lessonId,course_id,apikey){
  const GET_LESSON_QUIZ_STATUS_URL = BASIC_URL + "quiz_status/"+lessonId+"?apikey="+apikey+'&course='+course_id;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_QUIZ_STATUS_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson quiz status success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson quiz status failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonBuddy(lessonId,courseId,apikey) {
  const GET_LESSON_BUDDY_URL = BASIC_URL + "lesson/?buddy="+lessonId+"&apikey="+apikey+'&course='+courseId;
  console.log(GET_LESSON_BUDDY_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_LESSON_BUDDY_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson buddy success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson buddy failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function saveLessonProgress(lesson_id,lesson_progress){
  const lessonProgressJSON = localStorage.getItem("lessonProgress");
  if(lessonProgressJSON) {
    let cur_lesson_progress = JSON.parse(lessonProgressJSON)
    cur_lesson_progress[lesson_id] = lesson_progress
    localStorage.setItem('lessonProgress',JSON.stringify(cur_lesson_progress))
  }else{
    localStorage.setItem('lessonProgress',JSON.stringify(lesson_progress))
  }
}

export function getLessonProgress(lesson_id){
  const lessonProgressJSON = localStorage.getItem("lessonProgress");
  if(lessonProgressJSON) {
    const progress = JSON.parse(lessonProgressJSON)
    return progress[lesson_id]
  }else{
    return null
  }
}
