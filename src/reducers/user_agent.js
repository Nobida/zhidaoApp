import {
  SET_USER_AGENT_TYPE
} from '../actions/user_agent';

const initialState = {
  agent_type: 'MOBILE'
};
export default function user_agent(state = initialState, action = {}) {
  switch (action.type) {

    case SET_USER_AGENT_TYPE:
      console.log('fetching user stat');
      return Object.assign({}, state, {agent_type: action.agentType});

    default:
      return state;
  }
}
