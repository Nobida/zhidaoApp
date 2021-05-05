import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchUserInfo, setProbationUserInfo,fetchLogStatus } from "../../actions/auth";
import { setUserAgentType } from "../../actions/user_agent";
import ApiKeyLoader from './ApiKeyLoader';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserInfo,
      setProbationUserInfo,
      setUserAgentType,
      fetchLogStatus
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ApiKeyLoader)
);
