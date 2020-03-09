import * as ActionTypes from './action-types';
// import initialState from './asuntos';

const initialState = {
  usuario: null
}

export default function usuarios(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.LOGIN:
      return {usuario: action.payload}
    case ActionTypes.LOGOUT:
      return {usuario: null}
    case ActionTypes.SIGNUP:
      return {usuario: action.payload}
    default:
      return state;
  }
}