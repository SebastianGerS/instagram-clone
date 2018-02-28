import React, { Component } from 'react';
import './styles.css';
import { Header, Footer } from '../';
import { Root } from '../../containers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
   
  }
  render() {
    return (
      <div className="App">
        <Header />
          <div className="content">
            <Root inherited={this.props.inherited} />
          </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
