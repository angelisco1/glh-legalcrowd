import { PRESENTAR_CASOS, INIT_CASOS, VALIDAR_CASO } from './action-types';
import axios from 'axios';
import {storageRef} from '../../init-firebase'

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


export function presentarCaso(newCaso) {
  console.log('newCaso:', newCaso)
  return (dispatch, getState) => {
    return axios.post(url + '.json', newCaso)
      .then(response => {
        newCaso.id = response.data.name
        return newCaso;
      })
      .then(newCaso => {
        const promisesFilesUploaded = newCaso.archivos.map(archivo => {
          // Con el contentDisposition attachment indicamos que se descargue el archivo en lugar de que lo muestre en el navegador.
          const metadata = {
            contentDisposition: `attachment; filename="${archivo.name}"`,
            contentType: archivo.type
          };
          return storageRef.child(`${newCaso.id}/${archivo.name}`).put(archivo, metadata)
        })
        return Promise.all(promisesFilesUploaded)
      })
      .then(filesUploaded => {
        const promisesFilesData = filesUploaded.map(f => {
          const { name, type, fullPath, contentType } = f.metadata;

          return getDownloadUrl(fullPath)
            .then(downloadUrl => {
              return {
                name,
                type,
                fullPath,
                contentType,
                downloadUrl
              }
            })
        })

        return Promise.all(promisesFilesData)
      })
      .then(archivos => {
        console.log('archivos', archivos)
        newCaso.archivos = archivos
        return axios.put(url + '/' + newCaso.id + '/archivos.json', newCaso.archivos)
      })
      .then((r) => {
        // console.log('R: ', r);
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

function getDownloadUrl(fullPath) {
  return storageRef.child(fullPath).getDownloadURL()
}