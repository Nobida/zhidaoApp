import {
  FETCH_QUIZ_SET_FULFILLED,
  FETCH_QUIZ_SET_PENDING,
  FETCH_QUIZ_SET_REJECTED
} from "../actions/quizset";


const initialState = {
  fetching_quiz_set:false,
  answered: false,
  quizes: []
};
export default function lesson_quizset(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_QUIZ_SET_PENDING:
      console.log('fetching quiz set');
      return Object.assign({}, state, {
        fetching_quiz_set: true,
        answered: false,
        quizes: []
      });

    case FETCH_QUIZ_SET_FULFILLED:
      console.log('fetch quiz set success');
      console.log(action);
      const data = action.payload;
      if (data.quizes instanceof Array && data.hasOwnProperty('answered')) {
        return Object.assign({}, state, {
          fetching_quiz_set: false,
          answered: data.answered,
          quizes: data.quizes
        });
      } else {
        return state;
      }

    default:
      return state;
  }
}
