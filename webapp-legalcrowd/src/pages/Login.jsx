import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { login } from '../store/usuarios/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    this.props.login(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    const {email, password} = this.state;
    return (
      <Container>
        <h2>Login</h2>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Col} md="6" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChangeField} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={this.handleChangeField} />
          </Form.Group>
          <Button variant="link" as={Link} to="/registro">No tienes cuenta? Registrate</Button>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(Login)