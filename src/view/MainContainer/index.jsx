import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router'
import MainContainer from './MainContainer';


const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContainer)
);
