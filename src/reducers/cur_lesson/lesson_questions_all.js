import {
  FETCH_LESSON_QUESTIONS_PENDING,
  FETCH_LESSON_QUESTIONS_FULFILLED,
  FETCH_LESSON_QUESTIONS_REJECTED,
  POST_QUESTION_FULFILLED,
  DELETE_QUESTION_FULFILLED,
  TOGGLE_FAVOR_OF_QUESTION_FULFILLED,
} from '../../actions/question';
import { CLEAR_LESSON } from "../../actions/lesson";
import { getItemIndexInList } from '../../utils';


const initialState = {
  fetching_questions: false,
  next_page: 1,
  questions:[]
};
export default function lesson_questions_all(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_LESSON_QUESTIONS_PENDING:
      console.log('fetching questions');
      console.log(action);
      return Object.assign({}, state, { fetching_questions: true });

    case FETCH_LESSON_QUESTIONS_FULFILLED:
      console.log('fetch questions success');
      console.log(action);
      const questions_get = (1 == action.meta.page ?
        action.payload.results : state.questions.concat(action.payload.results)
      );
      const next_page = action.payload.next ? action.meta.page + 1 : null;
      return Object.assign({}, state, {
        fetching_questions: false,
        next_page,
        questions: questions_get,
      });

    case POST_QUESTION_FULFILLED:
      console.log('post question success');
      console.log(action);
      let questions_add = state.questions;
      if (state.questions.length && (state.questions[0].lesson_page.split('/')[0] == action.payload.lesson_page.split('/')[0])) {
        console.log('add question in lesson questions');
        questions_add = [action.payload].concat(state.questions);
      }
      return Object.assign({}, state, {
        questions: questions_add,
      });

    case DELETE_QUESTION_FULFILLED:
      console.log('delete question success');
      console.log(action);
      const questions_del = state.questions.filter(item => {
        if (action.meta.questionID == item.uuid) {
          console.log('delete question in lesson questions');
          return false;
        }
        return true;
      });
      return Object.assign({}, state, {
        questions: questions_del,
      });

    case TOGGLE_FAVOR_OF_QUESTION_FULFILLED:
      console.log('toggle favor of question success');
      console.log(action);
      if ("no_action" == action.payload.results) {
        return state;
      }
      const rateQuestionId = getItemIndexInList(action.meta.questionID,state.questions);
      if (rateQuestionId != -1) {
        console.log('toggle favor in lesson questions');
        const rated = ("added" == action.payload.result ? true : false);
        let questions = state.questions.map(function(d){ return d });
        questions[rateQuestionId].rated = rated;
        questions[rateQuestionId].rating += rated ? 1 : -1;
        return Object.assign({}, state, {
          questions
        });
      } else {
        return state;
      }

    case CLEAR_LESSON:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}
