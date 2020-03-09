import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { registro } from '../store/usuarios/actions';

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nombre: '',
      tipo: 0
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
        <h2>Registro</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Col} md="6" controlId="formBasicNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Introduce tu nombre" name="nombre" value={nombre} onChange={this.handleChangeField} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChangeField} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChangeField} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Registrarme
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = {
  registro
}

export default connect(null, mapDispatchToProps)(Registro)