import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import {fetchCourseByID} from '../../actions/course';
import ProbationList from './ProbationList';
import {withRouter} from 'react-router'

const mapStateToProps = (state) => {
  const { cur_course } = state;
  return {
    cur_course: cur_course.course
  };
};

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({
    fetchCourseByID 
  }, dispatch)};
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProbationList));
