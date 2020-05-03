import * as ActionTypes from './action-types';

const initialState = {
  casos: []
}

function initCasos(state, casos) {
  return {casos}
}

function addCaso(state, caso) {
  const newState = {casos: [...state.casos, caso]}
  return newState;
}

function removeCaso(state, id) {
  const nuevosCasos = state.casos.filter(c => c.id != id);
  console.log(nuevosCasos)
  const newState = {casos: nuevosCasos}
  return newState;
}


export default function casos(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.INIT_CASOS:
      return initCasos(state, action.payload)
    case ActionTypes.PRESENTAR_CASOS:
      return addCaso(state, action.payload)
    case ActionTypes.VALIDAR_CASO:
      return removeCaso(state, action.payload)
    default:
      return state;
  }
}