import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { withUser } from './withUser';
import translate from '../utils/traducciones';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class UsuarioInversiones extends Component {
  render() {
    const { usuario, lang } = this.props;
    const listaInversiones = (usuario.inversiones || []).map(inv => {
      return (
        <tr key={inv.asunto.id}>
          <td>{inv.asunto.nombre}</td>
          <td>{inv.cantidad}</td>
          <td>
            <Button style={{width: '100%'}} variant="outline-light" as={Link} to={'/asunto/'+inv.asunto.id}>{translate('ver', lang)}</Button>
          </td>
        </tr>
      )
    })


    return (
      <div>
        <h2 style={{marginBottom: '2.75rem'}}>{translate('mis_inversiones', lang)}</h2>
        {
          listaInversiones.length === 0
          ?
            <p>{translate('ninguna_inversion', lang)}</p>
          :
            <Table striped bordered hover variant="dark">
              <thead style={{textAlign: 'center', fontWeight: 'bold'}}>
                <tr>
                  <th>{translate('caso', lang)}</th>
                  <th>{translate('cantidad_invertida', lang)}</th>
                  <th>{translate('ver', lang)}</th>
                </tr>
              </thead>
              <tbody>
                {listaInversiones}
              </tbody>
            </Table>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuariosReducer.usuario,
    lang: state.langReducer.selected.code
  }
}

export default connect(mapStateToProps)(withUser(UsuarioInversiones))