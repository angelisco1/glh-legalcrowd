import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withUser } from './withUser';
import { validarCaso } from '../store/casos-presentados/actions';
import translate from '../utils/traducciones';

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
      const listaArchivosDescargables = c.archivos.map(a => {
        return <ListGroup.Item key={a.fullPath} variant="dark" action href={a.downloadUrl}>{a.name}</ListGroup.Item>
      })
      return (
        <Col md="12" key={c.id}>
          <Card bg="dark">
            <Card.Body>
              <Card.Text>{c.exposicion}</Card.Text>
            </Card.Body>
            <ListGroup variant="dark">
              {listaArchivosDescargables}
            </ListGroup>
            <Card.Body>
              <Button variant="outline-light" onClick={() => this.handleValidar(c.id)}>{translate('validar', this.props.lang)}</Button>
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
    casos: state.casosReducer.casos,
    usuario: state.usuariosReducer.usuario,
    lang: state.langReducer.selected.code
  }
}

const mapDispatchToProps = {
  validarCaso,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withUser(ListaCasosPendientes)));