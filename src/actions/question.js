import {
  getLessonQuestions,
  postQuestion,
  getLessonThinkingQuestions,
  getLessonUserQuestions,
  deleteQuestionPromise,
  getQuestion,
  rateQuestion,
  getUserQuestionList
} from "../api/question";
import bindApiKey from '../utils/bindApiKey';
import { getQuestionPostData } from '../utils/form';


export const POST_QUESTION = 'POST_QUESTION';
export const POST_QUESTION_PENDING = 'POST_QUESTION_PENDING';
export const POST_QUESTION_FULFILLED = 'POST_QUESTION_FULFILLED';
export const POST_QUESTION_REJECTED = 'POST_QUESTION_REJECTED';

export function createQuestion(isSticky,type,selection,contents,title,course,roundTableId){
   let formData = getQuestionPostData(isSticky,type,selection,contents,title,course,roundTableId);
   console.log('formData');
   console.log(formData);
   return {
      type: POST_QUESTION,
      payload: bindApiKey(postQuestion,formData),
   }
}

export const DELETE_QUESTION = 'DELETE_QUESTION';
export const DELETE_QUESTION_PENDING = 'DELETE_QUESTION_PENDING';
export const DELETE_QUESTION_FULFILLED = 'DELETE_QUESTION_FULFILLED';
export const DELETE_QUESTION_REJECTED = 'DELETE_QUESTION_REJECTED';

export function deleteQuestion(questionID) {
  return {
      type: DELETE_QUESTION,
      payload: bindApiKey(deleteQuestionPromise, questionID),
      meta: {
        questionID,
      }
   }
}

export const FETCH_LESSON_QUESTIONS = 'FETCH_LESSON_QUESTIONS';
export const FETCH_LESSON_QUESTIONS_PENDING = 'FETCH_LESSON_QUESTIONS_PENDING';
export const FETCH_LESSON_QUESTIONS_FULFILLED = 'FETCH_LESSON_QUESTIONS_FULFILLED';
export const FETCH_LESSON_QUESTIONS_REJECTED = 'FETCH_LESSON_QUESTIONS_REJECTED';

export function fetchLessonQuestions(lessonId, page) {
  return {
    type: FETCH_LESSON_QUESTIONS,
    payload: bindApiKey(getLessonQuestions, [lessonId, page]),
    meta: { page }
  };
}

export const FETCH_LESSON_THINKING_QUESTIONS = 'FETCH_LESSON_THINKING_QUESTIONS';
export const FETCH_LESSON_THINKING_QUESTIONS_PENDING = 'FETCH_LESSON_THINKING_QUESTIONS_PENDING';
export const FETCH_LESSON_THINKING_QUESTIONS_FULFILLED = 'FETCH_LESSON_THINKING_QUESTIONS_FULFILLED';
export const FETCH_LESSON_THINKING_QUESTIONS_REJECTED = 'FETCH_LESSON_THINKING_QUESTIONS_REJECTED';

export function fetchLessonThinkingQuestions(lessonId) {
  return {
    type: FETCH_LESSON_THINKING_QUESTIONS,
    payload: bindApiKey(getLessonThinkingQuestions, [lessonId]),
    meta: {
      page: 1
    }
  };
}

export const FETCH_LESSON_USER_QUESTIONS = 'FETCH_LESSON_USER_QUESTIONS';
export const FETCH_LESSON_USER_QUESTIONS_PENDING = 'FETCH_LESSON_USER_QUESTIONS_PENDING';
export const FETCH_LESSON_USER_QUESTIONS_FULFILLED = 'FETCH_LESSON_USER_QUESTIONS_FULFILLED';
export const FETCH_LESSON_USER_QUESTIONS_REJECTED = 'FETCH_LESSON_USER_QUESTIONS_REJECTED';

export function fetchLessonUserQuestions(lessonId, page, user) {
  return {
    type: FETCH_LESSON_USER_QUESTIONS,
    payload: bindApiKey(getLessonUserQuestions, [lessonId, page, user]),
    meta: { page }
  };
}

export const FETCH_USER_QUESTIONS = 'FETCH_USER_QUESTIONS';
export const FETCH_USER_QUESTIONS_PENDING = 'FETCH_USER_QUESTIONS_PENDING';
export const FETCH_USER_QUESTIONS_FULFILLED = 'FETCH_USER_QUESTIONS_FULFILLED';
export const FETCH_USER_QUESTIONS_REJECTED = 'FETCH_USER_QUESTIONS_REJECTED';

export function fetchUserQuestionList(user, page) {
  return {
    type: FETCH_USER_QUESTIONS,
    payload: bindApiKey(getUserQuestionList, [user, page]),
    meta: { page }
  };
}

export const SET_QUESTION_TO_STORE = 'SET_QUESTION_TO_STORE';

export function setQuestionToStore(question) {
  return {
    type: SET_QUESTION_TO_STORE,
    payload: question
  };
}

export const FETCH_QUESTION_BY_ID = 'FETCH_QUESTION_BY_ID';
export const FETCH_QUESTION_BY_ID_PENDING = 'FETCH_QUESTION_BY_ID_PENDING';
export const FETCH_QUESTION_BY_ID_FULFILLED = 'FETCH_QUESTION_BY_ID_FULFILLED';
export const FETCH_QUESTION_BY_ID_REJECTED = 'FETCH_QUESTION_BY_ID_REJECTED';

export function fetchQuestionByID(questionID) {
  return {
    type: FETCH_QUESTION_BY_ID,
    payload: bindApiKey(getQuestion, [questionID])
  };
}

export const TOGGLE_FAVOR_OF_QUESTION = 'TOGGLE_FAVOR_OF_QUESTION';
export const TOGGLE_FAVOR_OF_QUESTION_PENDING = 'TOGGLE_FAVOR_OF_QUESTION_PENDING';
export const TOGGLE_FAVOR_OF_QUESTION_FULFILLED = 'TOGGLE_FAVOR_OF_QUESTION_FULFILLED';
export const TOGGLE_FAVOR_OF_QUESTION_REJECTED = 'TOGGLE_FAVOR_OF_QUESTION_REJECTED';

export function toggleFavorOfQuestion(questionID, rated) {
  return {
    type: TOGGLE_FAVOR_OF_QUESTION,
    payload: bindApiKey(rateQuestion, [questionID, rated]),
    meta:{
      questionID,
      rated
    }
  };
}