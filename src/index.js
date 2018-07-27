import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

let reduxState = {};
const store = configureStore(reduxState);

const renderDom = (
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
);

ReactDOM.render(renderDom, document.getElementById('root'));
registerServiceWorker();
