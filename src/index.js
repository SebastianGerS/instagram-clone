import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import Store from './data/Store';
import {Root} from './containers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDom.render(
  
  <Provider store={Store}>
    <Root/>
  </Provider>,
  
  document.getElementById('root')
);

registerServiceWorker();
