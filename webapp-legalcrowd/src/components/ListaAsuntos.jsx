import React, { Component } from 'react'
import Asunto from './Asunto';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ListaAsuntos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ramaId = this.props.match.params.categoria;
    const queryParams = this.props.location.search;
    let asuntos = this.props.asuntos;
    if (ramaId) {
      asuntos = asuntos.filter(a => a.ramaId == ramaId);
    }
    if (queryParams) {
      const filter = queryParams.split('=')[1];
      asuntos = asuntos.filter(a => a.nombre.toLowerCase().includes(filter.toLowerCase()))
    }
    const listaAsuntos = asuntos.map(a => {
      return (
        <Col md="4" key={a.id}>
          <Asunto asunto={a} />
        </Col>
      );
    })
    return (
      <Row>
        {listaAsuntos}
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    asuntos: state.asuntosReducer.asuntos
  }
}

export default withRouter(connect(mapStateToProps)(ListaAsuntos));