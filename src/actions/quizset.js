//
// Quizset
// --------------------------------------------------


import { getQuizSet, postQuizAnswer } from "../api/quizset";
import bindApiKey from '../utils/bindApiKey';

export const SUBMIT_QUIZ_ANSWER = 'SUBMIT_QUIZ_ANSWER';
export const SUBMIT_QUIZ_ANSWER_PENDING = 'SUBMIT_QUIZ_ANSWER_PENDING';
export const SUBMIT_QUIZ_ANSWER_FULFILLED = 'SUBMIT_QUIZ_ANSWER_FULFILLED';
export const SUBMIT_QUIZ_ANSWER_REJECTED = 'SUBMIT_QUIZ_ANSWER_REJECTED';
export const SUBMIT_QUIZ_ANSWER_MOCK = 'SUBMIT_QUIZ_ANSWER_MOCK';

export function submitQuizAnswer(quizAnswer,lessonId,courseId){
  return {
    type: SUBMIT_QUIZ_ANSWER,
    payload: bindApiKey(postQuizAnswer,[quizAnswer,lessonId,courseId])
  }
}

export function submitQuizAnswerMock(quizAnswer,lessonId,courseId){
  return {
    type: SUBMIT_QUIZ_ANSWER_MOCK,
    quizAnswer: quizAnswer,
    lessonId: lessonId,
    courseId: courseId
  }

}

export const FETCH_QUIZ_SET = 'FETCH_QUIZ_SET';
export const FETCH_QUIZ_SET_PENDING = 'FETCH_QUIZ_SET_PENDING';
export const FETCH_QUIZ_SET_FULFILLED = 'FETCH_QUIZ_SET_FULFILLED';
export const FETCH_QUIZ_SET_REJECTED = 'FETCH_QUIZ_SET_REJECTED';

export function fetchQuizset(lessonId,courseId) {
  return {
    type: FETCH_QUIZ_SET,
    payload: bindApiKey(getQuizSet,[lessonId,courseId])
  };
}

export const CLEAR_SUBMIT_QUIZ = 'CLEAR_SUBMIT_QUIZ';

export function clearSubmitQuiz(){
  return {
    type: CLEAR_SUBMIT_QUIZ
  }
}
