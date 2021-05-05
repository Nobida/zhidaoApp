import {
  postAnswer,
  deleteAnswerPromise,
  getQuestionAnswers,
  rateAnswer,
} from "../api/answer";
import bindApiKey from '../utils/bindApiKey';


export const POST_ANSWER = 'POST_ANSWER';
export const POST_ANSWER_PENDING = 'POST_ANSWER_PENDING';
export const POST_ANSWER_FULFILLED = 'POST_ANSWER_FULFILLED';
export const POST_ANSWER_REJECTED = 'POST_ANSWER_REJECTED';

export function createAnswer(formData){
   return {
      type: POST_ANSWER,
      payload: bindApiKey(postAnswer, formData),
   }
}

export const DELETE_ANSWER = 'DELETE_ANSWER';
export const DELETE_ANSWER_PENDING = 'DELETE_ANSWER_PENDING';
export const DELETE_ANSWER_FULFILLED = 'DELETE_ANSWER_FULFILLED';
export const DELETE_ANSWER_REJECTED = 'DELETE_ANSWER_REJECTED';

export function deleteAnswer(answerID, questionID){
  return {
      type: DELETE_ANSWER,
      payload: bindApiKey(deleteAnswerPromise, [answerID, questionID]),
   }
}

export const FETCH_ANSWERS = 'FETCH_ANSWERS';
export const FETCH_ANSWERS_PENDING = 'FETCH_ANSWERS_PENDING';
export const FETCH_ANSWERS_FULFILLED = 'FETCH_ANSWERS_FULFILLED';
export const FETCH_ANSWERS_REJECTED = 'FETCH_ANSWERS_REJECTED';

export function fetchQuestionAnswers(questionID, page){
  return {
    type: FETCH_ANSWERS,
    payload: bindApiKey(getQuestionAnswers,[questionID, page]),
    meta: { page }
  };
}

export const TOGGLE_FAVOR_OF_ANSWER = 'TOGGLE_FAVOR_OF_ANSWER';
export const TOGGLE_FAVOR_OF_ANSWER_PENDING = 'TOGGLE_FAVOR_OF_ANSWER_PENDING';
export const TOGGLE_FAVOR_OF_ANSWER_FULFILLED = 'TOGGLE_FAVOR_OF_ANSWER_FULFILLED';
export const TOGGLE_FAVOR_OF_ANSWER_REJECTED = 'TOGGLE_FAVOR_OF_ANSWER_REJECTED';

export function toggleFavorOfAnswer(answerID, rated, userData) {
  return {
    type: TOGGLE_FAVOR_OF_ANSWER,
    payload: bindApiKey(rateAnswer, [answerID, rated]),
    meta: {
      answer_id: answerID,
      user_data: userData
    }
  };
}