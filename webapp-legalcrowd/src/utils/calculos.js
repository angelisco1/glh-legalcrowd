function getTotalRecaudado(inversiones) {
  return inversiones ? inversiones.reduce((acc, i) => {
    return acc += Number(i.cantidad)
  }, 0) : 0;
}


export default {
  getTotalRecaudado,
}