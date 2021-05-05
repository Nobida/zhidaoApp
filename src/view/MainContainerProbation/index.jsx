import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router'
import MainContainerProbation from './MainContainerProbation';


const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainContainerProbation)
);
