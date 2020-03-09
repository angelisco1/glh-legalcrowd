import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { guardarAsunto } from '../store/asuntos/actions';

class FormAsunto extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nombre: 'Asunto ...',
      ramaId: 2,
      valRiesgo: 5,
      cantidadContribuir: 0,
      cuantiaReclamacion: 0,
      porcentajeFinanciar: 0,
      exposicion: 'Exposición ...',
      imagen: 'https://s03.s3c.es/imag/_v0/770x420/a/1/3/rocas-volcanicas-770x420-pixabay.jpg',
      inversiones: []
    }
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.guardarAsunto(this.state)
      .then(() => {
        this.props.history.push('/');
      });

  }

  render() {
    const {nombre, ramaId, valRiesgo, cantidadContribuir, cuantiaReclamacion, porcentajeFinanciar, exposicion, imagen} = this.state;
    const ramasOptions = this.props.ramas.map(r => {
      return (
        <option key={r.id} value={r.id}>{r.nombre}</option>
      )
    })
    return (
      <Container>
        <h2>Nuevo asunto</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="8" controlId="formNombre">
              <Form.Label>Nombre del asunto</Form.Label>
              <Form.Control type="text" placeholder="Introduce nombre" name="nombre" value={nombre} onChange={this.handleChangeField} />
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="exampleForm.ControlSelect2">
              <Form.Label>Rama del derecho</Form.Label>
              <Form.Control as="select" name="ramaId" value={ramaId} onChange={this.handleChangeField}>
                {ramasOptions}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="3" controlId="formPorcentaje">
              <Form.Label>Valoración del riesgo</Form.Label>
              <Form.Control type="number" placeholder="Introduce la valoración del riesgo" name="valRiesgo" value={valRiesgo} onChange={this.handleChangeField} />
              <Form.Text className="text-muted">
                1 el de menor riesgo
              </Form.Text>
              <Form.Text className="text-muted">
                10 el de mayor riesgo
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formCuantia">
              <Form.Label>Cuantía de la reclamación</Form.Label>
              <Form.Control type="number" placeholder="Introduce cuantía" name="cuantiaReclamacion" value={cuantiaReclamacion} onChange={this.handleChangeField} />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formCantidad">
              <Form.Label>Cantidad a contribuir</Form.Label>
              <Form.Control type="number" placeholder="Introduce cantidad" name="cantidadContribuir" value={cantidadContribuir} onChange={this.handleChangeField} />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formPorcentaje">
              <Form.Label>Porcentaje a financiar</Form.Label>
              <Form.Control type="number" placeholder="Introduce porcentaje" name="porcentajeFinanciar" min="0" max="100" value={porcentajeFinanciar} onChange={this.handleChangeField} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Exposición del caso</Form.Label>
              <Form.Control as="textarea" rows="8" name="exposicion" value={exposicion} onChange={this.handleChangeField} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md="12" controlId="exampleForm.ControlImagen">
              <Form.Label>Url Imagen</Form.Label>
              <Form.Control type="text" placeholder="Introduce una url a la imagen" name="imagen" value={imagen} onChange={this.handleChangeField} />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Crear
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ramas: state.ramasReducer
  }
}

const mapDispatchToProps = {
  guardarAsunto
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAsunto);