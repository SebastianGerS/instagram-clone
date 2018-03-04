import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Header extends Component {
  constructor() {
    super();
    this.toggleLoginModal = this.toggleLoginModal.bind(this);

    this.state = {
      loginModal: []
    }
  }
  toggleLoginModal(){
    let loginModal;
    if (this.state.loginModal.length === 0) {
       loginModal = 
      <div className="loginModal">
        <form className="loginForm">
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <button>loggin</button>
        </form>
        <div>
          <p>If you do not have an acount please <span className="registerLink"><Link to="/register" onClick={this.toggleLoginModal}>Register</Link></span></p>
        </div>
      </div>;
      this.setState({
        loginModal: [loginModal]
      });
    } else {
      this.setState({
        loginModal: []
      });
    }
  }
  render() {

    return(
      <header>
        <h1>CopyGram</h1>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/profile">Profile</Link>
            </li>
            <li>
              <Link className="link" to="/explore">Explore</Link>
            </li>
          </ul>
        </nav>
        <button className="userButton" onClick={this.toggleLoginModal}></button>
        {this.state.loginModal}
      </header>
    );
  }
}

export default Header;