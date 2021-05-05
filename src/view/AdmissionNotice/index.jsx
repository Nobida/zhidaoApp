import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import AdmissionNotice from './AdmissionNotice';

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    user: auth.user_info,
  };
};
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdmissionNotice)
);
