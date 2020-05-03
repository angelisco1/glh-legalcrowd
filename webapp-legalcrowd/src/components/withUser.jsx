import React from 'react';
import { Redirect } from 'react-router-dom';

// Hoc que comprueba si estas logueado a la hora de mostrar componentes. Si no lo estás te redirige a la página inicial.
export const withUser = (WrappedCmp) => {
  return class extends React.Component {
    render() {
      return this.props.usuario ? <WrappedCmp {...this.props} /> : <Redirect to="/" />
    }
  }
}