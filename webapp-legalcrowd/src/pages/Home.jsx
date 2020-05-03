import React, { Component } from 'react'
import ListaAsuntos from '../components/ListaAsuntos'
import Ramas from '../components/Ramas'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import translate from '../utils/traducciones';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <Ramas />
        <h2>{translate('asuntos_destacados', this.props.lang)}</h2>
        <br />
        <ListaAsuntos />
        {/* <br />
        <h2>{translate('duracion_media_proceso', this.props.lang)}</h2>
        <br />
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <Card>
              <Card.Img variant="top" src="images/grafica.png" />
            </Card>
          </Col>
        </Row> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.selected.code
  }
}

export default connect(mapStateToProps)(Home);
