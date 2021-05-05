import {
  FETCH_ROUND_TABLE_LIST,
  FETCH_ROUND_TABLE_LIST_FULFILLED,
  FETCH_ROUND_TABLE_LIST_PENDING
} from '../actions/round_table';

const initialState = {
  fetching_round_table_list:false,
  round_tables:[]
};
export default function round_table(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_ROUND_TABLE_LIST_PENDING:
        console.log('fetching round table');
        return Object.assign({}, state, {fetching_round_table_list: true, round_tables:[]});

    case FETCH_ROUND_TABLE_LIST_FULFILLED:
        console.log('fetch round table success');
        console.log(action);
        return Object.assign({}, state, {fetching_round_table_list: false,round_tables:action.payload});

    default:
      return state;
  }
}
