import {
  getLessons,
  getLessonById,
  getLessonBG,
  getLessonLecture,
  getLessonText,
  getLessonQA,
  getLessonBuddy,
  getLessonPage,
  getLessonQuizStatus,
  getPublicLessonById
} from "../api/lesson";
import bindApiKey from '../utils/bindApiKey';


export const FETCH_LESSONS = 'FETCH_LESSONS';
export const FETCH_LESSONS_PENDING = 'FETCH_LESSONS_PENDING';
export const FETCH_LESSONS_FULFILLED = 'FETCH_LESSONS_FULFILLED';
export const FETCH_LESSONS_REJECTED = 'FETCH_LESSONS_REJECTED';

export function fetchLessons(courseId){
  return {
    type: FETCH_LESSONS,
    payload: bindApiKey(getLessons,courseId),
    meta:{courseId:courseId}
  };
}

export const SET_CUR_LESSON_INFO = 'SET_CUR_LESSON_INFO';

export function setCurLessonInfo(lessonInfo){
  return {
    type: SET_CUR_LESSON_INFO,
    lessonInfo: lessonInfo
  }
}

export const SET_CUR_LESSON_NOTE_PROGRESS = 'SET_CUR_LESSON_NOTE_PROGRESS';

export function setCurLessonNoteProgress(progress){
  return {
    type: SET_CUR_LESSON_NOTE_PROGRESS,
    progress: progress
  }
}

export const SET_CUR_LESSON_QUESTION_PROGRESS = 'SET_CUR_LESSON_QUESTION_PROGRESS';

export function setCurLessonQuestionProgress(progress){
  return {
    type: SET_CUR_LESSON_QUESTION_PROGRESS,
    progress: progress
  }
}

export const SET_CUR_LESSON_QA_PROGRESS = 'SET_CUR_LESSON_QA_PROGRESS';

export function setCurLessonQAProgress(progress){
  return {
    type: SET_CUR_LESSON_QA_PROGRESS,
    progress: progress
  }
}

export const FETCH_LESSON = 'FETCH_LESSON';
export const FETCH_LESSON_PENDING = 'FETCH_LESSON_PENDING';
export const FETCH_LESSON_FULFILLED = 'FETCH_LESSON_FULFILLED';
export const FETCH_LESSON_REJECTED = 'FETCH_LESSON_REJECTED';

export function fetchLesson(lessonId,courseId){
  return {
    type: FETCH_LESSON,
    payload: bindApiKey(getLessonById,[lessonId,courseId]),
    meta:{lessonId:lessonId,courseId:courseId}
  };
} 

export function fetchPublicLesson(lessonId,courseId){
  return {
    type: FETCH_LESSON,
    payload: bindApiKey(getPublicLessonById,[lessonId,courseId]),
    meta:{lessonId:lessonId,courseId:courseId}
  };
}


export const FETCH_LESSON_BG = 'FETCH_LESSON_BG';
export const FETCH_LESSON_BG_PENDING = 'FETCH_LESSON_BG_PENDING';
export const FETCH_LESSON_BG_FULFILLED = 'FETCH_LESSON_BG_FULFILLED';
export const FETCH_LESSON_BG_REJECTED = 'FETCH_LESSON_BG_REJECTED';

export function fetchLessonBG(lessonId){
  return {
    type: FETCH_LESSON_BG,
    payload: bindApiKey(getLessonBG,lessonId),
    meta:{lessonId:lessonId}
  };
}

export const FETCH_LESSON_TEXT = 'FETCH_LESSON_TEXT';
export const FETCH_LESSON_TEXT_PENDING = 'FETCH_LESSON_TEXT_PENDING';
export const FETCH_LESSON_TEXT_FULFILLED = 'FETCH_LESSON_TEXT_FULFILLED';
export const FETCH_LESSON_TEXT_REJECTED = 'FETCH_LESSON_TEXT_REJECTED';

export function fetchLessonText(lessonId){
  return {
    type: FETCH_LESSON_TEXT,
    payload: bindApiKey(getLessonText,lessonId),
    meta:{lessonId:lessonId}
  };
}

export const FETCH_LESSON_LECTURE = 'FETCH_LESSON_LECTURE';
export const FETCH_LESSON_LECTURE_PENDING = 'FETCH_LESSON_LECTURE_PENDING';
export const FETCH_LESSON_LECTURE_FULFILLED = 'FETCH_LESSON_LECTURE_FULFILLED';
export const FETCH_LESSON_LECTURE_REJECTED = 'FETCH_LESSON_LECTURE_REJECTED';

export function fetchLessonLecture(lessonId){
  return {
    type: FETCH_LESSON_LECTURE,
    payload: bindApiKey(getLessonLecture,lessonId),
    meta:{lessonId:lessonId}
  };
}

export const FETCH_LESSON_QA = 'FETCH_LESSON_QA';
export const FETCH_LESSON_QA_PENDING = 'FETCH_LESSON_QA_PENDING';
export const FETCH_LESSON_QA_FULFILLED = 'FETCH_LESSON_QA_FULFILLED';
export const FETCH_LESSON_QA_REJECTED = 'FETCH_LESSON_QA_REJECTED';

export function fetchLessonQA(lessonId){
  return {
    type: FETCH_LESSON_QA,
    payload: bindApiKey(getLessonQA,lessonId),
    meta:{lessonId:lessonId}
  };
}

export const FETCH_LESSON_PAGE = 'FETCH_LESSON_PAGE';
export const FETCH_LESSON_PAGE_PENDING = 'FETCH_LESSON_PAGE_PENDING';
export const FETCH_LESSON_PAGE_FULFILLED = 'FETCH_LESSON_PAGE_FULFILLED';
export const FETCH_LESSON_PAGE_REJECTED = 'FETCH_LESSON_PAGE_REJECTED';

export function fetchLessonPage(lessonId,courseId,pageName){
  return {
    type: FETCH_LESSON_PAGE,
    payload: bindApiKey(getLessonPage,[lessonId,courseId,pageName]),
    meta:{lessonId:lessonId, pageName:pageName, courseId:courseId}
  };
}

export const FETCH_LESSON_QUIZ_STATUS = 'FETCH_LESSON_QUIZ_STATUS';
export const FETCH_LESSON_QUIZ_STATUS_PENDING = 'FETCH_LESSON_QUIZ_STATUS_PENDING';
export const FETCH_LESSON_QUIZ_STATUS_FULFILLED = 'FETCH_LESSON_QUIZ_STATUS_FULFILLED';
export const FETCH_LESSON_QUIZ_STATUS_REJECTED = 'FETCH_LESSON_QUIZ_STATUS_REJECTED';

export function fetchLessonQuizStatus(lessonId,courseId){
  return {
    type: FETCH_LESSON_QUIZ_STATUS,
    payload: bindApiKey(getLessonQuizStatus,[lessonId,courseId]),
    meta:{lessonId:lessonId}
  };
}

export function setLessonQuizStatus(quiz_status){
  return{
    type: FETCH_LESSON_QUIZ_STATUS_FULFILLED,
    payload: quiz_status
  }
}

export const FETCH_LESSON_BUDDY = 'FETCH_LESSON_BUDDY';
export const FETCH_LESSON_BUDDY_PENDING = 'FETCH_LESSON_BUDDY_PENDING';
export const FETCH_LESSON_BUDDY_FULFILLED = 'FETCH_LESSON_BUDDY_FULFILLED';
export const FETCH_LESSON_BUDDY_REJECTED = 'FETCH_LESSON_BUDDY_REJECTED';

export function fetchLessonBuddy(lessonId,courseId){
  return {
    type: FETCH_LESSON_BUDDY,
    payload: bindApiKey(getLessonBuddy,[lessonId,courseId]),
  };
}

export const SET_CUR_LESSON_PROGRESS = 'SET_CUR_LESSON_PROGRESS';

export function setCurLessonProgress(progress){
  return{
    type: SET_CUR_LESSON_PROGRESS,
    progress: progress
  }
}

export const SET_CUR_LESSON_AUDIO_PROGRESS = 'SET_CUR_LESSON_AUDIO_PROGRESS';

export function setCurLessonAudioProgress(progress){
  return{
    type: SET_CUR_LESSON_AUDIO_PROGRESS,
    progress: progress
  }
}

export const CLEAR_LESSON = 'CLEAR_LESSON';

export function clearLesson(){
  return {
    type: CLEAR_LESSON
  };
}


