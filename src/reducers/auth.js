import {
  FETCH_USER_INFO_PENDING,
  FETCH_USER_INFO_FULFILLED,
  FETCH_USER_INFO_REJECTED,
  USER_REGISTER_PENDING,
  USER_REGISTER_FULFILLED,
  USER_REGISTER_REJECTED,
  SET_PROBATION_USER_INFO,
  FETCH_USER_PERM_PENDING,
  FETCH_USER_PERM_FULFILLED,
  SET_TOKEN,
  CLAIM_TOKEN_PENDING,
  CLAIM_TOKEN_FULFILLED
} from '../actions/auth';

function saveUserInfo(user_info) {
  localStorage.setItem("userInfo", JSON.stringify(user_info));
}

const initialState = {
  user_info:{},
  user_perm:{},
  token: '',
  claim_token: false
};
export default function auth(state = initialState, action = {}) {
  switch (action.type){

    case FETCH_USER_INFO_PENDING:
      console.log('fetching user info');
      return state;

    case FETCH_USER_INFO_FULFILLED:
      console.log('fetch user info success');
      console.log(action.payload);
      saveUserInfo(action.payload);
      return Object.assign({}, state, { user_info: action.payload });

    case FETCH_USER_INFO_REJECTED:
      console.log('fetch user info failed');
      console.log(action.payload);
      return Object.assign({}, state, { user_info: {}});
      return state;

    case USER_REGISTER_FULFILLED:
      console.log('user register success');
      console.log(action.payload);
      const newUserInfo = Object.assign({}, state.user_info, action.payload);
      saveUserInfo(newUserInfo);
      return Object.assign({}, state, { user_info: newUserInfo });

    case SET_PROBATION_USER_INFO:
      return Object.assign({}, state, { user_info: action.userInfo});

    case FETCH_USER_PERM_PENDING:
      return Object.assign({}, state, { user_perm: {}});

    case FETCH_USER_PERM_FULFILLED:
      return Object.assign({}, state, { user_perm: action.payload});

    case SET_TOKEN:
      return Object.assign({}, state, { token: action.token});
    case CLAIM_TOKEN_PENDING:
      return Object.assign({}, state, { claim_token: false});
    case CLAIM_TOKEN_FULFILLED:
      return Object.assign({}, state, { claim_token: true});
    default:
      return state;
  }
}
