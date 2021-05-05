import {
    FETCH_GIFT_LIST_PENDING,
    FETCH_GIFT_LIST_FULFILLED,
    FETCH_GIFT_LIST_REJECTED
} from '../../actions/gift';


const initialState = {
    fetching_gifts:false,
    gifts:[]
};

export default function gifts(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_GIFT_LIST_PENDING:
      console.log('fetching  gifts pending');
      console.log(action);
      return Object.assign({}, state, {fetching_gifts:true,gifts:[]});
    case FETCH_GIFT_LIST_FULFILLED:
      console.log('fetch gifts success');
      console.log(action);
      return Object.assign({}, state, {gifts:action.payload,fetching_gifts:false});
    default:
      return state;
  }
}
