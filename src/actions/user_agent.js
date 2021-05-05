//
// UserAgent
// --------------------------------------------------


export const SET_USER_AGENT_TYPE = 'SET_USER_AGENT_TYPE';

export function setUserAgentType(agentType) {
  return {
    type: SET_USER_AGENT_TYPE,
    agentType: agentType
  };
}
