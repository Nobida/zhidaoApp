import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import {fetchCourseList} from "../../actions/course";

const mapStateToProps = (state) => {

  const { courses, today, auth } = state;
  console.log(courses.ended_courses)
  const status = ['ended','registerable','waiting','going']

  

  return {
    ended_courses: courses.ended_courses,
    going_courses: courses.going_courses,
    waiting_courses: courses.waiting_courses,
    registerable_courses: courses.registerable_courses,
    today: today,
    studentID: auth.user_info.id,
    status: status
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
