import {
    SET_CUR_GIFT,
    FETCH_CUR_GIFT_PENDING,
    FETCH_CUR_GIFT_FULFILLED,
    FETCH_CUR_GIFT_REJECTED
} from '../../actions/gift';


const initialState = {
  fetching_cur_gift: false,
  cur_gift:{}
};

export default function cur_gift(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CUR_GIFT_PENDING:
      console.log('fetch cur gift pending');
      return Object.assign({}, state, {fetching_cur_gift:true,cur_gift:{}});
    case FETCH_CUR_GIFT_FULFILLED:
      console.log('fetch cur gift fulfilled');
      console.log(action);
      return Object.assign({}, state, {fetching_cur_gift:false,cur_gift:action.payload});
    case SET_CUR_GIFT:
      console.log('set cur gift');
      console.log(action);
      return Object.assign({}, state, {fetching_cur_gift:false,cur_gift:action.gift});
    default:
      return state;
  }
}
