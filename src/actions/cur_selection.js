export const SET_CUR_SELECTION = 'SET_CUR_SELECTION';

export function setCurSelection(selection){
  return {
    type: SET_CUR_SELECTION,
    selection: selection
  };
}
