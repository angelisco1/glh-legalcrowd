import { LOGIN, LOGOUT, SIGNUP } from './action-types';
import axios from 'axios';

const url = 'https://legalcrowd-b2b50.firebaseio.com/usuarios'

function initUsuario(usuario) {
  return {
    type: LOGIN,
    payload: usuario
  }
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(quitUser());
    return Promise.resolve();
  }
}

function quitUser() {
  return {
    type: LOGOUT
  }
}

export function login(email, password) {
  return (dispatch, getState) => {
    return axios.get(url + '.json')
      .then(response => {
        const usuarios = [];
        for (const id in response.data) {
          usuarios.push({id: id, ...response.data[id]});
        }
        const usuario = usuarios.find(u => u.email == email && u.password == password);
        if (usuario) {
          dispatch(initUsuario(usuario));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function registro(newUsuario) {
  return (dispatch, getState) => {
    return axios.post(url + '.json', newUsuario)
      .then(response => {
        const id = response.data.name;
        dispatch(initUsuario({...newUsuario, id: id}));
      })
      .catch(error => {
        console.log(error);
      });
  }
}
