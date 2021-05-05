import { BASIC_URL } from './const';
const NOTE_URL = BASIC_URL + "note";
const NOTEC_URL = BASIC_URL + "notec";

export function deleteNotePromise(note_id,apikey){
  const DELETE_NOTE_URL = NOTE_URL+'/'+note_id+'/?apikey='+apikey;
  console.log(DELETE_NOTE_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_NOTE_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete note success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete note failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function postNote(data,apikey){
  const POST_NOTE_URL = NOTE_URL+'/?apikey='+apikey;
  console.log(POST_NOTE_URL);
  data.apikey = apikey;
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_NOTE_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post note success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post note failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getUserBookNotes(user,bookId,page,apikey){
  const GET_NOTES_URL = NOTE_URL+"?page="+page+"&apikey="+apikey +'&book='+ bookId +'&user='+user;
  console.log(GET_NOTES_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTES_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson user book notes success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson user book notes fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonUserNotes(lessonId,page,user,apikey){
  const GET_NOTES_URL = NOTE_URL+"?page="+page+"&apikey="+apikey+'&lesson='+lessonId+'&user='+user;
  console.log(GET_NOTES_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTES_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson user notes success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson user notes fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonNotes(lessonId, page, apikey){
  const GET_NOTES_URL = NOTE_URL+"?page="+page+"&apikey="+apikey+'&lesson='+lessonId+'&public=true';
  console.log(GET_NOTES_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTES_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get notes success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get notes failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getNote(noteID, apikey) {
  const GET_NOTE_URL = BASIC_URL+"note/"+noteID+"?apikey="+apikey;
  console.log(GET_NOTE_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTE_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get note success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get note failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function rateNote(noteID, rated, apikey) {
  const action = rated ? "del" : "add";
  const RATE_NOTE_URL = BASIC_URL+"rate/?note="+noteID+"&action="+action+"&apikey="+apikey;
  console.log(RATE_NOTE_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: RATE_NOTE_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('rate note success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('rate note failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

// 以下三个URL使用notec接口

export function getUserBookNotesWithCursor(user, bookId, url, apikey) {
  const GET_NOTES_URL = url ? url : (
    NOTEC_URL+"?apikey="+apikey +'&book='+ bookId +'&user='+user
  );
  console.log(GET_NOTES_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTES_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson user book notes success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson user book notes fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonUserNotesWithCursor(lessonId, user, url, apikey) {
  const GET_NOTES_URL = url ? url : (
    NOTEC_URL+"?apikey="+apikey+'&lesson='+lessonId+'&user='+user
  );
  console.log(GET_NOTES_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTES_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get lesson user notes with cursor success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get lesson user notes with cursor fail');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLessonNotesWithCursor(lessonId, url, apikey) {
  const GET_NOTES_URL = url ? url : (
    NOTEC_URL+"?apikey="+apikey+'&lesson='+lessonId+'&public=true'
  );
  console.log(GET_NOTES_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_NOTES_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get notes with cursor success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get notes with cursor failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}