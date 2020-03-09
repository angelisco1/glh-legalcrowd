import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Asunto({ asunto }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img variant="top" src={asunto.imagen} />
        <Card.Title>{asunto.nombre}</Card.Title>
        <Button variant="primary" as={Link} to={'/asunto/'+asunto.id}>Ver</Button>
      </Card.Body>
    </Card>
  )
}
