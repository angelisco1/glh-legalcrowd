import * as ActionTypes from './action-types';
// import initialState from './asuntos';

const initialState = {
  asuntos: []
}

function initAsuntos(state, asuntos) {
  return {asuntos}
}

function addAsunto(state, asunto) {
  const newState = {asuntos: [...state.asuntos, asunto]}
  return newState;
}

function updateAsunto(state, asunto) {
  const nuevosAsuntos = state.asuntos.map(a => {
    if (a.id == asunto.id) {
      return asunto;
    }
    return a;
  })
  return {asuntos: nuevosAsuntos};
}


export default function asuntos(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.INIT_ASUNTOS:
      return initAsuntos(state, action.payload)
    case ActionTypes.ADD_ASUNTO:
      return addAsunto(state, action.payload)
    case ActionTypes.UPDATE_ASUNTO:
      return updateAsunto(state, action.payload)
    default:
      return state;
  }
}