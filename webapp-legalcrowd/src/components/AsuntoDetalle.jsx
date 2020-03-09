import React, { Component } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ModalInvertir from './ModalInvertir';
import { connect } from 'react-redux'
import { actualizarAsunto, getAsuntoById } from '../store/asuntos/actions';

class AsuntoDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asunto: {
        nombre: '',
        imagen: '',
        exposicion: '',
        valRiesgo: 0,
        cuantiaReclamacion: 0,
        cantidadContribuir: 0,
        porcentajeFinanciar: 0,
        ramaId: 1,
        inversiones: []
      },
      modalShow: false
    }
    this.handleInvertir = this.handleInvertir.bind(this);
  }

  componentDidMount() {
    this.props.getAsuntoById(this.props.match.params.id)
      .then(asunto => {
        this.setState({asunto: asunto})
      })
  }

  handleInvertir(cantidad) {
    const nuevaInversion = {cantidad: cantidad, usuario: this.props.usuario.id}
    const nInversiones = this.state.asunto.inversiones ? [...this.state.asunto.inversiones, nuevaInversion] : [nuevaInversion];
    const asuntoActualizado = {...this.state.asunto, inversiones: nInversiones}
    if (cantidad) {
      this.props.actualizarAsunto(asuntoActualizado)
        .then(() => {
          this.setState({
            modalShow: false,
            asunto: asuntoActualizado
          })
        })
    }
  }

  render() {
    const { asunto, modalShow } = this.state;
    const disabled = (totalRecaudado >= asunto.cantidadContribuir) || !this.props.usuario
    const totalRecaudado = asunto.inversiones ? asunto.inversiones.reduce((acc, i) => {
      return acc += Number(i.cantidad)
    }, 0) : 0;
    const porcentajeCubierto = (totalRecaudado * 100) / asunto.cantidadContribuir;
    const styles = {
      fontSize: '2em',
      color: 'blue'
    }
    return (
      <Container>
        <Col md={{span: 10, offset: 1}}>
          <h2>{asunto.nombre}</h2>
          <br />
          <Row>
            <Col md="4" className="text-center">
              <strong>Cuantía reclamada</strong>
            </Col>
            <Col md="4" className="text-center">
              <strong>Cantidad a contribuir</strong>
            </Col>
            <Col md="4" className="text-center">
              <strong>Valoración de riesgo</strong>
            </Col>
          </Row>
          <Row>
            <Col md="4" className="text-center">
              <span style={styles}>{asunto.cuantiaReclamacion}€</span>
            </Col>
            <Col md="4" className="text-center">
              <span style={styles}>{asunto.cantidadContribuir}€</span>
            </Col>
            <Col md="4" className="text-center">
              <span style={styles}>{asunto.valRiesgo}</span>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>Exposición</Card.Header>
                <Card.Body>
                  <Card.Text>{asunto.exposicion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row className="align-items-center justify-content-center">
            <Col md={{ span: 6, offset: 1 }}>
              <ProgressBar animated now={porcentajeCubierto} label={totalRecaudado + '€ / ' + asunto.cantidadContribuir + '€'} />
            </Col>
            <Col md="3">
              <Button variant="primary" disabled={disabled} onClick={() => this.setState({modalShow: true})}>Invertir</Button>
            </Col>
          </Row>

          <ModalInvertir show={modalShow} onHide={this.handleInvertir} />
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuariosReducer.usuario
  }
}

const mapDispatchToProps = {
  actualizarAsunto,
  getAsuntoById
}

export default connect(mapStateToProps, mapDispatchToProps)(AsuntoDetalle);