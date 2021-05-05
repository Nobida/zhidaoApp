import {
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_REJECTED,
  FETCH_BOOKS_PENDING,
} from '../actions/book';

const initialState = {
  fetching_books:false,
  books:[]
};
export default function books(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_BOOKS_PENDING:
      console.log('fetching books');
      return Object.assign({}, state, {fetching_books: true});

    case FETCH_BOOKS_FULFILLED:
      console.log('fetch books success');
      console.log(action);
      return Object.assign({}, state, {books: action.payload, fetching_books: false});

    default:
      return state;
  }
}
