import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {
  setCurLessonProgress,
  setCurLessonAudioProgress,
  fetchLessonPage,
  fetchLessonQuizStatus,
  setLessonQuizStatus
} from "../../../actions/lesson";
import {
  fetchUserStat
} from "../../../actions/user";
import {
  submitQuizAnswer
} from "../../../actions/quizset";
import { fetchLessonThinkingQuestions } from "../../../actions/question";
import { setCurSelection } from "../../../actions/cur_selection";
import { createSharePage } from '../../../actions/share';
import { setSharePage, setDefaultSharePage } from "../../../actions/wechat";
import ReadingContent from './ReadingContent';


const mapStateToProps = (state) => {
  const { cur_lesson, cur_highlight, cur_selection, reading_settings, auth, user_agent,cur_submit_quiz } = state;
  return {
    background: cur_lesson.lesson_bg.background,
    text: cur_lesson.lesson_text.text,
    lecture: cur_lesson.lesson_lecture.lecture,
    lesson_progress: cur_lesson.lesson_progress,
    lesson_audio_progress: cur_lesson.lesson_audio_progress,
    lesson_status: cur_lesson.lesson_info.lesson_info.status,
    notes_user: cur_lesson.lesson_notes_user.notes,
    day_num: cur_lesson.lesson_info.lesson_info.day_num,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    lesson_page: cur_lesson.lesson_page,
    qa: cur_lesson.lesson_qa.qa,
    highlight: cur_highlight,
    selection: cur_selection,
    reading_settings,
    apikey: auth.user_info.apikey,
    agent_type: user_agent.agent_type,
    lesson_quiz_status: cur_lesson.lesson_quiz_status.lesson_quiz_status,
    cur_submit_quiz: cur_submit_quiz,
    thinking_questions: cur_lesson.lesson_questions_thinking,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurLessonProgress,
      setCurSelection,
      fetchLessonPage,
      submitQuizAnswer,
      createSharePage,
      setSharePage,
      setDefaultSharePage,
      fetchLessonQuizStatus,
      setCurLessonAudioProgress, 
      fetchUserStat,
      fetchLessonThinkingQuestions,
      setLessonQuizStatus
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReadingContent)
);
