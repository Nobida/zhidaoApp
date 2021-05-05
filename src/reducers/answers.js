import {
  POST_ANSWER_PENDING,
  POST_ANSWER_FULFILLED,
  POST_ANSWER_REJECTED,
  FETCH_ANSWERS_PENDING,
  FETCH_ANSWERS_FULFILLED,
  FETCH_ANSWERS_REJECTED,
  DELETE_ANSWER_PENDING,
  DELETE_ANSWER_FULFILLED,
  DELETE_ANSWER_REJECTED,
  TOGGLE_FAVOR_OF_ANSWER_PENDING,
  TOGGLE_FAVOR_OF_ANSWER_FULFILLED,
  TOGGLE_FAVOR_OF_ANSWER_REJECTED,
} from '../actions/answer';

const initialState = {
  fetching_answers: false,
  need_update: false,
  next_page: 1,
  answers:[]
};
export default function answers(state = initialState, action = {}) {
  switch (action.type) {

    case POST_ANSWER_PENDING:
      console.log('posting answer');
      return state;

    case POST_ANSWER_FULFILLED:
      console.log('post answer success');
      return Object.assign({}, state, { need_update: true });

    case FETCH_ANSWERS_PENDING:
      console.log('fetching answers');
      console.log(action);
      return Object.assign({}, state, { fetching_answers: true });

    case FETCH_ANSWERS_FULFILLED:
      console.log('fetch answers success');
      console.log(action);
      const answers = (1 == action.meta.page ?
        action.payload.results : state.answers.concat(action.payload.results)
      );
      const next_page = action.payload.next ? action.meta.page + 1 : null;
      return Object.assign({}, state, {
        fetching_answers: false,
        need_update: false,
        next_page,
        answers
      });

    case TOGGLE_FAVOR_OF_ANSWER_PENDING:
      console.log('toggling favor of the answer');
      return state;

    case TOGGLE_FAVOR_OF_ANSWER_FULFILLED:
      console.log('toggle favor of the answer success');
      return Object.assign({}, state, {
        answers: state.answers.map(item => {
          if (item.uuid == action.meta.answer_id) {
            switch (action.payload.result) {
              case "added":
                console.log("added");
                return Object.assign({}, item, {
                  rated: true,
                  rating: item.rating + 1,
                  latest_ratings: [{
                    avatar: action.meta.user_data.avatar,
                    user: action.meta.user_data.id
                  }].concat(item.latest_ratings)
                });

              case "deleted":
                console.log("deleted");
                return Object.assign({}, item, {
                  rated: false,
                  rating: item.rating - 1,
                  latest_ratings: item.latest_ratings.filter(rating_item => {
                    return rating_item.user != action.meta.user_data.id;
                  })
                });

              default:
                return item;
            }
          } else {
            return item;
          }
        })
      });

    case DELETE_ANSWER_PENDING:
      console.log('deleting the answer');
      return state;

    case DELETE_ANSWER_FULFILLED:
      console.log('delete the answer success');
      return Object.assign({}, state, { need_update: true });

    default:
      return state;
  }
}
