import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import SwitchLang from './SwitchLang'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../store/usuarios/actions';
import translate from '../utils/traducciones';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTxt: ''
    }
    this.logout = this.logout.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFilter(e) {
    this.setState({
      filterTxt: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = this.state.filterTxt ? `/destacados?filter=${this.state.filterTxt}` : '/destacados';
    this.props.history.push(url)
  }

  logout() {
    this.props.logout()
      .then(() => {
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <Navbar style={{backgroundColor: 'black', borderBottom: '2px solid #0bffae', marginBottom: '2rem'}}>
        <Navbar.Brand className="mr-auto brand" as={Link} to="/">
          <img style={{width: "400px"}}
            src="/images/dark-logo.png"
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
              <Form inline onSubmit={this.handleSubmit}>
                <FormControl type="text" placeholder={translate('buscar', this.props.lang)} className="mr-sm-4" value={this.state.filterTxt} onChange={this.handleChangeFilter} />
                <Button as={Link} to={{pathname: '/destacados', search: this.state.filterTxt ? `?filter=${this.state.filterTxt}` : ''}} variant="outline-light">{translate('buscar', this.props.lang)}</Button>
              </Form>
            )
        }
        <Nav className="ml-auto">
          <Button variant="outline-light" as={Link} to="/">{translate('inicio', this.props.lang)}</Button>
          {
            this.props.usuario && this.props.usuario.tipo == 11
            ?
              (
                <React.Fragment>
                  <Button variant="outline-light" as={Link} to="/casos-por-revisar">{translate('casos_pendientes_de_revision', this.props.lang)}</Button>
                  <Button variant="outline-light" as={Link} to="/crear-asunto">{translate('nuevo_caso', this.props.lang)}</Button>
                </React.Fragment>
              )
            :
              null
          }
          {
            this.props.usuario && this.props.usuario.tipo == 0
            ?
              (
                <React.Fragment>
                  <Button variant="outline-light" as={Link} to="/presentar-caso">{translate('presentar_caso', this.props.lang)}</Button>
                </React.Fragment>
              )
            :
              null
          }
          {
            this.props.usuario
            ?
              (
                <React.Fragment>
                  <NavDropdown variant="outline-light" as={Link} title={this.props.usuario.nombre} id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={`/usuario/${this.props.usuario.id}/inversiones`}>{translate('mis_inversiones', this.props.lang)}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item variant="outline-light" onClick={this.logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </React.Fragment>
              )
            :
              <Button variant="outline-light" as={Link} to="/login">Login</Button>
          }
          <SwitchLang />
        </Nav>
      </Navbar>
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
  logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));