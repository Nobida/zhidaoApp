import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LogInCheck from './LogInCheck';
import {withRouter} from 'react-router'
import {claimToken} from "../../actions/auth";

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    claim_token: auth.claim_token
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      claimToken
    }, dispatch)
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogInCheck));
