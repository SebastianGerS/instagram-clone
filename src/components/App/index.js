import React, { Component } from 'react';
import './styles.css';
import { Header, Footer } from '../';
import { Root } from '../../containers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <div className="content">
          <Root />
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
