import * as ActionTypes from './action-types';

const initialState = {
  languages: [
    {id: 0, code: 'es', flag: '🇪🇸', text: '🇪🇸 Spanish'},
    {id: 1, code: 'en', flag: '🇬🇧', text: '🇬🇧 English'}
  ],
  selected: {id: 0, code: 'es', flag: '🇪🇸'}
}

function switchLang(state, selectedLang) {
  const lang = state.languages.find(l => l.id === selectedLang.id)
  if (!lang) {
    return state;
  }
  return {...state, selected: selectedLang};
}


export default function languages(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.CHANGE_LANG:
      return switchLang(state, action.payload)
    default:
      return state;
  }
}