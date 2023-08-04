import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import PetState from './Data/Context/Pet/PetState.js';
import {
  Provider
} from 'react-redux';
import store from './Data/Store/Store.js';

ReactDOM.render(
  < Provider store={store}  >
    <PetState>
      <App />
    </PetState>
  </ Provider>,
  document.getElementById('app')
);