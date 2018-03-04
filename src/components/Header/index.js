import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import {fetchProfile} from '../../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: user => dispatch(fetchProfile(user)) 
  };
};

const mapStateToProps = state => {
  return {
    isLogedin:  state.isLogedin
  };
};

class ConnectedHeader extends Component {
  constructor() {
    super();
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      loginModal: []
    }
  }
  login(e) {
    e.preventDefault();

    this.toggleLoginModal();
    this.props.fetchProfile();
  }
  
  toggleLoginModal(){
    let loginModal;
    if (!this.props.isLogedin && this.state.loginModal.length === 0) {
       loginModal = 
      <div className="loginModal">
        <form className="loginForm">
          <input type="email" placeholder="Email"/>
          <input type="password" placeholder="Password"/>
          <button onClick={(e) => this.login(e)}>loggin</button>
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

const Header = connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader);

export default Header;