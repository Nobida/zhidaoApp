import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchLatestCourse } from "../../actions/course";
import AdInitial from './AdInitial';

const mapStateToProps = (state) => {
  const { cur_course } = state;
  return {
    cur_course,

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLatestCourse,
    }, dispatch)

  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdInitial)
);
