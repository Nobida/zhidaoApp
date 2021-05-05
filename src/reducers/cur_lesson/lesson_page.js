import {
  FETCH_LESSON_PAGE_FULFILLED,
  FETCH_LESSON_PAGE_PENDING,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
  fetching_lesson_page: {}
};

export default function lesson_page(state = initialState, action = {}) {
  let fetching_lesson_page = state.fetching_lesson_page;
  switch (action.type) {

    case FETCH_LESSON_PAGE_PENDING:
      console.log('fetching  lesson page');
      console.log(action);
      fetching_lesson_page[action.meta.pageName] = true;
      return Object.assign({}, state, {fetching_lesson_page:fetching_lesson_page});

    case FETCH_LESSON_PAGE_FULFILLED:
      console.log('fetch lesson page success');
      console.log(action);
      let state_item = state;
      fetching_lesson_page[action.meta.pageName] = false;
      state_item.fetching_lesson_page = fetching_lesson_page;
      state_item[action.meta.pageName] = action.payload;
      return Object.assign({}, state, state_item);
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}