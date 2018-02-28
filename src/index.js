import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import WraperContainer from './containers/WraperContainer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDom.render(
  <WraperContainer />,
  document.getElementById('root')
);

registerServiceWorker();
