import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/usuarios/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout()
      .then(() => {
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <Navbar variant="light" style={{backgroundColor: 'white'}}>
        <Navbar.Brand className="mr-auto brand" as={Link} to="/">
          <img
            src="/images/logo.png"
            className="d-inline-block align-top"
            alt="Logo Legal Crowd"
          />
        </Navbar.Brand>
        {
          this.props.usuario && this.props.usuario.tipo == 11
          ?
            null
          :
            (
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-4" />
                <Button variant="outline-info">Search</Button>
              </Form>
            )
        }
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          {
            this.props.usuario && this.props.usuario.tipo == 11
            ?
              (
                <React.Fragment>
                  <Nav.Link as={Link} to="/casos-por-revisar">Casos pendientes</Nav.Link>
                  <Nav.Link as={Link} to="/crear-asunto">Nuevo asunto</Nav.Link>
                </React.Fragment>
              )
            :
              null
          }
          {
            this.props.usuario && this.props.usuario.tipo == 0
            ?
              <Nav.Link as={Link} to="/presentar-caso">Presentar caso</Nav.Link>
            :
              null
          }
          {
            this.props.usuario
            ?
              (
                <React.Fragment>
                  <Nav.Link as={Link} to="/">{this.props.usuario.nombre}</Nav.Link>
                  <Button variant="link" onClick={this.logout}>Logout</Button>
                </React.Fragment>
              )
            :
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
          }
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.usuariosReducer.usuario
  }
}

const mapDispatchToProps = {
  logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));