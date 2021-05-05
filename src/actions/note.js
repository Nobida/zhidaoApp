import {
  postNote,
  deleteNotePromise,
  getLessonNotesWithCursor,
  getLessonUserNotesWithCursor,
  getUserBookNotesWithCursor,
  getNote,
  rateNote,
} from "../api/note";
import bindApiKey from '../utils/bindApiKey';
import { getNotePostData } from '../utils/form';


export const POST_NOTE = 'POST_NOTE';
export const POST_NOTE_PENDING = 'POST_NOTE_PENDING';
export const POST_NOTE_FULFILLED = 'POST_NOTE_FULFILLED';
export const POST_NOTE_REJECTED = 'POST_NOTE_REJECTED';

export function createNote(type,selection,contents,title,roundTableId){
   let formData = getNotePostData(type,selection,contents,title,roundTableId);
   console.log('formData');
   console.log(formData);
   return {
      type: POST_NOTE,
      payload: bindApiKey(postNote,formData),
   }
}

export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_PENDING = 'DELETE_NOTE_PENDING';
export const DELETE_NOTE_FULFILLED = 'DELETE_NOTE_FULFILLED';
export const DELETE_NOTE_REJECTED = 'DELETE_NOTE_REJECTED';

export function deleteNote(noteID) {
  return {
      type: DELETE_NOTE,
      payload: bindApiKey(deleteNotePromise, noteID),
      meta: {
        noteID,
      }
   }
}

export const FETCH_LESSON_NOTES = 'FETCH_LESSON_NOTES';
export const FETCH_LESSON_NOTES_PENDING = 'FETCH_LESSON_NOTES_PENDING';
export const FETCH_LESSON_NOTES_FULFILLED = 'FETCH_LESSON_NOTES_FULFILLED';
export const FETCH_LESSON_NOTES_REJECTED = 'FETCH_LESSON_NOTES_REJECTED';

export function fetchLessonNotes(lessonId, url) {
  return {
    type: FETCH_LESSON_NOTES,
    payload: bindApiKey(getLessonNotesWithCursor, [lessonId, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  };
}

export const FETCH_LESSON_USER_NOTES = 'FETCH_LESSON_USER_NOTES';
export const FETCH_LESSON_USER_NOTES_PENDING = 'FETCH_LESSON_USER_NOTES_PENDING';
export const FETCH_LESSON_USER_NOTES_FULFILLED = 'FETCH_LESSON_USER_NOTES_FULFILLED';
export const FETCH_LESSON_USER_NOTES_REJECTED = 'FETCH_LESSON_USER_NOTES_REJECTED';

export function fetchLessonUserNotes(lessonId, user, url) {
  return {
    type: FETCH_LESSON_USER_NOTES,
    payload: bindApiKey(getLessonUserNotesWithCursor, [lessonId, user, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  };
}

export const FETCH_USER_BOOK_NOTES = 'FETCH_USER_BOOK_NOTES';
export const FETCH_USER_BOOK_NOTES_PENDING = 'FETCH_USER_BOOK_NOTES_PENDING';
export const FETCH_USER_BOOK_NOTES_FULFILLED = 'FETCH_USER_BOOK_NOTES_FULFILLED';
export const FETCH_USER_BOOK_NOTES_REJECTED = 'FETCH_USER_BOOK_NOTES_REJECTED';

export function fetchUserBookNotes(user, book, url) {
  return {
    type: FETCH_USER_BOOK_NOTES,
    payload: bindApiKey(getUserBookNotesWithCursor, [user, book, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  };
}

export const SET_NOTE_TO_STORE = 'SET_NOTE_TO_STORE';

export function setNoteToStore(note) {
  return {
    type: SET_NOTE_TO_STORE,
    payload: note
  };
}

export const FETCH_NOTE_BY_ID = 'FETCH_NOTE_BY_ID';
export const FETCH_NOTE_BY_ID_PENDING = 'FETCH_NOTE_BY_ID_PENDING';
export const FETCH_NOTE_BY_ID_FULFILLED = 'FETCH_NOTE_BY_ID_FULFILLED';
export const FETCH_NOTE_BY_ID_REJECTED = 'FETCH_NOTE_BY_ID_REJECTED';

export function fetchNoteByID(noteID) {
  return {
    type: FETCH_NOTE_BY_ID,
    payload: bindApiKey(getNote, [noteID])
  };
}

export const TOGGLE_FAVOR_OF_NOTE = 'TOGGLE_FAVOR_OF_NOTE';
export const TOGGLE_FAVOR_OF_NOTE_PENDING = 'TOGGLE_FAVOR_OF_NOTE_PENDING';
export const TOGGLE_FAVOR_OF_NOTE_FULFILLED = 'TOGGLE_FAVOR_OF_NOTE_FULFILLED';
export const TOGGLE_FAVOR_OF_NOTE_REJECTED = 'TOGGLE_FAVOR_OF_NOTE_REJECTED';

export function toggleFavorOfNote(noteID, rated) {
  return {
    type: TOGGLE_FAVOR_OF_NOTE,
    payload: bindApiKey(rateNote, [noteID, rated]),
    meta:{
      noteID,
      rated
    }
  };
}

// 这个action是note和question共用的
export const CLEAR_CUR_POST = 'CLEAR_CUR_POST';

export function clearCurPost() {
  return {
    type: CLEAR_CUR_POST,
  }
}