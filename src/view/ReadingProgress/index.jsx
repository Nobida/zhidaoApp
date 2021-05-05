import {connect} from 'react-redux';
import ReadingProgress from './ReadingProgress';
import {bindActionCreators} from 'redux';
import {fetchLessons,setCurLessonInfo,clearLesson} from "../../actions/lesson";
import {setCourseToStore} from '../../actions/course';
import {setCurSchedule} from "../../actions/schedule";

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
 return {actions: bindActionCreators({
   fetchLessons,
   setCourseToStore,
   setCurLessonInfo,
   setCurSchedule,
   clearLesson
  }, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadingProgress);
