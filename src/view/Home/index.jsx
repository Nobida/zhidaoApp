import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router'
import {fetchLessons,setCurLessonInfo,clearLesson} from "../../actions/lesson";
import {setCourseToStore} from '../../actions/course';
import Home from './Home';


const mapStateToProps = (state) => {
  const { courses, lessons, today, cur_course,cur_lesson } = state;
  return {
    courses: courses,
    today: today,
    lessons: lessons,
    cur_course: cur_course.course,
    cur_lesson_info: cur_lesson.lesson_info.lesson_info

  };
};

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({
    fetchLessons,
    setCourseToStore,
    setCurLessonInfo,
    clearLesson

  }, dispatch)};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
