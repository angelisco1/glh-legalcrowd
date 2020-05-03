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
import Utils from '../utils/calculos';
import translate from '../utils/traducciones';

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
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.props.getAsuntoById(this.props.match.params.id)
      .then(asunto => {
        this.setState({asunto: asunto})
      })
  }

  hideModal() {
    this.setState({
      modalShow: false
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
    const totalRecaudado = Utils.getTotalRecaudado(asunto.inversiones);
    // const totalRecaudado = asunto.inversiones ? asunto.inversiones.reduce((acc, i) => {
    //   return acc += Number(i.cantidad)
    // }, 0) : 0;
    const porcentajeCubierto = (totalRecaudado * 100) / asunto.cantidadContribuir;
    const styles = {
      fontSize: '2em',
      color: '#0bffae'
    }
    return (
      <Container>
        <Col md={{span: 10, offset: 1}}>
          <h2>{asunto.nombre}</h2>
          <br />
          <Row>
            <Col md="4" className="text-center">
              <strong>{translate('cuantia_reclamada', this.props.lang)}</strong>
            </Col>
            <Col md="4" className="text-center">
              <strong>{translate('contribucion', this.props.lang)}</strong>
            </Col>
            <Col md="4" className="text-center">
              <strong>{translate('valoracion_del_riesgo', this.props.lang)}</strong>
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
              <Card bg="dark">
                <Card.Header>{translate('exposicion', this.props.lang)}</Card.Header>
                <Card.Body>
                  <Card.Text>{asunto.exposicion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row className="align-items-center justify-content-center">
            <Col md={{ span: 6, offset: 1 }}>
              <ProgressBar variant="danger" animated now={porcentajeCubierto} label={totalRecaudado + '€ / ' + asunto.cantidadContribuir + '€'} />
            </Col>
            <Col md="3">
              <Button variant="outline-light" disabled={disabled} onClick={() => this.setState({modalShow: true})}>{translate('invertir', this.props.lang)}</Button>
            </Col>
          </Row>

          <ModalInvertir show={modalShow} onInvest={this.handleInvertir} onHide={this.hideModal} />
        </Col>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuariosReducer.usuario,
    lang: state.langReducer.selected.code
  }
}

const mapDispatchToProps = {
  actualizarAsunto,
  getAsuntoById
}

export default connect(mapStateToProps, mapDispatchToProps)(AsuntoDetalle);