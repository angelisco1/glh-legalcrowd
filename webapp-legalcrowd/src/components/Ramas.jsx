import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux';
import translate from '../utils/traducciones';

class Ramas extends Component {

  render() {
    const enlaces = this.props.ramas.map(r => {
      return (
        <Nav.Item key={r.id}>
          <Nav.Link as={Link} to={"/categoria/" + r.id}>{translate(r.nombre, this.props.lang)}</Nav.Link>
        </Nav.Item>
      );
    })
    return (
      <Nav className="justify-content-center" style={{marginBottom: '1.25rem'}}>
        {enlaces}
      </Nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ramas: state.ramasReducer,
    lang: state.langReducer.selected.code
  }
}

export default connect(mapStateToProps)(Ramas);