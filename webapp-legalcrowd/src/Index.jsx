import React, { Component } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Header from './components/Header';
import FormAsunto from './components/FormAsunto';
import Container from 'react-bootstrap/Container'
import AsuntoDetalle from './components/AsuntoDetalle';
import FormExposicion from './components/FormExposicion';
import ListaCasosPendientes from './components/ListaCasosPendientes';
import UsuarioInversiones from './components/UsuarioInversiones';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { initAsuntos } from './store/asuntos/actions';
import { initCasos } from './store/casos-presentados/actions';

class Index extends Component {
  componentDidMount() {
    this.props.initAsuntos();
    this.props.initCasos();
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Switch>
            <Route path="/destacados" exact component={ Home } />
            <Route path="/crear-asunto" component={ FormAsunto } />
            <Route path="/categoria/:categoria" component={ Home } />
            <Route path="/asunto/:id" component={ AsuntoDetalle } />
            <Route path="/presentar-caso" component={ FormExposicion } />
            <Route path="/casos-por-revisar" component={ ListaCasosPendientes } />
            <Route path="/login" component={ Login } />
            <Route path="/registro" component={ Registro } />
            <Route path="/usuario/:id/inversiones" component={ UsuarioInversiones } />
            <Redirect path="/" exact to="/destacados" />
          </Switch>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = {
  initAsuntos,
  initCasos,
}

export default connect(null, mapDispatchToProps)(Index);