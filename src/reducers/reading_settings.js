import {
  SET_FONT_SIZE,
  SET_THEME,
} from '../actions/reading_settings';

function setReadingSetting(readingSettings){
  localStorage.setItem('readingSettings', JSON.stringify(readingSettings));
}
function getInitialSetting(){
  const readingSettingsJSON = localStorage.getItem("readingSettings");
  if (!readingSettingsJSON) {
    return {
      "theme":"white",
      "font_size": "md",
    };
  } else {
    return JSON.parse(readingSettingsJSON);
  }
}

const initialState = getInitialSetting();
export default function reading_settings(state = initialState, action = {}) {
  switch (action.type) {

    case SET_FONT_SIZE:
      console.log('set font size:'+action.fontSize);
      setReadingSetting({
        theme: state.theme,
        font_size: action.fontSize
      });
      return Object.assign({}, state, {font_size : action.fontSize});

    case SET_THEME:
      console.log('set theme:'+action.theme);
      setReadingSetting({
        theme: action.theme,
        font_size: state.font_size
      });
      return Object.assign({}, state, {theme: action.theme});

    default:
      return state;
  }
}