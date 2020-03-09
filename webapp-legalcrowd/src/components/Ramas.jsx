import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';

class Ramas extends Component {

  render() {
    const enlaces = this.props.ramas.map(r => {
      return (
        <Nav.Item key={r.id}>
          <Nav.Link as={Link} to={"/categoria/" + r.id}>{r.nombre}</Nav.Link>
        </Nav.Item>
      );
    })
    return (
      <Nav className="justify-content-center">
        {enlaces}
      </Nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ramas: state.ramasReducer
  }
}

export default connect(mapStateToProps)(Ramas);