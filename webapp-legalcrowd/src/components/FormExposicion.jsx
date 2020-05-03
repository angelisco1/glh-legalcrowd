import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';
import { presentarCaso } from '../store/casos-presentados/actions';
import { withUser } from './withUser';
import translate from '../utils/traducciones';

class FormExposicion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exposicion: 'Exposición ...',
      archivos: []
    }
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedFiles = this.handleSelectedFiles.bind(this);
  }

  handleChangeField(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSelectedFiles(event) {
    console.dir(event.target);
    this.setState({
      archivos: Array.from(event.target.files)
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.presentarCaso({...this.state, usuarioId: this.props.usuario.id})
      .then(() => {
        this.props.history.push('/');
      });

  }

  render() {
    const {exposicion, archivos} = this.state;
    const listaArchivos = archivos.map((archivo, pos) => {
      return <ListGroup.Item variant="dark" key={pos}>{archivo.name}</ListGroup.Item>
    })
    return (
      <Container>
        <h2>{translate('presentar_caso', this.props.lang)}</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows="8" name="exposicion" value={exposicion} onChange={this.handleChangeField} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea2">
              <Form.Control type="file" className="custom-file-input" multiple onChange={this.handleSelectedFiles} />
              <Form.Label className="custom-file-label">
                {translate('sube_tus_archivos', this.props.lang)}
              </Form.Label>
              <ListGroup>
                {listaArchivos}
              </ListGroup>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            {translate('presentar', this.props.lang)}
          </Button>
        </Form>
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
  presentarCaso
}

export default connect(mapStateToProps, mapDispatchToProps)(withUser(FormExposicion));