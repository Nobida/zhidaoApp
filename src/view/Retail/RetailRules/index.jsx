import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import RetailRules from './RetailRules';

const mapStateToProps = (state) => {
  const {  } = state;
  return {

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RetailRules)
);
