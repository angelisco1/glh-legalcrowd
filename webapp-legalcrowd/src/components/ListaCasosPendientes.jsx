import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { validarCaso } from '../store/casos-presentados/actions';

class ListaCasosPendientes extends Component {
  constructor(props) {
    super(props);
    this.handleValidar = this.handleValidar.bind(this);
  }

  handleValidar(id) {
    this.props.validarCaso(id)
      .then(() => {
        this.props.history.push('/');
      })
  }

  render() {
    let casos = this.props.casos;
    const listaCasos = casos.map(c => {
      return (
        <Col md="12" key={c.id}>
          <Card>
            <Card.Body>
              <Card.Text>{c.exposicion}</Card.Text>
              <Button onClick={() => this.handleValidar(c.id)}>Validar</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    })
    return (
      <Row>
        {listaCasos}
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    casos: state.casosReducer.casos
  }
}

const mapDispatchToProps = {
  validarCaso
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListaCasosPendientes));