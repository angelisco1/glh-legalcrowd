import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class ModalInvertir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidad: 0
    }
  }

  render() {
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Invertir
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Cantidad a invertir</Form.Label>
            <Form.Control type="number" placeholder="Cantidad a invertir" name="cantidad" value={this.state.cantidad} onChange={(e) => this.setState({[e.target.name]: e.target.value})} />
          </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide(this.state.cantidad)}>Invertir</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
