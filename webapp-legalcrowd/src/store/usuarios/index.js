import * as ActionTypes from './action-types';

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
    case ActionTypes.ADD_INVERSION:
      return {
        usuario: {
          ...state.usuario,
          inversiones: action.payload
        }
      };
    default:
      return state;
  }
}