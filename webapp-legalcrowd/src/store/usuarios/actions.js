import { LOGIN, LOGOUT, ADD_INVERSION } from './action-types';
import firebase from 'firebase';
import axios from 'axios';

const url = 'https://legalcrowd-b2b50.firebaseio.com/usuarios'

export function logout() {
  return (dispatch, getState) => {
    return firebase.auth().signOut()
      .then(() => {
        dispatch(quitUser());
        return Promise.resolve();
      }).catch((error) => {
        // An error happened.
      });
  }
}

function quitUser() {
  return {
    type: LOGOUT
  }
}

function initUsuario(usuario) {
  return {
    type: LOGIN,
    payload: usuario
  }
}

export function login(email, password) {
  let uid = null;
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {
        uid = data.user.uid;
        return axios.get(url + '.json');
      })
      .then(response => {
        const usuarios = [];
        for (const id in response.data) {
          usuarios.push({id: id, ...response.data[id]});
        }
        const usuario = usuarios.find(u => u.uid === uid);
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
    return firebase.auth().createUserWithEmailAndPassword(newUsuario.email, newUsuario.password)
      .then((result) => {
        newUsuario = {uid: result.user.uid, nombre: newUsuario.nombre, tipo: 0};
        return result.user.updateProfile({
          displayName: newUsuario.nombre
        })
      })
      .then(resp => {
        return axios.post(url + '.json', newUsuario)
      })
      .then(resp => {
        dispatch(initUsuario(newUsuario))
      })
      .catch((err) => {
        console.log(err);
      })

  }
}

export function addInversionDeUsuario(inversionUsuario) {
  return (dispatch, getState) => {
    const usuario = getState().usuariosReducer.usuario;
    const inversionesUsuario = [...(usuario.inversiones || []), inversionUsuario];
    return axios.put(`${url}/${usuario.id}/inversiones.json`, inversionesUsuario)
      .then(resp => {
        dispatch(updateInversionesUsuario(inversionesUsuario))
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function updateInversionesUsuario(inversionesUsuario) {
  return {
    type: ADD_INVERSION,
    payload: inversionesUsuario
  }
}