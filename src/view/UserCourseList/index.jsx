import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import {fetchCourseList} from "../../actions/course";


const mapStateToProps = (state) => {
  const { courses, auth } = state;
  return {
    courses: courses,
    studentID: auth.user_info.id
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchCourseList
    }, dispatch)


  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
