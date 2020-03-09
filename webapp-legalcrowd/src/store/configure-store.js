import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import asuntosReducer from './asuntos';
import ramasReducer from './ramas';
import usuariosReducer from './usuarios';
import casosReducer from './casos-presentados';

export default function configStore() {
  const appReducer = combineReducers({asuntosReducer, ramasReducer, usuariosReducer, casosReducer});
  return createStore(appReducer, applyMiddleware(thunk));
}