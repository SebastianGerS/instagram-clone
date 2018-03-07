import React, { Component } from 'react';
import './styles.css';
import { Header, Footer } from '../';
import { Root } from '../../containers';

import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
  }
 
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
            <div className="wraper">
              <Root />
            </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
