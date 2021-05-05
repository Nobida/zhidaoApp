export const SET_CUR_HIGHLIGHT = 'SET_CUR_HIGHLIGHT';

export function setCurHighlight(highlight){
  return {
    type: SET_CUR_HIGHLIGHT,
    highlight: highlight
  };
}

export const CLEAR_CUR_HIGHLIGHT  = 'CLEAR_CUR_HIGHLIGHT';

export function clearCurHighlight(){
  return {
    type: CLEAR_CUR_HIGHLIGHT
  };
}
