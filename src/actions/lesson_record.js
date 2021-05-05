import { postLessonRecord } from '../api/reading_record';
import bindApiKey from '../utils/bindApiKey';

export const POST_LESSON_RECORD = 'POST_LESSON_RECORD';

export function submitLessonRecord(lesson_id) {
  return {
    type: POST_LESSON_RECORD,
    payload: bindApiKey(postLessonRecord, lesson_id)
  };
}
