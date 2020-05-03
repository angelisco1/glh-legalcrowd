import React from 'react';
import { connect } from 'react-redux';
import { changeLang } from '../store/lang/actions';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';

const SwitchLang = (props) => {
  const options = props.languages.map(l => <Dropdown.Item key={l.id} onClick={() => props.changeLang(l)} eventKey={l.id}>{l.text}</Dropdown.Item>)

  return (
    <React.Fragment>
      <SplitButton
        id="dropdown-button-drop-left"
        drop="left"
        title={props.selected.flag}
        variant="outline-light"
      >
        {options}
      </SplitButton>{' '}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.langReducer
  }
}

const mapDispatchToProps = {
  changeLang
}

export default connect(mapStateToProps, mapDispatchToProps)(SwitchLang)