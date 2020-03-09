import React, { Component } from 'react'
import ListaAsuntos from '../components/ListaAsuntos'
import Ramas from '../components/Ramas'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Ramas />
        <h2>Asuntos destacados</h2>
        <br />
        <ListaAsuntos />
        <br />
        <h2>Duración media de un proceso en los diferentes tribunales</h2>
        <br />
        <Row>
          <Col md={{span: 6, offset: 3}}>
            <Card>
              <Card.Img variant="top" src="images/grafica.png" />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
