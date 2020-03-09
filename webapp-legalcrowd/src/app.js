import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from './store/configure-store';
import './styles.css';

const store = configStore();

// ReactDOM.render(<BrowserRouter><Index /></BrowserRouter>, document.getElementById('app'));
ReactDOM.render(<Provider store={store}><BrowserRouter><Index /></BrowserRouter></Provider>, document.getElementById('app'));