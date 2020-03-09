import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { presentarCaso } from '../store/casos-presentados/actions';

class FormExposicion extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exposicion: 'Exposición ...',
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
    this.props.presentarCaso({...this.state, usuarioId: this.props.usuario.id})
      .then(() => {
        this.props.history.push('/');
      });

  }

  render() {
    const {exposicion} = this.state;
    return (
      <Container>
        <h2>Presentar el caso</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Presenta tu caso</Form.Label>
              <Form.Control as="textarea" rows="8" name="exposicion" value={exposicion} onChange={this.handleChangeField} />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Presentar
          </Button>
        </Form>
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
  presentarCaso
}

export default connect(mapStateToProps, mapDispatchToProps)(FormExposicion);