import {
    SET_CUR_GIFT,
    RECEIVE_GIFT_PENDING,
  RECEIVE_GIFT_FULFILLED,
  RECEIVE_GIFT_REJECTED
} from '../../actions/gift';


const initialState = {
  receiving_gift: false,
  received_gift:{},
  error:false
};

export default function cur_received_gift(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_GIFT_PENDING:
      console.log('fetch cur gift pending');
      return Object.assign({}, state, {receiving_gift:true,received_gift:{},error:false});
    case RECEIVE_GIFT_FULFILLED:
      console.log('fetch cur gift fulfilled');
      console.log(action);
      return Object.assign({}, state, {receiving_gift:false,received_gift:action.payload,error:false});
    case RECEIVE_GIFT_REJECTED:
      return Object.assign({}, state, {receiving_gift:false,error:true});

    default:
      return state;
  }
}
