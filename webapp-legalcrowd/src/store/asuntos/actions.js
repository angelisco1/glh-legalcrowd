import { ADD_ASUNTO, INIT_ASUNTOS, UPDATE_ASUNTO } from './action-types';
import axios from 'axios';

const url = 'https://legalcrowd-b2b50.firebaseio.com/asuntos'

function getAsuntos(asuntos) {
  return {
    type: INIT_ASUNTOS,
    payload: asuntos
  }
}

export function initAsuntos(newAsunto) {
  return (dispatch, getState) => {
    return axios.get(url + '.json')
          .then(response => {
            const asuntos = [];
            for (const id in response.data) {
              asuntos.push({id: id, ...response.data[id]});
            }
            dispatch(getAsuntos(asuntos));
          })
          .catch(error => {
            console.log(error);
          });
  }
}

export function guardarAsunto(newAsunto) {
  return (dispatch, getState) => {
    return axios.post(url + '.json', newAsunto)
          .then(response => {
            newAsunto.id = response.data.name
            dispatch(addAsunto(newAsunto));
          })
          .catch(error => {
            console.log(error);
          });
  }
}

function addAsunto(asunto) {
  return {
    type: ADD_ASUNTO,
    payload: asunto
  }
}

export function getAsuntoById(id) {
  return (dispatch, getState) => {
    return axios.get(url + '/' + id + '.json')
      .then(response => {
        const asunto = {...response.data, id: id}
        return asunto;
      })
  }
}


export function actualizarAsunto(asunto) {
  return (dispatch, getState) => {
    return axios.put(url + '/' + asunto.id + '.json', asunto)
      .then(response => {
        dispatch(updateAsunto(asunto));
      })
      .catch(error => {
        console.log(error);
      });
  }
}


function updateAsunto(asunto) {
  return {
    type: UPDATE_ASUNTO,
    payload: asunto
  }
}