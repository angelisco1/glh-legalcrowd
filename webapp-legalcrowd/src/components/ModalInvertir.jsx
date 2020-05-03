import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import translate from '../utils/traducciones';
import { connect } from 'react-redux';

class ModalInvertir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidad: 0
    }
  }

  render() {
    return (
      <Modal
        backdrop
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate('inversion', this.props.lang)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>{translate('cantidad_a_invertir', this.props.lang)}</Form.Label>
            <Form.Control type="number" name="cantidad" value={this.state.cantidad} onChange={(e) => this.setState({[e.target.name]: e.target.value})} />
          </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={() => this.props.onInvest(this.state.cantidad)}>{translate('invertir', this.props.lang)}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.langReducer.selected.code
  }
}

export default connect(mapStateToProps)(ModalInvertir)