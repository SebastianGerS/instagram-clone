import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import Store from './data/Store';
import { App } from './components';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDom.render(
  
  <Provider store={Store}>
    <App/>
  </Provider>,
  
  document.getElementById('root')
);

registerServiceWorker();
