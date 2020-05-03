import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { registro } from '../store/usuarios/actions';
import translate from '../utils/traducciones';

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nombre: ''
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
    this.props.registro(this.state)
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    const {email, password, nombre} = this.state;
    return (
      <Container>
        <h2>{translate('registro', this.props.lang)}</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Col} md="6" controlId="formBasicNombre">
            <Form.Label>{translate('nombre', this.props.lang)}</Form.Label>
            <Form.Control type="text" name="nombre" value={nombre} onChange={this.handleChangeField} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formBasicEmail">
            <Form.Label>{translate('email', this.props.lang)}</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={this.handleChangeField} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formBasicPassword">
            <Form.Label>{translate('contraseña', this.props.lang)}</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={this.handleChangeField} />
          </Form.Group>
          <Button variant="outline-light" type="submit">
            {translate('registrarme', this.props.lang)}
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.selected.code
  }
}


const mapDispatchToProps = {
  registro
}

export default connect(mapStateToProps, mapDispatchToProps)(Registro)