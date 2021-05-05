import {
  POST_REPLY_PENDING,
  POST_REPLY_FULFILLED,
  POST_REPLY_REJECTED,
  FETCH_REPLYS_PENDING,
  FETCH_REPLYS_FULFILLED,
  FETCH_REPLYS_REJECTED,
  DELETE_REPLY_PENDING,
  DELETE_REPLY_FULFILLED,
  DELETE_REPLY_REJECTED,
  TOGGLE_FAVOR_OF_REPLY_PENDING,
  TOGGLE_FAVOR_OF_REPLY_FULFILLED,
  TOGGLE_FAVOR_OF_REPLY_REJECTED,
} from '../actions/reply';

const initialState = {
  fetching_replys: false,
  need_update: false,
  next_page: 1,
  replys:[]
};
export default function replys(state = initialState, action = {}) {
  switch (action.type) {

    case POST_REPLY_PENDING:
      console.log('posting reply');
      return state;

    case POST_REPLY_FULFILLED:
      console.log('post reply success');
      return Object.assign({}, state, { need_update: true });

    case FETCH_REPLYS_PENDING:
      console.log('fetching replys');
      console.log(action);
      return Object.assign({}, state, { fetching_replys: true });

    case FETCH_REPLYS_FULFILLED:
      console.log('fetch replys success');
      console.log(action);
      const replys = (1 == action.meta.page ?
        action.payload.results : state.replys.concat(action.payload.results)
      );
      const next_page = action.payload.next ? action.meta.page + 1 : null;
      return Object.assign({}, state, {
        fetching_replys: false,
        need_update: false,
        next_page,
        replys
      });

    case TOGGLE_FAVOR_OF_REPLY_PENDING:
      console.log('toggling favor of the reply');
      return state;

    case TOGGLE_FAVOR_OF_REPLY_FULFILLED:
      console.log('toggle favor of the reply success');
      return Object.assign({}, state, {
        replys: state.replys.map(item => {
          if (item.uuid == action.meta.reply_id) {
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

    case DELETE_REPLY_PENDING:
      console.log('deleting the reply');
      return state;

    case DELETE_REPLY_FULFILLED:
      console.log('delete the reply success');
      return Object.assign({}, state, { need_update: true });

    default:
      return state;
  }
}
