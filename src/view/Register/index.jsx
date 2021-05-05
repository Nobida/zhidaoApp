import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userRegister } from '../../actions/auth';
import Register from './Register';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      userRegister,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
