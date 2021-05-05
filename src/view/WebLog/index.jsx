import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setToken, fetchLogStatus } from "../../actions/auth";
import WebLog from './WebLog';

const mapStateToProps = (state) => {
  const { auth,user_agent } = state;
  return {
    auth,
    user_agent
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setToken,
      fetchLogStatus
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WebLog)
);
