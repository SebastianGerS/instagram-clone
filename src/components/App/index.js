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
    return (
      <section>
        <div className="signup">
          <form className="signupForm">
            <input type="email" placeholder="Email"/>
            <input type="text" placeholder="Fullname"/>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <button>signup</button>
          </form>
        </div>;
      </section>
    );
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
