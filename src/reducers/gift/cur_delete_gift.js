import {
    DELETE_GIFT_PENDING,
    DELETE_GIFT_FULFILLED,
    DELETE_GIFT_REJECTED,

} from '../../actions/gift';


const initialState = {
    deleting_gift:false,
    success_info: null,
    error_info: null
};

export default function cur_delete_gift(state = initialState, action = {}) {
  switch (action.type) {
    case DELETE_GIFT_PENDING:
      console.log('deleting gift pending');
      console.log(action);
      return Object.assign({}, state, {deleting_gift:true,success_info:null,error_info:null});
    case DELETE_GIFT_FULFILLED:
      console.log('delete gift success');
      console.log(action);
      return Object.assign({}, state, {success_info:true,deleting_gift:false});
    case DELETE_GIFT_REJECTED:
      console.log('delete gift fail');
      console.log(action);
      return Object.assign({}, state, {error_info:false,deleting_gift:false});
    default:
      return state;
  }
}
