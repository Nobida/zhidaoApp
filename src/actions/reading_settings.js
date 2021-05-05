export const SET_THEME = 'SET_THEME';

export function setTheme(theme){
  return {
    type: SET_THEME,
    theme: theme
  };
}

export const SET_FONT_SIZE = 'SET_FONT_SIZE';

export function setFontSize(fontSize){
  return {
    type: SET_FONT_SIZE,
    fontSize: fontSize
  };
}

