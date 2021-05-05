import { combineReducers } from 'redux';
import lesson_info from './lesson_info';
import lesson_bg from './lesson_bg';
import lesson_lecture from './lesson_lecture';
import lesson_text from './lesson_text';
import lesson_qa from './lesson_qa';
import lesson_buddy from './lesson_buddy';
import lesson_progress from './lesson_progress';
import lesson_notes_all from './lesson_notes_all';
import lesson_notes_user from './lesson_notes_user';
import lesson_note_progress from './lesson_note_progress';
import lesson_questions_all from './lesson_questions_all';
import lesson_questions_thinking from './lesson_questions_thinking';
import lesson_questions_user from './lesson_questions_user';
import lesson_question_progress from './lesson_question_progress';
import lesson_qa_progress from './lesson_qa_progress';
import lesson_page from './lesson_page';
import lesson_quiz_status from './lesson_quiz_status';
import lesson_audio_progress from './lesson_audio_progress';

const cur_lesson = combineReducers({
  lesson_info,
  lesson_bg,
  lesson_lecture,
  lesson_text,
  lesson_buddy,
  lesson_progress,
  lesson_notes_all,
  lesson_notes_user,
  lesson_note_progress,
  lesson_questions_all,
  lesson_questions_thinking,
  lesson_questions_user,
  lesson_question_progress,
  lesson_qa,
  lesson_qa_progress,
  lesson_page,
  lesson_quiz_status,
  lesson_audio_progress
});
export default cur_lesson;
