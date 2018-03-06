import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import {fetchProfile, loginUser } from '../../actions';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: user => dispatch(fetchProfile(user)),
    loginUser: user => dispatch(loginUser(user)),
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
    this.updateStateValue = this.updateStateValue.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      loginModal: [],
      email: '',
      password: ''
    }
  }
  login(e) {
    e.preventDefault();
    if(this.state.email.lenth <= 0 || this.state.password <= 0){
      return;
    }
    this.toggleLoginModal();
    this.props.fetchProfile();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(user);
  }
  updateStateValue(e) {
    this.setState({
        [e.target.name]: e.target.value
     });
    }
  toggleLoginModal(){
    let loginModal;
    if (!this.props.isLogedin && this.state.loginModal.length === 0) {
       loginModal = 
      <div className="loginModal">
        <form className="loginForm" onSubmit={(e) => this.login(e)}>
          <input name='email' type="email" placeholder="Email" onChange={this.updateStateValue}/>
          <input name='password' type="password" placeholder="Password" onChange={this.updateStateValue}/>
          <button type="submit">loggin</button>
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