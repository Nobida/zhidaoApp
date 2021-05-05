import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import { bindActionCreators } from 'redux';
import {fetchLessons,setCurLessonInfo,clearLesson} from "../../actions/lesson";
import { fetchUserStat } from "../../actions/user";
import {setCourseToStore,fetchCourseByID} from '../../actions/course';
import Course from './Course';

const mapStateToProps = (state) => {
  const {courses, lessons, today, cur_course,cur_lesson,cur_schedule} = state;
  return {
    courses: courses,
    today: today,
    lessons: lessons,
    cur_course:cur_course.course,
    cur_lesson_info: cur_lesson.lesson_info.lesson_info,
    cur_schedule: cur_schedule,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserStat,
      fetchLessons,
      setCurLessonInfo,
      setCourseToStore,
      clearLesson,
      fetchCourseByID
    },dispatch)
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Course));
