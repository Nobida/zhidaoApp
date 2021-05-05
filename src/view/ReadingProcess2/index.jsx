import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserStat } from "../../actions/user";
import {fetchLessons,setCurLessonInfo} from "../../actions/lesson";
import {setCourseToStore} from '../../actions/course';
import { withRouter } from 'react-router';
import ReadingProcess2 from './ReadingProcess2';


const mapStateToProps = (state) => {
  const {courses, lessons, today, cur_course,cur_lesson,cur_schedule} = state;
  return {
    courses: courses,
    today: today,
    lessons: lessons,
    cur_course:cur_course.course,
    cur_lesson_info: cur_lesson.lesson_info.lesson_info,
    cur_schedule: cur_schedule
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLessons,
      setCourseToStore,
      setCurLessonInfo,

    },dispatch)
  };
}


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReadingProcess2)
);
