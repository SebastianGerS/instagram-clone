import React from 'react';
import { App } from '../components';
import { BrowserRouter } from 'react-router-dom';
const Wraper = (props) => {

  return (
    <BrowserRouter>
      <App inherited={props}/>
    </BrowserRouter>
  );

}

export default Wraper;
