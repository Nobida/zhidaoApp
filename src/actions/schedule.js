//
// Schedule
// --------------------------------------------------


export const SET_CUR_SCHEDULE = 'SET_CUR_SCHEDULE';

export function setCurSchedule(schedule) {
  return {
    type: SET_CUR_SCHEDULE,
    schedule: schedule
  };
}

export const CLEAR_CUR_SCHEDULE = 'CLEAR_CUR_SCHEDULE';

export function clearCurSchedule() {
  return {
    type: CLEAR_CUR_SCHEDULE
  };
}
