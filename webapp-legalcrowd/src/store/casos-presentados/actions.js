import { PRESENTAR_CASOS, INIT_CASOS, VALIDAR_CASO } from './action-types';
import axios from 'axios';

const url = 'https://legalcrowd-b2b50.firebaseio.com/casos-presentados'

function getCasos(casos) {
  return {
    type: INIT_CASOS,
    payload: casos
  }
}

export function initCasos(newAsunto) {
  return (dispatch, getState) => {
    return axios.get(url + '.json')
          .then(response => {
            const casos = [];
            for (const id in response.data) {
              casos.push({id: id, ...response.data[id]});
            }
            dispatch(getCasos(casos));
          })
          .catch(error => {
            console.log(error);
          });
  }
}

export function presentarCaso(newCaso) {
  return (dispatch, getState) => {
    return axios.post(url + '.json', newCaso)
          .then(response => {
            newCaso.id = response.data.name
            dispatch(addCaso(newCaso));
          })
          .catch(error => {
            console.log(error);
          });
  }
}

function addCaso(caso) {
  return {
    type: PRESENTAR_CASOS,
    payload: caso
  }
}

export function validarCaso(id) {
  return (dispatch, getState) => {
    return axios.delete(url + '/' + id + '.json')
          .then(response => {
            dispatch(removeCaso(id));
          })
          .catch(error => {
            console.log(error);
          });
  }
}

function removeCaso(id) {
  return {
    type: VALIDAR_CASO,
    payload: id
  }
}

// export function getAsuntoById(id) {
//   return (dispatch, getState) => {
//     return axios.get(url + '/' + id + '.json')
//       .then(response => {
//         const asunto = {...response.data, id: id}
//         return asunto;
//       })
//   }
// }


// export function actualizarAsunto(asunto) {
//   return (dispatch, getState) => {
//     return axios.put(url + '/' + asunto.id + '.json', asunto)
//       .then(response => {
//         dispatch(updateAsunto(asunto));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
// }


// function updateAsunto(asunto) {
//   return {
//     type: UPDATE_ASUNTO,
//     payload: asunto
//   }
// }