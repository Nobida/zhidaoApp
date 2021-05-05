import {
    FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_FULFILLED,
    FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_PENDING,
    FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_REJECTED
} from '../../actions/gift';



const initialState = {
    fetching_gift_products:false,
    products:[]
};

export default function gifts(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_PENDING:
      console.log('fetching  gifts pending');
      console.log(action);
      return Object.assign({}, state, {fetching_gift_products:true,products:[]});
    case FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_FULFILLED:
      console.log('fetch gifts success');
      console.log(action);
      return Object.assign({}, state, {products:action.payload,fetching_gift_products:false});
    default:
      return state;
  }
}
