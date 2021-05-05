import {
    CREATE_GIFT_PENDING,
    CREATE_GIFT_FULFILLED,
    CREATE_GIFT_REJECTED
} from '../../actions/gift';


const initialState = {
    posting_gift:false,
    success_info: null,
    error_info: null
};

export default function cur_post_gift(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_GIFT_PENDING:
      console.log('post gift pending');
      console.log(action);
      return Object.assign({}, state, {posting_gift:true,success_info:null,error_info:null});
    case CREATE_GIFT_FULFILLED:
      console.log('post gift success');
      console.log(action);
      return Object.assign({}, state, {success_info:action.payload,posting_gift:false});
    case CREATE_GIFT_REJECTED:
      console.log('post gift fail');
      console.log(action);
      return Object.assign({}, state, {error_info:action.payload,posting_gift:false});
    default:
      return state;
  }
}
