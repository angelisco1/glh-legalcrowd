import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Utils from '../utils/calculos';
import translate from '../utils/traducciones';
import { connect } from 'react-redux';


const Asunto = ({ asunto, lang }) => {
  const totalRecaudado = Utils.getTotalRecaudado(asunto.inversiones);
  return (
    <Card bg="dark" style={{marginBottom: '2rem'}}>
      <Card.Img variant="top" src={asunto.imagen} />
      <Card.Body>
        <Card.Title style={{textAlign: 'justify'}}>{asunto.nombre}</Card.Title>
        <hr style={{borderTop: '1px solid #0bffae'}} />
        <Card.Text style={{textAlign: 'center'}}>
          {totalRecaudado}€ / {asunto.cantidadContribuir}€
        </Card.Text>
        <Button style={{width: '100%'}} variant="outline-light" as={Link} to={'/asunto/'+asunto.id}>{translate('ver', lang)}</Button>
      </Card.Body>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.selected.code
  }
}

export default connect(mapStateToProps)(Asunto)