import {connect} from 'react-redux';
import DailyReading from './DailyReading';
import {fetchQuizset} from "../../actions/quizset";
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchLesson,fetchLessons} from "../../actions/lesson";
import {createSharePage} from '../../actions/share';
import {fetchGiftList,createGift} from "../../actions/gift";

const mapStateToProps = (state) => {
  const {lessons,cur_lesson,today,courses } = state;
  return {
      lessons,
      today,
      courses,
      lesson_info: cur_lesson.lesson_info.lesson_info
  };
};
function mapDispatchToProps(dispatch) {
   return {
    actions: bindActionCreators({
      fetchGiftList,
      fetchLessons,

  }, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DailyReading));
