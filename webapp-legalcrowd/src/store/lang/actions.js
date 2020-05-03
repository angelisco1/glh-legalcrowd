import { CHANGE_LANG } from './action-types';

export function changeLang(selectedLang) {
  return (dispatch, getState) => {
    dispatch(actionChangeLang(selectedLang));
  }
}

function actionChangeLang(selectedLang) {
  return {
    type: CHANGE_LANG,
    payload: selectedLang
  }
}
