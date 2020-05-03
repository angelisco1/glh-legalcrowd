import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { login } from '../store/usuarios/actions';
import translate from '../utils/traducciones';

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
            <Form.Label>{translate('email', this.props.lang)}</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={this.handleChangeField} />
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="formBasicPassword">
            <Form.Label>{translate('contraseña', this.props.lang)}</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={this.handleChangeField} />
          </Form.Group>
          <Button variant="light" as={Link} to="/registro">{translate('no_tienes_cuenta', this.props.lang)}</Button>
          <Button variant="outline-light" type="submit">
            Login
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
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)